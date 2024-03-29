import { NextPage } from "next";
import { useSelector } from "react-redux";
import NameReservationAndBusinessRegistrationLayout from "../../components/modules/name-and-business-reg-module/layout";
import { NameAndBusinessRegistrationFormComponent } from "../../components/modules/name-and-business-reg-module/name-and-business-reg-form-component";
//import React from 'react';

const BusinessNameRegistrationPage : NextPage = () => {    
    return(
        <NameReservationAndBusinessRegistrationLayout>
            <NameAndBusinessRegistrationFormComponent/>
        </NameReservationAndBusinessRegistrationLayout>
    );
}

export default BusinessNameRegistrationPage;