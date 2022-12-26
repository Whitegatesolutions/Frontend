import { CircularProgress } from "@mui/material";

export const ComponentLoader = () : JSX.Element => {

    return(
        <div id="loader" className="bg-white flex justify-center items-center">
            <CircularProgress size={'2rem'} sx={{color : 'rgb(203 213 225)'}}/>
        </div>
    );
}