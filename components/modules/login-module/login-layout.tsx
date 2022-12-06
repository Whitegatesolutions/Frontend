import AuthLayoutComponent from "../../layouts/auth-layout";
import { LoginForm } from "./login-form";

const LoginComponentLayout = () : JSX.Element => {

    // const theme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    // console.log(' localStorage.getItem(theme)', localStorage.getItem('theme'))
    return(
        <AuthLayoutComponent>
            <LoginForm/>
        </AuthLayoutComponent>
    );
}

export default LoginComponentLayout;