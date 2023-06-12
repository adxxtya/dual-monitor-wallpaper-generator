import React, { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Draggable from 'react-draggable';

function Hero() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [screenSizes, setScreenSizes] = useState([]);
    const isDraggingRef = useRef(false);
    const [calculatedSizes, setCalculatedSizes] = useState([]);

    const handleFileInputChange = async (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]);

        const filePromises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    resolve({ width: img.width, height: img.height });
                };
                img.onerror = () => {
                    reject();
                };
                img.src = URL.createObjectURL(file);
            });
        });

        try {
            const sizes = await Promise.all(filePromises);
            setScreenSizes([...screenSizes, ...sizes]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const updatedSizes = selectedFiles.map((_, index) => calculateImageSize(index));
        setCalculatedSizes(updatedSizes);
    }, [screenSizes]);

    const handleScreenSizeChange = (index, event) => {
        const { name, value } = event.target;
        setScreenSizes((prevScreenSizes) => {
            const updatedScreenSizes = [...prevScreenSizes];
            updatedScreenSizes[index] = {
                ...updatedScreenSizes[index],
                [name]: parseInt(value),
            };
            return updatedScreenSizes;
        });
    };

    const calculateImageSize = (index) => {
        if (selectedFiles[index] && screenSizes[index]) {
            const { width, height } = screenSizes[index];
            const aspectRatio = width / height;
            const maxWidth = 0.3 * window.innerWidth; // Limiting width to 80% of the window width
            const maxHeight = 0.3 * window.innerHeight; // Limiting height to 80% of the window height

            const containerWidth = maxWidth * 0.8; // Limiting container width to 80% of the maximum width
            const containerHeight = containerWidth / aspectRatio;

            const calculatedWidth = Math.min(containerWidth, maxHeight * aspectRatio);
            const calculatedHeight = Math.min(containerHeight, maxWidth / aspectRatio);

            return { width: calculatedWidth, height: calculatedHeight };
        }

        return { width: 0, height: 0 };
    };

    const handleDragStart = () => {
        isDraggingRef.current = true;
    };

    const handleDragStop = () => {
        isDraggingRef.current = false;
    };

    const handleDrag = (event, ui) => {
        if (!event.shiftKey && isDraggingRef.current) {
            event.preventDefault();
            return false;
        }
    };

    const handleImageLoad = (index, event) => {
        const { naturalWidth, naturalHeight } = event.target;
        setScreenSizes((prevScreenSizes) => {
            const updatedScreenSizes = [...prevScreenSizes];
            updatedScreenSizes[index] = {
                width: naturalWidth,
                height: naturalHeight,
            };
            return updatedScreenSizes;
        });
    };

    return (
        <div className="flex items-center justify-center h-[62vh]">
            <div
                id="image-container"
                className="relative w-[90%] h-full border-4 border-dashed border-black rounded-xl"
            >
                {selectedFiles.map((file, index) => (
                    <TransformWrapper
                        key={index}
                        options={{
                            limitToBounds: false,
                            minScale: 0.1,
                            maxScale: 5,
                            centerContent: true,
                            wheel: { step: 50 },
                            disablePan: isDraggingRef.current, // Use the current value of the isDraggingRef
                        }}
                    >
                        {({ zoomIn, zoomOut, setDefaultState }) => (
                            <>
                                <Draggable
                                    onStart={handleDragStart}
                                    onStop={handleDragStop}
                                    onDrag={handleDrag}
                                >
                                    <div
                                        className="cursor-move"
                                        style={{
                                            width: `${calculatedSizes[index]?.width}px`,
                                            height: `${calculatedSizes[index]?.height}px`,
                                            position: 'absolute',
                                            left: '50%',
                                            top: '50%',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    >
                                        <TransformComponent>
                                            <img
                                                className="object-contain max-h-full max-w-full rounded-lg"
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                style={{ objectFit: 'cover' }}
                                                onLoad={(event) => handleImageLoad(index, event)}
                                            />
                                        </TransformComponent>
                                    </div>
                                </Draggable>
                            </>
                        )}
                    </TransformWrapper>
                ))}

                <div
                    className="drop-zone flex flex-col items-end justify-end h-full bg-white border-dashed border-gray-400 rounded-lg cursor-pointer p-4"
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                        event.preventDefault();
                        const files = Array.from(event.dataTransfer.files);
                        setSelectedFiles([...selectedFiles, ...files]);
                        setScreenSizes([...screenSizes, { width: 1920, height: 1080 }]);
                    }}
                >
                    <svg
                        className="w-8 h-8 mb-3 text-gray-400 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M16 7H8v14h8V7zm-6 9h4v2h-4v-2zM13 0h-2v5h2V0zm6 7h-2v5h2V7zM9 0H7v5h2V0zm12 5h-2v14h2V5zM5 5H3v14h2V5z" />
                    </svg>
                    <label htmlFor="file-input" className="mb-4">
                        <input
                            id="file-input"
                            type="file"
                            className="drop-zone__input"
                            onChange={handleFileInputChange}
                            multiple
                        />
                        <span className="px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600">
                            Select files
                        </span>
                    </label>
                    <p className="text-gray-600">Drag and drop a file here</p>
                </div>

                {selectedFiles.length > 0 && (
                    <div className="absolute bottom-4 left-4">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="mb-2">
                                <label htmlFor={`width-input-${index}`}>Width:</label>
                                <input
                                    id={`width-input-${index}`}
                                    type="number"
                                    name="width"
                                    value={screenSizes[index]?.width || ''}
                                    onChange={(e) => handleScreenSizeChange(index, e)}
                                    min="1"
                                />

                                <label htmlFor={`height-input-${index}`} className="ml-2">
                                    Height:
                                </label>
                                <input
                                    id={`height-input-${index}`}
                                    type="number"
                                    name="height"
                                    value={screenSizes[index]?.height || ''}
                                    onChange={(e) => handleScreenSizeChange(index, e)}
                                    min="1"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Hero;
