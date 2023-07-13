interface HandleSendMessageProps {
  event: React.FormEvent<HTMLFormElement>;
  chatId: string | null;
}

const handleSendMessage = async ({
  event,
  chatId,
}: HandleSendMessageProps): Promise<void> => {
  event.preventDefault();

  if (!chatId) return;

  const message = (
    (event.target as HTMLFormElement).elements[0] as HTMLInputElement
  ).value;

  if (!message) return;

  ((event.target as HTMLFormElement).elements[0] as HTMLInputElement).value =
    "";
};

export default handleSendMessage;
