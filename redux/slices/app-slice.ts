import { createSlice, Slice } from '@reduxjs/toolkit';

interface AppSubState{
    userFirstName : string;
    userLastName : string;
    profileImage : string;
};

export interface BusinessNameRegInterface{
    firstNameSuggestion : string;
    secondNameSuggestion : string;
    businessAddress : string;
    email : string;
    phoneNumber : string;
    userId : string;
}


export interface AppGlobalState{
    data : AppSubState,
    state : any[],
    lga : any[],
    stateId : string,
    individualFieldArray : number,
    cooperateFieldArray : number,
    businessNameRegistration : BusinessNameRegInterface,
    businessNameRegistrationId : string;
    nameRegFormIsValid : boolean;
    //userData : object;
}

const initialState : AppGlobalState = {
    data : {
        userFirstName : '',
        userLastName : '',
        profileImage : ''
    },
    state : [],
    lga : [],
    stateId : '',
    individualFieldArray : 0,
    cooperateFieldArray : 0,
    businessNameRegistration : {
        firstNameSuggestion : '',
        secondNameSuggestion : '',
        businessAddress : '',
        email : '',
        phoneNumber : '',
        userId : ''
    },
    businessNameRegistrationId : '',
    nameRegFormIsValid : false
};

const appDataSlice : Slice<AppGlobalState> = createSlice({
    name : 'store',
    initialState,
    reducers : {
        addUserData(state : any, action : any){
            state.data = action.payload;
        },
        addStatesData(state : AppGlobalState, action:any){
            if(action.payload)
            state.state = [...action.payload];
        },
        addLgaData(state : AppGlobalState, action:any){
            if(action.payload)
            state.lga = [...action.payload];
        },
        setStateIdData(state : AppGlobalState, action : any){
            state.stateId = action.payload;
        },
        setIndividualFieldArrayLength(state : AppGlobalState, action : any){
            //if(action.payload >= 0)
            state.individualFieldArray = action.payload;
        },
        setCooperateFieldArrayLength(state : AppGlobalState, action : any){
            //if(action.payload >= 0)
            state.cooperateFieldArray = action.payload;
        },
        setBusinessNameRegData(state : any, action : any){
            state.businessNameRegistration = action.payload;
        },
        setBusinessNameRegId(state : AppGlobalState, action : any){
            state.businessNameRegistrationId = action.payload;
        },
        setNameRegFormValidState(state : AppGlobalState, action : any){
            state.nameRegFormIsValid = action.payload;
        }
        // addUserFirstName(state : AppGlobalState, action : any){
        //     state.userFirstName = action.payload;
        // },
        // addUserLastName(state : AppGlobalState, action : any){
        //     state.userLastName = action.payload;
        // },
        // addUserProfileImage(state : AppGlobalState, action : any){
        //     state.profileImage = action.payload;
        // }addUserFirstName, addUserLastName, addUserProfileImage
    }
});

export const {
    addUserData, 
    addStatesData, 
    addLgaData,
    setStateIdData,
    setIndividualFieldArrayLength,
    setCooperateFieldArrayLength,
    setBusinessNameRegData,
    setBusinessNameRegId,
    setNameRegFormValidState
} = appDataSlice.actions;

export default appDataSlice.reducer;


