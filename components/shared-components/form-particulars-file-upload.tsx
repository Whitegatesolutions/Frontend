import { IconButton } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import React from 'react';

type Props = {
    isUpload: boolean,
    elementId: string
};
export const FormParticularsFileUpload: React.FC<Props> = ({ isUpload = true, elementId }) => {
    //const [isUpload, setUploadState] = React.useState(true);

    return (
        <React.Fragment>
            {isUpload ?
                <div className='cursor-pointer hover:text-[#1976D2] w-fit flex flex-row items-center gap-1'
                    onClick={() => {
                        document.getElementById(`${elementId}`)?.click();
                    }}>
                    <FileUploadOutlinedIcon sx={{ fontSize: '18px' }} />
                    <p>Upload</p>
                </div>
                :
                <div className='cursor-pointer text-[#FF2D2D] w-fit flex flex-row items-center gap-1'
                    onClick={() => {
                        document.getElementById(`${elementId}`)?.click();
                    }}>
                    <object data="/delete.png" className='w-4 h-4 object-contain' />
                    <p>Delete</p>
                </div>
            }
        </React.Fragment>
    );
}