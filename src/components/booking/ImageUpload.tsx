"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/common/Button";

const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const maxSize = 5 * 1024 * 1024;

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to read image."));
    reader.readAsDataURL(file);
  });
}

export function ImageUpload({
  onChange,
  value,
}: {
  onChange: (urls: string[]) => void;
  value: string[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    setError("");
    if (!files?.length) {
      return;
    }

    const nextFiles = Array.from(files);
    if (value.length + nextFiles.length > 3) {
      setError("You can upload up to 3 images.");
      return;
    }

    const invalidFile = nextFiles.find((file) => !allowedTypes.includes(file.type));
    if (invalidFile) {
      setError("Only JPG, JPEG, PNG, and WEBP images are accepted.");
      return;
    }

    const oversizedFile = nextFiles.find((file) => file.size > maxSize);
    if (oversizedFile) {
      setError("Each image must be 5MB or smaller.");
      return;
    }

    const urls = await Promise.all(nextFiles.map(fileToDataUrl));
    onChange([...value, ...urls]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    onChange(value.filter((_, currentIndex) => currentIndex !== index));
  }

  return (
    <div className="grid gap-3">
      <input
        accept=".jpg,.jpeg,.png,.webp"
        className="sr-only"
        id="dress-images"
        multiple
        onChange={(event) => void handleFiles(event.target.files)}
        ref={inputRef}
        type="file"
      />
      <div className="rounded-[2rem] border border-dashed border-[#C8A96A]/65 bg-[#F7EFE3]/72 p-6 text-center">
        <p className="text-sm font-bold text-[#3B2416]">
          Upload dress or clothing photos
        </p>
        <p className="mt-1 text-xs font-semibold text-[#7B6F65]">
          Uploading a photo helps us understand the work better.
        </p>
        <Button
          className="mt-4"
          onClick={() => inputRef.current?.click()}
          variant="secondary"
        >
          Choose Images
        </Button>
      </div>
      {error ? <p className="text-xs font-bold text-[#9A4A3C]">{error}</p> : null}
      {value.length ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {value.map((url, index) => (
            <div
              className="overflow-hidden rounded-[1.5rem] border border-[#E8D8C3] bg-[#FFFDF8]"
              key={url}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={`Uploaded clothing preview ${index + 1}`}
                className="h-32 w-full object-cover"
                src={url}
              />
              <button
                className="w-full px-3 py-2 text-xs font-bold text-[#9A4A3C] hover:bg-[#f8e8e2]"
                onClick={() => removeImage(index)}
                type="button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
