import { useGlobalMessages } from "@/hooks/useGlobalMessages";
import { createClient } from "@/lib/supabase/client";
import { getPfp, subscribeToGlobalMessages } from "@/lib/supabase/utils";
import { cn, devLog, timeago } from "@/lib/utils";
import { useUser } from "@/providers/UserProvider";
import { GlobalMessage } from "@/types/tables";
import { Avatar } from "@heroui/avatar";
import { Spinner } from "@heroui/spinner";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { RefObject, useEffect } from "react";

const UserMessages = ({
  scrollRef,
}: {
  scrollRef: RefObject<HTMLDivElement | null>;
}) => {
  const { data: messages, isPending } = useGlobalMessages();
  const queryClient = useQueryClient();
  const supabase = createClient();

  devLog.log("Messages:", messages);

  useEffect(() => {
    const channel = subscribeToGlobalMessages((newMessage: any) => {
      queryClient.setQueryData(["globalMessages"], (oldData: any) => [
        ...(oldData || []),
        newMessage,
      ]);
    });

    return () => {
      // Fire-and-forget the unsubscribe Promise
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (isPending)
    return (
      <div className="p-2">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-1 min-h-full justify-end">
      {messages?.map((message, index) => {
        const prevMessage = messages[index - 1];
        const nextMessage = messages[index + 1];

        const isGrouped =
          prevMessage &&
          prevMessage.username === message.username &&
          Math.abs(
            new Date(message.created_at!).getTime() -
              new Date(prevMessage.created_at!).getTime()
          ) <
            5 * 60 * 1000; // 5 min threshold in ms

        const isNextGrouped =
          nextMessage &&
          nextMessage.username === message.username &&
          Math.abs(
            new Date(nextMessage.created_at!).getTime() -
              new Date(message.created_at!).getTime()
          ) <
            5 * 60 * 1000;

        const isLastInGroup = !isNextGrouped;

        return (
          <Message
            key={message.id}
            message={message}
            isGrouped={isGrouped}
            isLastInGroup={isLastInGroup}
          />
        );
      })}
    </div>
  );
};

const Message = ({
  message,
  isGrouped,
  isLastInGroup,
}: {
  message: GlobalMessage;
  isGrouped: boolean;
  isLastInGroup: boolean;
}) => {
  const user = useUser();
  const isSameUser = user?.user_metadata.username === message.username;

  return (
    <div className={cn("w-full flex", isSameUser && "justify-end")}>
      <div
        className={cn(
          "flex px-2 pt-2 gap-2 items-start rounded-md",
          isSameUser && "flex-row-reverse",
          isGrouped && "px-2 pt-0"
        )}
      >
        {!isGrouped && <Avatar src={getPfp(message.avatar_url)} />}

        <div
          className={cn(
            "flex flex-col text-sm items-start",
            isSameUser && "items-end",
            isGrouped && isSameUser && "mr-12",
            isGrouped && !isSameUser && "ml-12"
          )}
        >
          {!isGrouped && <p>{message.username}</p>}
          <p
            className={cn(
              "text-[0.8rem] text-slate-300 p-2.5 bg-slate-400/5 rounded-md self-start",
              isSameUser && "self-end"
            )}
          >
            {message.content}
          </p>

          {isLastInGroup && (
            <p className="text-[0.7rem] text-slate-600">
              {timeago(message.created_at!)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
