import { useGenerateTrivia } from "@/hooks/useGenerateTrivia";
import { Payload } from "@/lib/api/openai";
import { Button } from "@heroui/button";
import { TbDeviceGamepad3Filled } from "react-icons/tb";

type Size = "sm" | "md" | "lg";

interface Props {
  size?: Size;
  radius?: Size;
  payload: Payload;
  onDone?: (data: any) => void; // optional callback
}

const PlayTriviaBtn = ({ size, radius, payload, onDone }: Props) => {
  const { mutate, isPending } = useGenerateTrivia();

  return (
    <Button
      fullWidth
      size={size}
      radius={radius}
      color="primary"
      startContent={
        !isPending && (
          <TbDeviceGamepad3Filled
            size={size === "md" ? 18 : 14}
            className="shrink-0"
          />
        )
      }
      isLoading={isPending}
      onPress={() =>
        mutate(payload, {
          onSuccess: (data) => console.log("Trivia data:", data),
        })
      }
    >
      {!isPending && "Play Trivia"}
    </Button>
  );
};

export default PlayTriviaBtn;
