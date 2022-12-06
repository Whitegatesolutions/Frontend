import { AxiosError } from 'axios';
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import { postAxiosRequest } from '../../../utils/axios-requests';
import { AxiosRequestInterface, Constants, ErrorInterfaceObj, SignPersonInterface } from '../../../utils/constants';
import { validateEmail, validatePassword, validatePhoneNumber } from '../../../utils/util-functions';
import { ReactSpinnerLoader } from '../../shared-components/react-spinner-loader';
import { useRouter, NextRouter } from 'next/router';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Alert, CircularProgress, IconButton, Tooltip } from '@mui/material';


const initialState : SignPersonInterface = {
    firstName : '',
    lastName : '',
    email : '',
    phoneNumber : '',
    password : ''
};

const initialErrorObj : ErrorInterfaceObj = {
    msg : '',
    isError : false,
};


export const SignUpForm = () : JSX.Element => {

    const [personState, setState] = useState<SignPersonInterface>({...initialState});
    const [invalidEmail, setErrorState] = useState<ErrorInterfaceObj>({...initialErrorObj});
    const [phoneError,setPhoneNumberError] = useState<ErrorInterfaceObj>({...initialErrorObj});
    const [passwordError,setPasswordError] = useState<ErrorInterfaceObj>({...initialErrorObj});
    const [confirmPasswordError,setConfirmPasswordError] = useState<ErrorInterfaceObj>({...initialErrorObj});
    const [tempPassword, setTempPassword] = useState<string>('');
    //const [confirm, setConfirm] = useState<string>('');
    const [releaseButton, setButtonRelease] = useState({loader : false, checked : false});
    const [boolStates, setBooleanStates] = React.useState({
        rememberMe : false,
        viewPassword : false,
        viewConfirmPassword : false
    });
    const [axiosResponse, setAxiosResponse] = React.useState<ErrorInterfaceObj>(initialErrorObj);
    const router : NextRouter = useRouter();

    const firstNameOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        setState({...personState, firstName : value});
    }

    const lastNameOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        setState({...personState, lastName : value});
    }

    const emailOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validateEmail(value)){
            setState({...personState, email : value});
            setErrorState({...invalidEmail, msg : '', isError : false}); 
        }else {
            setErrorState({...invalidEmail, msg     
            : 'Invalid Email Address', isError : value.length > 1 && true}); 
        }  
    }

    const phoneNumberOnChangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        //regex for validating phone number
        if(validatePhoneNumber(value)) {
            setState({...personState, phoneNumber : value});
            setPhoneNumberError({...passwordError, msg:'', isError : false});
        }
        else {
            setPhoneNumberError({...phoneError, msg:'Invalid Phone Number', isError : value.length > 1 && true});
        }
    }

    const setPasswordOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validatePassword(value)){
            setTempPassword(value);
            setPasswordError({...passwordError,msg : '', isError : false});
        }
        else setPasswordError({...passwordError,
            msg : Constants.PASSWORD_REQUIREMENT,
            isError : value.length > 1 && true}
        );
    }

    
    const confirmPasswordOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        setState({...personState, password : value});
    }

    const onSignUpFormSubmitHandler = async (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {firstName, lastName, email, phoneNumber,password} = personState;
        const axiosRequestObject : AxiosRequestInterface = {
            uri : 'user/sign-up',
            body : {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                role : "CUSTOMER"
            }
        }
        setButtonRelease({...releaseButton, loader : true});
        await postAxiosRequest(axiosRequestObject).then((response) => {
            const {data, code, success,message} = response.data;
            
            if(success && code === 200){
                const { token,tokenExpiryDate,tokenInitializationDate,userId } = data;
                if(token && userId){
                    //display successful message, then proceed to new registration
                    localStorage.setItem('token',token);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('tokenInitializationDate',tokenInitializationDate);
                    localStorage.setItem('tokenExpiryDate',tokenExpiryDate);
                    setButtonRelease({...releaseButton, loader : false});
                    //alert(message);
                    //store token and co inside localHost
                    setAxiosResponse({...axiosResponse, msg : message, isError: false});
                    setTimeout(() => {
                        router.push('/new-registration');
                    },3000);
                    //router.push('/verify-account');
                }
            }
 
        }).catch((error : AxiosError) => {
            if(error?.isAxiosError){
                const {success, code ,message} = error.response?.data as any;

                if(!success && code !== 200){
                    //handle error
                    setButtonRelease({...releaseButton, loader : false});
                    setAxiosResponse({...axiosResponse, msg : message, isError : true});
                    setTimeout(() => {
                        setAxiosResponse({...axiosResponse, msg : "", isError : false});
                    },4000);
                    //alert(message);
                }
            }
        });
    }
    useEffect(() => {

        if(tempPassword !== personState.password || personState.password !== tempPassword){
            setConfirmPasswordError({...passwordError,msg: "Passwords do not match", isError : true});
        }else{
            setConfirmPasswordError({...passwordError, msg: "", isError : false});
        }
    },[personState,tempPassword]);
    //transition duration-300 delay-200
    return(
        <div className='w-full flex justify-center items-center'>
            <div className='w-4/5 p-4 md:p-8'>
                <p className='text-4xl font-bold pt-6 pb-4'>Welcome to your 
                <br/>
                Compliance Assistant</p>
                
                <Alert 
                    severity={axiosResponse.isError ? "error" : "success"} 
                    sx={{margin :0, borderRadius : '10px',visibility : `${axiosResponse.msg ? 'visible' : 'hidden'}`}}>{axiosResponse.msg}
                </Alert>

                <div className='mb-8 mt-4'>
                    <form onSubmit={onSignUpFormSubmitHandler}>
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>First Name</p>
                            <input type={"text"} 
                            className="text-black w-full py-2.5 px-4 rounded-md border border-[#CBCBCB] text-sm my-3" 
                            required
                            //placeholder='Enter your first name'
                            onChange={(e) =>firstNameOnchangeHandler(e)}/>
                        </div>
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>Last Name</p>
                            <input type={"text"} 
                            className="text-black w-full py-2.5 px-4 rounded-md border border-[#CBCBCB] text-sm my-3" 
                            required
                            //placeholder='Enter your last name'
                            onChange={(e) => lastNameOnchangeHandler(e)}/>
                        </div>

                        <Tooltip title={invalidEmail.msg} arrow>
                            <div className='flex flex-col mb-2'>
                                <p className='capitalize font-bold text-xs'>Email Address</p>
                                <input type={"email"} 
                                className={invalidEmail.isError
                                    ? "text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm my-3"
                                    :"text-black w-full py-2.5 px-4 rounded-md border border-[#CBCBCB] text-sm my-3" }
                                required
                                //placeholder='Enter your email'
                                onChange={(e) => emailOnchangeHandler(e)}/>
                                {/* {invalidEmail.isError && <span className='text-xs text-[#DC143C]'>{invalidEmail.msg}</span>} */}
                            </div>
                        </Tooltip>

                        <Tooltip title={phoneError.msg} arrow>
                            <div className='flex flex-col mb-2'>
                                <p className='capitalize font-bold text-xs'>Phone Number</p>
                                <input type={"text"} 
                                className={phoneError.isError
                                    ?"text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm my-3"
                                    :"text-black w-full py-2.5 px-4 rounded-md border border-[#CBCBCB] text-sm my-3" }
                                required
                                maxLength={11}
                                //placeholder='Enter your phone number'
                                onChange={(e) => phoneNumberOnChangeHandler(e)}/>
                                {/* {phoneError.isError && <span className='text-xs text-[#DC143C]'>{phoneError.msg}</span>} */}
                            </div>
                        </Tooltip>

                        <Tooltip title={passwordError.msg} arrow>
                            <div className='flex flex-col mb-2'>
                                <p className='capitalize font-bold text-xs'>set password</p>
                                <div  className={passwordError.isError
                                        ? "text-[#DC143C] w-full flex justify-between items-center rounded-md my-4 border border-[#DC143C] text-sm"
                                        :"text-black w-full rounded-md border border-[#CBCBCB] text-sm my-4 flex justify-between items-center" }>

                                    <input type={boolStates.viewPassword ? "text" :"password"} 
                                        className="px-4 py-2.5 rounded-md w-10/12"
                                        required
                                       // placeholder='Set your Password'
                                        onChange={(e) => setPasswordOnchangeHandler(e)}/>

                                    <IconButton onClick={() => setBooleanStates({...boolStates, viewPassword : !boolStates.viewPassword})}>
                                        {boolStates.viewPassword ? <VisibilityOffOutlinedIcon sx={{
                                            color : '#000'
                                        }}/> : <RemoveRedEyeOutlinedIcon
                                        sx={{
                                            color : '#000'
                                        }}/>}
                                    </IconButton>
                                    
                                </div>
                                {/* {passwordError.isError && <span className='text-xs text-[#DC143C]'>{passwordError.msg}</span>} */}
                            </div>
                        </Tooltip>
                        
                        <Tooltip title={confirmPasswordError.msg} arrow>
                            <div className='flex flex-col mb-2'>
                                <p className='capitalize font-bold text-xs'>confirm password</p>
                                <div  className={confirmPasswordError.isError
                                        ? "text-[#DC143C] w-full flex justify-between items-center rounded-md my-4 border border-[#DC143C] text-sm"
                                        :"text-black w-full rounded-md border border-[#CBCBCB] text-sm my-4 flex justify-between items-center" }>

                                    <input type={boolStates.viewConfirmPassword ? "text" :"password"} 
                                        className="px-4 py-2.5 rounded-md w-10/12"
                                        required
                                        //placeholder='Confirm set password'
                                        onChange={(e) => confirmPasswordOnchangeHandler(e)}/>

                                    <IconButton onClick={() => setBooleanStates({...boolStates, viewConfirmPassword : !boolStates.viewConfirmPassword})}>
                                        {boolStates.viewConfirmPassword ? <VisibilityOffOutlinedIcon sx={{
                                            color : '#000'
                                        }}/> : <RemoveRedEyeOutlinedIcon
                                        sx={{
                                            color : '#000'
                                        }}/>}
                                    </IconButton>
                                    
                                </div>
                                {/* {confirmPasswordError.isError && <span className='text-xs text-[#DC143C]'>{confirmPasswordError.msg}</span>}  */}
                            </div>
                        </Tooltip>
                        
                        <div className='my-1 text-xs font-bold'>
                            <div className='flex flex-row items-center gap-2'>
                                <input type={"checkbox"} onChange={(e) => setButtonRelease({...releaseButton, checked : e.target.checked})}/>
                                <span className=''>I agree to the terms and conditions</span>
                            </div>
                        </div>

                        <button type={"submit"}
                        disabled={personState.firstName
                            && personState.lastName 
                            && validateEmail(personState.email)
                            && validatePhoneNumber(personState.phoneNumber)
                            && personState.password
                            && releaseButton.checked
                            && !releaseButton.loader
                        ?false : true}
                        className="w-full p-3 text-white text-xs bg-[#6157A0] 
                        rounded-md my-2 cursor-pointer hover:shadow-lg 
                        transition-shadow duration-300 delay-200 
                        flex justify-center items-center gap-4
                        disabled:bg-[#EFF0F6] 
                        disabled:shadow-none 
                        disabled:text-gray-500 disabled:cursor-default">
                            {releaseButton.loader  && <CircularProgress size={'1rem'} sx={{color : 'rgb(203 213 225)'}}/>} 
                            {releaseButton.loader  ? "Please Wait" : "Register"}
                        </button>

                        {/* <input type={"submit"}
                        value="Register"
                        className={personState.firstName
                            && personState.lastName 
                            && personState.email
                            && personState.phoneNumber
                            && confirm
                            && releaseButton.checked
                        ? "w-full p-3 text-[#fff] text-xs bg-[#6157A0] rounded-md my-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 delay-200" 
                        :"w-full p-3 bg-[#EFF0F6] text-xs text-gray-500 rounded-md my-2"}
                        /> */}
                    </form>

                    <div className='text-center text-xs font-semibold'>
                        <p>Already have an account?&nbsp;
                        <Link href={'/login'} passHref>
                            <span className='text-[#6157A0] hover:text-blue-500 cursor-pointer font-bold'>Login</span>
                        </Link>
                        </p>
                        
                    </div>
                </div>
            </div>
            {/* {&& <ReactSpinnerLoader/>} */}
        </div>
    );
}