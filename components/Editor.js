/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';

function Editor() {
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const uploadedImage = event.target.files[0];
        setImages((prevImages) => [...prevImages, { file: uploadedImage, resolution: {} }]);
    };

    useEffect(() => {
        const fetchImageResolution = async (index) => {
            const image = images[index];
            const imageUrl = URL.createObjectURL(image.file);

            return new Promise((resolve) => {
                const img = new Image();
                img.onload = function () {
                    URL.revokeObjectURL(imageUrl);
                    resolve({ width: img.width, height: img.height });
                };
                img.src = imageUrl;
            });
        };

        const fetchResolutions = async () => {
            const resolutions = await Promise.all(
                images.map((_, index) => fetchImageResolution(index))
            );
            const updatedImages = images.map((image, index) => ({
                file: image.file,
                resolution: resolutions[index]
            }));
            setImages(updatedImages);
        };

        if (images.length > 0) {
            fetchResolutions();
        }
    }, [images]);

    return (
        <div className="w-full h-auto flex items-center justify-center">
            <div className="relative w-[90%] p-8 h-full flex flex-col items-center justify-center border-4 border-dashed border-black rounded-lg dark:border-gray-600 dark:hover:border-gray-500">
                {images.length >= 1 &&
                    <div className='flex pb-6 w-[100%] justify-end'>
                        <label
                            htmlFor="dropzone-file"
                            className="flex items-center justify-center p-3 border-4 border-black rounded-lg cursor-pointer dark:border-gray-600 dark:hover:border-gray-500"
                        >
                            + Add Screen
                            <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} />
                        </label>
                    </div>}
                {images.length === 0 ? (
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
                ) : (
                    <div className="flex justify-center items-end">
                        {images.map((image, index) => (
                            <div key={index} className="relative"
                                style={{ position: 'relative', background: '#000', borderBottom: '30px solid #d8d8d8', borderRadius: '8px' }}>
                                <div style={{ content: '', position: 'absolute', width: '70px', height: '60px', left: '50%', bottom: '-60px', zIndex: '-1', transform: 'perspective(100px) translateX(-50%) rotateX(25deg) skewX(7deg)', backgroundColor: '#bdbdbd' }}></div>
                                <div style={{ content: '', position: 'absolute', width: '140px', height: '15px', left: '50%', bottom: '-80px', zIndex: '-1', transform: 'translateX(-50%)', backgroundColor: '#d8d8d8', marginBottom: '10px' }}></div>

                                <div className="absolute -top-4 text-xs left-2 text-gray-600">
                                    {/* Display resolution here */}
                                    {`${image.resolution.width}x${image.resolution.height}`}
                                </div>
                                <img
                                    src={URL.createObjectURL(image.file)}
                                    alt={`Image ${index + 1}`}
                                    className={`max-h-[40%] h-[${30 + index * 5}vh] rounded-t-lg`}
                                    draggable="false"
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div style={{ position: 'relative', background: '#000', borderBottom: '30px solid #d8d8d8', borderRadius: '8px' }}></div>
            </div>
        </div>
    );
}

export default Editor;














{/* <div className='monitor' style={{ width: '350px', height: '200px', position: 'relative', background: '#000', borderBottom: '30px solid #d8d8d8', borderRadius: '4px' }}>
                <div style={{ content: '', position: 'absolute', width: '70px', height: '60px', left: '50%', bottom: '-70px', zIndex: '-1', transform: 'perspective(100px) translateX(-50%) rotateX(25deg) skewX(7deg)', backgroundColor: '#bdbdbd' }}></div>
                <div style={{ content: '', position: 'absolute', width: '140px', height: '15px', left: '50%', bottom: '-85px', zIndex: '-1', transform: 'translateX(-50%)', backgroundColor: '#d8d8d8' }}></div>
            </div> */}