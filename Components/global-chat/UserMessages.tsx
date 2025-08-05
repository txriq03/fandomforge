import { useGlobalMessages } from "@/hooks/useGlobalMessages";
import { getPfp, subscribeToGlobalMessages } from "@/lib/supabase/utils";
import { timeago } from "@/lib/utils";
import { GlobalMessage } from "@/types/tables";
import { Avatar } from "@heroui/avatar";
import { Spinner } from "@heroui/spinner";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const UserMessages = () => {
  const { data: messages, isPending } = useGlobalMessages();
  const queryClient = useQueryClient();

  useEffect(() => {
    let subscription: RealtimeChannel | null = null;
    const subscribe = async () => {
      subscription = await subscribeToGlobalMessages((newMessage) => {
        queryClient.setQueryData(["globalMessages"], (oldData: any) => [
          ...(oldData || []),
          newMessage,
        ]);
      });
    };

    subscribe();

    return () => {
      // Fire-and-forget the unsubscribe Promise
      subscription?.unsubscribe().catch((err) => {
        console.error("Failed to unsubscribe from global messages:", err);
      });
    };
  }, []);

  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-col gap-2 justify-end overflow-y-scroll">
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

const Message = ({ message }: { message: GlobalMessage }) => {
  return (
    <div className="flex p-2 gap-2 items-start rounded-md">
      <Avatar src={getPfp(message.avatar_url)} />

      <div className="flex flex-col text-sm">
        <p>{message.username}</p>
        <p className="text-[0.8rem] text-slate-300 p-2 bg-slate-400/5 rounded-md">
          {message.content}
        </p>
        <p className="text-[0.7rem] text-slate-600">
          {timeago(message.created_at!)}
        </p>
      </div>
    </div>
  );
};

export default UserMessages;
