import { useUIContext } from "@/providers/UIContext";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import React, { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { Textarea } from "@heroui/input";
import FilterAutocomplete from "./FilterAutocomplete";
import { MediaType } from "@/types/trending";
import MediaTypeSelect from "./MediaTypeSelect";
import Rating from "@/types/rating";
import StarRating from "./StarRating";
import { createReview } from "@/lib/supabase/actions";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { devLog } from "@/lib/utils";

const PostReviewModal = () => {
  const { reviewModal } = useUIContext();
  const [mediaId, setMediaId] = useState<string | number | null>(null);
  const [backdropPath, setBackdropPath] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("movie");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState<Rating>(0);
  const queryClient = useQueryClient();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(e.currentTarget);

    // Set variables
    const title = formData.get("title") as string;
    const mediaType = formData.get("mediaType") as MediaType;
    const id = mediaId;
    devLog.log("BackdropPath", backdropPath);
    devLog.log(title, content, id);

    if (!title || !content.trim() || !id) return; // Check variables are not empty

    setIsSubmitting(true);

    const result = await createReview({
      media_id: String(mediaId),
      media_type: mediaType,
      media_title: title,
      backdrop_path: backdropPath ?? "",
      comment: content,
      rating,
    });

    if (result?.success) {
      addToast({ title: `Review posted for ${title}`, color: "success" });
      form.reset();
      setRating(0);
      reviewModal.onClose();

      // Invalidate review query to trigger refetch
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    } else {
      addToast({
        title: result.error,
        color: "danger",
        description: result.details,
      });
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Trigger onOpen={reviewModal.onOpen} />
      <Modal
        isOpen={reviewModal.isOpen}
        onOpenChange={reviewModal.onOpenChange}
        className="font-main"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-heading font-bold text-xl">
                Post a review
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={onSubmit} id="post-review-form">
                  <div className="flex gap-2">
                    <FilterAutocomplete
                      setMediaId={setMediaId}
                      setBackdropPath={setBackdropPath}
                      mediaType={mediaType}
                      className="flex-1"
                    />
                    <MediaTypeSelect
                      setMediaType={setMediaType}
                      className="w-[100px]"
                    />
                  </div>
                  <Textarea
                    name="content"
                    value={content}
                    onValueChange={setContent}
                    label="Review"
                    placeholder="Type your review..."
                    minRows={7}
                    isRequired
                    minLength={5}
                    maxLength={10000}
                    validate={(value) => {
                      if (value.trim().length === 0) {
                        return "Review cannot be less than 5 characters";
                      }
                      return true;
                    }}
                  />
                  <StarRating rating={rating} onChange={setRating} />
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  form="post-review-form"
                  color="primary"
                  fullWidth
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={!content.trim() || !rating}
                >
                  Post Review!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const Trigger = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <Button
      isIconOnly
      radius="lg"
      size="lg"
      color="primary"
      onPress={onOpen}
      className="absolute bottom-0 right-0 m-5 z-1 fixed"
    >
      <TbPlus size={32} />
    </Button>
  );
};

export default PostReviewModal;
