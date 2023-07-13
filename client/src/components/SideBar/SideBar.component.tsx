import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { Avatar } from "@components/Avatar";
import { ChatCard } from "@components/ChatCard";
import { Search } from "@components/Search";
import chatApi from "../../base/axiosConfig";
import randomBgGenerator from "../../base/twBgColorGenerator";

export const SideBarComponent: React.FC = () => {
  const [chats, setChats] = useState<any[] | null>(null);
  const { user, accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await chatApi.get("/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(data);

        setChats(data);
      } catch (e) {
        setChats(null);
      }
    };

    getUsers();
  }, []);

  const fullName = [user?.firstName, user?.lastName].filter((e) => e).join(" ");

  return (
    <nav className="w-96 h-screen bg-blue-100 relative flex flex-col">
      <section className="w-full p-2 flex items-center">
        <Avatar imgUrl={""} name={fullName} style={{ minWidth: "3.5rem" }} />
        <h1 className="ml-4 overflow-hidden text-ellipsis text-xl font-semibold">
          {fullName}
        </h1>
      </section>
      <hr className="w-11/12 mb-2 h-1 self-center bg-blue-700 rounded" />
      <Search />
      <hr className="w-11/12 mb-2 h-1 self-center bg-blue-700 rounded" />
      <ul className="px-2 overflow-auto flex flex-col gap-2">
        {chats &&
          chats.map((e) => (
            <ChatCard
              key={e.id}
              chatId={e.id}
              chatName={e.username || e.firstName || e.lastName}
              bgColor={randomBgGenerator()}
            />
          ))}
      </ul>
    </nav>
  );
};
