'use client';

import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { Upload, File } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { formatFileSize } from '@/utils/formatters';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = '.csv,.xlsx',
  disabled = false,
  isLoading = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    if (!disabled && !isLoading) {
      inputRef.current?.click();
    }
  };

  return (
    <Card variant="glass" className={clsx(disabled && 'opacity-50 cursor-not-allowed')}>
      <CardBody>
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
          className={clsx(
            'border-2 border-dashed rounded-xl p-12 text-center cursor-pointer',
            'transition-all duration-200',
            isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary',
            (disabled || isLoading) && 'cursor-not-allowed'
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
            disabled={disabled || isLoading}
          />

          <div className="flex flex-col items-center gap-4">
            {selectedFile ? (
              <>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <File className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selectedFile.name}</p>
                  <p className="text-sm text-muted-light mt-1">{formatFileSize(selectedFile.size)}</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {isDragging ? 'Drop your file here' : 'Drag and drop your file here'}
                  </p>
                  <p className="text-sm text-muted-light mt-1">
                    or click to browse (CSV, XLSX)
                  </p>
                </div>
              </>
            )}
          </div>

          {selectedFile && (
            <Button
              size="sm"
              variant="outline"
              className="mt-6"
              disabled={disabled || isLoading}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
                if (inputRef.current) inputRef.current.value = '';
              }}
            >
              Clear Selection
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
