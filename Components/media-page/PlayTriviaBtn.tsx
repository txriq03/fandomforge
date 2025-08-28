import { Payload } from "@/lib/api/openai";
import { useTrivia } from "@/providers/TriviaProvider";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useParams, useRouter } from "next/navigation";
import { TbDeviceGamepad3Filled } from "react-icons/tb";

type Size = "sm" | "md" | "lg";

interface Props {
  size?: Size;
  radius?: Size;
  payload: Payload;
  onDone?: (data: any) => void; // optional callback
}

const PlayTriviaBtn = ({ size, radius, payload, onDone }: Props) => {
  const { generate, isFetching } = useTrivia();
  const router = useRouter();
  const params = useParams();

  const handleClick = async () => {
    try {
      const data = await generate(payload);
      console.log("Trivia Data:", data);

      // TODO: Push after data exists in cache
      // router.push(`/${params.mediaType}/${params.id}/trivia`)
    } catch (e) {
      console.error(e);
      addToast({ title: "Error generating trivia" });
    }
  };

  return (
    <Button
      fullWidth
      size={size}
      radius={radius}
      color="primary"
      startContent={
        !isFetching && (
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
