import DashboardLayout from "../../layouts/dashboard-layout";
import { useSelector } from "react-redux";
import React from 'react';
import { getAxiosRequestWithAuthorizationHeader } from "../../../utils/axios-requests";
import { AxiosError } from "axios";
import { ErrorInterfaceObj } from "../../../utils/constants";
import { initialErrorObj } from "../login-module/login-form";
import { useQuery } from "@tanstack/react-query";
import {usePaystackPayment} from 'next-paystack';
import { PaystackProps } from "next-paystack/dist/types";
import { CircularProgress } from "@mui/material";

const KOBO = 0.611958;
export const InvoicePageComponent = () : JSX.Element => {
    //0d81e166-ec9f-42d4-bd5c-df42765fb788
    const getNameRegIdSelector = useSelector((state: any) => state.store.businessNameRegistrationId);
    const user = useSelector((state : any) => state.store.data);
    const jobId = useSelector((state : any) => state.store.jobId);
    const { data, isFetched, isLoading} = useQuery({
            queryKey: ['get-invoice-data'],
            queryFn: () => getAxiosRequestWithAuthorizationHeader(`pricing/calculate-price/for-job/${jobId}`),
            refetchOnWindowFocus: false
        }
    );
    
    const config : PaystackProps = {
        reference: (new Date()).getTime().toString(),
        email: user?.email,
        amount: data?.data?.data?.totalPrice * 100,
        publicKey: 'pk_test_841d55e1c32a4ca73dfb721a2aa63bdde4a30b50',
    };
    const initializePayment = usePaystackPayment(config);
    // you can call this function anything
    const onSuccess = (reference : any) => {
      // Implementation for whatever you want to do with reference and after success call.
      console.log(reference);
    };
  
    // you can call this function anything
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed');
    }
    if(isLoading){
        return  <CircularProgress size={'1rem'} sx={{ color: 'rgb(203 213 225)' }}/>
    }

    return(
        <DashboardLayout title="Invoice">
            <div className="bg-white w-full flex justify-center lg:justify-start lg:ml-8">
                <div className="w-11/12 uppercase">
                    <div className="flex flex-col md:flex-row gap-2 text-black text-lg w-full lg:w-4/5">
                        <div className="w-full md:w-1/2 flex flex-row items-center gap-2">
                            <p className="font-semibold">Reference No</p>
                            <div className="h-px bg-black w-16"/>
                            <span>{data?.data?.data?.job?.jobTagId}</span>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-row items-center gap-2">
                            <p className="font-semibold">Date</p>
                            <div className="h-px bg-black w-16"/>
                            <span>{new Date(data?.data?.data?.job?.dateCreated).toDateString()}</span>
                        </div>
                    </div>

                    {/* BUSINESS DETAILS */}
                    <div className="flex flex-col my-16 gap-2 text-black text-lg w-full lg:w-4/5">
                        <div className="flex justify-between items-center gap-1">
                            <p className="font-semibold">Business&nbsp;Name&nbsp;Registration</p>
                            {/* <div className="h-px bg-black w-16"/> */}
                            <span>#{data?.data?.data?.price}</span>
                        </div>
                        <div className="flex justify-between items-center gap-1">
                            <p className="font-semibold">Suggested&nbsp;Name&nbsp;1</p>
                            {/* <div className="h-px bg-black w-16"/> */}
                            <span className="capitalize">{data?.data?.data?.job?.businessNameRegistration?.firstNameSuggestion}</span>
                        </div>
                        <div className="flex justify-between items-center gap-1">
                            <p className="font-semibold">Suggested&nbsp;Name&nbsp;2</p>
                            {/* <div className="h-px bg-black w-16"/> */}
                            <span className="capitalize">{data?.data?.data?.job?.businessNameRegistration?.secondNameSuggestion}</span>
                        </div>

                        <div className="flex justify-between items-center gap-2">
                            <p className="font-semibold">No&nbsp;Of&nbsp;Proprietors</p>
                            {/* <div className="h-px bg-black w-16"/> */}
                            <span>{data?.data?.data?.job?.businessNameRegistration?.registeredPartnersForThsBusiness?.length}</span>
                        </div>

                        <div className="flex justify-between items-center gap-2">
                            <p className="font-semibold">Business&nbsp;Type&nbsp;</p>
                            {/* <div className="h-px bg-black w-16"/> */}
                            <span className="capitalize">
                                {data?.data?.data?.job?.jobType === "BUSINESS_NAME_REGISTRATION" ? "Business Name Reg" : data?.data?.job?.jobType}
                            </span>
                        </div>
                    </div>

                    {/* PAYMENT DETAILS */}
                    <div className="flex flex-col my-16 gap-2 text-black text-lg w-full lg:w-4/5">
                        <div className="flex justify-between items-center gap-1">
                            <p className="font-semibold">Convenience&nbsp;Fees</p>
                            <span>#{data?.data?.data?.price}</span>
                        </div>
                        <div className="flex justify-between items-center gap-1">
                            <p className="font-semibold">Value&nbsp;Added&nbsp;Tax&nbsp;(VAT)&nbsp;@7.5%</p>
                            {/* <div className="h-px bg-black w-16"/> */}
                            <span>#{data?.data?.data?.vat}</span>
                        </div>
                    </div>

                    {/* TOTAL */}
                    <div className="flex flex-col my-16 gap-2 text-black text-lg w-full lg:w-4/5">
                        <div className="flex justify-between items-center gap-1 font-bold">
                            <p className="">TOTAL</p>
                            <div className="h-px bg-black w-16"/>
                            <span>#{data?.data?.data?.totalPrice}</span>
                        </div>
                    </div>
                    {/* NOTE */}
                    <div className="flex flex-col my-16 gap-2 text-[#FF2D2D] capitalize font-semibold text-lg w-full lg:w-4/5">
                        <i>NOTE
                            Kindly note that where the Corporate Affairs Commission (CAC)
                            rejects your suggested names, you will be required to suggest
                            new names and pay a name reservation fee of _#{data?.data?.data?.price}
                        </i>
                    </div>
                    {/* Make Payment Button */}
                    <div className="flex justify-end w-full lg:w-4/5 mb-4">
                        <button className="p-3 bg-[#6157A0] 
                        capitalize text-sm rounded-lg text-white border
                        transition duration-300 delay-200 
                        hover:bg-white hover:text-[#6157A0] 
                        hover:border-[#6157A0]"
                        onClick={() => initializePayment(onSuccess, onClose)}>
                            Make payment
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}