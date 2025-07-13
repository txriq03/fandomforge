"use client";

import { Alert } from "@heroui/react";

const DevelopmentAlert = () => {
  return (
    <div className="w-full flex justify-center px-2 sm:px-4">
      <Alert
        variant="faded"
        color="warning"
        title="In Development"
        description="This app is still in development. Some features may not be functional yet."
      />
    </div>
  );
};

export default DevelopmentAlert;
