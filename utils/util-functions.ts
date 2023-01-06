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