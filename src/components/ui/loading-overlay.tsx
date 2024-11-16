import { LoadingSpinner } from "@/components/ui/loading-spinner";

const LoadingOverlay = ({
  containerCn,
  message,
}: {
  containerCn?: string;
  message?: string;
}) => {
  return (
    <div
      className={`absolute left-0 top-0 h-full w-full grid place-items-center bg-secondary/30 z-[10] ${containerCn} rounded-lg `}
    >
      <div className="grid place-items-center">
        <LoadingSpinner className="text-primary" size={60} />
        <p className="text-center text-xl text-primary">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
