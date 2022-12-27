import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React from 'react';
import { CircularProgress, InputLabel, Snackbar, SnackbarContent } from '@mui/material';
import { BusinessRegParticularsInterface, CooperateRegParticularsInterface, ErrorInterfaceObj } from '../../../utils/constants';
import { businessRegObjInstance, cooperateFormObj, DaysArray, MonthsArray, Years } from '../../../utils/collections';
import { FormParticularsFileUpload } from '../../shared-components/form-particulars-file-upload';
import { CooperateFormsComponent } from './cooperate-forms';
import { useFieldArray, useForm } from 'react-hook-form';
import { isButtonFormDisabled, validateEmail } from '../../../utils/util-functions';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { addLgaData, setBusinessNameRegId, setCooperateFieldArrayLength, setIndividualFieldArrayLength, setStateIdData } from '../../../redux/slices/app-slice';
import { multipleFilePostRequest, postAxiosRequestWithHeader, postAxiosRequestWithHeaderForBusinessReg } from '../../../utils/axios-requests';
import { AxiosError } from 'axios';
import { initialErrorObj } from '../login-module/login-form';
import { ComponentLoader } from '../componentLoader';
import { isError } from 'react-query';

const partnersObj = {
    firstName: "",
    lastName: "",
    otherName: "",
    residentialAddress: "",
    state: "",
    lga: "",
    city: "",
    occupation: "",
    nationality: "",
    day: "",
    month: "",
    year: "",
    email: "",
    telephoneNumber: "",
    signature: "",
    passport: "",
    meansOfId: "",
    certificate: ""
};

const filesObj = {
    signature : '',
    passport : '',
    meansOfId : '',
    certificate : ''
};


