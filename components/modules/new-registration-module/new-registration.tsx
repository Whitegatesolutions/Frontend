import DashboardLayout from "../../layouts/dashboard-layout";
import { ListOfBusinessesCollectionsForNewRegistration } from "../../../utils/collections";
import { BusinessesGridInterface } from "../../../utils/constants";
import { NextRouter, useRouter } from "next/router";


const NewRegistrationModule = () : JSX.Element => {

    const router : NextRouter = useRouter();

    const defineWindow = () => {
        if(typeof window !== 'undefined'){
            return window.location.origin;
        }
    }
    return(
        <DashboardLayout>
            <div className="w-full flex justify-center lg:justify-start lg:ml-8">
                {/* List of business registrations */}
               <div className="w-11/12 mt-4 mb-8">
                <section className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-8">
                        {ListOfBusinessesCollectionsForNewRegistration &&
                        ListOfBusinessesCollectionsForNewRegistration.map((data : BusinessesGridInterface, i : number) => 
                        <div key={i} className="w-auto h-80 bg-[#F0EEF6] rounded-xl p-4 relative">
                            <div className='w-full h-32 container rounded-md'>
                                <div className='w-full h-32 content rounded-md'>
                                    <object data={data.image} width="100%" height="100%" className='rounded-md object-cover'/>
                                </div>
                                <div className='overlay bg-[#6157A0] bg-opacity-50 rounded-md'/>
                            </div>

                            <p className="text-2xl text-black font-bold py-2">{data.title}</p>
                            <p className="text-base py-1 text-black">{data.description}</p>

                        <div className="w-full flex justify-center">
                                <div className="w-11/12 absolute bottom-4">
                                    <button 
                                    className="w-full text-white text-xs bg-[#170E4F] font-semibold rounded py-2.5"
                                    onClick={() => router.push(data.link)}>
                                        Register
                                    </button>
                                </div>
                        </div>
                        </div>
                        )}
                    </section>
               </div>
            </div>
        </DashboardLayout>
    );
}

export default NewRegistrationModule;