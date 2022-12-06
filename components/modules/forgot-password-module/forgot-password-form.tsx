import { AxiosError } from 'axios';
import Link from 'next/link';
import React from 'react';
import { getAxiosRequest } from '../../../utils/axios-requests';
import { ErrorInterfaceObj } from '../../../utils/constants';
import { validateEmail } from '../../../utils/util-functions';
import { NextRouter, useRouter } from 'next/router';
import { ReactSpinnerLoader } from '../../shared-components/react-spinner-loader';
import { Alert, CircularProgress, Tooltip } from '@mui/material';

const initialErrorObj : ErrorInterfaceObj = {
    msg : '',
    isError : false,
};

export const ForgotPasswordForm = () : JSX.Element => {
    const [email, setEmail] = React.useState<string>('');
    const [emailError, setEmailError] = React.useState({...initialErrorObj});
    const [axiosResponse, setAxiosResponse] = React.useState<ErrorInterfaceObj>(initialErrorObj);
    const [loader, setLoaderState] = React.useState<boolean>(false);
    const router : NextRouter = useRouter();

    const emailOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validateEmail(value)){
            setEmail(value);
            setEmailError({...emailError, msg : '', isError : false}); 
        }else {
            setEmailError({...emailError, msg : 'Email must be valid', isError : value.length > 1 && true}); 
        }  
    }
    
    const onSubmitHandler = async (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const forgotPasswordRequestObject = {
            uri : `user/verification/initiate-forgot-password-flow/${email}`
        }
        setLoaderState(true);
        await getAxiosRequest(forgotPasswordRequestObject.uri)
        .then((response) => {
            const {data : {data,success, code, message}} = response;
            setLoaderState(false);
            if(success && code === 200){
                setAxiosResponse({...axiosResponse, msg : message, isError : false});
               
                setTimeout(() => {
                    router.push('/otp-verification');
                },3000);
            }
        }).catch((error : AxiosError) => {
            setLoaderState(false);
            if(error.isAxiosError){
                const {data : {success, message,code}} = error.response as any;
                if(!success && code !== 200){
                    //alert(message);
                    setAxiosResponse({...axiosResponse, msg : message, isError : true});
                    setTimeout(() => {
                        setAxiosResponse({...axiosResponse, msg : "", isError : false});
                    },4000);
                }
            }
        });
    }

    React.useEffect(() => {},[email]);

    return(
        <div className='w-full flex justify-center items-center'>
            <div className='w-4/5 my-8 p-4 md:p-8'>
                <p className='text-4xl font-bold py-2 capitalize'>Forgot your password?</p>
                <p className='text-lg font-semibold pb-4'>Provide us with your e-mail address</p>

                <Alert 
                    severity={axiosResponse.isError ? "error" : "success"} 
                    sx={{margin:0, borderRadius : '10px',visibility : `${axiosResponse.msg ? 'visible' : 'hidden'}`}}>{axiosResponse.msg}
                </Alert>

                <div className='my-4'>

                    <form onSubmit={onSubmitHandler}>
                        <Tooltip title={emailError.msg} arrow>
                            <div className='flex flex-col mb-2'>
                                <p className='capitalize font-bold text-xs'>E-mail Address</p>
                                <input type={"email"} 
                                className={emailError.isError 
                                    ? "text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm my-4"
                                    :"w-full py-2.5 px-4 rounded-md border border-[#CBCBCB] text-sm my-4" }
                                required
                               // placeholder='Enter your Email'
                                onChange={(e) => emailOnchangeHandler(e)}
                                />
                                {/* {emailError.isError && <span className='text-xs text-[#DC143C]'>{emailError.msg}</span>} */}
                            </div>
                        </Tooltip>

                        {/* <input type={"submit"}
                        value="Reset Password"
                        className={validateEmail(email) && !emailError.isError
                            ?"w-full p-3 text-[#fff] text-xs bg-[#6157A0] rounded-md my-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 delay-200"
                            :"w-full p-3 bg-[#EFF0F6] text-xs text-gray-500 rounded-md my-2"}
                        /> */}
                        <button type={"submit"}
                        disabled={validateEmail(email) && !loader && !emailError.isError ?false : true}
                        className="w-full p-3 text-white text-xs bg-[#6157A0] 
                        rounded-md my-2 cursor-pointer hover:shadow-lg 
                        transition-shadow duration-300 delay-200 
                        disabled:bg-[#EFF0F6] 
                        flex justify-center items-center gap-4
                        disabled:shadow-none 
                        disabled:text-gray-500 disabled:cursor-default"
                        >
                         {loader && <CircularProgress size={'1rem'} sx={{color : 'rgb(203 213 225)'}}/>} 
                         {loader ? "Please Wait" : "Reset Password"}
                        </button>
                    </form>

                    <div className='text-center p-4 text-xs font-semibold'>
                        <p>Do you remember your password?&nbsp;
                        <Link href={'/login'} passHref>
                            <span className='text-[#6157A0] hover:text-blue-500 cursor-pointer font-bold'>Log&nbsp;In</span>
                        </Link>
                        </p>
                        
                    </div>
                </div>
            </div>
            {/* {loader && <ReactSpinnerLoader/>} */}
        </div>
    );
}