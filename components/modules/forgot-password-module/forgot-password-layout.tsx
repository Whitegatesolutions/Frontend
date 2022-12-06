import AuthLayoutComponent from "../../layouts/auth-layout";
import { ForgotPasswordForm } from "./forgot-password-form";

const ForgotPasswordLayoutComponent = () : JSX.Element => {
    
    return(
        <AuthLayoutComponent>
            <ForgotPasswordForm/>
        </AuthLayoutComponent>
    );
}

export default ForgotPasswordLayoutComponent;