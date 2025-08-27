import Padding from "@/Components/ui/Padding";
import { Alert } from "@heroui/alert";

const ActivityPage = () => {
  return (
    <Padding className="pt-2">
      <Alert
        title="No activity"
        description="No activity on this media yet :("
      />
    </Padding>
  );
};

export default ActivityPage;
