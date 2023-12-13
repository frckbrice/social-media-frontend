<<<<<<< HEAD
"use client";

import React, { useState, ChangeEvent } from "react";

import { useDropzone } from "react-dropzone";
import { FaPlus, FaTimes, FaPaperPlane, FaFile } from "react-icons/fa";
import { AiOutlineSmile } from "react-icons/ai";

interface SelectFileProps {
  file: File | string;
  onCaptureImage: (image: string) => void;
  onClose: () => void;
}

const SelectFile: React.FC<SelectFileProps> = ({ file, onCaptureImage, onClose }) => {
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [isHovered, setIsHovered] = useState(false);

  const [isOpen, setIsOpen] = useState(true);

  const handleCaptureImage = () => {
    const capturedImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE...";
    onCaptureImage(capturedImage);
  };

  const handleClear = () => {
    setIsOpen(false);
    onClose();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

=======
import React, { useState, ChangeEvent, useEffect } from "react";

import { useDropzone } from "react-dropzone";
import {
    FaPlus,
    FaTimes,
    FaPaperPlane,
    FaFile,
  } from "react-icons/fa";
  import { AiOutlineSmile } from "react-icons/ai";


function SelectFile() {

  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

>>>>>>> 24e64d5 (select file component)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

<<<<<<< HEAD
  const handleFileDrop = (acceptedFiles: File[]) => {
    // Handle file upload logic here
    setUploadedFiles((prevUploadedFiles) => [
      ...prevUploadedFiles,
      ...acceptedFiles,
    ]);
  };

  const handleRemoveFile = (fileIndex: number) => {
    setUploadedFiles((prevUploadedFiles) =>
      prevUploadedFiles.filter((_, index) => index !== fileIndex)
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // accept: ["application/pdf", "image/*", "video/*"],
    multiple: true,
    onDrop: handleFileDrop,
  });


  const renderPreview = () => {
    if (typeof file === "string") {
      return <img src={file} alt="Captured" className="max-w-full h-80" />;
    } else if (file) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="Uploaded"
          className="max-w-full mb-6 h-80"
        />
      );
    } else {
      return (
        <p className="text-2xl text-gray-400">No preview available</p>
      );
    }
  };


  return (
    <>
    {isOpen && (<div className="dropzone bg-chatGray z-30 h-[90vh] w-[65%] right-12 top-16 fixed">
      <div className="h-16 bg-gray-200 flex items-center p-4">
        <FaTimes
          className="text-gray-500 text-3xl cursor-pointer mr-96"
          onClick={handleClear}
        />{" "}
        <p>{typeof file === "string" ? "Captured Image" : file.name}</p>
      </div>

      <div className="flex justify-center items-center flex-col my-20 h-auto">

      {renderPreview()}
      
      </div>


      <div className="flex w-[90%]">
      <div className="flex bg-white rounded-md py-2 pl-4 w-[75%] m-auto">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={handleChange}
          className="w-full bg-transparent text-lg border-0 focus:outline-none"
        />
        <AiOutlineSmile className="mr-5 text-myG text-4xl" />
      </div>
      <div className="bg-themecolor rounded-full w-12 h-12 cursor-pointer flex items-center justify-center">
          <FaPaperPlane className="text-2xl text-white" />
        </div>
        </div>
      <p className=" border-b border-gray-300 my-6"></p>


      <div className="flex space-x-4 justify-center">
        {uploadedFiles.map((_, index) => (
          <div
            key={index}
            className="border-4 border-themecolor flex-col p-8 w-16 h-16 relative cursor-pointer rounded-md bg-white hover:bg-gray-300 "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleRemoveFile(index)}
              className="text-lg text-white absolute top-0 right-0 p-1"
            >
              {isHovered && <FaTimes />}
            </button>

            <FaFile className="text-4xl text-myG absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        ))}

        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <div className="border-2 p-4 w-16 h-16 flex items-center justify-center rounded-md">
              <FaPlus className="cursor-pointer text-2xl text-myG" />
            </div>
          )}
          {/* {isHovered && <span className=" bg-gray-300 text-sm px-2 py-1">Add file</span>} */}
        </div>
      </div>

    </div>)}
    </>
  );
};

export default SelectFile;
=======
    const handleFileDrop = (acceptedFiles: File[]) => {
      // Handle file upload logic here
      setUploadedFiles((prevUploadedFiles) => [
        ...prevUploadedFiles,
        ...acceptedFiles,
      ]);
    };
  
    const handleRemoveFile = (fileIndex: number) => {
      setUploadedFiles((prevUploadedFiles) =>
        prevUploadedFiles.filter((_, index) => index !== fileIndex)
      );
    };
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      // accept: ["application/pdf", "image/*", "video/*"],
      multiple: true,
      onDrop: handleFileDrop,
    });
  
    const handleDocumentClick = () => {
      const input = document.getElementById("fileInput");
      if (input) {
        input.click();
      }
    };
  
    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        handleFileDrop(Array.from(files));
      }
    };
  return (
    <div>
        <div
    className="dropzone bg-red-600 z-30 h-[calc(100vh-117px)] bigScreen:h-[calc(100vh-117px-39px)] px-4 space-y-10"
  >
    <div className="h-14 bg-gray-600 w-full flex items-center p-4">
      <FaTimes
        className="text-gray-800 text-2xl cursor-pointer"
        // onClick={handlePlusIconClick}
      />{" "}
      {/* <p>{{file.name}}</p> */}
    </div>
    <div>
      <p>No preview available</p>
    </div>

    <div className="flex bg-white rounded-md py-2 pl-4 w-[75%] m-auto">
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={handleChange}
        className="w-full bg-transparent text-sm border-0 focus:outline-none"
      />
      <AiOutlineSmile className="mr-5 text-myG text-4xl" />
    </div>
    <p className=" border-b border-gray-500"></p>

    <div className="flex space-x-4 justify-center">
      {uploadedFiles.map((file, index) => (
        <div
          key={index}
          className="border flex-col p-4 w-16 h-16 hover:bg-gray-500"
        >
          <button
            onClick={() => handleRemoveFile(index)}
            className="text-sm"
          >
            <FaTimes />
          </button>

          <FaFile className="text-5xl" />
        </div>
      ))}

      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p className="border p-4 w-16 h-16 hover:bg-gray-500">
            <FaPlus className="cursor-pointer " />
          </p>
        )}
      </div>
      <div>
        <FaPaperPlane  className="text-5xl bg-themecolor p-4 rounded-full text-white"/>
      </div>
    </div>

  </div>
  </div>
  )
}

export default SelectFile
>>>>>>> 24e64d5 (select file component)
