import { constants } from 'os';
import React from 'react';
import {useForm, useFieldArray} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { BusinessNameRegInterface, setBusinessNameRegData, setNameRegFormValidState } from '../../../redux/slices/app-slice';
import { ErrorInterfaceObj } from '../../../utils/constants';
import { defineDocument, getUserId, validateEmail, validatePhoneNumber } from '../../../utils/util-functions';

const nameRegInitialObj = {
    firstNameSuggestion : '',
    secondNameSuggestion : '',
    businessAddress : '',
    email : '',
    phoneNumber : ''
}

//const form = defineDocument()?.getElementById('form-id') as HTMLFormElement;

export const NameRegistrationFormComponent = () : JSX.Element => {

    // const individualFormArrayLength = useSelector((state : any) => state.store.individualFieldArray);
    // const cooperateFormArrayLength = useSelector((state : any) => state.store.cooperateFieldArray);
    const dispatch : Dispatch<AnyAction> = useDispatch();

    const {
        register, 
        formState : {isValid, errors}, 
        control,
        handleSubmit, 
        watch, 
        getValues, 
        setError}
        = useForm<any>({
        defaultValues : nameRegInitialObj
    });

    const watchNameReg = watch();

    const { fields, append } = useFieldArray<any>({
        control,
        name: "values"
    });


    const dispatchNameRegObject = (data : BusinessNameRegInterface, isFormValid : boolean) => {
        dispatch(setBusinessNameRegData({
            firstNameSuggestion : data.firstNameSuggestion,
            secondNameSuggestion : data.secondNameSuggestion,
            businessAddress : data.businessAddress,
            email : data.email,
            phoneNumber : data.phoneNumber,
            userId : data.userId
        }));

        dispatch(setNameRegFormValidState(isFormValid));
    }

    const validateBusinessNames = (firstNameSuggestion : string, secondNameSuggestion : string) : boolean => {
        const firstBNameInput = document.getElementById('firstName') as HTMLInputElement;
        const secondBNameInput = document.getElementById('secondName') as HTMLInputElement;
        const nameSpan = document.getElementById('name1') as HTMLSpanElement;
        const name2Span = document.getElementById('name2') as HTMLSpanElement;

        if(!firstNameSuggestion || !secondNameSuggestion){
            nameSpan.className = "invisible";
            name2Span.className = "invisible";
            firstBNameInput.className = "py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full";
            secondBNameInput.className = "py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full";
            return false;    
        }
        if((firstNameSuggestion.toLowerCase() !== secondNameSuggestion.toLowerCase())){
            nameSpan.className = "invisible";
            name2Span.className = "invisible";
            firstBNameInput.className = "py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full";
            secondBNameInput.className = "py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full";
            return true;
        }else{
            nameSpan.className = "visible text-xs text-[#FF2D2D]";
            name2Span.className = "visible text-xs text-[#FF2D2D]";
            firstBNameInput.className = "py-2 text-sm  px-4 rounded-md border border-[#FF2D2D] w-full";
            secondBNameInput.className = "py-2 text-sm  px-4 rounded-md border border-[#FF2D2D] w-full";
            return false;
        }
    }

    const validateBusinessEmailFormat = (email : string) : boolean => {
        const emailInput  = document.getElementById('mail') as HTMLInputElement;
        const mailSpan = document.getElementById('mailSpan') as HTMLInputElement;
        if(!email){
            mailSpan.className = "invisible";
            emailInput.className = "py-2 text-sm  px-4 rounded-md border focus:border-[#CBCBCB] w-full";
            return false;
        }
        if(validateEmail(email)){
            mailSpan.className = 'invisible';
            emailInput.className = "py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full";
            return true;
        }else{
            mailSpan.className = "visible text-xs text-[#FF2D2D]";
            emailInput.className = "py-2 text-sm  px-4 rounded-md border border-[#FF2D2D] w-full";
            return false;
        }
       
    } 

    const validateBusinessPhoneNumberFormat = (phoneNumber : string) : boolean => {
        const phoneNumberInput = document.getElementById('telephone') as HTMLInputElement;
        const telephone = document.getElementById('teleSpan') as HTMLSpanElement;

        if(!phoneNumber){
            telephone.className="invisible";
            phoneNumberInput.className = "py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full";
            return false;
        }

        if(validatePhoneNumber(phoneNumber)){
            telephone.className = "invisible";
            phoneNumberInput.className = "py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full";
            return true; 
        }else{
            telephone.className = "visible text-xs text-[#FF2D2D]";
            phoneNumberInput.className = "py-2 text-sm  px-4 rounded-md border border-[#FF2D2D] w-full";
            return false;
        }
    }

    React.useEffect(() => {
        const firstNameSuggestion : string = getValues(`values.firstNameSuggestion`) as string;
        const secondNameSuggestion : string = getValues(`values.secondNameSuggestion`) as string;
        const businessAddress : string = getValues(`values.businessAddress`) as string;
        const email : string = getValues(`values.email`) as string;
        const phoneNumber : string = getValues(`values.phoneNumber`) as string;
        console.log({
            names : validateBusinessNames(firstNameSuggestion, secondNameSuggestion),
            email : validateBusinessEmailFormat(email),
            phoneNumber : validateBusinessPhoneNumberFormat(phoneNumber)
        });

        if(!validateBusinessEmailFormat(email) || 
        !validateBusinessNames(firstNameSuggestion, secondNameSuggestion) || 
        !validateBusinessPhoneNumberFormat(phoneNumber)
        ){  //form.classList.remove("saveForm");
            return;
        }
        //make the api request here
        
        dispatchNameRegObject({
            firstNameSuggestion,
            secondNameSuggestion,
            businessAddress,
            email,
            phoneNumber,
            userId : getUserId()
            }, isValid);

    }, [watch,
        isValid,
        getValues(`values.firstNameSuggestion`),
        getValues(`values.secondNameSuggestion`),
        getValues(`values.businessAddress`),
        getValues(`values.email`),
        getValues(`values.phoneNumber`)
    ]);
    

    return(
        <div className="w-full lg:w-10/12">
            <p className='text-[#6157A0] text-xl font-bold'>Name&nbsp;Registration</p>
            <form className='my-8' 
            id="form-id" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit((data) => {
                    console.log('data', data);
                })
            }}
            >
                <fieldset id='fieldset'>
                    <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                        <div className='flex flex-col md:w-1/2 w-full'>
                            <p className='font-bold'>Name&nbsp;Suggestion&nbsp;1</p>
                            <input 
                            type="text" 
                            id="firstName"
                            className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                            {...register(`values.firstNameSuggestion`, { 
                                required: true,
                            })}
                            />
                            <span id="name1" className='invisible'>Business&nbsp;Names&nbsp;Should&nbsp;not&nbsp;be&nbsp;the&nbsp;same</span>
                        </div>
                        <div className='flex flex-col md:w-1/2 w-full'>
                            <p className='font-bold'>Name&nbsp;Suggestion&nbsp;2</p>
                            <input 
                            type="text" 
                            id = "secondName"
                            className={'py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full'}
                            //'py-2 text-sm  px-4 rounded-md border border-[#FF2D2D] w-full'
                            {...register(`values.secondNameSuggestion`, { 
                                required: true,
                            })}/>
                            <span id="name2" className={'invisible'}>Business&nbsp;Names&nbsp;Should&nbsp;not&nbsp;be&nbsp;the&nbsp;same</span>
                        </div>
                    </div>

                    <div className='flex flex-col w-full text-xs text-black my-4'>
                        <p className='font-bold'>Business&nbsp;Address</p>
                        <input 
                        type="text" 
                        className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'
                        {...register(`values.businessAddress`, {
                            required: true,
                        }) }
                        />
                    </div>

                    <div className='w-full md:w-3/5 flex flex-col md:flex-row gap-4 text-xs text-black mb-4'>
                        <div className='flex flex-col md:w-1/2 w-full'>
                            <p className='font-bold'>E-mail&nbsp;Address</p>
                            <input 
                            type="email"
                            id="mail"
                            className={`text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full`}
                            {...register(`values.email`, {
                                required: true,
                            })}/>
                            <span id='mailSpan' className={'invisible'}>Invalid&nbsp;Email&nbsp;Format</span>
                        </div>
                        <div className='flex flex-col md:w-1/2 w-full'>
                            <p className='font-bold'>Telephone</p>
                            <input 
                            type={"text"} 
                            id="telephone"
                            className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'
                            maxLength={11}
                            {...register(`values.phoneNumber`, {
                                required: true, 
                                maxLength : 11
                            }) }
                            />
                            <span id="teleSpan" className={'invisible'}>Invalid&nbsp;Phone&nbsp;Number</span>
                        </div>
                    </div>
                </fieldset>
           </form>

            {/* divider */}
           <div className='bg-[#303030] h-px w-full'/>
        </div>
    );
}