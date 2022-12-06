import AuthLayoutComponent from "../../layouts/auth-layout";
import { SignUpForm } from "./signUp-form";

const SignUpLayoutComponent = () : JSX.Element => {
    return(
        <AuthLayoutComponent>
            <SignUpForm/>
        </AuthLayoutComponent>
    );
}

export default SignUpLayoutComponent;