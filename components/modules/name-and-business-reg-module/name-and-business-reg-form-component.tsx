import {FC} from 'react';
import { NameRegistrationFormComponent } from './name-registration-form';
import { BusinessRegistrationParticularsForm } from './particulars-form';


export const NameAndBusinessRegistrationFormComponent = () : JSX.Element =>{
    return(
        <div className='w-11/12 flex flex-col gap-4'>
            <NameRegistrationFormComponent/>
            <BusinessRegistrationParticularsForm/>
        </div>
    );
}