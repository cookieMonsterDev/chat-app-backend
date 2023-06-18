import React from "react";

export const ChatComponent: React.FC = () => {
  return (
    <article className="w-full min-h-full flex flex-col items-center">
      <header className="w-full h-14 bg-blue-100 flex items-center">
        <h1 className="pl-2 text-2xl font-semibold text-ellipsis">
          Some random person
        </h1>
      </header>
      <main className="w-full bg-white flex flex-col-reverse gap-2 p-2 overflow-auto" style={{maxHeight: 'calc(100vh - (3.5rem + 5rem))'}}>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl self-end">
          TEST - 1
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl">
          TEST
        </div>
        <div className="w-fit max-w-3xl bg-lime-400 px-2 py-1 rounded-xl self-end">
          TEST
        </div>
        <div className="w-fit bg-lime-400 px-2 py-1 rounded-xl" style={{maxWidth: '65%'}}>
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
        </div>
      
      </main>
      <footer className="w-full h-20 bg-blue-100"></footer>
    </article>
  );
};
