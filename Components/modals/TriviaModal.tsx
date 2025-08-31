"use client";
import { getImageUrl } from "@/lib/api/tmdb";
import { useTrivia } from "@/providers/TriviaProvider";
import { useUIContext } from "@/providers/UIContext";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { Image } from "@heroui/image";
const TriviaModal = () => {
  const { triviaModal } = useUIContext();
  const { activeTriviaMedia } = useTrivia();
  const media = activeTriviaMedia;

  if (!media) return;

  return (
    <Modal
      isOpen={triviaModal.isOpen}
      onOpenChange={triviaModal.onOpenChange}
      className="font-main"
      size="lg"
      isDismissable={false}
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <div className="p-3 flex gap-3 items-stretch">
              <Image
                src={getImageUrl(media.poster_path)}
                className="object-cover max-w-[90px] sm:max-w-[120px] self-end h-full"
              />
              {/* Main Content */}
              <div className="flex flex-col gap-3 flex-1">
                <header className="sm:text-lg">
                  {"title" in media ? media.title : media.name}
                </header>

                <p className="text-sm text-foreground/50 line-clamp-3 sm:line-clamp-5">
                  {media.overview}
                </p>

                <footer className="flex gap-2 mt-auto">
                  <Button
                    isLoading={true}
                    size="sm"
                    spinner={<Spinner size="sm" variant="simple" />}
                    color="primary"
                    variant="flat"
                    className="text-primary flex-1"
                  >
                    Generating...
                  </Button>
                  <Button
                    variant="flat"
                    size="sm"
                    color="danger"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                </footer>
              </div>
            </div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TriviaModal;
