import axios from 'axios';
import { AxiosRequestInterface, Constants } from './constants';
import { BusinessNameRegJobType, FileResponseDTO } from './types.utils';

export const postAxiosRequest = async (value: AxiosRequestInterface) => {
	const { uri, body } = value;
	//console.log(body);
	return await axios.post(Constants.HOST_ADDRESS.concat(uri), body, {
		headers: {
			'Content-Type': 'application/json',
		},
		timeout: 300000,
	});
};

export function getToken(token: any): string {
	if (token !== null) {
		return token;
	}
	return '';
}

export const postAxiosRequestWithHeader = async (
	value: AxiosRequestInterface
) => {
	const { uri, body } = value;
	//console.log(body);
	return await axios.post(Constants.HOST_ADDRESS.concat(uri), body, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer '.concat(
				getToken(window.localStorage.getItem('token'))
			),
		},
		timeout: 300000,
	});
};

export const patchAxiosRequestWithHeader = async (
	value: AxiosRequestInterface
) => {
	const { uri, body } = value;
	//console.log(body);
	return await axios.patch(Constants.HOST_ADDRESS.concat(uri), body, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer '.concat(
				getToken(window.localStorage.getItem('token'))
			),
		},
		//timeout: 300000,
	});
};

// ? Called anytime user clicks on "Individual partner" or "Company partner"
export const createBusinessNameRegJob = async (
	payload: BusinessNameRegJobType
): Promise<any> => {
	try {
		const response = await postAxiosRequestWithHeaderForBusinessReg({
			uri: 'job/job/create-business-name-reg',
			body: payload,
		});
		return response;
	} catch (ex) {
		throw ex;
	}
};

export const getAxiosRequest = async (uri: string) => {
	return await axios.get(Constants.HOST_ADDRESS.concat(uri), {
		headers: {
			'Content-Type': 'application/json',
		},
		timeout: 300000,
	});
};

export const deleteAxiosRequest = async (value: AxiosRequestInterface) => {
	const { uri, body } = value;
	//console.log(body);
	return await axios.delete(Constants.HOST_ADDRESS.concat(uri), {
		data: body,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer '.concat(
				getToken(window.localStorage.getItem('token'))
			),
		},
		//timeout: 300000,
	});
};

export const getAxiosRequestWithAuthorizationHeader = async (uri: string) => {
	return await axios.get(Constants.HOST_ADDRESS.concat(uri), {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer '.concat(
				getToken(window.localStorage.getItem('token'))
			),
		},
	});
};

export const uploadFiles = async (files: File[]): Promise<FileResponseDTO> => {
	try {
		const formData = new FormData();
		for (const file of files) {
			formData.append('files[]', file);
		}
		const response = await axios.post<any>(
			`${Constants.HOST_ADDRESS}upload-files`,
			formData,
			{ headers: { 'Content-Type': 'multipart/form-data' } }
		);
		return response.data;
	} catch (ex) {
		console.error(ex);
		throw ex;
	}
};

export const postAxiosRequestWithHeaderForBusinessReg = async (
	value: AxiosRequestInterface
) => {
	const { uri, body } = value;
	//console.log(body);
	return await axios.post(Constants.HOST_ADDRESS.concat(uri), body, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer '.concat(
				getToken(window.localStorage.getItem('token'))
			),
		},
		//timeout: 600000
	});
};
