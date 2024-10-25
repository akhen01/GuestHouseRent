import React, { useState } from 'react'
import appwriteService from '../appwrite/config'

function ImagePreview({
    imgs=[],
    name
    }
) {
    const [img, setImg] = useState(0)

    const handleImgCRight = () => {
        setImg((prevIndex) => (prevIndex + 1) % imgs.length);
    }
    const handleImgCLeft = () => {
        setImg((prevIndex) => (prevIndex - 1 + imgs.length) % imgs.length)
    }

    return (
        <div className="relative w-full rounded-lg ">
            <div className="m-1  flex items-center h-full justify-center md:-m-2">
                <button onClick={handleImgCLeft} className=" absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-25 hover:bg-opacity-50 text-white p-2">
                    ←
                </button>
                <div className='parent-div'>
                    <img
                        className=" rounded-xl w-full object-scale-down h-64"
                        src={appwriteService.previewFile(imgs[img])}
                        alt={name}
                    />
                </div>
                <button onClick={handleImgCRight} className=" absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-25 hover:bg-opacity-50 text-white p-2">
                        →
                </button>
            </div>
        </div>
        );
    }

export default ImagePreview
