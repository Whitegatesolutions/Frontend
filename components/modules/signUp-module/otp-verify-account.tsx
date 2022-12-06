import React, {useState, useEffect} from 'react';
import { Alert, CircularProgress, IconButton } from '@mui/material';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {NextRouter, useRouter} from 'next/router';
import Link from 'next/link';
import { getAxiosRequest, getAxiosRequestWithAuthorizationHeader } from '../../../utils/axios-requests';
import { AxiosError } from 'axios';
import { ReactSpinnerLoader } from '../../shared-components/react-spinner-loader';
import { ErrorInterfaceObj } from '../../../utils/constants';

let currentOTPIndex : number = 0;
let otpString : string = '';

export const SignUpOtpComponent = () : JSX.Element => {

    const router : NextRouter = useRouter();

    const [otp, setOTP]  = useState<string[]>(new Array(6).fill(""));
   // const [stringOtp, setOTPString]  = useState<string>("");
    const [activeOtpIndex, setActiveOtpIndex] = React.useState<number>(0);
    const [loader, setLoaderState] = React.useState<boolean>(false);
    const [resendLoader, setLoader] = React.useState<boolean>(false);
    const [axiosResponse, setAxiosResponse] = React.useState<ErrorInterfaceObj>({
        msg : '',
        isError : false
    });
    
    const otpRef : React.MutableRefObject<any> = React.useRef(null);

    const handleOtpInputChange = ({target} : React.ChangeEvent<HTMLInputElement>) :void => {
        const { value } = target;
        //getting the last value inside the index; and updating the otp value array using the index from the map
       const newOTP = [...otp];
       newOTP[currentOTPIndex] = value.substring(value.length- 1);
       //if statement to determine if input will forward focus or backward focus
        if(!value) setActiveOtpIndex(currentOTPIndex - 1);
        else  setActiveOtpIndex(currentOTPIndex + 1);
       setOTP(newOTP); 
    }

    const handleKeyEvent = ({key} : React.KeyboardEvent<HTMLInputElement>, index : number) :void =>{
        currentOTPIndex = index;
        if(key === "Backspace") setActiveOtpIndex(currentOTPIndex - 1);
    }

    const goBackHandler = () : void =>{
        router.back();
    } 
    
    const isArrayFull = (otpArray : string[]) : boolean => {
        const array: string[] = [];
        let isFull : boolean = false;

        for(let i=0; i< otpArray.length; i++){
            if(otpArray[i] !== ""){
                array.push(otpArray[i]);
                otpString.concat(otpArray[i]);
            }
        }
        //setOTPString(otpString);
        if(array.length === 6){
            isFull = true;
            return isFull;
        }
        return isFull;
    } 


    const onSubmitHandlerSignUpForm = async(e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(otpString);
        const sendOtpRequestObject = {
            uri : `user/verification/verify-signup-code/${otp.join('').toString()}`
        }
        setLoaderState(true);
        await getAxiosRequestWithAuthorizationHeader(sendOtpRequestObject.uri)
        .then((response) => {
            const {success, message, code} = response.data;
            if(success && code === 200){
                setLoaderState(false);
                //alert(message);
                localStorage.setItem('message', "You have successfully created and verified your account");
                setAxiosResponse({...axiosResponse, msg : message, isError : false});
                setTimeout(() => {
                    router.push('/view-status');
                },2000);
            }
        }).catch((error : AxiosError) => {
            setLoaderState(false);
            if(error?.isAxiosError){
                const {data : {success, code, message}} = error.response as any;
                if(!success && code !== 200){
                   // alert(message);
                    setAxiosResponse({...axiosResponse, msg : message, isError : true});
                    setTimeout(() => {
                        setAxiosResponse({...axiosResponse, msg : "", isError : false});
                    },4000);
                }
            }
        });
    }

    const onClickResendOTPHandler = async() => {
        
        let userId :string|null = localStorage.getItem('userId');

        const resendOtpObject = {
            uri : `user/resend-otp-code/${userId && userId}`
        }
        setLoader(true);
        await getAxiosRequest(resendOtpObject.uri)
        .then((response) => {
            const {success, message, code} = response.data;

            if(success && code === 200){
                setLoader(false);
                //alert(message);
                setAxiosResponse({...axiosResponse, msg : message, isError : false});
                setTimeout(() => {
                    setAxiosResponse({...axiosResponse, msg : "", isError : false});
                },2000);
            }
        }).catch((err : AxiosError) => {
            setLoader(false);
            if(err?.isAxiosError){
                const {data : {success, code, message}} = err.response as any;
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
    React.useEffect(() => {
        otpRef.current?.focus();

    },[activeOtpIndex]);


    return(
        <div className='w-full flex justify-center items-center'>
            <div className='w-4/5 py-8 sm:py-0 md:p-6 lg:p-8'>
                <div className='w-full h-auto flex justify-start'>
                    {/* icon */}
                    <IconButton onClick={goBackHandler}>
                        <ArrowBackRoundedIcon sx={{color : '#6157A0', fontSize : '30px'}}/>
                    </IconButton>
                </div>

                <div className='my-20'>
                    <p className='text-4xl font-bold py-2 capitalize'>Verification</p>
                    <p className='text-lg font-semibold pb-4'>Please type in the One-Time password sent to your email to verify your account</p>

                    <Alert 
                        severity={axiosResponse.isError ? "error" : "success"} 
                        sx={{margin:0, borderRadius : '10px',visibility : `${axiosResponse.msg ? 'visible' : 'hidden'}`}}>{axiosResponse.msg}
                    </Alert>

                    <form onSubmit={onSubmitHandlerSignUpForm}>
                    
                        <div className='w-full flex flex-row gap-2 md:gap-4 lg:gap-6 xl:gap-8 items-center'>
                        {
                        otp && otp.map((_, index : number) =>

                            <input type="text" 
                            key={index}
                            onChange={(e) => handleOtpInputChange(e)}
                            className='w-10 md:w-12 p-2.5 rounded-md 
                            border border-[#303030] my-12
                            focus:border-[#6157A0]
                            text-lg text-black font-semibold text-center'
                            ref={index === activeOtpIndex ? otpRef : null}
                            value={otp[index]}
                            onKeyDown={(e) => handleKeyEvent(e, index)}/>
                        )}
                        </div>
                        {/* <input type={"submit"}
                        value="Proceed"
                        className={isArrayFull(otp)
                            ?"w-full p-3 text-[#fff] text-xs bg-[#6157A0] rounded-md my-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 delay-200"
                            :"w-full p-3 bg-[#EFF0F6] text-xs text-gray-500 rounded-md my-2"}
                        /> */}
                        <button type={"submit"}
                        disabled={isArrayFull(otp) && !loader && !resendLoader ? false : true}
                        className="w-full p-3 text-white text-xs bg-[#6157A0] 
                        rounded-md my-2 cursor-pointer hover:shadow-lg 
                        transition-shadow duration-300 delay-200 
                        flex justify-center items-center gap-4
                        disabled:bg-[#EFF0F6] 
                        disabled:shadow-none 
                        disabled:text-gray-500 disabled:cursor-default">
                            {loader || resendLoader && <CircularProgress size={'1rem'} sx={{color : 'rgb(203 213 225)'}}/>} 
                            {loader || resendLoader ? "Please Wait" : "Proceed"}
                        </button>
                    </form>

                    <div className='text-center p-4 text-xs font-semibold'>
                        <p>Did&apos;nt get a One-Time password?&nbsp;
                        <button className='text-[#6157A0] font-bold border-none hover:text-blue-500' onClick={onClickResendOTPHandler}>
                            <span>ResendOTP</span>
                        </button>
                        </p>
                        
                    </div>
                    
                </div>
                {/* {loader && <ReactSpinnerLoader/>}
                {resendLoader && <ReactSpinnerLoader/>} */}
            </div>

        </div>
    );
}