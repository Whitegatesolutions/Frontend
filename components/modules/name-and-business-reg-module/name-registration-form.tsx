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
    const dispatch : Dispatch<AnyAction> = useDispatch();
    const [values, setValues] = React.useState(nameRegInitialObj);
    const {firstNameSuggestion, secondNameSuggestion, businessAddress, email, phoneNumber} = values;
    const [isError, setErrors] = React.useState({
        email : false,
        firstNames : false,
        secondNames : false,
        telephone : false
    });

    const onChangeFirstNameHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {target : {value}}  = e;
        setValues({...values, firstNameSuggestion : value});
    }

    const onChangeSecondNameHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {target : {value}}  = e;
        setValues({...values, secondNameSuggestion : value});
    }

    const onChangeBusinessAddressHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {target : {value}}  = e;
        setValues({...values, businessAddress : value});
    }

    const onChangeEmailHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {target : {value}}  = e;
        setValues({...values, email : value});
        if(!validateEmail(value)){
            setErrors({...isError, email : true});
        }else{
            setErrors({...isError, email : false});
        }
    }

    const onChangePhoneNumberHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {target : {value}}  = e;
        setValues({...values, phoneNumber : value});

        if(!validatePhoneNumber(value)){
            setErrors({...isError, telephone : true});
        }else{
            setErrors({...isError, telephone : false});
        }
    }


    React.useEffect(() => {
        
        if(firstNameSuggestion && secondNameSuggestion 
        && firstNameSuggestion.toLowerCase() === secondNameSuggestion.toLowerCase()){
            setErrors({...isError, firstNames : true, secondNames : true});
        }else{
            setErrors({...isError, firstNames : false, secondNames : false});
        }
        dispatch(setNameRegFormValidState(false));
        //dispatch redux object
        if(email && validateEmail(email) && 
           phoneNumber && validatePhoneNumber(phoneNumber) && 
            firstNameSuggestion && secondNameSuggestion && businessAddress &&
            firstNameSuggestion.toLowerCase() !== secondNameSuggestion.toLowerCase()

        ){
            dispatch(setBusinessNameRegData({
                firstNameSuggestion,
                secondNameSuggestion,
                businessAddress,
                email,
                phoneNumber,
                userId : getUserId()
            }));

            dispatch(setNameRegFormValidState(true));
        }
    }, [
        firstNameSuggestion,
        secondNameSuggestion,
        businessAddress,
        email,
        phoneNumber,
    ]);
    

    return(
        <div className="w-full lg:w-10/12">
            <p className='text-[#6157A0] text-xl font-bold'>Name&nbsp;Registration</p>
            <form className='my-8' id="form-id" onSubmit={(e) => {
                e.preventDefault();
            }}
            >
                <fieldset id='fieldset'>
                    <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                        <div className='flex flex-col md:w-1/2 w-full'>
                            <p className='font-bold'>Name&nbsp;Suggestion&nbsp;1</p>
                            <input 
                            type="text" 
                            id="firstName"
                            required
                            onChange={(e) => onChangeFirstNameHandler(e)}
                            className={!isError.firstNames
                            ?  'text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                            : "py-2 text-sm  px-4 rounded-md border border-[#FF2D2D] w-full"}
                            />
                            <span id="name1" className={!isError.firstNames
                                ? 'invisible'
                                :"visible text-xs text-[#FF2D2D]"}>
                                Business&nbsp;Names&nbsp;Should&nbsp;not&nbsp;be&nbsp;the&nbsp;same
                            </span>
                        </div>
                        <div className='flex flex-col md:w-1/2 w-full'>
                            <p className='font-bold'>Name&nbsp;Suggestion&nbsp;2</p>
                            <input 
                            type="text" 
                            id = "secondName"
                            required
                            onChange={(e) => onChangeSecondNameHandler(e)}
                            className={!isError.secondNames?
                                'py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full'
                                :"py-2 text-sm  px-4 rounded-md border border-[#FF2D2D] w-full"
                            }/>
                            <span id="name2" className={!isError.secondNames
                                ? 'invisible' 
                                :"visible text-xs text-[#FF2D2D]"}>
                                Business&nbsp;Names&nbsp;Should&nbsp;not&nbsp;be&nbsp;the&nbsp;same
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-col w-full text-xs text-black my-4'>
                        <p className='font-bold'>Business&nbsp;Address</p>
                        <input 
                        type="text" 
                        className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'
                        required
                        onChange={(e) => onChangeBusinessAddressHandler(e)}
                        />
                    </div>

                    <div className='w-full md:w-3/5 flex flex-col md:flex-row gap-4 text-xs text-black mb-4'>
                        <div className='flex flex-col md:w-1/2 w-full'>
                            <p className='font-bold'>E-mail&nbsp;Address</p>
                            <input 
                            type="email"
                            id="mail"
                            className={!isError.email?
                                'py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full'
                                :"py-2 text-sm  px-4 rounded-md border border-[#FF2D2D] w-full"
                            }
                            required
                            onChange={(e) => onChangeEmailHandler(e)}
                            />
                            <span id='mailSpan' className={
                                !isError.email
                                ? 'invisible' 
                                :"visible text-xs text-[#FF2D2D]"
                            }>Invalid&nbsp;Email&nbsp;Format</span>
                        </div>
                        <div className='flex flex-col md:w-1/2 w-full'>
                            <p className='font-bold'>Telephone</p>
                            <input 
                            type={"text"} 
                            id="telephone"
                            className={!isError.telephone?
                                'py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full'
                                :"py-2 text-sm  px-4 rounded-md border border-[#FF2D2D] w-full"
                            }
                            required
                            maxLength={11}
                            onChange={ (e) => onChangePhoneNumberHandler(e) }
                            />
                            <span id="teleSpan" className={
                                !isError.telephone
                                ? 'invisible' 
                                :"visible text-xs text-[#FF2D2D]"
                            }>Invalid&nbsp;Phone&nbsp;Number</span>
                        </div>
                    </div>
                </fieldset>
           </form>

            {/* divider */}
           <div className='bg-[#303030] h-px w-full'/>
        </div>
    );
}