import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        "max-w-350",
        "mx-auto",
        "px-4 md:px-5 lg:px-6 xl:px-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;