import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  label: string;
  error?: string;
  required?: boolean;
  accept?: string;
  onChange: (file: File | null) => void;
  preview?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  error,
  required = false,
  accept = 'image/*',
  onChange,
  preview,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id={label.toLowerCase().replace(/\s+/g, '-')}
        />
        <label
          htmlFor={label.toLowerCase().replace(/\s+/g, '-')}
          className={`flex items-center justify-center w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            error ? 'border-red-500' : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-32 rounded" />
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload {label}</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
            </div>
          )}
        </label>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
