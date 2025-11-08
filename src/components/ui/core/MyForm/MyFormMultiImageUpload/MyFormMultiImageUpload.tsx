/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

type TMultiImageUploadProps = {
  name: string;
  label?: string;
  maxImages?: number;
  defaultValue?: File[] | string[];
  inputClassName?: string;
  previewImageClassName?: string;
  labelClassName?: string;
  parentClassName?: string;
  size?: string;
};

const MyFormMultiImageUpload = ({
  name,
  label,
  maxImages = 5,
  defaultValue = [],
  inputClassName = "",
  previewImageClassName = "",
  labelClassName = "",
  parentClassName = "",
  size = "medium",
}: TMultiImageUploadProps) => {
  const { control, setValue, resetField } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Create preview URLs
  const generatePreview = (file: File) =>
    new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

  const handleAddFiles = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles).slice(
      0,
      maxImages - files.length
    );
    const newPreviews = await Promise.all(fileArray.map(generatePreview));

    const updatedFiles = [...files, ...fileArray];
    const updatedPreviews = [...previews, ...newPreviews];

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    setValue(name, updatedFiles, { shouldValidate: true });
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...previews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    setValue(name, updatedFiles);
  };

  useEffect(() => {
    if (defaultValue?.length && typeof defaultValue[0] === "string") {
      setPreviews(defaultValue as string[]);
    }
  }, [defaultValue]);

  return (
    <div className={cn(`form-group ${size}`, parentClassName)}>
      {label && <p className={cn("mb-2", labelClassName)}>{label}</p>}

      <Controller
        name={name}
        control={control}
        render={({ fieldState: { error } }) => (
          <>
            <div className="flex flex-wrap gap-3 mb-2">
              {previews.map((src, index) => (
                <div key={index} className="relative w-[100px] h-[100px]">
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    className={cn(
                      "object-cover rounded-md w-full h-full",
                      previewImageClassName
                    )}
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <RiDeleteBinLine size={16} />
                  </button>
                </div>
              ))}
            </div>

            {previews.length < maxImages && (
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleAddFiles(e.target.files)}
                className={cn(
                  "block w-full border p-2 rounded-md",
                  inputClassName
                )}
              />
            )}

            {error && <small className="text-red-500">{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default MyFormMultiImageUpload;