export const BusinessRegistrationParticularsForm = (): JSX.Element => {
    const [extras, setExtras] = React.useState({
        isCooperateForm: false,
        index: 0
    });
    const [axiosResponse, setAxiosResponse] = React.useState<ErrorInterfaceObj>(initialErrorObj);

    const [requestStatus, isRequestSuccessful] = React.useState<any[]>([]);

    const [files, setFiles] = React.useState([filesObj]);

    const [state, setState] = React.useState<any>({
        open: true,
        vertical: 'top',
        horizontal: 'right',
    });
    const [savedPartnerId, setPartnerId] =  React.useState('');
    const [triggerUseEffect, setTrigger] = React.useState(false);

    const { vertical, horizontal, open } = state;
    const stateSelector = useSelector((state: any) => state.store.state);

    const lgaSelector = useSelector((state: any) => state.store.lga);
    const getNameRegObjectSelector = useSelector((state: any) => state.store.businessNameRegistration);
    const getNameRegIdSelector = useSelector((state: any) => state.store.businessNameRegistrationId);
    const isValidBusinessForm = useSelector((state : any) => state.store.nameRegFormIsValid);
    //console.log('form Valid', isValidBusinessForm);
        

    const dispatch: Dispatch<AnyAction> = useDispatch();

    const {
        register,
        formState: { isValid, isSubmitting, isSubmitSuccessful },
        control,
        handleSubmit,
        setError,
        setValue,
        getValues,
        watch
    } = useForm<any>({
        // defaultValues: {}; you can populate the fields by this attribute 
        // defaultValues : partnersObj
    });
    const watchAllInputFields = watch();

    const { fields, append } = useFieldArray<any>({
        control,
        name: "values"
    });

    const {
        register: registerCooperateFormValues,
        formState: { isValid: isCooperateFormValid },
        setError: setErrorForCooperateForm,
        setValue: setCooperateFormValue,
        getValues: getValuesFromCooperate,
        handleSubmit: submitCooperateFormHandler,
        watch: watchForm
    } = useForm<any>({
        // defaultValues: {}; you can populate the fields by this attribute 
        // defaultValues : partnersObj
    });

    const { fields: fieldsArray, append: appendToCooperate } = useFieldArray<any>({
        control,
        name: "cooperate"
    });
    const addCooperateForm = () => {
        appendToCooperate(cooperateFormObj);
        dispatch(setCooperateFieldArrayLength(fieldsArray.length));
    }

    const getSavedForm = (index : number) =>{
        //get index of saved partners
        return requestStatus.filter((i:number) => index === i);
    }
    const addFormOnClickHandler = () => {
        append(partnersObj);
        dispatch(setIndividualFieldArrayLength(fields.length));
    }

    // const onChangeTextHandler = (e: any, index: number) => {
    //     const { target: { value } } = e;

    //     //const { name, size, type } = file;
    //     const newSignatureFile = forms.map((attachment: any, i: number) => index === i
    //         ? Object.assign(attachment, { [e.target.name]: value })
    //         : attachment);

    //     setNumberOfForms(newSignatureFile);
    // }

    // const onChangeFileHandler = (e: any, index: number, elementId: string) => {
    //     const { target: { files } } = e;

    //     const fieldName: string[] = elementId.split('-');
    //     const file = files[0];
    //     if (file) {
    //         //console.log('{e,index,elementId}', {file,index,feild : fieldName[0]});
    //         const { name, size, type } = file;
    //         const newSignatureFile = forms.map((attachment: any, i: number) => index === i
    //             ? Object.assign(attachment, { [fieldName[0]]: name })
    //             : attachment);

    //         setNumberOfForms(newSignatureFile);
    //     }
    // }
    
      const handleClose = () => {
        setState({ ...state, open: false });
      };

    const emptyFileInputField = (elementId: string, index: number) => {
        setValue(`${elementId}`, '');
        document.getElementById(elementId)?.click();
    }

    const onSaveHandler = async (data: any, index: number) => {
        console.log(files);
        //  if(!data.signature || 
        //     !data.passport || 
        //     !data.meanOfId || 
        //     !data.certificate || 
        //     !data.firstName || 
        //     !data.lastName || 
        //     !data.otherName ||
        //     !data.address ||
        //     !data.lgaId || !data.city || !data.email || 
        //     !data.nationality || !data.occupation || !data.phoneNumber ||
        //     !data.state){
        //         setAxiosResponse({...axiosResponse, msg: 'Please Fill Out all fields before saving', isError : true});
        //         setTimeout(() => {
        //         setAxiosResponse({...axiosResponse, msg: '', isError : true});
        //         },4000);
        //         return;
        //     }
        const saveButton = document.getElementById(`save-${index}-button`) as HTMLButtonElement;
        const divForm = document.getElementById(`form-div${index}`) as HTMLDivElement;

        //console.log('data.save', data);
        const { firstNameSuggestion,
            secondNameSuggestion, 
            businessAddress, 
            email, 
            phoneNumber, 
            userId 
        } = getNameRegObjectSelector;
        //const inputs = document.querySelector('input') as HTMLInputElement; inputs.readOnly =false;inputs.readOnly = true;

        const body = document.body as HTMLBodyElement;
        
        if (saveButton) {
            saveButton.disabled = true;

            //converting individual files to FileList array for Api payload

            const filesPayload: FormData = new FormData();
            filesPayload.append("files[]", getValues(`values.${index}.signature`)[0] as File);
            filesPayload.append("files[]", getValues(`values.${index}.passport`)[0] as File);
            filesPayload.append("files[]", getValues(`values.${index}.meansOfId`)[0] as File);
            filesPayload.append("files[]", getValues(`values.${index}.certificate`)[0] as File);
            //beginning files upload 

            try {
                const response = await multipleFilePostRequest('upload-files', filesPayload);
                console.log(response.data);
                const {success, code, data: fileData} = response.data;

                    if (success && code === 200) {
                        const savePartnerObj = {
                            firstName: getValues(`values.${index}.firstName`),//data?.firstName,
                            lastName: getValues(`values.${index}.lastName`),
                            otherName: getValues(`values.${index}.otherName`),//data?.otherName,
                            address: getValues(`values.${index}.residentialAddress`),//data?.residentialAddress,
                            lgaId: '3a7e7bd2-6f7c-4945-adf3-89a1d564db08',//data?.lga,
                            city: getValues(`values.${index}.city`), //data?.city,
                            dateOfBirth: new Date(`${getValues(`values.${index}.year`)}/${getValues(`values.${index}.month`)}/${getValues(`values.${index}.day`)} GMT`),
                            occupation: getValues(`values.${index}.occupation`),//data?.occupation,
                            nationality: getValues(`values.${index}.nationality`),//data?.nationality,
                            email: getValues(`values.${index}.email`),//data?.email,
                            phoneNumber: getValues(`values.${index}.telephoneNumber`),//data?.telephoneNumber,
                            type: "INDIVIDUAL",
                            signature: fileData[0],
                            passport: fileData[1],
                            competenceCertificate: fileData[3],
                            idCardLink: fileData[2],
                            businessNameRegistrationId: getNameRegIdSelector
                        }
                        const savePartnerObjInsideArray = {
                            firstName: getValues(`values.${index}.firstName`),//data?.firstName,
                            lastName: getValues(`values.${index}.lastName`),
                            otherName: getValues(`values.${index}.otherName`),//data?.otherName,
                            address: getValues(`values.${index}.residentialAddress`),//data?.residentialAddress,
                            lgaId: '3a7e7bd2-6f7c-4945-adf3-89a1d564db08',//data?.lga,
                            city: getValues(`values.${index}.city`), //data?.city,
                            dateOfBirth: new Date(`${getValues(`values.${index}.year`)}/${getValues(`values.${index}.month`)}/${getValues(`values.${index}.day`)} GMT`),
                            occupation: getValues(`values.${index}.occupation`),//data?.occupation,
                            nationality: getValues(`values.${index}.nationality`),//data?.nationality,
                            email: getValues(`values.${index}.email`),//data?.email,
                            phoneNumber: getValues(`values.${index}.telephoneNumber`),//data?.telephoneNumber,
                            type: "INDIVIDUAL",
                            signature: fileData[0],
                            passport: fileData[1],
                            competenceCertificate: fileData[3],
                            idCardLink: fileData[2]
                        };
                        const payload = {
                            uri: getNameRegIdSelector === '' ? 'job/job/create-business-name-reg' :'business-name-registration-partner',
                            body: getNameRegIdSelector === '' ? 
                            { businessNameRegDetails: {
                                firstNameSuggestion,
                                secondNameSuggestion,
                                businessAddress,
                                email,
                                phoneNumber,
                                userId,
                                partners : [savePartnerObjInsideArray]
                                }
                            }
                            :savePartnerObj
                        };

                        await postAxiosRequestWithHeader(payload)
                            .then((response) => {
                                const { data, success, message, code } = response.data;
                                console.log('response', data);

                                if (success && code === 201) {

                                 body.className = "reset-Cursor";
                                    saveButton.disabled = false;
                                    divForm.className = "saveForm w-full my-4 rounded-md border border-[#CBCBCB] shadow-lg bg-white h-auto p-4";
                                    setPartnerId(getNameRegIdSelector !== "" 
                                    ?  data.id 
                                    : data?.businessNameRegistration?.registeredPartnersForThsBusiness[0]?.id);

                                    isRequestSuccessful((prev) => [...prev, index]);
                                }
                                if(getNameRegIdSelector === '')
                                dispatch(setBusinessNameRegId(data?.businessNameRegistrationId));
                            }).catch((ex: AxiosError) => {
                                //isRequestSuccessful(false);
                                 saveButton.disabled = false;
                                if (!ex?.response?.data) {
                                    alert(ex.message);
                                    return;
                                }
                                if (ex?.response?.data) {
                                    const { data: { success, message, code } } = ex.response as any;
                                    if (!success && code !== 200) {
                                        setAxiosResponse({ ...axiosResponse, msg: message, isError: true });
                                        setTimeout(() => {
                                            setAxiosResponse({ ...axiosResponse, msg: "", isError: false });
                                        }, 4000);
                                    }

                                }
                            });

                    }
            } catch (error : any) {
                saveButton.disabled = false;
                body.className = "reset-Cursor";
                alert(error?.message);
            }
        }

    }

   
    const onSubmitIndividualHandler = async (data: any) => {
        console.log('data', data);
        // console.log('businessName REG', getNameRegObjectSelector);
        const { firstNameSuggestion,
                secondNameSuggestion, 
                businessAddress, 
                email, 
                phoneNumber, 
                userId } 
        = getNameRegObjectSelector;

        let partners : any[] = [];
        let tempArray: any[] = [];
        tempArray = [...data.values];

        console.log('tempArray ', tempArray);

        if (typeof tempArray !== 'undefined' && tempArray.length !== 0) {
            const files: any[] = [];
            tempArray.map((value: any) => {
                files.push(value.passport[0]);
                files.push(value.meansOfId[0]);
                files.push(value.signature[0]);
                files.push(value.certificate[0]);
            });

            console.log('files ',files);
            return;
            if (typeof files !== 'undefined' && files.length !== 0) {
                const filePayload = new FormData();
                for (const file of files) {
                    //console.log(file);
                    filePayload.append("files[]", file);
                }

                try {
                    console.log('filePayload ', filePayload);
                    const fileResponse = await multipleFilePostRequest('upload-files', filePayload);
                    //console.log(fileResponse.data);
                        const {success, code, data: fileData} = fileResponse.data;
                        console.log('file data', fileData);
                        if (success && code === 200) {

                        //this loop helps to calculate the exact place to place each file link in the db table
                        tempArray.map((val: any) => {
                            for (let i = 0; i < fileData.length; i++) {
                                if (i === 0) {
                                    val.passport = fileData[i];
                                    val.meansOfId = fileData[i+=1];
                                    val.signature = fileData[i+=1];
                                    val.certificate = fileData[i+=1];

                                } else if (i % 3 === 0 && i !== 0) {
                                    val.passport = fileData[i];
                                    if (i < fileData.length) {
                                        val.meansOfId = fileData[i+=1];
                                        val.signature = fileData[i+=1];
                                        val.certificate = fileData[i+=1]
                                    }
                                }
                            }
                        });
                        
                        for(let i = 0; i < tempArray.length; i++){
                            const obj = {
                                firstName: tempArray[i].firstName,
                                lastName: tempArray[i].lastName,
                                otherName: tempArray[i].otherName,
                                address: tempArray[i].residentialAddress,
                                lgaId: '3a7e7bd2-6f7c-4945-adf3-89a1d564db08',//tempArray[i].lga,
                                city: tempArray[i].city,
                                dateOfBirth: new Date(`${tempArray[i].year}/${tempArray[i].month}/${tempArray[i].day} GMT`),
                                occupation: tempArray[i].occupation,
                                nationality: tempArray[i].nationality,
                                email: tempArray[i].email,
                                phoneNumber: tempArray[i].telephoneNumber,
                                type: "INDIVIDUAL",
                                signature: tempArray[i].signature,
                                passport: tempArray[i].passport,
                                competenceCertificate:'https://lh3.googleusercontent.com/p/AF1QipM4-WVvM0GWzsKYqxPpQcNiEs5KfBi7qaNhFIaH=s680-w680-h510', //tempArray[i].certificate,
                                idCardLink: tempArray[i].meansOfId
                            };

                            partners.push(obj);
                        }
                        console.log(partners);
                        //return;
                        const value = {
                            uri: 'job/job/create-business-name-reg',
                            body: {
                                businessNameRegDetails: {
                                    firstNameSuggestion,
                                    secondNameSuggestion,
                                    businessAddress,
                                    email,
                                    phoneNumber,
                                    userId,
                                    partners
                                }
                            }
                        };

                        await postAxiosRequestWithHeaderForBusinessReg(value)
                        .then((response) => {
                            console.log('axios response ', response.data);

                            const {data:{data, success, code, message}} = response;
                            if(code === 201 && success){
                                //alert user Login was successful
                                setAxiosResponse({ ...axiosResponse, msg: message, isError: false });

                                setTimeout(() => {
                                    setAxiosResponse({ ...axiosResponse, msg: "", isError: false });
                                }, 5000);

                                //go to a new page
                            }
                        }).catch((error : AxiosError) => {
                            if(error.isAxiosError){

                                if (error?.response?.data) {
                                    if (!error?.response?.data) {
                                        alert(error.message);
                                        return;
                                    }

                                    const { data: { success, message, code } } = error.response as any;
                                    if (!success && code !== 200) {
                                        setAxiosResponse({ ...axiosResponse, msg: message, isError: true });
                                        setTimeout(() => {
                                            setAxiosResponse({ ...axiosResponse, msg: "", isError: false });
                                        }, 5000);
                                    }
                                }else{
                                    alert(error?.message);
                                }
                            }
                        });
                    }

                } catch (error : any) {
                    alert(error?.message);
                }
            }


        }
    }

    React.useEffect(() => {
        // const subscription = watch((value, { name, type }) => console.log(value, name, type));
        // return () => subscription.unsubscribe();
    }, [watchAllInputFields, isSubmitSuccessful,triggerUseEffect]);

    return (
        <div className="w-full lg:w-10/12">
            {axiosResponse.msg !== '' && <Snackbar
                anchorOrigin={{ vertical : 'top', horizontal : 'right'}}
                open={axiosResponse.isError}
                onClose={handleClose}
                //message={axiosResponse.msg}
                key={vertical + horizontal}>
                     <SnackbarContent style={{
                        backgroundColor:'#6157A0',
                        color : '#fff'
                        }}
                        message={<span id="client-snackbar">{axiosResponse.msg}</span>}
                    />
                </Snackbar>
            }
            <form className='my-8' onSubmit={handleSubmit(onSubmitIndividualHandler)}>
                <p className='text-[#6157A0] text-xl font-bold py-4'>Particulars</p>
                {fields && fields.map((data: any, index: number) =>
                    <div
                        key={index}
                        id={`form-div${index}`}
                        className="w-full my-4 rounded-md border border-[#CBCBCB] shadow-lg bg-white h-auto p-4">
                        <p className="text-xl font-bold py-4">Individual&nbsp;Business&nbsp;Owner</p>
                        {/* names */}
                        <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>First&nbsp;Name</p>
                                <input
                                    type="text"
                                    className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                                    id={`input-${index}`}
                                    {...register(`values.${index}.firstName`, { required: true })}
                                />
                            </div>

                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>Last&nbsp;Name</p>
                                <input
                                    type="text"
                                    className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                                    id={`input-${index}`}
                                    {...register(`values.${index}.lastName`, { required: true })}
                                />
                            </div>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>Other&nbsp;Name</p>
                                <input
                                    type="text"
                                    className='py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full'
                                    id={`input-${index}`}
                                    {...register(`values.${index}.otherName`, { required: false })}
                                />
                            </div>
                        </div>
                        {/* residential address */}
                        <div className='flex flex-col w-full text-xs text-black my-4'>
                            <p className='font-bold'>Residential&nbsp;Address</p>
                            <input
                                type="text"
                                className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'
                                id={`input-${index}`}
                                {...register(`values.${index}.residentialAddress`, { required: true })}
                            />
                        </div>

                        {/* location details*/}
                        <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>State</p>
                                <select
                                    //name="state" 
                                    className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'
                                    id={`select-${index}`}
                                    // onChange={(e) => onChangeTextHandler(e, index)}
                                    {...register(`values.${index}.state`, {
                                        required: true,
                                        //onChange : (e) => dispatch(setStateIdData(e.target.value))
                                    })}
                                >
                                    <option value="state">Select State</option>
                                    {stateSelector && stateSelector?.map((state: any, i: number) =>
                                        <option value={state.id} key={i}
                                            onClick={() => dispatch(addLgaData(state.lgasForThisState))}>
                                            {state.name}
                                        </option>
                                    )}
                                </select>
                            </div>

                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>LGA</p>
                                <select
                                    //name="lga" 
                                    className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'
                                    id={`select-${index}`}
                                    //onChange={(e) => console.log(e.target.value)}
                                    {...register(`values.${index}.lga`, { required: true })}
                                >
                                    <option value="LGA">Select LGA</option>
                                    {lgaSelector && lgaSelector?.map((lga: any, i: number) =>
                                        <option value={lga.id} key={i}>
                                            {lga.name}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>City</p>
                                <input
                                    type="text"
                                    id={`input-${index}`}
                                    //name='city'
                                    className='py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full'
                                    //onChange={(e) => onChangeTextHandler(e, index)}
                                    {...register(`values.${index}.city`, { required: true })}
                                />
                            </div>
                        </div>
                        {/* occupation and nationality */}
                        <div className='w-full md:w-[66%] flex flex-col md:flex-row gap-4 text-xs text-black my-4'>
                            <div className='flex flex-col md:w-1/2 w-full'>
                                <p className='font-bold'>Occupation</p>
                                <input
                                    type={"text"}
                                    id={`input-${index}`}
                                    className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                                    // name="occupation"
                                    // onChange={(e) => onChangeTextHandler(e, index)}
                                    {...register(`values.${index}.occupation`, { required: true })}
                                />
                            </div>
                            <div className='flex flex-col md:w-1/2 w-full'>
                                <p className='font-bold'>Nationality</p>
                                <input
                                    type="text"
                                    id={`input-${index}`}
                                    className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'
                                    // name='nationality'
                                    // onChange={(e) => onChangeTextHandler(e, index)}
                                    {...register(`values.${index}.nationality`, { required: true })}
                                />
                            </div>
                        </div>
                        {/* Email, telephone and date of birth */}
                        <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black mb-4'>

                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>Date&nbsp;Of&nbsp;Birth</p>
                                <div className='w-full flex flex-row items-center gap-2 text-[#303030]'>
                                    <select
                                        //name="day"
                                        id={`select-${index}`}
                                        className='w-1/3 border border-[#CBCBCB] py-2 px-3 rounded-md'
                                        {...register(`values.${index}.day`, { required: true })}
                                    >
                                        <option value="day">Day</option>
                                        {DaysArray.map((day: number, i: number) =>
                                            <option value={day} key={i}>{day < 10 ? `0${day}` : day}</option>
                                        )}
                                    </select>
                                    <select
                                        //name="month"
                                        id={`se;ect-${index}`}
                                        className='w-1/3 border border-[#CBCBCB] py-2 px-3 rounded-md'
                                        {...register(`values.${index}.month`, { required: true })}
                                    >
                                        <option value="month">Month</option>
                                        {MonthsArray.map((month: string, i: number) =>
                                            <option value={month} key={i}>{month}</option>
                                        )}
                                    </select>
                                    <select
                                        //name="year" 
                                        id={`select-${index}`}
                                        className='w-1/3 border border-[#CBCBCB] py-2 px-3 rounded-md'
                                        {...register(`values.${index}.year`, { required: true })}
                                    >
                                        <option value="year">Year</option>
                                        {Years.map((year: number, i: number) =>
                                            <option value={year} key={i}>{year}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>E-mail&nbsp;Address</p>
                                <input
                                    type={"email"}
                                    id={`input-${index}`}
                                    className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                                    // name='email'
                                    // onChange={(e) => onChangeTextHandler(e, index)}
                                    {...register(`values.${index}.email`, {
                                        required: true,
                                        validate: () => validateEmail(getValues(`values.${index}.email`))
                                    })}
                                />
                            </div>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>Telephone&nbsp;Number</p>
                                <input
                                    type={"text"}
                                    id={`input-${index}`}
                                    className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'
                                    maxLength={11}
                                    // name='telephoneNumber' 
                                    // onChange={(e) => onChangeTextHandler(e, index)}
                                    {...register(`values.${index}.telephoneNumber`, { required: true, maxLength: 11 })}
                                />
                            </div>
                        </div>
                        {/* files */}
                        <div
                            className="flex flex-col gap-1 w-full my-4">
                            <div className="flex justify-between gap-2 items-center py-2 px-4 bg-[#DFDDEC] text-xs text-black font-semibold rounded">
                                <p>Signature:</p>
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    className='hidden'
                                    id={`signature-${index}`}
                                    {...register(`values.${index}.signature`, {
                                        required: true, 
                                    }
                                    )}
                                />
                                <div className='text-black'>{getValues(`values.${index}.signature`)[0]?.name}</div>

                                {!getValues(`values.${index}.signature`)[0]?.name ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`signature-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => emptyFileInputField(`signature-${index}`, index)}>
                                        <object data="/delete.png" className='w-4 h-4 object-contain' />
                                        <p>Delete</p>
                                    </div>
                                }
                            </div>
                            <div className="flex justify-between gap-2 items-center py-2 px-4 bg-[#FFFAFA] text-xs text-black font-semibold rounded">
                                <input
                                    type="file" accept=".jpg,.jpeg,.png"
                                    className='hidden'
                                    id={`passport-${index}`} 
                                    {...register(`values.${index}.passport`, { 
                                        required: true
                                    })} />

                                <p>Photograph&nbsp;Photograph:</p>

                                <div className='text-black'>{getValues(`values.${index}.passport`)[0]?.name}</div>
                                {!getValues(`values.${index}.passport`)[0]?.name ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`passport-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => emptyFileInputField(`passport-${index}`, index)}>
                                        <object data="/delete.png" className='w-4 h-4 object-contain' />
                                        <p>Delete</p>
                                    </div>
                                }
                            </div>
                            <div className="flex justify-between gap-2 items-center py-2 px-4 bg-[#DFDDEC] text-xs text-black font-semibold rounded">
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    className='hidden'
                                    id={`meansOfId-${index}`}
                                    {...register(`values.${index}.meansOfId`, { 
                                        required: true
                                    })}
                                />
                                <p>Means&nbsp;Of&nbsp;Identification:</p>
                                <div className='text-black'>{getValues(`values.${index}.meansOfId`)[0]?.name}</div>
                                {!getValues(`values.${index}.meansOfId`)[0]?.name ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`meansOfId-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => emptyFileInputField(`meansOfId-${index}`, index)}>
                                        <object data="/delete.png" className='w-4 h-4 object-contain' />
                                        <p>Delete</p>
                                    </div>
                                }
                            </div>

                            <div className="flex justify-between gap-2 
                            items-center py-2 px-4 bg-[#FFFAFA] 
                            text-xs text-black 
                            font-semibold rounded">
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    className='hidden'
                                    id={`certificate-${index}`}
                                    {...register(`values.${index}.certificate`, { 
                                        required: true
                                    })}
                                />
                                <p>Certificate&nbsp;Of&nbsp;Competence:</p>

                                <div className='text-black'>{getValues(`values.${index}.certificate`)[0]?.name}</div>
                                {!getValues(`values.${index}.certificate`)[0]?.name ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`certificate-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => emptyFileInputField(`certificate-${index}`, index)}>
                                        <object data="/delete.png" className='w-4 h-4 object-contain' />
                                        <p>Delete</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='flex justify-end text-white'>
                            {!getSavedForm(index).includes(index) ?
                                <button
                                    id={`save-${index}-button`}
                                    // disabled={saveState ? true : false}
                                    className='bg-[#2B85F0] rounded-md outline-none 
                                    px-4 py-2 text-xs flex flex-row 
                                    items-center font-semibold gap-1
                                    disabled:bg-[#EFF0F6] 
                                    disabled:shadow-none 
                                    disabled:text-gray-500 disabled:cursor-default'
                                    onClick={() => {
                                        setTrigger(!triggerUseEffect);
                                        onSaveHandler(data, index)
                                    }}>
                                    {/* {isButtonFormDisabled(index) ? <CircularProgress size={'1rem'} sx={{ color: 'rgb(203 213 225)' }} /> :<SaveOutlinedIcon sx={{ fontSize: '15px' }} />} */}
                                    <SaveOutlinedIcon sx={{ fontSize: '15px' }} />
                                    <p>Save</p>
                                </button>
                                :
                                <div className='flex flex-row items-center gap-4'>
                                    <button
                                        id={`save-${index}-button`}
                                        // disabled={saveState ? true : false}
                                        className='bg-[#56134B] rounded-md 
                                        text-white outline-none 
                                        px-4 py-2 text-xs flex flex-row 
                                        items-center font-semibold gap-1
                                        disabled:bg-[#EFF0F6] 
                                        disabled:shadow-none 
                                        disabled:text-gray-500 disabled:cursor-default'
                                    //onClick={() => onSaveHandler(data, index)}
                                    >
                                        <object data="/delete.svg" className='w-4 h-4  object-contain' />
                                        Edit
                                    </button>
                                    <button
                                        id={`save-${index}-button`}
                                        // disabled={saveState ? true : false}
                                        className='bg-[#FF2D2D] rounded-md
                                        text-white outline-none 
                                        px-4 py-2 text-xs flex flex-row 
                                        items-center font-semibold gap-1
                                        disabled:bg-[#EFF0F6] 
                                        disabled:shadow-none 
                                        disabled:text-gray-500 disabled:cursor-default'
                                            //onClick={() => onSaveHandler(data, index)}
                                    >
                                        <object
                                            data="/edit.svg"
                                            type="image/svg+xml"
                                            className='w-4 h-4 .svg object-contain'
                                        />
                                        Delete
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                )}

                {/* <CooperateFormsComponent  
                array={fieldsArray}
                register={registerCooperateFormValues}
                watch={watchForm}
                setValue={setCooperateFormValue}
                getValues={getValuesFromCooperate}
                /> */}

                <section className='w-full grid md:grid-cols-2 gap-2 my-8'>
                    <div className='text-sm flex flex-col md:flex-row items-center gap-2 w-auto'>
                        <button
                            disabled={isValidBusinessForm ? false : true}
                            onClick={() => {
                                setExtras({ ...extras, isCooperateForm: false });
                                addFormOnClickHandler();
                            }}
                            className='w-full md:w-fit text-white 
                            flex justify-center gap-1 md:justify-around 
                            font-semibold mb-4 bg-[#6157A0] rounded-lg 
                            outline-none px-4 py-2
                            disabled:bg-[#EFF0F6] 
                            disabled:shadow-none 
                            disabled:text-gray-500 disabled:cursor-default'>
                            <ControlPointRoundedIcon sx={{ fontSize: '18px' }} />
                            Add&nbsp;Individual&nbsp;Business&nbsp;Owner
                        </button>
                        <button
                            onClick={() => {
                                addCooperateForm();
                            }}
                            disabled={isValidBusinessForm ? false : true}
                            className='w-full md:w-fit text-[#6157A0] 
                            flex justify-center gap-1 md:justify-around 
                            font-semibold rounded-lg px-4 py-2 mb-4 
                            bg-white border border-[#6157A0] 
                            outline-none
                            disabled:bg-[#EFF0F6] 
                            disabled:shadow-none 
                            disabled:text-gray-500 disabled:cursor-default'>

                            <ControlPointRoundedIcon sx={{ fontSize: '18px' }} />
                            Add&nbsp;Cooperate&nbsp;Business&nbsp;Owner
                        </button>
                    </div>
                    {/* || fieldsArray.length > 0   || isCooperateFormValid || !isSubmitting ? false : true*/}
                    {fields.length > 0 &&
                        <button
                            disabled={isValid ? false : true}
                            className='md:w-fit w-full text-center bg-[#16C807] justify-self-end
                            rounded-md outline-none px-4 h-fit py-2.5 text-xs text-white font-semibold gap-1
                            disabled:bg-[#EFF0F6] 
                            disabled:shadow-none 
                            disabled:text-gray-500 disabled:cursor-default'>
                            Submit
                        </button>
                    }

                </section>
            </form>
            {isSubmitting && <ComponentLoader/>}
        </div>
    );
}