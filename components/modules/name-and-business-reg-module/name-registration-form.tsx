import { constants } from 'os';
import React from 'react';
import {useForm, useFieldArray} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { BusinessNameRegInterface, setBusinessNameRegData, setNameRegFormValidState } from '../../../redux/slices/app-slice';
import { defineDocument, getUserId, validateEmail, validatePhoneNumber } from '../../../utils/util-functions';

const nameRegInitialObj = {
    nameSuggestion1 : '',
    nameSuggestion2 : '',
    businessAddress : '',
    emailAddress : '',
    telephoneNumber : ''    
};

//const form = defineDocument()?.getElementById('form-id') as HTMLFormElement;

export const NameRegistrationFormComponent = () : JSX.Element => {

    const individualFormArrayLength = useSelector((state : any) => state.store.individualFieldArray);
    const cooperateFormArrayLength = useSelector((state : any) => state.store.cooperateFieldArray);
    const dispatch : Dispatch<AnyAction> = useDispatch();

    console.log('individual', individualFormArrayLength);
    console.log('cooperate', cooperateFormArrayLength);
    
    const [businessNames, setBusinessNames] = React.useState({
        firstBusinessName : '',
        secondBusinessName : '',
        businessAddress : '',
        email  : '',
        telephone : ''
    });

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

    console.log('name registration form valid', isValid);

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
    React.useEffect(() => {
        //&& validateEmail(businessNames.email) && validatePhoneNumber(businessNames.telephone)
        const form = document.getElementById('form-id') as HTMLFormElement;
       if(isValid){

        dispatchNameRegObject({
            firstNameSuggestion : getValues('values.firstBusinessName'),
            secondNameSuggestion : getValues('values.secondBusinessName'),
            businessAddress : businessNames.businessAddress,
            email : businessNames.email,
            phoneNumber : businessNames.telephone,
            userId : getUserId()
            }, isValid);
            form.className = "saveForm my-8";
            // console.log('nameSug1', {
            //     name1 : getValues('values.firstBusinessName'),
            //     name2 : getValues('values.secondBusinessName'),
            //     email : businessNames.email,
            //     telephone : businessNames.telephone
            // });
       }
    }, [watchNameReg, 
        businessNames.secondBusinessName,
        businessNames.firstBusinessName,
        businessNames.email,
        businessNames.telephone,
        businessNames.email,
        individualFormArrayLength,
        cooperateFormArrayLength,
        isValid
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
                <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                    <div className='flex flex-col md:w-1/2 w-full'>
                        <p className='font-bold'>Name&nbsp;Suggestion&nbsp;1</p>
                        <input 
                        type="text" 
                        className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'
                        {...register(`values.firstBusinessName`, { 
                            required: true,
                            onChange : (e) => {
                                const form = document.getElementById('form-id') as HTMLFormElement;
                                form.className = 'my-8';
                                setBusinessNames({...businessNames, firstBusinessName : e.target.value})
                            } 
                        })}
                        />
                    </div>
                    <div className='flex flex-col md:w-1/2 w-full'>
                        <p className='font-bold'>Name&nbsp;Suggestion&nbsp;2</p>
                        <input 
                        type="text" 
                        className={
                            getValues('values.firstBusinessName') &&
                            getValues('values.firstBusinessName')
                            === getValues('values.secondBusinessName') &&
                            getValues('values.secondBusinessName')
                            ?'py-2 text-sm  px-4 rounded-md border border-[#FF2D2D] w-full'
                            :'py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full'
                        }
                        {...register(`values.secondBusinessName`, { 
                            required: true ,
                            onChange : (e) =>{ 
                                const form = document.getElementById('form-id') as HTMLFormElement;
                                form.className = 'my-8';
                                setBusinessNames({...businessNames, secondBusinessName : e.target.value})
                            },
                            validate : (value) => value !== businessNames.firstBusinessName
                        })}/>
                        <span className={ `${
                            getValues('values.firstBusinessName') &&
                            getValues('values.firstBusinessName')
                            === getValues('values.secondBusinessName') &&
                            getValues('values.secondBusinessName') ?
                            'visible text-xs text-[#FF2D2D]'
                            :'invisible'
                        }`}>
                            First and Second business Names must not be the same
                        </span>
                    </div>
                </div>

                <div className='flex flex-col w-full text-xs text-black my-4'>
                    <p className='font-bold'>Business&nbsp;Address</p>
                    <input 
                    type="text" 
                    className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'
                    {...register(`values.businessAddress`, {
                        required: true,
                        onChange : (e) => {
                            const form = document.getElementById('form-id') as HTMLFormElement;
                            form.className = 'my-8';
                            setBusinessNames({...businessNames, businessAddress : e.target.value})
                        }
                    }) }
                    />
                </div>

                <div className='w-full md:w-3/5 flex flex-col md:flex-row gap-4 text-xs text-black mb-4'>
                    <div className='flex flex-col md:w-1/2 w-full'>
                        <p className='font-bold'>E-mail&nbsp;Address</p>
                        <input 
                        type={"email"} 
                        className={
                            `text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full 
                            ${businessNames.email && !validateEmail(businessNames.email) && 'border border-[#FF2D2D]'}`
                        }
                        {...register(`values.emailAddress`, {
                            required: true,
                            pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi,
                            validate : (value) => validateEmail(value),
                            onChange : (e) => {
                                const form = document.getElementById('form-id') as HTMLFormElement;
                                form.className = 'my-8';
                                setBusinessNames({...businessNames, email : e.target.value})
                            }
                        })}/>
                    </div>
                    <div className='flex flex-col md:w-1/2 w-full'>
                        <p className='font-bold'>Telephone</p>
                        <input 
                        type={"text"} 
                        className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'
                        maxLength={11}
                        {...register(`values.telephoneNumber`, {
                            required: true, 
                            maxLength : 11,
                            pattern : /[0-9]{11}/,
                            onChange : (e) => {
                                const form = document.getElementById('form-id') as HTMLFormElement;
                                form.className = 'my-8';
                                setBusinessNames({...businessNames, telephone : e.target.value})
                            },
                        }) }
                        />
                    </div>
                </div>
                <button 
                type='submit' 
                className='hidden' 
                id="submitButton"/>
           </form>

            {/* divider */}
           <div className='bg-[#303030] h-px w-full'/>
        </div>
    );
}