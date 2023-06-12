/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

function Editor() {
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const uploadedImage = event.target.files[0];
        setImages((prevImages) => [...prevImages, uploadedImage]);
    };

    return (
        <div className="w-full h-[62vh] flex items-center justify-center">
            <div className="relative w-[90%] h-full flex flex-col items-center justify-center border-4 border-dashed border-black rounded-lg dark:border-gray-600 dark:hover:border-gray-500">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center cursor-pointer"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            aria-hidden="true"
                            className="w-14 h-14 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                        </svg>
                        <p className="mb-2 text-md">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-md">JPEG, JPG, PNG or WEBP</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} />
                </label>

                <label
                    htmlFor="dropzone-file"
                    className="absolute bottom-4 right-4 flex items-center justify-center p-3 border-4 border-black rounded-lg cursor-pointer dark:border-gray-600 dark:hover:border-gray-500"
                >
                    + Add Screen
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} />
                </label>
            </div>
        </div>
    );
}

export default Editor;