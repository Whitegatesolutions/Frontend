import { CooperateFormType, IndividualFormType } from "./types.utils";

//validate user email
export function validateEmail(email: string): boolean {
	const re: RegExp =
		/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi;
	///^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
	const re: RegExp = /^[0-9]{11}$/;
	///^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(phone);
}

export function validatePassword(password: string): boolean {
	var exp = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?,():;$%^&*.])(?=.{8,})'
	);
	return exp.test(password);
}

export const isValidUrl = (urlString : string) => {
	var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	'((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	'(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	'(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	return urlPattern.test(urlString);
}

export function defineDocument() {
	const document = window.document;
	if (typeof document === undefined || typeof window === undefined) return;

	return document;
}

export function isButtonFormDisabled(index: number): boolean {
	const isDisabled = document.getElementById(
		`save-${index}-button`
	) as HTMLButtonElement;
	if (isDisabled) return isDisabled.disabled;
	else return false;
}

export function getUserId(): string {
	const retrieveUserId = window.localStorage.getItem('userId') as string;
	return retrieveUserId;
}

//function gets two option arrays check their length and returns true if length > 0
export function getFormLength(values?: any[], cooperate?: any[]) {
	if (values) {
		if (values.length > 0) {
			return true;
		}
	}
	if (cooperate) {
		if (cooperate.length > 0) {
			return true;
		}
	}
}

//monitors if all forms on form have been saved then returns true is not false
export function getAllSavedForms(
	dispatchReduxArrayLength: number,
	valuesArrayLength: number,
	cooperateArrayLength: number
) {
	const totalFormLength = valuesArrayLength + cooperateArrayLength;

	if (totalFormLength === dispatchReduxArrayLength) {
		return true;
	}

	return false;
}

//custom filter array function
export function customFilter(index: number, array: any[]) {
	return array.filter((item: any, i: number) => index !== i);
}

export function disableButtons(state: boolean, loading: boolean) {
	if (state || loading) {
		return false;
	}
	return true;
}


export function showSubmitButton(
	isChecked : boolean,
	dispatchReduxArrayLength: number,
	valuesArrayLength: number,
	cooperateArrayLength: number){
		if(isChecked && getAllSavedForms(
			dispatchReduxArrayLength,
			valuesArrayLength,
			cooperateArrayLength
		)){
			return true;
		}
		return false;
	}

	export function individualFormUseEffectHook(
		values : IndividualFormType, 
		elementId : string){
		
		const saveButton = document.getElementById(`${elementId}`) as HTMLButtonElement;
		if(!saveButton){
			return;
		}
		
		const newObject = values;

		if(newObject?.nation !== 'Nigerian'){
			delete newObject['state'];
			delete newObject['lga'];
			const isNotEmpty = Object.values(newObject).every((value : any) => value !== "");
			if(isNotEmpty){
				saveButton.disabled = false;
			}else{
				saveButton.disabled = true;
			}
		}else{	
			delete newObject['nationality'];
			const isNotEmpty = Object.values(values).every((value : any) => value !== "");
			if(isNotEmpty){
				saveButton.disabled = false;
			}else{
				saveButton.disabled = true;
			}
		}
	}

	export function cooperateFormUseEffectHook(
		values : CooperateFormType,
		elementId : string
	){
		const saveButton = document.getElementById(elementId) as HTMLButtonElement;
		if(!saveButton){return;}

		const newObject = values;

		if(newObject?.nation !== 'Nigerian'){
			delete newObject['state'];
			delete newObject['lga'];
			const isNotEmpty = Object.values(newObject).every((value : any) => value !== "");
			if(isNotEmpty){
				saveButton.disabled = false;
			}else{
				saveButton.disabled = true;
			}
		} else{
			delete newObject['nationality'];
			const isNotEmpty = Object.values(newObject).every((value : any) => value !== "");
			if(isNotEmpty){
				saveButton.disabled = false;
			}else{
				saveButton.disabled = true;
			}	
		} 
		
	}