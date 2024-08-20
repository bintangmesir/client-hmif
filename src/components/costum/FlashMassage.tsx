import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Ban, CheckCircle2, X } from "lucide-react";

type FlashMessageProps = {
  title: string | undefined;
  description: string | undefined;
  status: "error" | "idle" | "loading" | "success";
};

const FlashMessage = ({ title, description, status }: FlashMessageProps) => {
  const [isClose, setIsClose] = useState(true);

  useEffect(() => {
    if (!isClose) {
      setTimeout(() => {
        setIsClose(isClose);
      }, 2000);
    }
  }, [isClose]);

  return (
    !isClose && (
      <>
        {status === "success" ? (
          <Alert className="mb-2 border-green-600 bg-green-600 text-white">
            <CheckCircle2 className="h-4 w-4" color="#ffffff" />
            <AlertTitle className="flex items-center justify-between gap-4">
              {title}
              <div
                className="cursor-pointer rounded-md border-2 border-white"
                onClick={() => setIsClose(true)}
              >
                <X size={16} />
              </div>
            </AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </Alert>
        ) : status === "error" ? (
          <Alert className="mb-2 border-red-600 bg-red-600 text-white">
            <Ban className="h-4 w-4" color="#ffffff" />
            <AlertTitle className="flex items-center justify-between gap-4">
              {title}
              <div
                className="cursor-pointer rounded-md border-2 border-white"
                onClick={() => setIsClose(true)}
              >
                <X size={16} />
              </div>
            </AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </Alert>
        ) : null}
      </>
    )
  );
};

export default FlashMessage;
