import React from "react";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

type Props = {
    index : number,
    getSingleSavedForm : any,
    isEdit : boolean,
    onSaveHandler : any,
    onEditHandler : any,
    onClickEditButtonHandler : any,
    onDeletePartnerHandler : any
}
export const FormActionButtons:React.FC<Props> = ({
    index, 
    getSingleSavedForm,
    isEdit,
    onSaveHandler,
    onEditHandler,
    onClickEditButtonHandler,
    onDeletePartnerHandler
}) => {
    return(
        <div className='flex justify-end text-white'>
                            {!getSingleSavedForm?
                                <button
                                    id={`save-${index}-button`}
                                    className='bg-[#2B85F0] rounded-md outline-none 
                                    px-4 py-2 text-xs flex flex-row 
                                    items-center font-semibold gap-1
                                    disabled:bg-[#EFF0F6] 
                                    disabled:shadow-none 
                                    disabled:text-gray-500 disabled:cursor-default'
                                    onClick={onSaveHandler}>
                                    <SaveOutlinedIcon sx={{ fontSize: '15px' }} />
                                    <p>Save</p>
                                </button>
                                :
                                <div className='flex flex-row items-center gap-4'>
                                    <button
                                        className='bg-[#56134B] rounded-md 
                                        text-white outline-none 
                                        px-4 py-2 text-xs flex flex-row 
                                        items-center font-semibold gap-1
                                        disabled:bg-[#EFF0F6] 
                                        disabled:shadow-none 
                                        disabled:text-gray-500 disabled:cursor-default'
                                        onClick={() => isEdit ? onEditHandler : onClickEditButtonHandler}
                                    >
                                        <object data="/delete.svg" className='w-4 h-4  object-contain' />
                                        {isEdit ? "Save Changes" : "Edit"}
                                    </button>
                                    <button
                                        className='bg-[#FF2D2D] rounded-md
                                        text-white outline-none 
                                        px-4 py-2 text-xs flex flex-row 
                                        items-center font-semibold gap-1
                                        disabled:bg-[#EFF0F6] 
                                        disabled:shadow-none 
                                        disabled:text-gray-500 disabled:cursor-default'
                                        onClick={onDeletePartnerHandler}
                                    >
                                        <object
                                            data="/edit.svg"
                                            type="image/svg+xml"
                                            className='w-4 h-4 .svg object-contain'
                                        />
                                        Delete
                                    </button>
                                </div>
                            }
                        </div>
    );
}