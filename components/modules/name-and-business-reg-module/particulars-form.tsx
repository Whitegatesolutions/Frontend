import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';
import { InputLabel } from '@mui/material';
import { BusinessRegParticularsInterface } from '../../../utils/constants';
import { businessRegObjInstance } from '../../../utils/collections';

export const BusinessRegistrationParticularsForm = () : JSX.Element => {
    const [age, setAge] = React.useState('');
    const [forms, setNumberOfForms] = React.useState<BusinessRegParticularsInterface[]>([{...businessRegObjInstance}]);
    const [extras, setExtras] = React.useState({
        isCooperateForm : false,
        index : 0
    });

    const handleChange = (event : any) => {
      setAge(event.target.value);
    };

    const addFormOnClickHandler = () => {
        setNumberOfForms((prev) => prev.concat({...businessRegObjInstance, id : prev.length}));
    }

    const onSubmitHandler = (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    React.useEffect(() => {
    },[forms]);


    return(
        <div className="w-full lg:w-10/12">
            <form className='my-8' onSubmit={onSubmitHandler}>
                <p className='text-[#6157A0] text-xl font-bold py-4'>Particulars</p>
                {forms && forms.map((data : any, index : number) => 
                    <div 
                    key={index}
                    className="w-full my-4 rounded-md border border-[#CBCBCB] shadow-lg bg-white h-auto p-4">
                        <p className="text-xl font-bold py-4">
                            {
                                extras.isCooperateForm && data.id === index ?<span>Cooperate&nbsp;Business&nbsp;Owner</span>
                                :<span>Individual&nbsp;Business&nbsp;Owner</span>
                            }
                            
                        </p>
                         {/* names */}
                        <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>First&nbsp;Name</p>
                                <input type="text" className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'/>
                            </div>
                
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>Last&nbsp;Name</p>
                                <input type="text" className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'/>
                            </div>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>Other&nbsp;Name</p>
                                <input type="text" className='py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full'/>
                            </div>
                         </div>
                         {/* residential address */}
                         <div className='flex flex-col w-full text-xs text-black my-4'>
                            <p className='font-bold'>Residential&nbsp;Address</p>
                            <input type="text" className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'/>
                         </div>
                    
                         {/* location details*/}
                         <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black'>
                            <div className='flex flex-col md:w-1/3 w-full'>
                                <p className='font-bold'>State</p>
                                <FormControl sx={{width:'100'}} size="small">
                                    {/* <InputLabel id="demo-select-small" sx={{color : '#000'}}>Select State</InputLabel> */}
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        sx={{borderRadius : '8px',fontSize : '15px'}}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                    </Select>
                                
                                </FormControl>
                            </div>
                    
                             <div className='flex flex-col md:w-1/3 w-full'>
                                 <p className='font-bold'>LGA</p>
                                    <FormControl sx={{width:'100%'}} size="small">
                                     <Select
                                         labelId="demo-select-small"
                                         id="demo-select-small"
                                         sx={{borderRadius : '8px'}}
                                         //onChange={handleChange}
                                     >
                                         <MenuItem value="">
                                         <em>None</em>
                                         </MenuItem>
                                     </Select>
                                 
                                 </FormControl>
                             </div>
                             <div className='flex flex-col md:w-1/3 w-full'>
                                 <p className='font-bold'>City</p>
                                 <input type="text" className='py-2 text-sm  px-4 rounded-md border border-[#CBCBCB] w-full'/>
                             </div>
                         </div>
                         {/* occupation and nationality */}
                         <div className='w-full md:w-[66%] flex flex-col md:flex-row gap-4 text-xs text-black my-4'>
                             <div className='flex flex-col md:w-1/2 w-full'>
                                 <p className='font-bold'>Occupation</p>
                                 <input type={"text"} className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'/>
                             </div>
                             <div className='flex flex-col md:w-1/2 w-full'>
                                 <p className='font-bold'>Nationality</p>
                                 <input type="text" className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'/>
                             </div>
                         </div>
                         {/* Email, telephone and date of birth */}
                         <div className='w-full flex flex-col md:flex-row gap-4 text-xs text-black mb-4'>
                    
                             <div className='flex flex-col md:w-1/3 w-full'>
                                 <p className='font-bold'>Date&nbsp;Of&nbsp;Birth</p>
                                 <input type="text" className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'/>
                             </div>
                             <div className='flex flex-col md:w-1/3 w-full'>
                                 <p className='font-bold'>E-mail&nbsp;Address</p>
                                 <input type={"email"} className='text-sm py-2 px-4 rounded-md border border-[#CBCBCB] w-full'/>
                             </div>
                             <div className='flex flex-col md:w-1/3 w-full'>
                                 <p className='font-bold'>Telephone&nbsp;Number</p>
                                 <input type={"text"} className='py-2 text-sm px-4 rounded-md border border-[#CBCBCB] w-full'/>
                             </div>
                         </div>
                    
                         <div className="flex flex-col gap-1 w-full my-4">
                             <div className="flex justify-between items-center py-2 px-4 bg-[#DFDDEC] text-xs text-black font-semibold rounded">
                                 <p>Signature:</p>
                                 <input type="file" accept="images/*" className='hidden' id="signature"/>
                                 <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                 onClick={() => {
                                     document.getElementById('signature')?.click();
                                 }}>
                                     <FileUploadOutlinedIcon sx={{fontSize : '18px'}}/>
                                     <p>Upload</p>
                                 </div>
                             </div>
                             <div className="flex justify-between items-center py-2 px-4 bg-[#FFFAFA] text-xs text-black font-semibold rounded">
                                 <input type="file" accept="images/*" className='hidden' id="passport"/>
                                 <p>Photograph&nbsp;Photograph:</p>
                                 <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                 onClick={() => {
                                     document.getElementById('passport')?.click();
                                 }}>
                                     <FileUploadOutlinedIcon sx={{fontSize : '18px'}}/>
                                     <p>Upload</p>
                                 </div>
                             </div>
                             <div className="flex justify-between items-center py-2 px-4 bg-[#DFDDEC] text-xs text-black font-semibold rounded">
                                 <input type="file" accept="images/*" className='hidden' id="identification"/>
                                 <p>Means&nbsp;Of&nbsp;Identification:</p>
                                 <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                 onClick={() => {
                                     document.getElementById('identification')?.click();
                                 }}>
                                     <FileUploadOutlinedIcon sx={{fontSize : '18px'}}/>
                                     <p>Upload</p>
                                 </div>
                             </div>
                    
                             <div className="flex justify-between items-center py-2 px-4 bg-[#FFFAFA] text-xs text-black font-semibold rounded">
                                 <input type="file" accept="images/*" className='hidden' id="certificate"/>
                                 <p>Certificate&nbsp;Of&nbsp;Competence:</p>
                                 <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                                 onClick={() => {
                                     document.getElementById('certificate')?.click();
                                 }}>
                                     <FileUploadOutlinedIcon sx={{fontSize : '18px'}}/>
                                     <p>Upload</p>
                                 </div>
                             </div>
                         </div>
                    
                         <div className='flex justify-end text-white'>
                            <button className='bg-[#2B85F0] rounded-md outline-none px-4 py-2 text-xs flex flex-row items-center font-semibold gap-1'>
                                <SaveOutlinedIcon sx={{fontSize : '15px'}}/>
                                <p>Save</p>
                            </button>
                        </div>
                    </div>            
                )}

                <section className='w-full grid md:grid-cols-2 gap-2 my-8'>
                    <div className='text-sm flex flex-col md:flex-row items-center gap-2 w-auto'>
                        <button 
                        onClick={() => {
                            setExtras({...extras, isCooperateForm : false});
                            addFormOnClickHandler();
                        }}
                        className='w-full md:w-fit text-white flex justify-center gap-1 md:justify-around font-semibold mb-4 bg-[#6157A0] rounded-lg outline-none px-4 py-2'>
                            <ControlPointRoundedIcon sx={{fontSize : '18px'}}/>
                            Add&nbsp;Individual&nbsp;Business&nbsp;Owner
                        </button> 
                        <button 
                        // onClick={() => {
                        //     setExtras({...extras, isCooperateForm : true});
                        //     addFormOnClickHandler();
                        // }}
                        className='w-full md:w-fit text-[#6157A0] flex justify-center gap-1 md:justify-around font-semibold rounded-lg px-4 py-2 mb-4 bg-white border border-[#6157A0] outline-none'>
                            <ControlPointRoundedIcon sx={{fontSize : '18px'}}/>
                            Add&nbsp;Cooperate&nbsp;Business&nbsp;Owner
                        </button>
                    </div>

                    <button className='md:w-fit w-full text-center bg-[#16C807] justify-self-end
                    rounded-md outline-none px-4 h-fit py-2.5 text-xs text-white font-semibold gap-1'>
                        Submit
                    </button>
                </section>
            </form>
           

        
        </div>
    );
}