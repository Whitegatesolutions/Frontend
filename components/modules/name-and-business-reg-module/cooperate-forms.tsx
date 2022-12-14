import { DaysArray, MonthsArray, Years } from "../../../utils/collections";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, Dispatch } from "redux";
import { addLgaData, setFormsSaved } from "../../../redux/slices/app-slice";
import { AxiosError } from "axios";
import { CreateBusinessNameRegPartnerType } from "../../../utils/types.utils";
import { deleteAxiosRequest, patchAxiosRequestWithHeader, postAxiosRequestWithHeader, uploadFiles } from "../../../utils/axios-requests";
import { ErrorInterfaceObj } from "../../../utils/constants";
import { initialErrorObj } from "../login-module/login-form";
import { ComponentLoader } from "../componentLoader";
import { Snackbar, SnackbarContent } from '@mui/material';
import { cooperateFormUseEffectHook } from "../../../utils/util-functions";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

type Props = {
    array: any,
    register: any,
    setValue: any,
    getValues: any,
    remove: any,
    watch: any
}
export const CooperateFormsComponent: React.FC<Props> = ({
    array,
    register,
    setValue,
    getValues,
    remove,
    watch }: any): JSX.Element => {
    const dispatch = useDispatch<Dispatch<AnyAction>>();

    const [state, setState] = React.useState<any>({
        open: true,
        vertical: 'top',
        horizontal: 'right',
    });
    const { open, vertical, horizontal } = state;

    const [isSaving, save] = React.useState(false);
    const [isEdit, setEdit] = React.useState<number[]>([]);
    const [isDeleting, setDeleteState] = React.useState<boolean>(false);
    const [savedPartnerId, setPartnerId] = React.useState<any[]>([]);
    const [requestStatus, isRequestSuccessful] = React.useState<any[]>([]);
    const [axiosResponse, setAxiosResponse] = React.useState<ErrorInterfaceObj>(initialErrorObj);
    const getNameRegIdSelector = useSelector((state: any) => state.store.businessNameRegistrationId);
    const stateSelector = useSelector((state: any) => state.store.state);
    const isSavedArraySelector = useSelector((state: any) => state.store.isSavedArray);

    const emptyFileInputField = (elementId: string, valueKey: string) => {
        setValue(`${valueKey}`, '');
        document.getElementById(elementId)?.click();
    }

    const getSavedForm = (index: number) => {
        //get index of saved partners
        return requestStatus.filter((i: number) => index === i);
    }

    const axiosError = (err: AxiosError) => {
        if (err.isAxiosError) {
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
                    setValue(key, uploadedFile.concat(`#${file.name}`));
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

    const onSaveHandler = async (index: number) => {
        const fieldset = document.getElementById(`cooperateFieldset-${index}`) as HTMLFieldSetElement;
        const saveButton = document.getElementById(`save-${index}-button`) as HTMLButtonElement;
        const divForm = document.getElementById(`cooperate-form-div-${index}`) as HTMLDivElement;
        const signature = getValues(`cooperate.${index}.signature`)?.split('#')[0];
        const passport = getValues(`cooperate.${index}.passport`)?.split('#')[0];
        const idCardLink = getValues(`cooperate.${index}.meansOfId`)?.split('#')[0];
        const competenceCertificate = getValues(`cooperate.${index}.certificate`)?.split('#')[0];
        const isNation = getValues(`cooperate.${index}.nation`) as string;


        const savePartnerObj: Partial<CreateBusinessNameRegPartnerType> = {
            companyName: getValues(`cooperate.${index}.companyName`),
            rcNumber: getValues(`cooperate.${index}.rcNumber`),
            nameOfDirector: getValues(`cooperate.${index}.directorName`),//data?.otherName,
            address: getValues(`cooperate.${index}.address`),//data?.residentialAddress,
            lgaId: (isNation && isNation === 'Nigerian') ? '3a7e7bd2-6f7c-4945-adf3-89a1d564db08' : null,//data?.lga,
            city: getValues(`cooperate.${index}.city`), //data?.city,
            dateOfBirth: new Date(`${getValues(`cooperate.${index}.year`)}/${getValues(`cooperate.${index}.month`)}/${getValues(`cooperate.${index}.day`)} GMT`),
            occupation: getValues(`cooperate.${index}.occupation`),//data?.occupation,
            nationality:(isNation && isNation === 'Nigerian')? isNation : getValues(`cooperate.${index}.nationality`),//data?.nationality,
            email: getValues(`cooperate.${index}.email`),//data?.email,
            phoneNumber: getValues(`cooperate.${index}.telephoneNumber`),//data?.telephoneNumber,
            type: "CORPORATE",
            signature, //: getValues(`cooperate.${index}.signature`),
            passport, //: getValues(`cooperate.${index}.passport`),
            competenceCertificate,  //: getValues(`cooperate.${index}.certificate`),
            idCardLink, //: getValues(`cooperate.${index}.meansOfId`),
            businessNameRegistrationId: getNameRegIdSelector
        };
        if (!saveButton) {
            return;
        }
        save(true);
        await postAxiosRequestWithHeader({
            uri: 'business-name-registration-partner',
            body: savePartnerObj,
        }).then((res) => {
            const { data, success, message, code } = res.data;
            save(false);
            if (success && code === 201) {
                saveButton.disabled = false;
                fieldset.disabled = true;
                divForm.className = "saveForm w-full my-4 rounded-md border border-[#CBCBCB] shadow-lg bg-white h-auto p-4";
                dispatch(setFormsSaved(true));
                setPartnerId(
                    (prev) => [...prev, data.id]
                );
                setValue(`cooperate.${index}.isSaved`, true);
                isRequestSuccessful((prev) => [...prev, index]);
            }
        })
            .catch((err: AxiosError) => {
                save(false);
                saveButton.disabled = false;
                axiosError(err);
            });
    }

    const onClickEditButtonHandler = async (index: number) => {
        setEdit((prev) => [...prev, index]);
        const fieldset = document.getElementById(`cooperateFieldset-${index}`) as HTMLFieldSetElement;
        const divForm = document.getElementById(`cooperate-form-div-${index}`) as HTMLDivElement;
        divForm.classList.remove("saveForm");
        fieldset.disabled = false;
        setValue(`cooperate.${index}.isSaved`, false);
    }
    const onEditPartnerHandler = async (index: number) => {
        const fieldset = document.getElementById(`cooperateFieldset-${index}`) as HTMLFieldSetElement;
        const divForm = document.getElementById(`cooperate-form-div-${index}`) as HTMLDivElement;
        const signature = getValues(`cooperate.${index}.signature`)?.split('#')[0];
        const passport = getValues(`cooperate.${index}.passport`)?.split('#')[0];
        const idCardLink = getValues(`cooperate.${index}.meansOfId`)?.split('#')[0];
        const competenceCertificate = getValues(`cooperate.${index}.certificate`)?.split('#')[0];
        const isNation = getValues(`cooperate.${index}.nation`) as string;


        const savePartnerObj: Partial<CreateBusinessNameRegPartnerType> = {
            companyName: getValues(`cooperate.${index}.companyName`),
            rcNumber: getValues(`cooperate.${index}.rcNumber`),
            nameOfDirector: getValues(`cooperate.${index}.directorName`),//data?.otherName,
            address: getValues(`cooperate.${index}.address`),//data?.residentialAddress,
            lgaId: (isNation && isNation === 'Nigerian') ? '3a7e7bd2-6f7c-4945-adf3-89a1d564db08' : null,//data?.lga,
            city: getValues(`cooperate.${index}.city`), //data?.city,
            dateOfBirth: new Date(`${getValues(`cooperate.${index}.year`)}/${getValues(`cooperate.${index}.month`)}/${getValues(`cooperate.${index}.day`)} GMT`),
            occupation: getValues(`cooperate.${index}.occupation`),//data?.occupation,
            nationality:(isNation && isNation === 'Nigerian')? isNation : getValues(`cooperate.${index}.nationality`),//data?.nationality,
            email: getValues(`cooperate.${index}.email`),//data?.email,
            phoneNumber: getValues(`cooperate.${index}.telephoneNumber`),//data?.telephoneNumber,
            type: "CORPORATE",
            signature,  //: getValues(`cooperate.${index}.signature`),
            passport, //: getValues(`cooperate.${index}.passport`),
            competenceCertificate, //: getValues(`cooperate.${index}.certificate`),
            idCardLink,  //: getValues(`cooperate.${index}.meansOfId`),
            businessNamePartnerId: savedPartnerId.at(index)
        };
        save(true);
        await patchAxiosRequestWithHeader({
            uri: 'business-name-registration-partner',
            body: savePartnerObj,
        }).then((res) => {
            const { data, success, message, code } = res.data;
            console.log('patch', data);
            save(false);
            if (success && code === 200) {
                fieldset.disabled = true;
                divForm.className = "saveForm w-full my-4 rounded-md border border-[#CBCBCB] shadow-lg bg-white h-auto p-4";
                //remove the successfully edited forms from the array edited array 
                setEdit((prev) => prev.filter((values: number) => values !== index));
                setValue(`cooperate.${index}.isSaved`, true);
                //isRequestSuccessful((prev) => [...prev, index]);
            }


        })
            .catch((err: AxiosError) => {
                save(false);
                axiosError(err);
            });
    }
    const onDeletePartnerHandler = async (index: number) => {
        const divForm = document.getElementById(`cooperate-form-div-${index}`) as HTMLDivElement;

        setDeleteState(true);
        const requestObj = {
            uri: 'business-name-registration-partner',
            body: [savedPartnerId.at(index)]
        }
        await deleteAxiosRequest(requestObj)
            .then((res) => {
                const { data, success, message, code } = res.data;
                setDeleteState(false);
                if (success && code === 200) {
                    divForm.style.display = 'none';
                    remove(index);
                    dispatch(setFormsSaved(false));

                }
            }).catch((err) => {
                setDeleteState(false);
                axiosError(err);
            });

    }


    const getFileValueName = (key: string) => {
        if (getValues(key) && typeof getValues(key) !== "string") {
            return getValues(key)[0]?.name;
        }
        return getValues(key)?.split('#')?.pop();

    }

    const handleClose = () => {
        setState({ ...state, open: false });
    };
    React.useEffect(() => {
        const subscription = watch((value: any, { name, type }: any) => {
            const sliptNames: string[] = name?.split('') as string[];
            const index: number = parseInt(sliptNames.at(10) as string);
            if (isNaN(index)) return;
            const nation : string = getValues(`cooperate.${index}.nation`) as string;
           // if(nation && nation === 'Nigerian') setValue(`cooperate.${index}.nationality`, nation);
            cooperateFormUseEffectHook(value.cooperate[index], `save-${index}-button`);
        });
        return () => subscription.unsubscribe();

    }, [watch]);
    return (
        <>
            {axiosResponse.msg !== '' && <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}>
                <SnackbarContent style={{
                    backgroundColor: axiosResponse.isError ? '#FF2D2D' : '#6157A0',
                    color: '#fff'
                }}
                    message={<span id="client-snackbar">{axiosResponse.msg}</span>}
                />
            </Snackbar>
            }

            {array && array.map((data: any, index: number) =>
                <div
                    id={`cooperate-form-div-${index}`}
                    key={index}
                    className="w-full my-4 rounded-md border border-[#CBCBCB] shadow-lg bg-white h-auto p-4">
                    <p className="text-xl font-bold py-4">Cooperate&nbsp;Business&nbsp;Owner</p>
                    <fieldset id={`cooperateFieldset-${index}`}>
                        {/* names */}
                        <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                            <div className='flex flex-col md:w-4/5 w-full'>
                                <p className='font-bold'>Name&nbsp;Of&nbsp;Company</p>
                                <input
                                    type="text"
                                    className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                                    {...register(`cooperate.${index}.companyName`,
                                        { required: true, }
                                    )}
                                />
                            </div>

                            <div className='flex flex-col md:w-1/5 w-full'>
                                <p className='font-bold'>RC&nbsp;No</p>
                                <input
                                    type="text"
                                    className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                                    {...register(`cooperate.${index}.rcNumber`, { required: true })}
                                />
                            </div>
                        </div>

                        {/*  */}
                        <div className='flex flex-col w-full text-xs text-black my-4'>
                            <p className='font-bold'>Name&nbsp;Of&nbsp;Director&nbsp;representing&nbsp;company</p>
                            <input
                                type="text"
                                className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'
                                {...register(`cooperate.${index}.directorName`, { required: true })}
                            />
                        </div>

                        {/* residential address */}
                        <div className='flex flex-col w-full text-xs text-black my-4'>
                            <p className='font-bold'>Residential&nbsp;address</p>
                            <input
                                type="text"
                                className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'
                                {...register(`cooperate.${index}.address`, { required: true })} />
                        </div>

                        {/* location details*/}
                        <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                            <div className='flex flex-col md:w-4/5 w-full'>
                                <p className='font-bold'>Nationality</p>
                                <select
                                    className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'
                                    {...register(`cooperate.${index}.nation`, { required: true })}>
                                    <option value="" selected>Select Nationality</option>
                                    <option value="Nigerian">NIGERIAN</option>
                                    <option value="Non-Nigerian">NON-NIGERIAN</option>
                                </select>
                            </div>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>City</p>
                                <input
                                    type="text"
                                    className='py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full'
                                    {...register(`cooperate.${index}.city`, { required: true })}
                                />
                            </div>
                        </div>
                        {/* occupation and nationality */}
                        <div className='w-full md:w-auto flex flex-col md:flex-row gap-4 text-xs text-black my-4'>
                            {getValues(`cooperate.${index}.nation`) === 'Nigerian'
                                ?
                                <>
                                    
                                <div className='flex flex-col md:w-[38%] w-full'>
                                    <p className='font-bold'>State</p>
                                    <select 
                                    className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'
                                    {...register(`cooperate.${index}.state`, {required : true})}>

                                        <option value="" selected>Select State</option>
                                        <option value="benue">BENUE</option>

                                        {stateSelector && stateSelector?.map((state: any, i: number) =>
                                            <option value={state.id} key={i}
                                                onClick={() => dispatch(addLgaData(state.lgasForThisState))}>
                                                {state.name}
                                            </option>
                                        )}
                                    </select>
                                </div>

                                <div className='flex flex-col md:w-[38%] w-full'>
                                    <p className='font-bold'>LGA</p>
                                    <select 
                                    //name="lga" 
                                    className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'
                                    {...register(`cooperate.${index}.lga`, {required : true})}>
                                        <option value="" selected>Select LGA</option>
                                        <option value="LGA">VANDEKYA</option>
                                        <option value="LGA">BENDE</option>
                                        <option value="LGA">ALIADE</option>
                                        {/* {DaysArray.map((day : number, i:number) => 
                                    <option value={day} key={i}>{day < 10 ? `0${day}` : day}</option>
                                    )} */}
                                    </select>
                                </div>
                                </>
                                :
                                <div className='flex flex-col md:w-1/2 w-full'>
                                    <p className='font-bold'>Nationality</p>
                                    <input
                                        type="text"
                                        className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'
                                        {...register(`cooperate.${index}.nationality`, { required: true })} />
                                </div>
                            }
                            <div className='flex flex-col md:w-1/2 w-full'>
                                <p className='font-bold'>Occupation</p>
                                <input
                                    type={"text"}
                                    className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                                    {...register(`cooperate.${index}.occupation`, { required: true })}
                                />
                            </div>
                        </div>
                        {/* Email, telephone and date of birth */}
                        <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black mb-4'>

                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>Date&nbsp;Of&nbsp;Birth</p>
                                <div className='w-full flex flex-row items-center gap-2 text-[#303030]'>
                                    <select
                                        className='w-1/3 border border-[#CBCBCB] py-2 px-3 rounded-md'
                                        {...register(`cooperate.${index}.day`, { required: true })}>

                                        <option value="day" selected>Day</option>
                                        {DaysArray.map((day: number, i: number) =>
                                            <option value={day} key={i}>{day < 10 ? `0${day}` : day}</option>
                                        )}
                                    </select>
                                    <select
                                        className='w-1/3 border border-[#CBCBCB] py-2 px-3 rounded-md'
                                        {...register(`cooperate.${index}.month`, { required: true })}
                                    >
                                        <option value="month" selected>Month</option>
                                        {MonthsArray.map((month: string, i: number) =>
                                            <option value={month.substring(0, 3)} key={i}>{month}</option>
                                        )}
                                    </select>
                                    <select
                                        className='w-1/3 border border-[#CBCBCB] py-2 px-3 rounded-md'
                                        {...register(`cooperate.${index}.year`, { required: true })}
                                    >
                                        <option value="year" selected>Year</option>
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
                                    {...register(`cooperate.${index}.email`, { required: true })} />
                            </div>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>Telephone&nbsp;Number</p>
                                <input
                                    type={"text"}
                                    maxLength={11}
                                    className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'
                                    {...register(`cooperate.${index}.telephoneNumber`, { required: true, maxLength: 11 })} />
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
                                    id={`signature1-${index}`}
                                    {...register(`cooperate.${index}.signature`, {
                                        required: true,
                                        onChange: async (e: any) => {
                                            const key = `cooperate.${index}.signature`;
                                            await uploadPartnerAttachment((getValues(key) as FileList), key);
                                        }
                                    })}
                                />
                                <div className='text-black'>{getFileValueName(`cooperate.${index}.signature`)}</div>

                                {!getValues(`cooperate.${index}.signature`) ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`signature1-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => emptyFileInputField(`signature1-${index}`, `cooperate.${index}.signature`)}>
                                        <object data="/delete.png" className='w-4 h-4 object-contain' />
                                        <p>Delete</p>
                                    </div>
                                }
                            </div>
                            <div className="flex justify-between gap-2 items-center py-2 px-4 bg-[#FFFAFA] text-xs text-black font-semibold rounded">
                                <p>Photograph&nbsp;Photograph:</p>
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    className='hidden'
                                    id={`passport1-${index}`}
                                    {...register(`cooperate.${index}.passport`, {
                                        required: true,
                                        onChange: async (e: any) => {
                                            const key = `cooperate.${index}.passport`;
                                            await uploadPartnerAttachment((getValues(key) as FileList), key);
                                        }
                                    })}
                                />
                                <div className='text-black'>{getFileValueName(`cooperate.${index}.passport`)}</div>

                                {!getValues(`cooperate.${index}.passport`) ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`passport1-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => emptyFileInputField(`passport1-${index}`, `cooperate.${index}.passport`)}>
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
                                    id={`meansOfId1-${index}`}
                                    {...register(`cooperate.${index}.meansOfId`, {
                                        required: true,
                                        onChange: async (e: any) => {
                                            const key = `cooperate.${index}.meansOfId`;
                                            await uploadPartnerAttachment((getValues(key) as FileList), key);
                                        }
                                    })}
                                />
                                <p>Means&nbsp;Of&nbsp;Identification:</p>
                                <div className='text-black'>{getFileValueName(`cooperate.${index}.meansOfId`)}</div>

                                {!getValues(`cooperate.${index}.meansOfId`) ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`meansOfId1-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => emptyFileInputField(`meansOfId1-${index}`, `cooperate.${index}.meansOfId`)}>
                                        <object data="/delete.png" className='w-4 h-4 object-contain' />
                                        <p>Delete</p>
                                    </div>
                                }
                            </div>

                            <div className="flex justify-between gap-2 items-center py-2 px-4 bg-[#FFFAFA] text-xs text-black font-semibold rounded">
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    className='hidden'
                                    id={`certificate1-${index}`}
                                    {...register(`cooperate.${index}.certificate`, {
                                        required: true,
                                        onChange: async (e: any) => {
                                            const key = `cooperate.${index}.certificate`;
                                            await uploadPartnerAttachment((getValues(key) as FileList), key);
                                        }
                                    })}

                                />
                                <p>Certificate&nbsp;Of&nbsp;Competence:</p>

                                <div className='text-black'>{getFileValueName(`cooperate.${index}.certificate`)}</div>

                                {!getValues(`cooperate.${index}.certificate`) ?
                                    <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                        onClick={() => {
                                            document.getElementById(`certificate1-${index}`)?.click();
                                        }}>
                                        <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                                        <p>Upload</p>
                                    </div>
                                    :
                                    <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                                        onClick={() => emptyFileInputField(`certificate1-${index}`, `cooperate.${index}.certificate`)}>
                                        <object data="/delete.png" className='w-4 h-4 object-contain' />
                                        <p>Delete</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </fieldset>
                    {/* <FormActionButtons
                            index={index}
                            getSingleSavedForm={getSavedForm(index).includes(index)}
                            isEdit={isEdit}
                            onSaveHandler={onSaveHandler(index)}
                            onEditHandler={onEditPartnerHandler(index)}
                            onClickEditButtonHandler={onClickEditButtonHandler(index)}
                            onDeletePartnerHandler={onDeletePartnerHandler(index)}

                        /> */}
                    <div className='flex justify-end text-white'>
                        {!getSavedForm(index).includes(index) ?
                            <div className='flex justify-end gap-2 text-white'>
                                <button
                                    id={`save-${index}-button`}
                                    className='bg-[#2B85F0] rounded-md 
                                    outline-none px-4 py-2 text-xs flex flex-row 
                                    items-center font-semibold gap-1
                                    disabled:bg-[#EFF0F6] 
                                    disabled:shadow-none 
                                    disabled:text-gray-500 disabled:cursor-default'
                                    onClick={() => onSaveHandler(index)}>
                                    <SaveOutlinedIcon sx={{ fontSize: '15px' }} />
                                    <p>Save</p>
                                </button>
                                <button
                                    className='bg-[#FF2D2D] rounded-md
                                        text-white outline-none 
                                        px-4 py-2 text-xs flex flex-row 
                                        items-center font-semibold gap-1
                                        disabled:bg-[#EFF0F6] 
                                        disabled:shadow-none 
                                        disabled:text-gray-500 disabled:cursor-default'
                                    onClick={() => remove(index)}>
                                    Delete
                                </button>
                            </div>

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
                                    onClick={() => isEdit.includes(index) ? onEditPartnerHandler(index) : onClickEditButtonHandler(index)}
                                >
                                    <object data="/delete.svg" className='w-4 h-4  object-contain' />
                                    {isEdit.includes(index) ? "Save Changes" : "Edit"}
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
            {isSaving && <ComponentLoader />}
            {isDeleting && <ComponentLoader />}
        </>
    );
}