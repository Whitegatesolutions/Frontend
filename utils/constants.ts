export enum Constants {
	GIRL_LAWYER = 'https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?auto=compress&cs=tinysrgb&w=1280&h=1918&dpr=1',
	// HOST_ADDRESS = "https://registreee.herokuapp.com/" ,
	HOST_ADDRESS = 'http://localhost:8080/',
	PASSWORD_REQUIREMENT = 'Password length must be at least 8 characters, must contain upper and lowercase alphabets,special character and number',
	API_RESPONSE_VERIFICATION_MESSAGE = 'Account Already exists. User needs to re-verify this account',
}

export type ThemeContextState = {
	theme: string;
	toggleTheme: (theme: string) => void;
};
export interface LoginDetailsInterface {
	email: string;
	password: string;
}
export interface SignPersonInterface {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	password: string;
}

export interface ErrorInterfaceObj {
	msg: string;
	isError: boolean;
	value?: string;
}

export interface AxiosRequestInterface {
	uri: string;
	body?: any;
}

export interface BusinessesGridInterface {
	image: string;
	title: string;
	description: string;
	link: string;
}

export interface SideBarElementValuesInterface {
	icon: any;
	link: string;
	title: string;
}

export type SidebarElementValuesObject = {
	firstName?: string;
	lastName?: string;
	image?: string;
	body: SideBarElementValuesInterface[];
};

