import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function Loading({ text = "Loading...", fullScreen = false, className }: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullScreen ? "min-h-[60vh]" : "py-12",
        className,
      )}
    >
      <AiOutlineLoading3Quarters className="animate-spin text-3xl text-primary" />
      <p className="text-sm text-muted">{text}</p>
    </div>
  );
}