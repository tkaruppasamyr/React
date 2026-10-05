
import {useRef, useState} from "react";
import { axiosInstance } from '../../api/axios';
import { fileUploadHome, fileUploadStatus } from '../../api/fileupload';



export const FilerUploadHome = () => {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isfileprocess, setFileprocess] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("uploading");

  const getButtonText = () => {
        switch (uploadStatus) {
            case "uploading":
            return "Uploaded Dataset";

            case "processing":
            return "Processing...";

            case "verifying":
            return "Verifying...";

            case "error":
            return "Try Again";

            default:
            return "Upload Dataset";
        }
    };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async () => {
    console.log('Upload button clicked', fileInputRef.current?.files);
    

    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      // const response:any = await fileUploadApi(formData);
      const response:any = await fileUploadPreSignedApi(
        {file_name: file.name,file_content_type: file.type});
      if (response?.status === 200) {
        setFileprocess(true);
        setUploadStatus("processing");
        const { presigned_url } = response.data;
        if (!presigned_url) {
          throw new Error("Presigned URL not found in response");
        }
        // Step 2: Upload the actual file directly to MinIO
        const minioResponse = await fetch(presigned_url, {
          method: "PUT",
          body: file,
        });

        if (!minioResponse.ok) {
          throw new Error(
            `MinIO upload failed: ${minioResponse.status} ${minioResponse.statusText}`
          );
        }
        if (minioResponse?.statusText === 'OK' && minioResponse?.status === 200) {
          const { id,file_name,file_path } = response.data;
          setUploadStatus("verifying");
          const minioUpdateResponse = await fileUploadApi(id,
            {file_path:file_path,file_name: file_name,});

          if (minioUpdateResponse?.status === 200) {
            console.log("File upload record updated successfully in backend : ", minioUpdateResponse);
            setUploadStatus("uploading");
            setFileprocess(false);
          } else {
            throw new Error("Failed to update file upload record in backend");
          }
        } else {
          throw new Error("MinIO upload failed");
        }

      }
      
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Data Science File Upload
        </h1>

        <p className="mt-2 text-gray-500">
          Upload your CSV, Excel, or Parquet dataset.
        </p>

        <div className="mt-8 border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-blue-500 transition-colors">

          <svg
            className="mx-auto h-14 w-14 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
            />
          </svg>

          <h2 className="mt-4 text-xl font-semibold">
            Drag & Drop Files
          </h2>

          <p className="mt-2 text-gray-500">
            or click below to browse
          </p>

          <input
            type="file"
            accept=".csv,.xlsx,.xls,.parquet"
            className="hidden"
            ref={fileInputRef}
          />

          <label
            className="mt-6 inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700"
            onClick= {handleChooseFile}
          >
            Choose File
          </label>

          <p className="mt-4 text-sm text-gray-400">
            Supported: CSV, XLSX, XLS, Parquet
          </p>

        </div>

        <div className="mt-8 flex justify-end">
            <button
                type="button"
                onClick={handleFileUpload}
                disabled={isfileprocess}
                className="rounded-lg bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70 flex items-center"
            >
                {isfileprocess && (
                <svg className="mr-3 size-5 animate-spin rounded-full border-4 border-white/50 border-t-white" viewBox="0 0 24 24"></svg>
                
                )}

                {getButtonText()}
            </button>
        </div>

      </div>
    </div>
  );
};



const fileUploadPreSignedApi = async(file_details:any)=>{
  try{
    const response = await axiosInstance.Post(fileUploadHome,file_details);
    if (response.statusText !== 'OK') {
      throw new Error('File upload failed');
    }
    return response;
  }catch(error){
    console.error('Error uploading file:', error);
    throw error;
  }
}

const fileUploadApi = async(id:number,formData:any)=>{
  try{
    const response = await axiosInstance.Post(fileUploadStatus(id),formData);
    if (response.statusText !== 'OK') {
      throw new Error('File upload failed');
    }
    return response;
  }catch(error){
    console.error('Error uploading file:', error);
    throw error;
  }
}


