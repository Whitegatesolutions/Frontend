import { DaysArray, MonthsArray, Years } from "../../../utils/collections";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
    array : any,
    register : any,
    setValue : any,
    getValues : any,
    watch : any
}

// {
//     array,
    // register,
    // setValue,
    // getValues,
    // watch
// }
export const CooperateFormsComponent:React.FC<Props> = ({
    array, 
    register,
    setValue,
    getValues,
    watch} : any): JSX.Element => {

    // const { 
    //     register,
    //     formState :{isValid},
    //     setError,
    //     setValue, 
    //     getValues, 
    //     handleSubmit ,
    //     watch,
    // } = useForm<any>({
    //     // defaultValues: {}; you can populate the fields by this attribute 
    //    // defaultValues : partnersObj
    // });
    const watchAllFormFields = watch();

    const emptyFileInputField = (elementId : string) => {

        setValue(`${elementId}`,'');

        document.getElementById(elementId)?.click();
    }

    const onSubmitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    React.useEffect(() => {
        const subscription = watch((value : any, { name, type } : any) => console.log(value, name, type));
        return () => subscription.unsubscribe();

    }, [watchAllFormFields]);
    return (
        <>
            {/* <form onSubmit={handleSubmit((data) =>{
                console.log('cooperate', data);
            })}> */}
                {array && array.map((data: any, index: number) =>
                    <div
                        key={index}
                        className="w-full my-4 rounded-md border border-[#CBCBCB] shadow-lg bg-white h-auto p-4">
                        <p className="text-xl font-bold py-4">Cooperate&nbsp;Business&nbsp;Owner</p>
                        {/* names */}
                        <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                            <div className='flex flex-col md:w-4/5 w-full'>
                                <p className='font-bold'>Name&nbsp;Of&nbsp;Company</p>
                                <input 
                                type="text" 
                                className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                                {...register(`cooperate.${index}.companyName`, {required : true})}
                                />
                            </div>

                            <div className='flex flex-col md:w-1/5 w-full'>
                                <p className='font-bold'>RC&nbsp;No</p>
                                <input 
                                type="text" 
                                className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full' 
                                {...register(`cooperate.${index}.rcNumber`, {required : true})}
                                />
                            </div>
                        </div>

                        {/*  */}
                        <div className='flex flex-col w-full text-xs text-black my-4'>
                            <p className='font-bold'>Name&nbsp;Of&nbsp;Director&nbsp;representing&nbsp;company</p>
                            <input 
                            type="text" 
                            className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full' 
                            {...register(`cooperate.${index}.directorName`, {required : true})}
                            />
                        </div>

                         {/* residential address */}
                         <div className='flex flex-col w-full text-xs text-black my-4'>
                            <p className='font-bold'>Residential&nbsp;address</p>
                            <input 
                            type="text" 
                            className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full' 
                            {...register(`cooperate.${index}.residentialAddress`, {required : true})}/>
                        </div>

                        {/* location details*/}
                        <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>State</p>
                                <select 
                                //name="state" 
                                className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'
                                {...register(`cooperate.${index}.state`, {required : true})}>
                                    <option value="state">Select State</option>
                                    {/* {DaysArray.map((day : number, i:number) => 
                                <option value={day} key={i}>{day < 10 ? `0${day}` : day}</option>
                                )} */}
                                </select>
                            </div>

                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>LGA</p>
                                <select 
                                //name="lga" 
                                className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'
                                {...register(`cooperate.${index}.lga`, {required : true})}>
                                    <option value="LGA">Select LGA</option>
                                    {/* {DaysArray.map((day : number, i:number) => 
                                <option value={day} key={i}>{day < 10 ? `0${day}` : day}</option>
                                )} */}
                                </select>
                            </div>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>City</p>
                                <input 
                                type="text" 
                                className='py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full' 
                                {...register(`cooperate.${index}.city`, {required : true})}
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
                                {...register(`cooperate.${index}.occupation`, {required : true})}
                                />
                            </div>
                            <div className='flex flex-col md:w-1/2 w-full'>
                                <p className='font-bold'>Nationality</p>
                                <input 
                                type="text" 
                                className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full' 
                                {...register(`cooperate.${index}.nationality`, {required : true})}/>
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
                                    {...register(`cooperate.${index}.day`, {required : true})}>

                                        <option value="day">Day</option>
                                        {DaysArray.map((day: number, i: number) =>
                                            <option value={day} key={i}>{day < 10 ? `0${day}` : day}</option>
                                        )}
                                    </select>
                                    <select 
                                    //name="month" 
                                    className='w-1/3 border border-[#CBCBCB] py-2 px-3 rounded-md'
                                    {...register(`cooperate.${index}.month`, {required : true})}
                                    >
                                        <option value="month">Month</option>
                                        {MonthsArray.map((month: string, i: number) =>
                                            <option value={month.substring(0, 3)} key={i}>{month}</option>
                                        )}
                                    </select>
                                    <select 
                                    //name="year" 
                                    className='w-1/3 border border-[#CBCBCB] py-2 px-3 rounded-md'
                                    {...register(`cooperate.${index}.year`, {required : true})}
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
                                {...register(`cooperate.${index}.email`, {required : true})}/>
                            </div>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>Telephone&nbsp;Number</p>
                                <input 
                                type={"text"} 
                                maxLength={11}
                                className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full' 
                                {...register(`cooperate.${index}.telephoneNumber`, {required : true, maxLength : 11})}/>
                            </div>
                        </div>

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
                                    {...register(`cooperate.${index}.signature`, {
                                        required : true,
                                    })}
                                    />
                                <div className='text-black'>{getValues(`cooperate.${index}.signature`)[0]?.name }</div>

                                {!getValues(`cooperate.${index}.signature`)[0]?.name ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`signature-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => emptyFileInputField(`signature-${index}`)}>
                                        <object data="/delete.png" className='w-4 h-4 object-contain' />
                                        <p>Delete</p>
                                    </div>
                                }
                            </div>
                            <div className="flex justify-between gap-2 items-center py-2 px-4 bg-[#DFDDEC] text-xs text-black font-semibold rounded">
                                <p>Photograph&nbsp;Photograph:</p>
                                <input
                                    type="file"
                                    accept="images/*"
                                    className='hidden'
                                    id={`passport-${index}`}
                                    // name="signature"
                                    // onChange={(e) => onChangeFileHandler(e, index)}
                                    {...register(`cooperate.${index}.passport`, {
                                        required : true,
                                    })}
                                    />
                                <div className='text-black'>{getValues(`cooperate.${index}.passport`)[0]?.name }</div>

                                {!getValues(`cooperate.${index}.passport`)[0]?.name ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`passport-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => emptyFileInputField(`passport-${index}`)}>
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
                                    // name="signature"
                                    // onChange={(e) => onChangeFileHandler(e, index)}
                                    {...register(`cooperate.${index}.meansOfId`, {
                                        required : true,
                                    })}
                                />
                                <p>Means&nbsp;Of&nbsp;Identification:</p>
                                <div className='text-black'>{getValues(`cooperate.${index}.meansOfId`)[0]?.name }</div>

                                {!getValues(`cooperate.${index}.meansOfId`)[0]?.name ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`meansOfId-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => emptyFileInputField(`meansOfId-${index}`)}>
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
                                    // name="signature"
                                    // onChange={(e) => onChangeFileHandler(e, index)}
                                    {...register(`cooperate.${index}.certificate`, {
                                        required : true,
                                    })}
                                
                                />
                                <p>Certificate&nbsp;Of&nbsp;Competence:</p>

                                <div className='text-black'>{getValues(`cooperate.${index}.certificate`)[0]?.name}</div>

                                {!getValues(`cooperate.${index}.certificate`)[0]?.name ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`certificate-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => emptyFileInputField(`certificate-${index}`)}>
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
            {/* </form> */}
        </>
    );
}