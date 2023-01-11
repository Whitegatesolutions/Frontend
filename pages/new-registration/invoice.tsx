import { NextPage } from "next";
import { InvoicePageComponent } from "../../components/modules/invoice-module/invoice";
import { getAxiosRequestWithAuthorizationHeader } from "../../utils/axios-requests";

const InvoicePage : NextPage = () => {
   // console.log({invoice : data});
    return(
        <InvoicePageComponent/>
    );
}


// export async function getStaticProps(){
//     const uri : string = `pricing/calculate-price/for-job/${getNameRegIdSelector}`;

//     const response = await getAxiosRequestWithAuthorizationHeader(uri);
//     const {data : {data, code, success}} = response;

//     return{
//         props : {
//             data
//         }
//     };
// }
export default InvoicePage;
