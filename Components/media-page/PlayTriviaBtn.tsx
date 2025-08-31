import { Payload } from "@/lib/api/openai";
import { MediaContext, useMedia } from "@/providers/MediaProvider";
import { useTrivia } from "@/providers/TriviaProvider";
import { useUIContext } from "@/providers/UIContext";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { TbDeviceGamepad3Filled } from "react-icons/tb";

type Size = "sm" | "md" | "lg";

interface Props {
  size?: Size;
  radius?: Size;
  payload: Payload;
  onDone?: (data: any) => void; // optional callback
}

const PlayTriviaBtn = ({ size, radius, payload, onDone }: Props) => {
  const { setActiveTriviaMedia, generate, isFetching } = useTrivia();
  const { triviaModal } = useUIContext();
  const media = useMedia();

  const handleClick = async () => {
    try {
      setActiveTriviaMedia(media);

      triviaModal.onOpen();

      const data = await generate(payload);
      console.log("Trivia Data:", data);

      addToast({
        title: "Trivia Generated.",
        description: "Trivia questions are ready!",
        color: "success",
      });
      // router.push(`/${params.mediaType}/${params.id}/trivia`)
    } catch (e) {
      console.error(e);
      addToast({ title: "Error generating trivia" });
    } finally {
      triviaModal.onClose();
    }
  };

  return (
    <Button
      fullWidth
      size={size}
      radius={radius}
      color="primary"
      startContent={
        !isFetching(payload) && (
          <TbDeviceGamepad3Filled
            size={size === "md" ? 18 : 14}
            className="shrink-0"
          />
        )
      }
      isLoading={isFetching(payload)}
      onPress={handleClick}
    >
      {isFetching(payload) ? "Generating..." : "Play Trivia"}
    </Button>
  );
};

export default PlayTriviaBtn;
