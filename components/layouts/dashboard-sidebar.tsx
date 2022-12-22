import { Avatar } from '@mui/material';
import React, {FC} from 'react';
import { SidebarElementValuesObject } from '../../utils/constants';
import { useRouter, NextRouter } from 'next/router';
import { TailwindCssStyles } from '../../utils/tailwindStyles';
import {useSelector} from 'react-redux';


type Props={
    values : SidebarElementValuesObject,
    firstName : string,
    lastName : string,
    image : string
}
export const SideBarNavigation :FC<Props> = ({values : {body}, firstName, lastName,image}) : JSX.Element => {

    const router : NextRouter = useRouter();

    return(
        <div>
            <div className='hidden lg:flex lg:w-64 xl:w-72 bg-[#6157A0] h-full text-white'>
                <div className='fixed lg:flex lg:w-64 xl:w-72 h-full bg-[#6157A0]'>
                    <div className="w-full h-auto mt-20">
                        <div className="flex justify-center">
                            <Avatar src={image} sx={{
                                width : '110px',
                                height : '110px'
                            }}/>
                        </div>

                        <div className='text-center my-4 text-lg font-semibold capitalize'>
                            <p>{firstName}</p>
                            <p>{lastName}</p>
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
        </div>
    );
}