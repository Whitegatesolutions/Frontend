import AuthLayoutComponent from "../../layouts/auth-layout";
import { OTPForm } from "./otp-form";

const OTPLayoutComponent = () : JSX.Element => {
    return(
        <AuthLayoutComponent>
            <OTPForm/>
        </AuthLayoutComponent>
    );
}

export default OTPLayoutComponent;