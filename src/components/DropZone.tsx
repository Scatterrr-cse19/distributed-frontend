'use client';

import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function DropZone({appendUploadedFile}: {appendUploadedFile: (file:ExtFile) => void}) {
  const [files, setFiles] = useState<ExtFile[]>([]);

  const updateFiles = (newFiles:ExtFile[]) => {
    setFiles(newFiles);
  };

  const handleFinishUpload = (files:ExtFile[]) => {
    console.log("File uploaded", files);
    appendUploadedFile(files[0]);
    setFiles([]);
    toast.success("File uploaded successfully");
  };
  
  return (
    <div className="w-full">
      <ToastContainer />
      <Dropzone
          onChange={updateFiles}
          value={files}
          // accept mkv, mp4, mp3, pdf, docx, txt, etc
          accept=".mkv, .mp4, .mp3, .pdf, .docx, .txt"
          maxFileSize={2 * 1024*1024*1024} // 2GB
          maxFiles={1}
          actionButtons={{
            position: "after", 
            uploadButton: {}, 
            abortButton: {},
            cleanButton: { onClick: () => setFiles([]) }
          }}
          uploadConfig={{
              url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/server/upload`,
              method: "POST",
              headers: {}, // add API key
          }}
          onUploadFinish={handleFinishUpload}
      >
        {files.map((file) => (
            <FileMosaic key={file.id} {...file} info preview/>
          ))}
      </Dropzone>                     
    </div>
  );
}
