import DropZone from '@/components/DropZone'
import FileList from '@/components/FileList'
import UploadFile from '@/components/UploadFile'

export default function Home() {
  return (
    <main className="p-24">
      <span className="text-4xl font-bold flex justify-center">
        Scatterrr : Distributed File Storage
      </span>
      
      <div className="flex justify-center m-12">
        {/* <UploadFile /> */}
        <DropZone />
      </div>

      <div className="flex justify-center m-12">
      <FileList />
      </div>



    </main>
  )
}
