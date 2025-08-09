"use client";
import { Alert } from "@heroui/alert";
import Container from "./ui/Container";

const DevelopmentAlert = () => {
  return (
    <Container>
      <div className="w-full flex justify-center px-2 lg:pl-0 lg:pr-5">
        <Alert
          variant="faded"
          color="warning"
          title="In Development"
          description="This app is still in development. Some features may not be functional yet."
        />
      </div>
    </Container>
  );
};

export default DevelopmentAlert;
