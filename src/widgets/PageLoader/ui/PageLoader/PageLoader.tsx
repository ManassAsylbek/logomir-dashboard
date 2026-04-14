import { cn } from "@heroui/theme";
import { Spinner } from "@heroui/spinner";

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <div
    className={cn("flex items-center justify-center min-h-screen", className)}
  >
    <Spinner />
  </div>
);
