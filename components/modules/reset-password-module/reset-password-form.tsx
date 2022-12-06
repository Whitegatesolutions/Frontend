import { AxiosError } from 'axios';
import Link from 'next/link';
import React from 'react';
import { postAxiosRequest } from '../../../utils/axios-requests';
import { AxiosRequestInterface, Constants, ErrorInterfaceObj } from '../../../utils/constants';
import { validatePassword } from '../../../utils/util-functions';
import { useRouter, NextRouter } from 'next/router';
import { Alert, CircularProgress, IconButton, Tooltip } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


const initialErrorObj : ErrorInterfaceObj = {
    msg : '',
    isError : false
};

export const ResetPasswordForm = () : JSX.Element => {

    const [password, setPassword] = React.useState({
        temporaryPassword : '',
        newPassword : '',
        confirmNewPassword : ''
    });
    const [boolStates, setBooleanStates] = React.useState({
        rememberMe : false,
        viewPrevious : false,
        viewNewPassword :false,
        viewConfirmPassword : false
    });
    const [temporaryPasswordError, setTempPassword] = React.useState<ErrorInterfaceObj>({...initialErrorObj});
    const [newPassword, setNewPassword] = React.useState<ErrorInterfaceObj>({...initialErrorObj});
    const [confirmPassword, setConfirmPassword] = React.useState<ErrorInterfaceObj>({...initialErrorObj});
    const [axiosResponse, setAxiosResponse] = React.useState<ErrorInterfaceObj>(initialErrorObj);
    const [loader, setLoaderState] =  React.useState<boolean>(false);
    const router : NextRouter = useRouter();

    const onChangeTemporaryPasswordHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validatePassword(value)){
            setPassword({...password, temporaryPassword : value});
           setTempPassword({...temporaryPasswordError, isError : false, msg : ''}); 
        }else {
            setTempPassword({...temporaryPasswordError, msg : Constants.PASSWORD_REQUIREMENT, isError : value.length > 1 && true}); 
        } 
    }

    const onChangeNewPasswordHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validatePassword(value)){
            setPassword({...password, newPassword : value});
            setNewPassword({...newPassword,isError : false, msg : ''}); 
        }else {
            setNewPassword({...newPassword, 
            msg : 'Password length must be at least 8 characters, must contain upper and lowercase alphabets,special character', 
            isError : value.length > 1 && true}); 
        } 
    }
    const onChangeConfirmPassword = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(password.newPassword === value){
            setPassword({...password, confirmNewPassword : value});
            setConfirmPassword({...confirmPassword,isError : false, msg : ''}); 
        }else {
            setConfirmPassword({...confirmPassword, msg : 'Passwords do not match', isError : value.length > 1 && true}); 
        } 
    }
    // const onSubmitHandler = async (e : React.SyntheticEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(password);
    //     const {temporaryPassword, newPassword, confirmNewPassword} = password;

    //     const resetPasswordRequestObj : AxiosRequestInterface = {
    //         uri : 'user/change-account-password',
    //         body : {
    //             currentPassword : temporaryPassword,
    //             newPassword : newPassword === confirmNewPassword && confirmNewPassword
    //         }
    //     };
    //     console.log(resetPasswordRequestObj);
    //     setLoaderState(true);
        
    //     await postAxiosRequest(resetPasswordRequestObj)
    //     .then((response) => {

    //         const {success, message, code} = response.data;
    //         if(success && code === 200){
    //             setLoaderState(false);
    //             alert(message);
    //             router.push('/login');
    //         }

    //     }).catch((error : AxiosError) => {
    //         if(error.isAxiosError){
    //             setLoaderState(false);
    //             const {data : {success, message, code} } = error.response as any;
    //             if(!success && code !== 200){
    //                 alert(message);
    //             }
    //         }
    //     });
    // }
    
    const onSubmitHandler = async (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(password);
        const uniqueCode : string | null = localStorage.getItem('unique');
     
        const {newPassword, confirmNewPassword} = password;

        const resetPasswordRequestObj : AxiosRequestInterface = {
            uri : 'user/verification/change-password',
            body : {
                uniqueVerificationCode : uniqueCode && uniqueCode,
                newPassword : newPassword === confirmNewPassword && confirmNewPassword
            }
        };
        console.log(resetPasswordRequestObj);
        setLoaderState(true);
        
        await postAxiosRequest(resetPasswordRequestObj)
        .then((response) => {

            const {success, message, code} = response.data;
            if(success && code === 200){
                setLoaderState(false);
                //alert(message);
                setAxiosResponse({...axiosResponse, msg : message, isError: false});
                setTimeout(() => {
                    router.push('/login');
                },3000);
            }

        }).catch((error : AxiosError) => {
            if(error.isAxiosError){
                setLoaderState(false);
                const {data : {success, message, code} } = error.response as any;
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
        if(password.confirmNewPassword && password.newPassword !== password.confirmNewPassword){
            setConfirmPassword({...confirmPassword, msg : 'Passwords do not match', isError : true}); 
        }else{
            setConfirmPassword({...confirmPassword, isError : false}); 
        }
    },[password]);
    
    return(
        <div className='w-full flex justify-center items-center'>
            <div className='w-4/5 my-12 p-4 md:p-8'>
                <p className='text-4xl font-bold py-2 capitalize'>Reset your password?</p>
                <p className='text-lg font-semibold pb-4'>Put your temporary password and the new password</p>

                <Alert 
                    severity={axiosResponse.isError ? "error" : "success"} 
                    sx={{margin:0, borderRadius : '10px',visibility : `${axiosResponse.msg ? 'visible' : 'hidden'}`}}>{axiosResponse.msg}
                </Alert>

                <div className='my-4'>
                    <form onSubmit={onSubmitHandler}>
                        <div className='flex flex-col mb-2'>
                            {/* <Tooltip title={temporaryPasswordError.msg} arrow> */}
                                <div className='flex flex-col mb-2'>
                                    <p className='capitalize font-bold text-xs'>Temporary password</p>
                                    <div  className={"text-black w-full rounded-md border border-[#CBCBCB] text-sm my-4 flex justify-between items-center" }>

                                        <input type={boolStates.viewPrevious ? "text" :"password"} 
                                            className="px-4 py-2.5 rounded-md w-10/12"
                                            required
                                            //placeholder='Enter previous password'
                                            onChange={(e) => onChangeTemporaryPasswordHandler(e)}/>

                                        <IconButton onClick={() => setBooleanStates({...boolStates, viewPrevious : !boolStates.viewPrevious})}>
                                            {boolStates.viewPrevious ? <VisibilityOffOutlinedIcon sx={{
                                                color : '#000'
                                            }}/> : <RemoveRedEyeOutlinedIcon
                                            sx={{
                                                color : '#000'
                                            }}/>}
                                        </IconButton>
                                        
                                    </div>
                                </div>
                            {/* </Tooltip> */}
                            {/* <input type={"text"} 
                            className={temporaryPasswordError.isError
                                ? "text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-4 mb-2"
                                :"w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" }
                            required
                            placeholder='Enter previous password'
                            onChange={(e) => onChangeTemporaryPasswordHandler(e)}/>
                            {temporaryPasswordError.isError && <span className='text-xs text-[#DC143C]'>{temporaryPasswordError.msg}</span>} */}
                        </div>

                        <div className='flex flex-col mb-2'>
                            <Tooltip title={newPassword.msg} arrow>
                                <div className='flex flex-col mb-2'>
                                    <p className='capitalize font-bold text-xs'>New password</p>
                                    <div  className={newPassword.isError
                                            ? "text-[#DC143C] w-full flex justify-between items-center rounded-md my-4 border border-[#DC143C] text-sm"
                                            :"text-black w-full rounded-md border border-[#CBCBCB] text-sm my-4 flex justify-between items-center" }>

                                        <input type={boolStates.viewNewPassword ? "text" :"password"} 
                                            className="px-4 py-2.5 rounded-md w-10/12"
                                            required
                                            //placeholder='Enter New Password'
                                            onChange={(e) => onChangeNewPasswordHandler(e)}/>

                                        <IconButton onClick={() => setBooleanStates({...boolStates, viewNewPassword : !boolStates.viewNewPassword})}>
                                            {boolStates.viewNewPassword ? <VisibilityOffOutlinedIcon sx={{
                                                color : '#000'
                                            }}/> : <RemoveRedEyeOutlinedIcon
                                            sx={{
                                                color : '#000'
                                            }}/>}
                                        </IconButton>
                                        
                                    </div>
                                </div>
                            </Tooltip>
                            {/* <input type={"text"} 
                            className={newPassword.isError
                                ? "text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-4 mb-2"
                                :"w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" }
                            required
                            placeholder="Enter New Password"
                            onChange={(e) => onChangeNewPasswordHandler(e)}/>
                            
                            {newPassword.isError && <span className='text-xs text-[#DC143C]'>{newPassword.msg}</span>} */}
                        </div>

                        <div className='flex flex-col mb-2'>
                            <Tooltip title={confirmPassword.msg} arrow>
                                <div className='flex flex-col mb-2'>
                                    <p className='capitalize font-bold text-xs'>Confirm password</p>
                                    <div  className={confirmPassword.isError
                                            ? "text-[#DC143C] w-full flex justify-between items-center rounded-md my-4 border border-[#DC143C] text-sm"
                                            :"text-black w-full rounded-md border border-[#CBCBCB] text-sm my-4 flex justify-between items-center" }>

                                        <input type={boolStates.viewConfirmPassword ? "text" :"password"} 
                                            className="px-4 py-2.5 rounded-md w-10/12"
                                            required
                                            //placeholder='Confirm New Password'
                                            onChange={(e) => onChangeConfirmPassword(e)}/>

                                        <IconButton onClick={() => setBooleanStates({...boolStates, viewConfirmPassword : !boolStates.viewConfirmPassword})}>
                                            {boolStates.viewConfirmPassword ? <VisibilityOffOutlinedIcon sx={{
                                                color : '#000'
                                            }}/> : <RemoveRedEyeOutlinedIcon
                                            sx={{
                                                color : '#000'
                                            }}/>}
                                        </IconButton>
                                        
                                    </div>
                                </div>
                            </Tooltip>
                            {/* <input type={"text"} 
                            className={confirmPassword.isError
                                ? "text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-4 mb-2"
                                :"w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" }
                            required
                            placeholder="Confirm New Password"
                            onChange={(e) => onChangeConfirmPassword(e)}/>
                            {confirmPassword.isError && <span className='text-xs text-[#DC143C]'>{confirmPassword.msg}</span>} */}
                        </div>

                        <button type={"submit"}
                        disabled={
                        validatePassword(password.temporaryPassword) && !temporaryPasswordError.isError
                        && validatePassword(password.newPassword) && !newPassword.isError
                        && validatePassword(password.confirmNewPassword) && !confirmPassword.isError 
                        && !loader
                        ?false : true}
                        className="w-full p-3 text-white text-xs bg-[#6157A0] 
                        rounded-md my-2 cursor-pointer hover:shadow-lg 
                        transition-shadow duration-300 delay-200 
                        flex justify-center items-center gap-4
                        disabled:bg-[#EFF0F6] 
                        disabled:shadow-none 
                        disabled:text-gray-500 disabled:cursor-default">
                            {loader && <CircularProgress size={'1rem'} sx={{color : 'rgb(203 213 225)'}}/>} 
                            {loader ? "Please Wait" : "Submit"}
                        </button>
                        {/* <input type={"submit"}
                        value="Submit"
                        className={validatePassword(password.temporaryPassword) && !temporaryPasswordError.isError
                            && validatePassword(password.newPassword) && !newPassword.isError
                            && validatePassword(password.confirmNewPassword) && !confirmPassword.isError 
                            ?"w-full p-3 text-[#fff] text-xs bg-[#6157A0] rounded-md my-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 delay-200"
                            :"w-full p-3 bg-[#EFF0F6] text-xs text-gray-500 rounded-md my-2"}
                        /> */}
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