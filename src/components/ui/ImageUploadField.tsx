"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { FiLink, FiUpload, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploadField({
  value,
  onChange,
  label = "Event Image (optional)",
}: ImageUploadFieldProps) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error?.message ?? "Upload failed.");
      }

      onChange(data.data.url as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not upload image.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <div className="flex overflow-hidden rounded-lg border border-border text-xs">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 transition-colors",
              mode === "url" ? "bg-primary text-white" : "bg-card text-muted hover:text-foreground",
            )}
          >
            <FiLink className="text-sm" /> URL
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 transition-colors",
              mode === "upload" ? "bg-primary text-white" : "bg-card text-muted hover:text-foreground",
            )}
          >
            <FiUpload className="text-sm" /> Upload
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <input
          key="url-input"
          id="imageUrl"
          name="imageUrl"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus:border-primary"
        />
      ) : (
        <input
          key="upload-input"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white"
        />
      )}

      {uploading && <span className="text-xs text-muted">Uploading image...</span>}
      {error && <span className="text-xs text-red-500">{error}</span>}

      {value && !uploading && (
        <div className="relative mt-1 w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="h-24 w-36 rounded-lg border border-border object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove image"
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted hover:text-red-500"
          >
            <FiX className="text-xs" />
          </button>
        </div>
      )}
    </div>
  );
}