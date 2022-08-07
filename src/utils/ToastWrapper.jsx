import React from 'react'
import { Toaster } from "react-hot-toast";
export const ToastWrapper = () => {
    return (
      <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          minWidth: "260px",
        },
        success: {
          duration: 2000,
        },
      }}
    />
    );
  };