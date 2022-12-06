import React from 'react';

export const NameRegistrationFormComponent = () : JSX.Element => {
    return(
        <div className="w-full lg:w-10/12">
            <p className='text-[#6157A0] text-xl font-bold'>Name&nbsp;Registration</p>

            <form className='my-8'>
                <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                    <div className='flex flex-col md:w-1/2 w-full'>
                        <p className='font-bold'>Name&nbsp;Suggestion&nbsp;1</p>
                        <input type="text" className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'/>
                    </div>
                    <div className='flex flex-col md:w-1/2 w-full'>
                        <p className='font-bold'>Name&nbsp;Suggestion&nbsp;2</p>
                        <input type="text" className='py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full'/>
                    </div>
                </div>

                <div className='flex flex-col w-full text-xs text-black my-4'>
                    <p className='font-bold'>Business&nbsp;Address</p>
                    <input type="text" className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'/>
                </div>

                <div className='w-full md:w-3/5 flex flex-col md:flex-row gap-4 text-xs text-black mb-4'>
                    <div className='flex flex-col md:w-1/2 w-full'>
                        <p className='font-bold'>E-mail&nbsp;Address</p>
                        <input type={"email"} className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'/>
                    </div>
                    <div className='flex flex-col md:w-1/2 w-full'>
                        <p className='font-bold'>Telephone</p>
                        <input type={"text"} className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'/>
                    </div>
                </div>
           </form>

            {/* divider */}
           <div className='bg-[#303030] h-px w-full'/>
        </div>
    );
}