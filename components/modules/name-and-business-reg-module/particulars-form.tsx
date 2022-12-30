import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React from 'react';
import { Snackbar, SnackbarContent } from '@mui/material';
import { ErrorInterfaceObj } from '../../../utils/constants';
import { cooperateFormObj, DaysArray, MonthsArray, Years } from '../../../utils/collections';
import { CooperateFormsComponent } from './cooperate-forms';
import { useFieldArray, useForm } from 'react-hook-form';
import { validateEmail } from '../../../utils/util-functions';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { addLgaData, setBusinessNameRegId, setCooperateFieldArrayLength, setIndividualFieldArrayLength, setStateIdData } from '../../../redux/slices/app-slice';
import { createBusinessNameRegJob, deleteAxiosRequest, patchAxiosRequestWithHeader, postAxiosRequestWithHeader, postAxiosRequestWithHeaderForBusinessReg, uploadFiles } from '../../../utils/axios-requests';
import { AxiosError } from 'axios';
import { initialErrorObj } from '../login-module/login-form';
import { ComponentLoader } from '../componentLoader';
import { BusinessNameRegJobType, CreateBusinessNameRegPartnerType, JobResponseType } from '../../../utils/types.utils';

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
    const [fileNames, setFileNames] = React.useState([filesObj]);
    const [requestStatus, isRequestSuccessful] = React.useState<any[]>([]);

    const [state, setState] = React.useState<any>({
        open: true,
        vertical: 'top',
        horizontal: 'right',
    });
    const [isSaving, save] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);

    const [isDeleting, setDeleteState] = React.useState<boolean>(false);

    const [savedPartnerId, setPartnerId] =  React.useState<any[]>([]);

    const { vertical, horizontal, open } = state;
    const stateSelector = useSelector((state: any) => state.store.state);

    const lgaSelector = useSelector((state: any) => state.store.lga);
    const getNameRegObjectSelector = useSelector((state: any) => state.store.businessNameRegistration);
    const getNameRegIdSelector = useSelector((state: any) => state.store.businessNameRegistrationId);
    const isValidBusinessForm = useSelector((state : any) => state.store.nameRegFormIsValid);

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
    });
    const watchAllInputFields = watch();
    const { fields, append } = useFieldArray<any>({
        control,
        name: "values",
    });
    const { fields: fieldsArray, append: appendToCooperate } = useFieldArray<any>({
        control,
        name: "cooperate"
    });

    console.log({savedPartnerId});

    const getSavedForm = (index : number) => {
        //get index of saved partners
        return requestStatus.filter((i:number) => index === i);
    }

    const uploadPartnerAttachment = async (fileList: FileList, key: string): Promise<string[]> => {
        //const saveButton = document.getElementById(`save-${index}-button`) as HTMLButtonElement;
        try {
            //if(saveButton) saveButton.disabled = true;
            const file = fileList.item(0);
            if (file) {
                const uploadedFileResponse = await uploadFiles([file]);
                if (uploadedFileResponse?.success) {
                    const [uploadedFile] = uploadedFileResponse.data;
                    setValue(key, uploadedFile);
                }
                return uploadedFileResponse.data ?? [];
            }
            throw new Error('File was not found')
        }
        catch (ex : any) {
            setAxiosResponse({...axiosResponse, msg : ex.message, isError : true});
            setTimeout(() => {
                setAxiosResponse({...axiosResponse, msg : '', isError : false});
            },4000);
            throw ex;
        }
    }
    
    const addCooperateForm = async () => {
        const form = document.getElementById('form-id') as HTMLFormElement;
        const fieldset = document.getElementById('fieldset') as HTMLFieldSetElement;

        if(getNameRegIdSelector !== ''){
            appendToCooperate(cooperateFormObj);
            dispatch(setCooperateFieldArrayLength(fieldsArray.length));
            return;
        }
        await createBusinessNameRegJob({
            businessNameRegDetails: { ...getNameRegObjectSelector }
        }).then((res) => {
            const {data : {data, success, code}} = res;
            if(success && data?.businessNameRegistrationId){
                appendToCooperate(cooperateFormObj);
                dispatch(setCooperateFieldArrayLength(fieldsArray.length));
                dispatch(setBusinessNameRegId(data.businessNameRegistrationId));
                form.className = "saveForm my-8";
                fieldset.disabled = true;
            }
        })
        .catch((err : AxiosError) => {
            if(err.isAxiosError){
                if(!err?.response?.data){
                    alert(err?.message);   
                    return; 
                }
                const { data : {message} } = err?.response as any;
                setAxiosResponse({...axiosResponse, msg : message, isError : true});

                setTimeout(() => {
                    setAxiosResponse({...axiosResponse, msg : '', isError :false});
                },6000);
            }
        });
    }

    const addFormOnClickHandler = async () => {
        if(getNameRegIdSelector !== ''){
            append(partnersObj);
            dispatch(setIndividualFieldArrayLength(fields.length));
            return;
        }
        dispatch(setIndividualFieldArrayLength(fields.length));
        await createBusinessNameRegJob({
            businessNameRegDetails: { ...getNameRegObjectSelector }
        }).then((res) => {
            const {data : {data, success, code}} = res;
            if(success && data?.businessNameRegistrationId){
                append(partnersObj);
                dispatch(setBusinessNameRegId( data.businessNameRegistrationId))
            }
        })
        .catch((err : AxiosError) => {
            if(err.isAxiosError){
                if(!err?.response?.data){
                    alert(err?.message);   
                    return; 
                }
                const { data : {message} } = err?.response as any;
                setAxiosResponse({...axiosResponse, msg : message, isError : true});

                setTimeout(() => {
                    setAxiosResponse({...axiosResponse, msg : '', isError :false});
                },6000);
            }
        });
        
        //console.log({getNameRegIdSelector});
    }
    
    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const emptyFileInputField = (elementId: string, index: number) => {
        setValue(`${elementId}`, '');
        document.getElementById(elementId)?.click();
    }

    const onSaveHandler = async (index: number) => {

        const saveButton = document.getElementById(`save-${index}-button`) as HTMLButtonElement;
        const divForm = document.getElementById(`form-div${index}`) as HTMLDivElement;
        if(!saveButton){
            return;
        }
        save(true);
        const savePartnerObj: Partial<CreateBusinessNameRegPartnerType> = {
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
            signature: getValues(`values.${index}.signature`),
            passport: getValues(`values.${index}.passport`),
            competenceCertificate: getValues(`values.${index}.certificate`),
            idCardLink: getValues(`values.${index}.meansOfId`),
            businessNameRegistrationId: getNameRegIdSelector
        };
        console.log({savePartnerObj})
        const response = await postAxiosRequestWithHeader({
            uri: 'business-name-registration-partner',
            body: savePartnerObj,
        }).then((res) => {
            const { data, success, message, code } = res.data;
            console.log('response', data);
            save(false);
            if (success && code === 201) {
                saveButton.disabled = false;
                divForm.className = "saveForm w-full my-4 rounded-md border border-[#CBCBCB] shadow-lg bg-white h-auto p-4";

                //console.log({key : data?.businessNameRegistration?.registeredPartnersForThsBusiness?.pop()?.id});
                setPartnerId(
                    (prev) => [...prev, data.id]
                );

                isRequestSuccessful((prev) => [...prev, index]);
            }
            

        })
        .catch((err : AxiosError) => {
            save(false);
            if(err.isAxiosError){
                saveButton.disabled = false;
                if (!err?.response?.data) {
                    alert(err.message);
                    return;
                }
                if (err?.response?.data) {
                    const { data: { success, message, code } } = err.response as any;
                    if (!success && code !== 200) {
                        setAxiosResponse({ ...axiosResponse, msg: message, isError: true });
                        setTimeout(() => {
                            setAxiosResponse({ ...axiosResponse, msg: "", isError: false });
                        }, 4000);
                    }
                }
            }
        });
    }
    const onClickEditButtonHandler = async(index : number) =>{
        setEdit(true);
        const divForm = document.getElementById(`form-div${index}`) as HTMLDivElement;
        divForm.classList.remove("saveForm");
    }
    const onEditPartnerHandler = async(index : number) => {
        const divForm = document.getElementById(`form-div${index}`) as HTMLDivElement;
        

        const savePartnerObj: Partial<CreateBusinessNameRegPartnerType> = {
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
            signature: getValues(`values.${index}.signature`),
            passport: getValues(`values.${index}.passport`),
            competenceCertificate: getValues(`values.${index}.certificate`),
            idCardLink: getValues(`values.${index}.meansOfId`),
            businessNamePartnerId : savedPartnerId.at(index)
        };

        save(true);
        await patchAxiosRequestWithHeader({
            uri: 'business-name-registration-partner',
            body: savePartnerObj,
        }).then((res) => {
            const { data, success, message, code } = res.data;
            console.log('response', data);
            save(false);
            setEdit(false);
            if (success && code === 200) {
                divForm.className = "saveForm w-full my-4 rounded-md border border-[#CBCBCB] shadow-lg bg-white h-auto p-4";
                //isRequestSuccessful((prev) => [...prev, index]);
            }
            

        })
        .catch((err : AxiosError) => {
            save(false);
            setEdit(false);
            if(err.isAxiosError){
                if (!err?.response?.data) {
                    alert(err.message);
                    return;
                }
                if (err?.response?.data) {
                    const { data: { success, message, code } } = err.response as any;
                    if (!success && code !== 200) {
                        setAxiosResponse({ ...axiosResponse, msg: message, isError: true });
                        setTimeout(() => {
                            setAxiosResponse({ ...axiosResponse, msg: "", isError: false });
                        }, 4000);
                    }
                }
            }
        });
    }
    const onDeletePartnerHandler = async (index : number) => {
        const divForm = document.getElementById(`form-div${index}`) as HTMLDivElement;
        setDeleteState(true);
        const requestObj = {
            uri : 'business-name-registration-partner',
            body : [savedPartnerId.at(index)]
        } 
        await deleteAxiosRequest(requestObj)
        .then((res) => {
            const { data, success, message, code } = res.data;
            console.log('response', data);
            setDeleteState(false);
            if (success && code === 200) {
                divForm.style.display = 'none';
            }
        }).catch((err) => {
            setDeleteState(false);
            if(err.isAxiosError){
                if (!err?.response?.data) {
                    alert(err.message);
                    return;
                }
                if (err?.response?.data) {
                    const { data: { success, message, code } } = err.response as any;
                    if (!success && code !== 200) {
                        setAxiosResponse({ ...axiosResponse, msg: message, isError: true });
                        setTimeout(() => {
                            setAxiosResponse({ ...axiosResponse, msg: "", isError: false });
                        }, 4000);
                    }
                }
            }
        });

    }
    const onChangeFileNamesHandler = (keyName:string, index: number, value : string) => {
    //const { name, size, type } = file;
    const newSignatureFile = fileNames.map((attachment: any, i: number) => index === i
        ? Object.assign(attachment, { [keyName]: value })
        : attachment);

        console.log({newSignatureFile});
    setFileNames(newSignatureFile);
}
   
    const onSubmitIndividualHandler = async (data: any) => {
        console.log('data', data);
        // setTimeout(() => {
        //     setAxiosResponse({...axiosResponse, msg : '', isError : false})
        // },60000)
    }

    React.useEffect(() => {
        // const subscription = watch((value, { name, type }) => console.log(value, name, type));
        // return () => subscription.unsubscribe();
    }, [
        watchAllInputFields,
        watch, 
        isSubmitSuccessful,
        isValidBusinessForm,]);

    return (
        <div className="w-full lg:w-10/12">
            {axiosResponse.msg !== '' && <Snackbar
                anchorOrigin={{ vertical : 'top', horizontal : 'right'}}
                open={open}
                onClose={handleClose}
                //message={axiosResponse.msg}
                key={vertical + horizontal}>
                     <SnackbarContent style={{
                        backgroundColor: axiosResponse.isError ? '#FF2D2D' :'#6157A0',
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
                                    className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'
                                    id={`select-${index}`}
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
                                    <option value="LGA">Vandekya</option>
                                    <option value="LGA">Bende</option>
                                    {/* {lgaSelector && lgaSelector?.map((lga: any, i: number) =>
                                        <option value={lga.id} key={i}>
                                            {lga.name}
                                        </option>
                                    )} */}
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
                                        onChange: async (e) => {
                                            const key = `values.${index}.signature`;

                                            await uploadPartnerAttachment((getValues(key) as FileList), key);
                                        }
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
                                        required: true,
                                        onChange: async (e) => {
                                            const key = `values.${index}.passport`;
                                            onChangeFileNamesHandler('passport',index, getValues(key)[0]?.name);
                                            await uploadPartnerAttachment((getValues(key) as FileList), key);
                                        }
                                    })} />

                                <p>Photograph&nbsp;Photograph:</p>

                                <div className='text-black'>{fileNames.at(index)?.passport}</div>
                                {!fileNames.at(index)?.passport ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`passport-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => onChangeFileNamesHandler('passport',index, '')}>
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
                                        required: true,
                                        onChange: async (e) => {
                                            const key = `values.${index}.meansOfId`;
                                            await uploadPartnerAttachment((getValues(key) as FileList), key);
                                        }
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
                                        required: true,
                                        onChange: async (e) => {
                                            const key = `values.${index}.certificate`;
                                            await uploadPartnerAttachment((getValues(key) as FileList), key);
                                        }
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
                                    className='bg-[#2B85F0] rounded-md outline-none 
                                    px-4 py-2 text-xs flex flex-row 
                                    items-center font-semibold gap-1
                                    disabled:bg-[#EFF0F6] 
                                    disabled:shadow-none 
                                    disabled:text-gray-500 disabled:cursor-default'
                                    onClick={() => onSaveHandler(index)}>
                                    <SaveOutlinedIcon sx={{ fontSize: '15px' }} />
                                    <p>Save</p>
                                </button>
                                :
                                <div className='flex flex-row items-center gap-4'>
                                    <button
                                        className='bg-[#56134B] rounded-md 
                                        text-white outline-none 
                                        px-4 py-2 text-xs flex flex-row 
                                        items-center font-semibold gap-1
                                        disabled:bg-[#EFF0F6] 
                                        disabled:shadow-none 
                                        disabled:text-gray-500 disabled:cursor-default'
                                        onClick={() => isEdit ? onEditPartnerHandler(index) : onClickEditButtonHandler(index)}
                                    >
                                        <object data="/delete.svg" className='w-4 h-4  object-contain' />
                                        {isEdit ? "Save Changes" : "Edit"}
                                    </button>
                                    <button
                                        className='bg-[#FF2D2D] rounded-md
                                        text-white outline-none 
                                        px-4 py-2 text-xs flex flex-row 
                                        items-center font-semibold gap-1
                                        disabled:bg-[#EFF0F6] 
                                        disabled:shadow-none 
                                        disabled:text-gray-500 disabled:cursor-default'
                                        onClick={() => onDeletePartnerHandler(index)}
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

                <CooperateFormsComponent  
                array={fieldsArray}
                register={register}
                watch={watch}
                setValue={setValue}
                getValues={getValues}
                />

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
            {isSaving && <ComponentLoader/>}
            {isDeleting && <ComponentLoader/>}
        </div>
    );
}