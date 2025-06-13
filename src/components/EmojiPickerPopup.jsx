import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({icon, setIcon}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiSelect = (emojiData) => {
        if (setIcon && typeof setIcon === 'function') {
            setIcon(emojiData.emoji);
            setShowEmojiPicker(false);
        }
    };

    return (
        <div className='relative'>
            <button
                type='button'
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full hover:bg-gray-200'
            >
                {icon || '😀'}
            </button>

            {showEmojiPicker && (
                <div className='absolute top-full left-0 mt-2 z-50'>
                    <EmojiPicker
                        onEmojiClick={handleEmojiSelect}
                        width={300}
                        height={400}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup