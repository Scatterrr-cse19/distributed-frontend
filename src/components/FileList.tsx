'use client';

import * as React from 'react';
import { ExtFile, FileCard } from '@files-ui/react';
import axios from 'axios';
import { FileMetadata } from '@/types';

export default function FileList({ files }: { files: FileMetadata[] }) {
  const handleDownload = (fileName: string) => {
    console.log("Download file", fileName);
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/server/retrieve?fileName=${fileName}`)
    .then((response) => {
      console.log('Download successful:', response.data);
      // Download the file to the client
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    })
  };

  const handleDelete = (fileName: string) => {
    console.log("Delete file", fileName);
  };

  return (
    <div className="flex flex-wrap mt-4 align-left justify-left">
      {files.map((file) => (
        <div className="mr-12 m-4" key={file.id}>
          <FileCard 
          {...file} 
          darkMode={true}
          onDownload={() => {
            handleDownload(file.name);
          }}
          onDelete={() => {
            handleDelete(file.name);
          }}
          />
        </div>
      ))}
    </div>
  );
}
