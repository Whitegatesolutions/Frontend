import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { getToken } from "../utils/axios-requests";

const StatusPage : NextPage = () => {

    const router : NextRouter = useRouter();
    // let message : string | null = localStorage.getItem('message');

    return(
        <div className="w-full min-h-screen flex justify-center items-center">
           <div>
                <p className="font-bold text-2xl text-center">{getToken(typeof window !== 'undefined' && window.localStorage.getItem('message'))}</p>
                <button className="p-3 rounded my-2 bg-[#6157A0] text-sm text-white"
                onClick={() => router.push('/login')}
                >back to login</button>
           </div>
        </div>
    );
}

export default StatusPage;