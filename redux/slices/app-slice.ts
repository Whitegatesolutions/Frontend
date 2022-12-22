import { createSlice, Slice } from '@reduxjs/toolkit';

interface AppSubState{
    userFirstName : string;
    userLastName : string;
    profileImage : string;
}


export interface AppGlobalState{
    data : AppSubState,
    state : any[],
    lga : any[],
    stateId : string
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
    stateId : ''
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

export const {addUserData, addStatesData, addLgaData,setStateIdData} = appDataSlice.actions;
export default appDataSlice.reducer;


