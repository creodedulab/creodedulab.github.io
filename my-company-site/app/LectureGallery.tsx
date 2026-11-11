"use client";

import { useEffect, useRef, useState } from "react";

const rows = [0, 1].map((row) =>
  Array.from({ length: 11 }, (_, index) => {
    const number = row * 11 + index + 1;
    return {
      src: `/front${String(number).padStart(2, "0")}.jpg${number === 11 ? "?v=20261112" : ""}`,
      alt: `강의 현장 ${number}`,
    };
  }),
);

type Photo = (typeof rows)[number][number];

function PhotoRow({ photos, reverse, onSelect }: { photos: Photo[]; reverse: boolean; onSelect: (photo: Photo) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = track?.parentElement;
    if (!track || !viewport) return;
    const handleWheel = (event: WheelEvent) => {
      const animation = track.getAnimations()[0];
      if (!animation || typeof animation.currentTime !== "number") return;
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const distance = track.scrollWidth / 2;
      const timeDelta = (delta / distance) * 50000 * (reverse ? -1 : 1);
      animation.currentTime = ((animation.currentTime + timeDelta) % 50000 + 50000) % 50000;
    };
    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [reverse]);

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="lecture-gallery-track flex w-max gap-6" style={{ animationDirection: reverse ? "reverse" : "normal" }}>
        {[...photos, ...photos].map((photo, index) => (
          <button key={`${photo.src}-${index}`} type="button" onClick={() => onSelect(photo)} aria-label={`${photo.alt} 확대 보기`} className="w-[280px] md:w-[400px] h-[200px] md:h-[280px] rounded-2xl overflow-hidden shadow-md shrink-0 bg-gray-200 border border-slate-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-indigo-500">
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function LectureGallery() {
  const [selected, setSelected] = useState<Photo | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    else if (!selected && dialog.open) dialog.close();
  }, [selected]);

  return (
    <>
      <div className="relative w-full space-y-6">
        {rows.map((photos, index) => <PhotoRow key={index} photos={photos} reverse={index === 1} onSelect={setSelected} />)}
      </div>
      <dialog ref={dialogRef} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }} aria-label="강의 현장 사진 확대" className="m-auto max-h-[95vh] max-w-[95vw] overflow-visible rounded-xl bg-transparent p-0 backdrop:bg-black/80">
        {selected && <div className="relative"><button type="button" onClick={() => dialogRef.current?.close()} aria-label="사진 닫기" className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-3xl text-white hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">×</button><img src={selected.src} alt={selected.alt} className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain" /></div>}
      </dialog>
    </>
  );
}
