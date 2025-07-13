import { useRouter } from "next/router";

export const CreateEventButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/events/create");
  };

  return (
    <div className="ml-2">
      <button
        className="h-10 px-6 font-semibold rounded-md bg-green-600 text-white"
        onClick={handleClick}
      >
        Создать событие
      </button>
    </div>
  );
};
