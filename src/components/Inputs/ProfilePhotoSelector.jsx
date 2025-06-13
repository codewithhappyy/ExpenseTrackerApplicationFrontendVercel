import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }

  return (
    <div className='flex justify-center mb-6'>
        <input
            type='file'
            ref={inputRef}
            className='hidden'
            accept='image/*'
            onChange={handleImageChange}
        />
        
        {!image ? (
            <div className='w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center relative'>
                <LuUser className='text-4xl text-primary' />

                <button
                    type='button'
                    className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
                    onClick={onChooseFile}
                >
                    <LuUpload className='text-xl' />
                </button>
            </div>
        ) : (
            <div className='relative'>
                <img src={previewUrl} alt='profile photo' className='w-20 h-20 rounded-full object-cover' />

                <button
                    type='button'
                    className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
                    onClick={handleRemoveImage}
                >
                    <LuTrash className='text-xl' />
                </button>
            </div>
        )}
    </div>
  )
}

export default ProfilePhotoSelector