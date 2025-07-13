import { useRouter } from "next/router";

type EditEventButtonProps = {
  eventId: number;
};

export const EditEventButton = ({ eventId }: EditEventButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${eventId}/edit`);
  };

  return (
    <button
      className="h-10 px-6 font-semibold rounded-md bg-blue-600 text-white"
      onClick={handleClick}
    >
      Редактировать событие
    </button>
  );
};
