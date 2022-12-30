//validate user email
export function validateEmail(email: string): boolean {
	const re : RegExp=
		/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi;
	///^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
	const re : RegExp = /^[0-9]{11}$/;
	///^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(phone);
}

export function validatePassword(password : string) : boolean{
	var exp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?,()\:\;\$%\^&\*\.])(?=.{8,})");
	return exp.test(password);
}

export function defineDocument(){
	const document = window.document;
	if(typeof document === undefined || typeof window === undefined) return;

	return document;
} 

export function isButtonFormDisabled(index : number) : boolean{
	const isDisabled = document.getElementById(`save-${index}-button`)  as HTMLButtonElement;
	if(isDisabled)
	return isDisabled.disabled;
	else return false;
}

export function getUserId(): string {
	const retrieveUserId = window.localStorage.getItem('userId') as string;
	return retrieveUserId;
}

// export function formEvent(){
	
//     var form = document.getElementById("form-id") as HTMLFormElement;
//     const formEvent = new Event('submit', {bubbles : true, cancelable : false});

// 	return formEvent.dispatchEvent(form);
// }

