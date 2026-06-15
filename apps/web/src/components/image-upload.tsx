"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Camera, X } from "lucide-react";

/** Multi-image uploader (Flipkart-style): drag/click to add, thumbnails with remove, first = cover. */
export function MultiImageUpload({ max = 6 }: { max?: number }) {
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => URL.createObjectURL(f));
    setPreviews((p) => [...p, ...urls].slice(0, max));
  };

  const removeAt = (i: number) =>
    setPreviews((p) => p.filter((_, idx) => idx !== i));

  const remaining = max - previews.length;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-ink">Photos</label>
        <span className="text-xs text-ink-faint">
          {previews.length}/{max}
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {previews.map((src, i) => (
          <div key={src} className="relative size-24 overflow-hidden rounded-xl border border-line">
            <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover" unoptimized />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute right-1 top-1 inline-flex size-6 items-center justify-center rounded-full bg-danger text-white shadow"
              aria-label="Remove photo"
            >
              <X className="size-3.5" />
            </button>
            {i === 0 && (
              <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                Cover
              </span>
            )}
          </div>
        ))}
        {remaining > 0 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex size-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-primary/40 bg-primary-soft text-primary transition-colors hover:bg-primary-soft/70"
          >
            <ImagePlus className="size-5" />
            <span className="text-xs font-semibold">Add</span>
          </button>
        )}
      </div>
      <p className="text-xs text-ink-faint">
        Add up to {max} photos. The first photo is your cover image.
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />
    </div>
  );
}

/** Single-image uploader for an avatar or store banner. */
export function SingleImageUpload({
  shape = "circle",
  label = "Add a photo",
}: {
  shape?: "circle" | "banner";
  label?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = (files: FileList | null) => {
    const f = files?.[0];
    if (f && f.type.startsWith("image/")) setPreview(URL.createObjectURL(f));
  };

  if (shape === "circle") {
    return (
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="relative inline-flex size-28 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-primary/40 bg-primary-soft text-primary"
        >
          {preview ? (
            <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
          ) : (
            <Camera className="size-7" />
          )}
          <span className="absolute bottom-0 right-0 inline-flex size-8 items-center justify-center rounded-full border-2 border-white bg-primary text-white">
            <Camera className="size-4" />
          </span>
        </button>
        <span className="text-sm font-semibold text-primary">{label}</span>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files)} />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="relative flex aspect-[21/9] w-full items-center justify-center overflow-hidden rounded-card border-2 border-dashed border-primary/30 bg-primary-soft text-primary"
    >
      {preview ? (
        <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
      ) : (
        <span className="flex flex-col items-center gap-2">
          <ImagePlus className="size-7" />
          <span className="font-semibold">{label}</span>
        </span>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files)} />
    </button>
  );
}
