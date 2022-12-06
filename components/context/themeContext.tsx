import React,{createContext} from  'react';
import { ThemeContextState } from '../../utils/constants';

const getInitialTheme = () : string => {

    if((typeof window !== 'undefined') && window.localStorage){
        const storedPrefs = window.localStorage.getItem('current-theme');
        if(typeof storedPrefs === 'string') return storedPrefs;

        if(window.matchMedia("(prefers-color-scheme : dark)").matches) return "dark";
    }
    return "light";
}

type Props = {
    children : JSX.Element,
    initialTheme : string
}


// const initialObj : ThemeContextState = {
//     theme : "",
//     toggleTheme : () => {}
// }
export const ThemeContext = createContext<any >({} as any);

const ThemeProvider : React.FC<Props> = ({children, initialTheme}) => {

    const [theme, setTheme] = React.useState<string>(getInitialTheme);
    
    const checkTheme = (existing : string) => {
        const root = window.document.documentElement;

        const isDark : boolean = existing === 'dark';
        //check theme and alternate vice versa
        root.classList.remove(isDark ? 'light' : 'dark');
        //add the current specified theme
        root.classList.add(existing);
        //adding theme to local storage
        localStorage.setItem('current-theme', existing);
    }

    if(initialTheme) checkTheme(initialTheme);

    

    React.useEffect(() => {
        checkTheme(initialTheme)
    },[theme]);

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
