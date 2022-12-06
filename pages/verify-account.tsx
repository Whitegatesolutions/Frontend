import { NextPage } from "next";
import AuthLayoutComponent from "../components/layouts/auth-layout";
import { SignUpOtpComponent } from "../components/modules/signUp-module/otp-verify-account";

const SignUpOTPVerificationPage : NextPage = () => {
    return(
        <AuthLayoutComponent>
            <SignUpOtpComponent/>
        </AuthLayoutComponent>
    );
}

export default SignUpOTPVerificationPage;