import { FaStar } from "react-icons/fa";

interface Props {
  averageVote: number;
}
const VoteAverageChip = ({ averageVote }: Props) => {
  return (
    <div className="text-sm flex gap-1 items-center">
      <FaStar className="text-yellow-400" />
      <p>{averageVote.toFixed(1)}</p>
    </div>
  );
};

export default VoteAverageChip;
