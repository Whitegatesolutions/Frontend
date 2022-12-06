import AuthLayoutComponent from "../../layouts/auth-layout";
import { ResetPasswordForm } from "./reset-password-form";

const ResetPasswordLayoutComponent = () : JSX.Element => {
    return(
        <AuthLayoutComponent>
            <ResetPasswordForm/>
        </AuthLayoutComponent>
    );
}

export default ResetPasswordLayoutComponent;