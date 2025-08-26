import { Button } from "@heroui/button";
import { TbDeviceGamepad3Filled } from "react-icons/tb";

type Size = "sm" | "md" | "lg";

interface Props {
  size?: Size;
  radius?: Size;
}

const PlayTriviaBtn = ({ size, radius }: Props) => {
  return (
    <Button
      fullWidth
      size={size}
      radius={radius}
      color="primary"
      startContent={<TbDeviceGamepad3Filled className="shrink-0" />}
    >
      Play Trivia
    </Button>
  );
};

export default PlayTriviaBtn;
