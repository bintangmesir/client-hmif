import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReactNode } from "@tanstack/react-router";
import { Ban, CheckCircle2, X } from "lucide-react";
import {
  createContext,
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type FlashMessageProps = {
  title: string;
  description: string | string[];
  status: "success" | "error";
};

export const FlashMessageContext = createContext<{
  setFlashMessage: Dispatch<SetStateAction<FlashMessageProps | undefined>>;
}>({ setFlashMessage: () => undefined });

export function useFlashMessageContext() {
  return useContext(FlashMessageContext);
}

const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const [flashMessage, setFlashMessage] = useState<
    FlashMessageProps | undefined
  >();

  useEffect(() => {
    if (flashMessage !== undefined) {
      setTimeout(() => {
        setFlashMessage(undefined);
      }, 7000);
    }
  }, [flashMessage]);

  return (
    <FlashMessageContext.Provider value={{ setFlashMessage }}>
      {flashMessage ? (
        <div className="container flex w-full items-center justify-center">
          {flashMessage.status === "success" ? (
            <Alert className="mb-2 border-green-600 bg-green-600 text-white">
              <CheckCircle2 className="h-4 w-4" color="#ffffff" />
              <AlertTitle className="flex items-center justify-between gap-4">
                {flashMessage.title}
                <div
                  className="cursor-pointer rounded-md border-2 border-white"
                  onClick={() => setFlashMessage(undefined)}
                >
                  <X size={16} />
                </div>
              </AlertTitle>
              <AlertDescription>
                {flashMessage.description instanceof Array
                  ? flashMessage.description.map((item, id) => {
                      return (
                        <Fragment key={id}>
                          {item}
                          <br />
                        </Fragment>
                      );
                    })
                  : flashMessage.description}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="mb-2 border-red-600 bg-red-600 text-white">
              <Ban className="h-4 w-4" color="#ffffff" />
              <AlertTitle className="flex items-center justify-between gap-4">
                {flashMessage.title}
                <div
                  className="cursor-pointer rounded-md border-2 border-white"
                  onClick={() => setFlashMessage(undefined)}
                >
                  <X size={16} />
                </div>
              </AlertTitle>
              <AlertDescription>
                {flashMessage.description instanceof Array
                  ? flashMessage.description.map((item, id) => {
                      return (
                        <Fragment key={id}>
                          {item}
                          <br />
                        </Fragment>
                      );
                    })
                  : flashMessage.description}
              </AlertDescription>
            </Alert>
          )}
        </div>
      ) : null}
      {children}
    </FlashMessageContext.Provider>
  );
};

export default FlashMessageProvider;
