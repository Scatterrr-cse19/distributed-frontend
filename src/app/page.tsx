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

  const scrollToDropZone = () => {
    console.log('Scrolling to DropZone');
    const dropZone = document.getElementById('dropzone');
    if (dropZone) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <>
      <nav className="bg-black p-4 text-white flex justify-between items-center fixed top-0 w-full z-10">
        <span className="text-xl font-bold">Scatterrr: Distributed File Storage</span>

        <div className="space-x-4">
          {/* Add upload button that directs to the DropZone section in the page */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={scrollToDropZone}
          >
            Upload
          </button>
          {/* Add a search button */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Search
          </button>
        </div>
      </nav>

      <main className="p-24 mt-4">
        <div className="flex justify-center m-12" id="dropzone">
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
