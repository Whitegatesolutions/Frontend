import { NextPage } from "next";
import NameReservationAndBusinessRegistrationLayout from "../../components/modules/name-and-business-reg-module/layout";
import { NameAndBusinessRegistrationFormComponent } from "../../components/modules/name-and-business-reg-module/name-and-business-reg-form-component";

const BusinessNameRegistrationPage : NextPage = () => {
    return(
        <NameReservationAndBusinessRegistrationLayout>
            <NameAndBusinessRegistrationFormComponent/>
        </NameReservationAndBusinessRegistrationLayout>
    );
}

export default BusinessNameRegistrationPage;