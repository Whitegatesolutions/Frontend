import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Avatar, Badge, IconButton } from "@mui/material";
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import {NextRouter, useRouter} from 'next/router';
import {FC} from 'react';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme : any) => ({
    customBadge: {
        backgroundColor: '#FF2D2D',
        color: "white"
    }
}));

type Props={
    pageTitle : string;
    showControls ?: boolean;
}

export const DashboardTopBar :FC<Props> = ({pageTitle, showControls = true}) => {
    const router : NextRouter = useRouter();

    const styles = useStyles();

    const logoutHandler = () => {
        localStorage.clear();
        router.replace('/login');
    }
    return(
        <header className="sticky top-0 z-10 bg-white w-full flex justify-center lg:justify-start lg:ml-8">
            <div className='w-11/12'>
                <div className="w-full my-8 flex justify-between items-center">
                    <section className="md:flex md:text-2xl lg:text-3xl font-bold text-black">
                        <span className='hidden lg:flex'>{pageTitle}</span>
                        <div className='flex lg:hidden'>
                            <IconButton>
                                <SortOutlinedIcon sx={{fontSize : 30, color : '#000'}}/>
                            </IconButton>
                        </div>
                    </section>
                    {showControls && 
                        <section className="flex flex-row items-center gap-1">
                            <div className='flex lg:hidden'>
                                <Avatar src="/static-img.png"/>
                            </div>
                            <IconButton>
                                <SettingsOutlinedIcon sx={{
                                    color : '#000',
                                    fontSize : '22px',
                                    background : '#F0EEF6',
                                    borderRadius : '100%',
                                    padding : '2px'
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
                                        padding : '2px'
                                    }}/>
                                </Badge>
                            </IconButton>

                            <button className="px-3 py-2.5 bg-[#FF2D2D] text-xs font-semibold text-white outline-none rounded-lg
                            transition duration-300 delay-200 hover:bg-[#D30000]"
                            onClick={logoutHandler}>
                                Logout
                            </button>
                        </section>
                    }
                    
                </div>
            </div>
            <hr/>
        </header>
    );
}