import { NextPage } from "next";
import DashboardLayout from "../components/layouts/dashboard-layout";
import { DashboardTopBar } from "../components/layouts/dashboard-top-bar";
import NewRegistrationModule from "../components/modules/new-registration-module/new-registration";

const NewRegistration : NextPage = () => {
    return (
        <NewRegistrationModule/>
    );
}

export default NewRegistration;