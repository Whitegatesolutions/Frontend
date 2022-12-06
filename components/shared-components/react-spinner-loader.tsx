import { Circles, ThreeDots } from "react-loader-spinner";

export const ReactSpinnerLoader = () => {
    return(
        <div className='loader flex justify-center items-center'>
             {/* <div className="spinner"/> */}
            <ThreeDots height="80" width="80" color="#878787"/>
        </div>
    );
}