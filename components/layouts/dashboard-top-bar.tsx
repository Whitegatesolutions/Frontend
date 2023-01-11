import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Avatar, Badge, IconButton } from "@mui/material";
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import {NextRouter, useRouter} from 'next/router';
import {FC} from 'react';
import { makeStyles } from '@mui/styles';
import { motion } from "framer-motion";
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import {useState, useEffect} from 'react';
import { SidebarElementValuesObject } from '../../utils/constants';
import { UserSideNavigationValues } from './dashboard-layout';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme : any) => ({
    customBadge: {
        backgroundColor: '#FF2D2D',
        color: "white"
    }
}));

type Props={
    pageTitle : string;
    showControls ?: boolean;
    user : {
        firstName : string,
        lastName : string,
        image : string
    }
}
const closeSideBar = () => {
    const doc = document.getElementById('sideNav')
    const doc1 = document.getElementById('backdrop')
    if(doc !== null && doc1 !== null){
        doc.style.width = "0"
        doc1.style.width = "0"
    }
}

const openSideBar = () => {
    const doc = document.getElementById('sideNav')
    const doc1 = document.getElementById('backdrop')
    if(doc !== null && doc1 !== null){
        doc.style.width = "75%"
        doc1.style.width = "100%"
    }
}

type Props1={
    values : SidebarElementValuesObject,
    firstName : string,
    lastName : string,
    image : string
}

export const ResponsiveSideBar : FC<Props1> = ({values : {body}, firstName, lastName, image}) :JSX.Element => {
    const router : NextRouter = useRouter();

    return(
        <div id="backdrop" className='lg:hidden' onClick={closeSideBar}>
            <div id="sideNav">
            <div className="w-full h-auto mt-20">
                <div className="flex justify-center">
                    <Avatar src={image} sx={{
                        width : '110px',
                        height : '110px'
                    }}/>
                </div>

                <div className='text-center my-4 text-lg font-semibold capitalize'>
                    <p>{lastName}</p>
                    <p>{firstName}</p>
                </div>

                <section className='my-8 w-full flex flex-col'>
                    {body && body.map((data,i) => 
                        <div key={i}
                        onClick={() => router.push(data.link)}
                            className={
                            router.pathname.includes(data.link)?
                            'w-full flex justify-center text-base font-semibold cursor-pointer bg-white text-[#6157A0]'
                            :'w-full flex justify-center text-white text-base font-semibold cursor-pointer hover:bg-[#F5F5F5] hover:bg-opacity-30'
                        }>
                            <div className='flex flex-row items-center gap-2 py-1'>
                                {data.icon}
                                {data.title === "My Businesses" ?
                                    <p>{data.title}<span className='invisible'>en</span></p>
                                    :
                                    <p>{data.title}</p>  
                                }
                            </div>
                        </div>
                    )}
                </section>
            </div>
            </div>
        </div>
    );
}
export const DashboardTopBar :FC<Props> = ({pageTitle, showControls = true, user}) => {
    const router : NextRouter = useRouter();
    const styles = useStyles();

    const [click, setClick] = useState({
        count : 1
    });

    const openSidebarClick = () =>{
        setClick({...click, count : 2});
        openSideBar();
    }

    const CloseSidebarClick = () => {
        setClick({...click, count : 1});
        closeSideBar();
    }

    const logoutHandler = () => {
        localStorage.clear();
        router.replace('/login');
    }

    // useEffect(() => {},[click.count]);

    return(
        <>
        <header className="sticky top-0 z-10 bg-white w-full flex justify-center lg:justify-start lg:ml-8">
            <div className='w-11/12'>
                <div className="w-full my-8 flex justify-between items-center">
                    <section className="md:flex md:text-2xl lg:text-3xl font-bold text-black">
                        <span className='hidden lg:flex'>{pageTitle}</span>
                        <div className='flex lg:hidden'>
                            <div className='rounded-md border border-[#CBCBCB] px-1 hover:bg-[#F0EEF6] cursor-pointer hover:bg-opacity-40' 
                            onClick={click.count === 1 ? openSidebarClick : CloseSidebarClick}>
                                <DragHandleRoundedIcon sx={{fontSize : 30, color : '#000'}}/>
                            </div>                         
                        </div>
                    </section>
                    {showControls && 
                        <section className="flex flex-row items-center gap-1">
                            <div className='flex lg:hidden'>
                                <Avatar src={user?.image}/>
                            </div>
                            <IconButton>
                                <SettingsOutlinedIcon sx={{
                                    color : '#000',
                                    fontSize : '22px',
                                    background : '#F0EEF6',
                                    borderRadius : '100%',
                                    padding : '1px'
                                }}/>
                            </IconButton>
                            <IconButton>
                                <Badge badgeContent="99" 
                                classes={{badge : styles.customBadge}}
                                variant="dot" color="error"
                                anchorOrigin={{
                                    vertical : 'bottom',
                                    horizontal : 'right'
                                }}>
                                    <NotificationsOutlinedIcon sx={{
                                        color : '#000',
                                        fontSize : '22px',
                                        background : '#F0EEF6',
                                        borderRadius : '100%',
                                        padding : '1px'
                                    }}/>
                                </Badge>
                            </IconButton>

                            <button className="px-3 py-2.5 bg-[#FF2D2D] text-xs 
                            font-semibold text-white rounded-lg
                            transition duration-300 delay-200 border
                            hover:bg-[#D30000]
                            hover:bg-white hover:text-[#D30000] 
                            hover:border-[#D30000]"
                            onClick={logoutHandler}>
                                Logout
                            </button>
                        </section>
                    }
                    
                </div>
            </div>
        </header>
        {/* <hr/> */}
        <ResponsiveSideBar 
        values={UserSideNavigationValues} 
        firstName={user?.firstName} 
        lastName={user?.lastName} 
        image={user?.image}/>
    </>
    );
}