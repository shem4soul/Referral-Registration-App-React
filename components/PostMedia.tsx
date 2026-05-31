import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaItem {
  unique_id: string;
  media: string;
  is_video: boolean;
}

interface Props {
  mediaItems: MediaItem[];
  className?: string;
}

export default function PostMedia({ mediaItems, className = "max-h-[400px]" }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  // ---- If only one media ----
  if (mediaItems.length === 1) {
    const item = mediaItems[0];
    return (
      <div className={cn("relative w-full overflow-hidden rounded-2xl", className)}>
        {item.is_video ? (
          <video
            src={item.media}
            controls
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <Image
            src={item.media}
            width={600}
            height={400}
            alt="Post media"
            className="w-full h-full object-cover rounded-2xl"
          />
        )}
      </div>
    );
  }

  // ---- Carousel for multiple media ----
  return (
    <div className="relative w-full max-h-[400px] overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={mediaItems[currentIndex].unique_id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          {mediaItems[currentIndex].is_video ? (
            <video
              src={mediaItems[currentIndex].media}
              controls
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <Image
              src={mediaItems[currentIndex].media}
              width={600}
              height={400}
              alt="Post media"
              className="w-full h-full object-cover rounded-2xl"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {mediaItems.map((_, idx) => (
          <div
            key={idx}
            className={`w-2.5 h-2.5 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-gray-400/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
