'use client';

import DropZone from '@/components/DropZone'
import FileList from '@/components/FileList'
import { FileMetadata } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { sampleFileMetadata } from '@/data';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [files, setFiles] = useState<FileMetadata[]>([]);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/server/files`);
        console.log('Files fetched:', response.data);
        // Convert the response data to the FileMetadata type
        const convertedFiles = response.data.map((file: any, index: number) => {
          return {
            id: index.toString(),
            size: file.fileSize,
            type: file.fileType,
            name: file.fileName
          };
        });
        setFiles(convertedFiles);
      } catch (error) {
        console.error('Files fetch failed:', error);
      }
    }
    // fetchFiles();
    setFiles(sampleFileMetadata);
  }, []);

  return (
    <>
      <main className="p-24">
        <div className="flex justify-center m-12">
          <DropZone />
        </div>

        <div className="m-12">
          <span className="text-xl font-bold">
            Your Files
          </span>
          <div className="flex justify-center">
            <FileList files={files} />
          </div>
        </div>
      </main>
    </>
  )
}
