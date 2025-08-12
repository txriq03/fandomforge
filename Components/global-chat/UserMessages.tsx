import { useGlobalMessages } from "@/hooks/useGlobalMessages";
import { createClient } from "@/lib/supabase/client";
import { getPfp, subscribeToGlobalMessages } from "@/lib/supabase/utils";
import { cn, devLog, timeago } from "@/lib/utils";
import { useUIContext } from "@/providers/UIContext";
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

  useEffect(() => {
    let subscription: RealtimeChannel;

    const setupRealtimeSubscription = async () => {
      await unsubscribeRealtimeConnection();
      subscription = supabase
        .channel("global_messages")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "global_messages",
          },
          (payload) => {
            const newMessage = payload.new;

            queryClient.setQueryData(["global_messages"], (old: any) => {
              if (!old || old.length === 0) return [newMessage];

              // Prevent duplicate keys when mapping the array by checking the id of the last item to the new message id
              const last = old[old.length - 1];
              if (last.id === newMessage.id) return old;

              return [...old, newMessage];
            });
          }
        )
        .subscribe((status) => {
          console.log("Global messages listener...", status);
        });
    };

    const unsubscribeRealtimeConnection = async () => {
      if (subscription) {
        const message = await subscription.unsubscribe();
        console.log(`${message} - Global messages listener removed.`);
      }
    };

    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        console.log("Tab is visible again.");
        if (subscription.state === "closed") {
          console.log("SUBSCRIPTION IS CLOSED.");
          // Token refesh is important to prevent prevent reconnection failure
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            supabase.realtime.setAuth(data.session?.access_token);
            setupRealtimeSubscription();
          }
        }
      }
    };

    // Set up initial subscription
    setupRealtimeSubscription();

    // Listen for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      unsubscribeRealtimeConnection();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

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
  const { openProfileModal } = useUIContext();

  return (
    <div className={cn("w-full flex", isSameUser && "justify-end")}>
      <div
        className={cn(
          "flex px-2 pt-2 gap-2 items-start rounded-md",
          isSameUser && "flex-row-reverse",
          isGrouped && "px-2 pt-0"
        )}
      >
        {!isGrouped && (
          <button
            onClick={() => openProfileModal(message.user_id)}
            className="group cursor-pointer"
          >
            <Avatar
              src={getPfp(message.avatar_url)}
              classNames={{
                img: "hover:brightness-75 transition-all duration-300",
              }}
            />
          </button>
        )}

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
              "text-[0.8rem] sm:text-sm text-slate-300 p-2.5 bg-slate-400/5 rounded-md self-start",
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
