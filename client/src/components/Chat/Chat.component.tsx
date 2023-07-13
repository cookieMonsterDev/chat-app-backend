import { useEffect } from "react";
import { useAppSelector } from "../../hooks/ReduxHooks";
import handleSendMessage from "./sendMessage";

export const ChatComponent: React.FC = () => {
  const { currentChat } = useAppSelector((state) => state.chats);

  useEffect(() => {
    console.log(currentChat);
  }, [currentChat]);

  return (
    <article className="w-full min-h-full flex flex-col items-center">
      <header className="w-full h-14 bg-blue-100 flex items-center">
        <h1 className="pl-2 text-2xl font-semibold text-ellipsis">
          Some random person
        </h1>
      </header>
      <main
        className="w-full max-h-full h-full bg-white flex flex-col-reverse gap-2 p-2 overflow-auto"
        // style={{ maxHeight: "calc(100vh - (3.5rem + 5rem))" }}
      >
        {/* <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl self-end">
          TEST - 1
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl self-end">
          TEST
        </div>
        <div
          className="w-fit bg-lime-400 px-2 py-1 rounded-xl"
          style={{ maxWidth: "65%" }}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
          delectus quis? Nulla ab excepturi earum a repudiandae praesentium
          quae, qui facilis blanditiis eum quis accusamus, veniam distinctio
          unde expedita laboriosam tempore, quam ipsa. Nam unde quae repellat.
          Facilis, iste! Placeat qui id natus accusamus, consequatur rerum
          consequuntur! Distinctio dolor voluptatem voluptates soluta
          exercitationem veniam modi, dolore magni voluptatibus eligendi
          quaerat. Fuga ipsa soluta ipsam provident velit nam ex fugiat cumque
          quod, incidunt necessitatibus laudantium at? Harum cum temporibus
          dolor iste sunt nesciunt, suscipit officia dolorem nam corrupti,
          fugiat consectetur minima dicta dolore soluta sit! Reprehenderit
          eveniet cupiditate provident consectetur soluta?
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl self-end">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl self-end">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl self-end">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl self-end">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl self-end">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl self-end">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div> */}
      </main>

      <form
        className="w-full h-20 bg-blue-100 flex items-center"
        onSubmit={(event) => handleSendMessage({ event, chatId: currentChat })}
      >
        <input
          type="text"
          placeholder="Write a message..."
          className="grow ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600"
        />
        <button
          type="submit"
          className="w-20 h-3/4 mx-3 bg-sky-500 p-1 rounded-lg text-white text-lg font-medium hover:bg-sky-400 hover:text-sky-100 transition-colors"
        >
          Send
        </button>
      </form>
    </article>
  );
};
