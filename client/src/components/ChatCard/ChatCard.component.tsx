import React from "react";
import { ChatCardProps } from "./ChatCard.types";
import { Avatar } from "@components/Avatar";
import randomBgGenerator from "../../base/twBgColorGenerator";
import cn from "classnames";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { setCurrentChat } from "../../store/reducers/chats";

export const ChatCardComponent: React.FC<ChatCardProps> = ({
  chatName,
  imgUrl,
  unreadCounter,
  lastMessage,
  lastMessageTime = new Date(),
  isActive = false,
}) => {
  const dispatch = useAppDispatch();

  const timeFormater = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
  });

  const cardClass = cn(
    "w-full py-0.5 pl-1 bg-white flex items-center rounded-md relative",
    { "bg-sky-400": isActive }
  );

  const handleClick = () => {
    console.log(chatName)
    dispatch(setCurrentChat(chatName));
  };

  return (
    <li className={cardClass} onClick={handleClick}>
      <Avatar
        name={chatName}
        imgUrl={imgUrl!}
        style={{ maxWidth: "3rem", maxHeight: "3rem" }}
        bgColor={randomBgGenerator()}
      />
      <section className="w-full grid grid-cols-2">
        <h2 className="ml-2 overflow-hidden text-ellipsis text-xl font-semibold">
          {chatName}
        </h2>
        <span className="mr-2 justify-self-end">
          {timeFormater.format(lastMessageTime)}
        </span>
        <p className="ml-2 overflow-hidden text-ellipsis">{lastMessage}</p>
        {unreadCounter && (
          <span className="w-5 h-5 mr-2 rounded-full bg-slate-500 text-sm text-white flex justify-center items-center justify-self-end">
            {unreadCounter}
          </span>
        )}
      </section>
    </li>
  );
};
