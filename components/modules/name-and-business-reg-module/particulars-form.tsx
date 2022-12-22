import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';
import { InputLabel } from '@mui/material';
import { BusinessRegParticularsInterface, CooperateRegParticularsInterface } from '../../../utils/constants';
import { businessRegObjInstance, cooperateFormObj, DaysArray, MonthsArray, Years } from '../../../utils/collections';
import { FormParticularsFileUpload } from '../../shared-components/form-particulars-file-upload';
import { CooperateFormsComponent } from './cooperate-forms';
import { useFieldArray, useForm } from 'react-hook-form';
import { validateEmail } from '../../../utils/util-functions';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { addLgaData, setStateIdData } from '../../../redux/slices/app-slice';

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


export const BusinessRegistrationParticularsForm = (): JSX.Element => {
    const [extras, setExtras] = React.useState({
        isCooperateForm: false,
        index: 0
    });
    const [forms, setNumberOfForms] = React.useState([{
        signature: "",
        passport: "",
        meansOfId: "",
        certificate: ""
    }]);

    const stateSelector = useSelector((state: any) => state.store.state);

    const lgaSelector = useSelector((state: any) => state.store.lga);

    const dispatch : Dispatch<AnyAction>  = useDispatch();

    const {
        register,
        formState: { isValid },
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
    }

    const addFormOnClickHandler = () => {
        append(partnersObj);
    }

    const onChangeTextHandler = (e: any, index: number) => {
        const { target: { value } } = e;

        //const { name, size, type } = file;
        const newSignatureFile = forms.map((attachment: any, i: number) => index === i
            ? Object.assign(attachment, { [e.target.name]: value })
            : attachment);

        setNumberOfForms(newSignatureFile);
    }

    const onChangeFileHandler = (e: any, index: number, elementId: string) => {
        const { target: { files } } = e;

        const fieldName: string[] = elementId.split('-');
        const file = files[0];
        if (file) {
            //console.log('{e,index,elementId}', {file,index,feild : fieldName[0]});
            const { name, size, type } = file;
            const newSignatureFile = forms.map((attachment: any, i: number) => index === i
                ? Object.assign(attachment, { [fieldName[0]]: name })
                : attachment);

            setNumberOfForms(newSignatureFile);
        }
    }

    const emptyFileInputField = (elementId: string, index: number) => {
        setValue(`${elementId}`, '');

        // const fieldName = elementId.split('-');

        // const newSignatureFile = forms.map((attachment: any, i: number) => index === i
        //     ? Object.assign(attachment, { [fieldName[0]]: '' })
        //     : attachment);

        // setNumberOfForms(newSignatureFile);

        document.getElementById(elementId)?.click();
    }


    const onSubmitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    React.useEffect(() => {
        const subscription = watch((value, { name, type }) => console.log(value, name, type));
        return () => subscription.unsubscribe();
    }, [watchAllInputFields]);

    return (
        <div className="w-full lg:w-10/12">
            <form className='my-8' onSubmit={(e) => {
                e.preventDefault();
                handleSubmit((data) => {
                    console.log('data', data);
                });
                submitCooperateFormHandler((data) => {
                    console.log('cooperate data', data);
                })
            }

            }>
                <p className='text-[#6157A0] text-xl font-bold py-4'>Particulars</p>
                {fields && fields.map((data: any, index: number) =>
                    <div
                        key={index}
                        className="w-full my-4 rounded-md border border-[#CBCBCB] shadow-lg bg-white h-auto p-4">
                        <p className="text-xl font-bold py-4">Individual&nbsp;Business&nbsp;Owner</p>
                        {/* names */}
                        <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>First&nbsp;Name</p>
                                <input
                                    type="text"
                                    className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                                    // name="firstName"
                                    // onChange={(e) => onChangeTextHandler(e, index)}
                                    {...register(`values.${index}.firstName`, { required: true })}
                                />
                            </div>

                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>Last&nbsp;Name</p>
                                <input
                                    type="text"
                                    className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                                    // name='lastName'
                                    // onChange={(e) => onChangeTextHandler(e, index)}
                                    {...register(`values.${index}.lastName`, { required: true })}
                                />
                            </div>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>Other&nbsp;Name</p>
                                <input
                                    type="text"
                                    className='py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full'
                                    // name='otherName'
                                    // onChange={(e) => onChangeTextHandler(e, index)}
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
                                // name='residentialAddress'
                                // onChange={(e) => onChangeTextHandler(e, index)}
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
                                    // onChange={(e) => onChangeTextHandler(e, index)}
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
                                        className='w-1/3 border border-[#CBCBCB] py-2 px-3 rounded-md'
                                        {...register(`values.${index}.month`, { required: true })}
                                    >
                                        <option value="month">Month</option>
                                        {MonthsArray.map((month: string, i: number) =>
                                            <option value={month.substring(0, 3)} key={i}>{month}</option>
                                        )}
                                    </select>
                                    <select
                                        //name="year" 
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
                                    accept="images/*"
                                    className='hidden'
                                    id={`signature-${index}`}
                                    // name="signature"
                                    // onChange={(e) => onChangeFileHandler(e, index)}
                                    {...register(`values.${index}.signature`, {
                                        required: true,
                                    })}
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
                                    type="file" accept="images/*"
                                    className='hidden'
                                    id={`passport-${index}`}
                                    // name="passport"
                                    // onChange={(e) => onChangeFileHandler(e, index)} 
                                    {...register(`values.${index}.passport`, { required: true })} />

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
                                    accept="images/*"
                                    className='hidden'
                                    id={`meansOfId-${index}`}
                                    // name="meansOfId"
                                    // onChange={(e) => onChangeFileHandler(e, index)}
                                    {...register(`values.${index}.meansOfId`, { required: true })}
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

                            <div className="flex justify-between gap-2 items-center py-2 px-4 bg-[#FFFAFA] text-xs text-black font-semibold rounded">
                                <input
                                    type="file"
                                    accept="images/*"
                                    className='hidden'
                                    id={`certificate-${index}`}
                                    // name="certificate"
                                    // onChange={(e) => onChangeFileHandler(e, index)}
                                    {...register(`values.${index}.certificate`, { required: true })}
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
                            <button className='bg-[#2B85F0] rounded-md outline-none px-4 py-2 text-xs flex flex-row items-center font-semibold gap-1'>
                                <SaveOutlinedIcon sx={{ fontSize: '15px' }} />
                                <p>Save</p>
                            </button>
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
                            onClick={() => {
                                setExtras({ ...extras, isCooperateForm: false });
                                addFormOnClickHandler();
                            }}
                            className='w-full md:w-fit text-white flex justify-center gap-1 md:justify-around font-semibold mb-4 bg-[#6157A0] rounded-lg outline-none px-4 py-2'>
                            <ControlPointRoundedIcon sx={{ fontSize: '18px' }} />
                            Add&nbsp;Individual&nbsp;Business&nbsp;Owner
                        </button>
                        <button
                            onClick={() => {
                                addCooperateForm();
                            }}
                            className='w-full md:w-fit text-[#6157A0] flex justify-center gap-1 md:justify-around font-semibold rounded-lg px-4 py-2 mb-4 bg-white border border-[#6157A0] outline-none'>
                            <ControlPointRoundedIcon sx={{ fontSize: '18px' }} />
                            Add&nbsp;Cooperate&nbsp;Business&nbsp;Owner
                        </button>
                    </div>
                    {/* || fieldsArray.length > 0   || isCooperateFormValid*/}
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



        </div>
    );
}