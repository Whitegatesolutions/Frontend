import React, {FC, useState, useEffect, useContext} from 'react';
import { Constants } from '../../utils/constants';
import Image from 'next/image';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';
import { ThemeContext } from '../context/themeContext';


type Props={
    children : JSX.Element,
};
//https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940

const AuthLayoutComponent :FC<Props> = ({children}) : JSX.Element => {

    //const {theme, setTheme} = useContext(ThemeContext);
    // const [theme, setTheme] = useState<boolean>(false);

    // const toggleTheme = () : void => {
    //     setTheme(!theme);
    // }

    // useEffect(() => {
    //     if(theme){
    //         localStorage.setItem('theme', 'dark');
    //     }
    //     else localStorage.setItem('theme', 'light');
    //     appTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    // },[theme]);

    return(
        <div className="w-full h-auto flex flex-col lg:flex-row overflow-x-hidden">
            <div className='lg:w-1/2 hidden lg:flex'>
                <div className='h-screen overflow-hidden container'>
                    <div className='w-full h-screen content'>
                        {/* <Image src={Constants.GIRL_LAWYER} width={"100%"} height="100%" layout='responsive' alt=''/> */}
                        <object data={Constants.GIRL_LAWYER} width="100%" height="100%" className='object-cover'/>
                    </div>
                    <div className='overlay bg-[#6157A0] bg-opacity-30'/>
                </div>
            </div>
            <div className='w-full bg-white lg:w-1/2 h-auto lg:max-h-screen lg:overflow-y-auto'>
            {/* <div className={
               theme && theme === 'dark' ?'w-full lg:w-1/2 h-auto lg:max-h-screen lg:overflow-y-auto dark' 
                :'light w-full lg:w-1/2 h-auto lg:max-h-screen lg:overflow-y-auto'}>
                <div className='flex justify-end px-8 pt-4'>
                    <IconButton onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                        {theme && theme === 'dark' ?<LightModeIcon sx={{color : '#eee'}}/> :<DarkModeIcon sx={{color : '#303030'}}/>}
                    </IconButton>
                </div> */}
                {children}
            </div>
        </div>
    );
}

export default AuthLayoutComponent;