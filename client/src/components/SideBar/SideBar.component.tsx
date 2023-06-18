import React, { useState } from "react";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { Avatar } from "@components/Avatar";
import { ChatCard } from "@components/ChatCard";
import { Search } from "@components/Search";

export const SideBarComponent: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [active] = useState(5);

  const fullName = [user?.firstName, user?.lastName].filter((e) => e).join(" ");

  const arr = Array.from({ length: 20 }).fill("test");

  return (
    <nav className="w-96 h-screen bg-blue-100 relative flex flex-col">
      <section className="w-full p-2 flex items-center">
        <Avatar
          imgUrl={''}
          name={fullName}
          style={{ minWidth: "3.5rem" }}
        />
        <h1 className="ml-4 overflow-hidden text-ellipsis text-xl font-semibold">
          {fullName}
        </h1>
      </section>
      <hr className="w-11/12 mb-2 h-1 self-center bg-blue-700 rounded" />
      <Search />
      <hr className="w-11/12 mb-2 h-1 self-center bg-blue-700 rounded" />
      <ul className="px-2 overflow-auto flex flex-col gap-2">
        {arr.map((e, i) => (
          <ChatCard key={i} chatName={e as string} unreadCounter={9} isActive={i === active} />
        ))}
      </ul>
    </nav>
  );
};
