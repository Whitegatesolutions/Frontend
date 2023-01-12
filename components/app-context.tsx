import React, { FC, Fragment, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAxiosRequestWithAuthorizationHeader } from '../utils/axios-requests';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { addLgaData, addStatesData, addUserData } from '../redux/slices/app-slice';

type Props = {
    children: JSX.Element
}
export default function AppProvider({ children }: Props): JSX.Element {

    const dispatch: Dispatch<AnyAction> = useDispatch();

    const stateIdSelector = useSelector((state : any) => state.store.stateId);
    //console.log('state id', stateIdSelector);
    const { data, isLoading, isFetched } = useQuery(
        {
            queryKey: ['find-user-by-token'],
            queryFn: () => getAxiosRequestWithAuthorizationHeader('user/profile/find-user-by-token'),
            refetchOnWindowFocus: false
        }
    );

    //console.log('user', data);

    // if(stateIdSelector){

    //     const {data : lgaData, isFetched : isLgaDataFetched} = useQuery({
    //         queryKey : ['fetch-lga-data'],
    //         queryFn : () => getAxiosRequestWithAuthorizationHeader(`lga/find-lgas/by-stateId/${stateIdSelector}`),
    //         refetchOnWindowFocus : false
    //     });


    //     if(isLgaDataFetched){
    //         dispatch(addLgaData(
    //             lgaData?.data?.data
    //         ));
    //     }
    // }
    
    const {data : stateData, isFetched : isStateDataFetched} = useQuery({
        queryKey : ['fetch-state-data'],
        queryFn : () => getAxiosRequestWithAuthorizationHeader('state'),
        refetchOnWindowFocus : false
    });

    //console.log('state', stateData);

    if(isStateDataFetched){
        dispatch(addStatesData(
            stateData?.data?.data
        ));
    }


    if (isFetched) {
        //console.log('fetched', data);
        dispatch(addUserData({
            userFirstName : data?.data?.data.firstName,
            userLastName : data?.data?.data.lastName,
            profileImage : data?.data?.data.profileImageUrl,
            email : data?.data?.data?.email
        }));
    }

    useEffect(() => {},[
        isFetched,
        isStateDataFetched
    ]);
    return (
        <Fragment>
            {children}
        </Fragment>
    );

}