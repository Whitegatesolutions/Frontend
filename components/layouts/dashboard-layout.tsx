import { Avatar } from '@mui/material';
import React, {FC,Fragment} from 'react';  
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { NextRouter, useRouter } from 'next/router';
import { TailwindCssStyles } from '../../utils/tailwindStyles';
import { DashboardTopBar } from './dashboard-top-bar';
import { SidebarElementValuesObject } from '../../utils/constants';
import { SideBarNavigation } from './dashboard-sidebar';



const UserSideNavigationValues : SidebarElementValuesObject = {
    firstName : 'Oluwadamilola',
    lastName : 'Adeyemi',
    image : '/static-img.png',
    body : [
        {
            
            icon : <ControlPointRoundedIcon sx={{fontSize : '18px'}}/>,
            link : '/new-registration',
            title : 'New Registration'
        },
        {
            icon : <BusinessCenterOutlinedIcon sx={{fontSize : '18px'}}/>,
            link : '/my-businesses',
            title : 'My Businesses'
        }
    ]
};
export const returnValues = () :SidebarElementValuesObject => {
    return UserSideNavigationValues;
}

type Props={
    children : JSX.Element;
}
const DashboardLayout : FC<Props> = ({children}) => {
    
    const router : NextRouter = useRouter();
    //const style = 'w-full flex justify-center text-base font-semibold cursor-pointer bg-white text-[#6157A0]';
    return(
        <Fragment>
            <div className='flex'>
                <SideBarNavigation values={UserSideNavigationValues}/>
                <main className='flex-1 bg-white'>
                    <DashboardTopBar pageTitle='New Registration'/>
                    {children}
                </main>
            </div>
        </Fragment>
    );
} 

export default DashboardLayout;