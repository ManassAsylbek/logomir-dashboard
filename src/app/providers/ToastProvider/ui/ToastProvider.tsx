import { FC, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </>
  );
};

export default ToastProvider;
