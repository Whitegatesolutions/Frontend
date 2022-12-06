import { BusinessesGridInterface, BusinessRegParticularsInterface, SidebarElementValuesObject } from "./constants";

export const ListOfBusinessesCollectionsForNewRegistration : Array<BusinessesGridInterface> = [
    {
        image : 'https://images.pexels.com/photos/955394/pexels-photo-955394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title : 'Business Name Registration',
        description : 'Short Description of the service',
        link : '/new-registration/business-name-registration'
    },
    {
        image : 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title : 'Limited Liability Company',
        description : 'Short Description of the service',
        link : '/new-registration/limited-liability'
    },
    {
        image : 'https://images.pexels.com/photos/814544/pexels-photo-814544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title : 'Limited Liability Partnership',
        description : 'Short Description of the service',
        link : '/new-registration/limited-liability-partnership'
    },
    {
        image : 'https://images.pexels.com/photos/6814529/pexels-photo-6814529.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        title : 'Limited Partnership',
        description : 'Short Description of the service',
        link : '/new-registration/limited-partnership'
    },
    {
        image : 'https://images.pexels.com/photos/188035/pexels-photo-188035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title : 'Company Limited By Guarantee',
        description : 'Short Description of the service',
        link : '/new-registration/company-limited-by-guarantee'
    },
    {
        image : 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title : 'Incorporated Trustees',
        description : 'Short Description of the service',
        link : '/new-registration/incorporated-trustees'
    }
];

export const businessRegObjInstance :BusinessRegParticularsInterface ={
    id : 0,
    firstName : "",
    lastName : "",
    otherName : "",
    residentialAddress : "",
    state : "",
    lga : "",
    city : "",
    occupation : "",
    nationality : "",
    dob : "",
    email : "",
    telephoneNumber : "",
    signature : "",
    passport : "",
    meansOfId : "",
    certificate : ""
}