import React, {FC,Fragment} from "react";
import { useSelector } from "react-redux";
import { returnValues } from "../../layouts/dashboard-layout";
import { SideBarNavigation } from "../../layouts/dashboard-sidebar";
import { DashboardTopBar } from "../../layouts/dashboard-top-bar";

type Props = {
    children : JSX.Element
};

const NameReservationAndBusinessRegistrationLayout : FC<Props> = ({children}) : JSX.Element => {
    const selector = useSelector((state : any) => state.store.data);

    return(
        <Fragment>
           <div id="layout" className="flex">
                <SideBarNavigation values={returnValues()}
                firstName={selector?.userFirstName}
                lastName={selector?.userLastName}
                image={selector?.profileImage}/>
                <main className="flex-1 bg-white text-black">
                    <DashboardTopBar pageTitle="Business Name Registration"
                     showControls={true}
                     user={{
                        firstName : selector?.userFirstName,
                        lastName : selector?.userLastName,
                        image : selector?.profileImage
                    }}
                     />
                    <div className="w-full flex justify-center lg:justify-start lg:ml-8 p-4">
                        {children}
                    </div>
                </main>
           </div>
        </Fragment>
    );
}

export default NameReservationAndBusinessRegistrationLayout;