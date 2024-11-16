"use client";
import { ImageUpIcon, ScanEyeIcon, SquarePenIcon } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const ImagePicker = ({
  file,
  onChange,
  uploadedImageUrl,
  className,
}: {
  file: File | null;
  onChange: (value: File | null) => void;
  uploadedImageUrl: string;
  className?: string;
}) => {
  console.log(uploadedImageUrl);

  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onAttach = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    console.log(files);
    if (files[0]) {
      onChange(files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      console.log("ADD");
      setObjectUrl(URL.createObjectURL(file));
    } else {
      console.log("CLREATE ADD", objectUrl);
      URL.revokeObjectURL(objectUrl ?? "");
      setObjectUrl(null);
    }
    return () => {
      if (objectUrl) {
        console.log("CLREATE DLETE", objectUrl);
        URL.revokeObjectURL(objectUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <div
      onClick={() => {
        if (!objectUrl) {
          inputRef.current?.click();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={onAttach}
        accept="image/*"
      />
      <div
        className={cn(
          "relative w-full aspect-video rounded-lg overflow-hidden grid place-items-center group",
          className,
        )}
      >
        {uploadedImageUrl || objectUrl ? (
          <div className="w-full h-full">
            <img
              className="object-cover w-full h-full"
              src={objectUrl || uploadedImageUrl}
            />
            <div className="absolute left-0 top-0 p-2">
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="smallIcon"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  <SquarePenIcon />
                </Button>
                <Button
                  type="button"
                  size="smallIcon"
                  onClick={() => window.open(objectUrl || uploadedImageUrl)}
                >
                  <ScanEyeIcon />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-dashed border-2 w-full h-full grid place-items-center cursor-pointer rounded-lg">
            <div className="flex flex-col gap-2 items-center">
              <ImageUpIcon size={100} className="text-muted-foreground" />
              <p className="font-bold text-muted-foreground">إضافة صورة</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePicker;
