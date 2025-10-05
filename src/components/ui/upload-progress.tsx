interface UploadProgressProps {
  progress: number;
}

export const UploadProgress = ({ progress }: UploadProgressProps) => {
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-1 text-center">
        {/* {progress < 100 
          ? `Uploading: ${progress}%` 
          : "Upload complete! Processing..."} */}
      </p>
    </div>
  );
}; 