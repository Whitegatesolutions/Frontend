import axios from "axios";
import { AxiosRequestInterface, Constants } from "./constants"

export const postAxiosRequest = async (value : AxiosRequestInterface) => {
    const {uri, body} = value;
    //console.log(body);
    return await axios.post(Constants.HOST_ADDRESS.concat(uri), body, {
        headers : {
            'Content-Type' : 'application/json'
        },
         timeout: 300000
        
    });
}


export function getToken(token: any): string {
	if (token !== null) {
		return token;
	}
	return '';
}


export const postAxiosRequestWithHeader = async (value : AxiosRequestInterface) => {
    const {uri, body} = value;
    //console.log(body);
    return await axios.post(Constants.HOST_ADDRESS.concat(uri), body, {
        headers : {
            'Content-Type' : 'application/json',
            Authorization : 'Bearer '.concat(getToken(window.localStorage.getItem('token')))
        },
         timeout: 300000
        
    });
}

export const getAxiosRequest = async (uri : string) => {
    return await axios.get(Constants.HOST_ADDRESS.concat(uri), {
        headers : {
            'Content-Type' : 'application/json'
        },
        timeout: 300000
    });
}

export const getAxiosRequestWithAuthorizationHeader = async (uri : string) => {
    return await axios.get(Constants.HOST_ADDRESS.concat(uri), {
        headers : {
            'Content-Type' : 'application/json',
            Authorization : 'Bearer '.concat(getToken(window.localStorage.getItem('token')))
        }
    });
}

export const multipleFilePostRequest = async (
	path: string,
	files: FormData
) => {
	return await axios.post(Constants.HOST_ADDRESS.concat(path), files, {
		//upload-files
		headers: {
			'Content-Type': 'multipart/form-data',
		},
        timeout : 600000
	});
};


export const postAxiosRequestWithHeaderForBusinessReg = async (value : AxiosRequestInterface) => {
    const {uri, body} = value;
    //console.log(body);
    return await axios.post(Constants.HOST_ADDRESS.concat(uri), body, {
        headers : {
            'Content-Type' : 'application/json',
            Authorization : 'Bearer '.concat(getToken(window.localStorage.getItem('token')))
        },
         timeout: 600000
        
    });
}