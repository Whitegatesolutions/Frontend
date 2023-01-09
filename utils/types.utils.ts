export interface BaseResponseType<T> {
	success: boolean;
	code: number;
	message: string;
	data: T;
}

export interface FileResponseDTO extends BaseResponseType<string[]> {
	data: string[];
}

export interface JobResponseType extends BaseResponseType<JobType> {
	data: JobType;
}

export interface JobType {
	id: string;
	dateCreated: string;
	dateUpdated: string;
	jobTagId: string;
	jobType: string;
	userId: string;
	user: UserType;
	processStatus: string;
	paymentStatus: string;
	status: boolean;
	businessNameRegistrationId: string;
	businessNameRegistration: BusinessNameRegistration;
	documentsUnderThisJob?: DocumentsUnderThisJobEntity[] | null;
}

export interface UserType {
	id: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
	role: string;
	uniqueVerificationCode: string;
	profileImageUrl: string;
	status: boolean;
	dateCreated: string;
	dateUpdated: string;
}

export interface BusinessNameRegistration {
	id: string;
	dateCreated: string;
	dateUpdated: string;
	firstNameSuggestion: string;
	secondNameSuggestion: string;
	businessAddress: string;
	email: string;
	phoneNumber: string;
	processStatus: string;
	status: boolean;
	userId: string;
	user: UserType;
	registeredPartnersForThsBusiness?:
		| RegisteredPartnersForThsBusinessEntity[]
		| null;
	jobsAttachedToThisBusinessNameRegistration?: string[] | null;
}

export interface RegisteredPartnersForThsBusinessEntity {
	id: string;
	dateCreated: string;
	dateUpdated: string;
	firstName: string;
	lastName: string;
	otherName: string;
	rcNumber: string;
	companyName: string;
	nameOfDirector: string;
	address: string;
	lgaId: string;
	lga: Lga;
	city: string;
	occupation: string;
	nationality: string;
	dateOfBirth: string;
	type: string;
	email: string;
	phoneNumber: string;
	status: boolean;
	businessNameRegistrationId: string;
	businessNameRegistration: string;
	signature: string;
	passport: string;
	idCardLink: string;
	competenceCertificate: string;
}

export interface Lga {
	id: string;
	dateCreated: string;
	dateUpdated: string;
	stateId: string;
	state: State;
	name: string;
	status: boolean;
	businessNamePartnersFromThisLGA?: string[] | null;
}

export interface State {
	id: string;
	dateCreated: string;
	dateUpdated: string;
	name: string;
	status: boolean;
	lgasForThisState?: string[] | null;
}

export interface DocumentsUnderThisJobEntity {
	id: string;
	dateCreated: string;
	dateUpdated: string;
	jobId: string;
	job: string;
	url: string;
	mimeType: string;
	status: boolean;
}

export interface BusinessNameRegJobType {
	businessNameRegDetails: BusinessNameRegDetails;
}

export interface BusinessNameRegDetails {
	firstNameSuggestion: string;
	secondNameSuggestion: string;
	businessAddress: string;
	email: string;
	phoneNumber: string;
	userId: string;
	partners?: PartnersEntity[] | null;
}

export interface PartnersEntity {
	firstName?: string;
	lastName?: string;
	otherName?: string;
	rcNumber?: string;
	companyName?: string;
	nameOfDirector?: string;
	address: string;
	lgaId: string;
	city: string;
	dateOfBirth: string;
	occupation: string;
	nationality: string;
	email: string;
	phoneNumber: string;
	type: string;
	signature: string;
	passport: string;
	competenceCertificate: string;
	idCardLink: string;
}

export interface CreateBusinessNameRegPartnerType {
	firstName: string;
	lastName: string;
	otherName: string;
	rcNumber: string;
	companyName?: string;
	nameOfDirector: string;
	address: string;
	lgaId: string;
	city: string;
	dateOfBirth: Date;
	occupation: string;
	nationality: string;
	email: string;
	phoneNumber: string;
	type: string;
	signature: string;
	passport: string;
	competenceCertificate: string;
	idCardLink: string;
	businessNamePartnerId?: string;
	businessNameRegistrationId: string;
}

export interface IndividualFormType{
	firstName: string,
    lastName: string,
    otherName: string,
    address: string,
    state: string,
    lga: string,
    city: string,
    occupation: string,
    nationality: string,
    day: string,
    month: string,
    year: string,
    email: string,
    telephoneNumber: string,
    signature: string | any,
    passport: string | any,
    meansOfId: string | any,
    certificate: string | any,
    isSaved : boolean
}

export interface CooperateFormType{
	companyName: string,
    rcNumber: string,
    directorName: string,
    address: string,
    state: string,
    lga?: string,
    city?: string,
    occupation: string,
    nationality: string,
    day: string,
    month: string,
    year: string,
    email: string,
    telephoneNumber: string,
    signature: string | any,
    passport: string | any,
    meansOfId: string | any,
    certificate: string | any,
    isSaved ?: boolean
}