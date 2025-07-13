import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc, UpdateEventSchema } from "@/shared/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

type UpdateEventFormProps = {
  onSubmit: (data: UpdateEventSchema) => void;
  onCancel: () => void;
};

function formatDateForInput(dateString: Date) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const EditEventForm = ({ onSubmit, onCancel }: UpdateEventFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateEventSchema>({
    resolver: zodResolver(UpdateEventSchema),
    mode: "onChange",
  });
  const router = useRouter();
  const { id } = router.query;
  const eventId = Number(id);

  const { data: event } = trpc.event.findUnique.useQuery({ id: eventId });

  useEffect(() => {
    if (event) {
      reset({
        id: eventId,
        title: event.title,
        description: event.description ?? "",
        //@ts-ignore
        // не смог победить типизацию
        // если не привести к строке не записывается в форму
        // но тогда не проходит тиипзацию схема... Хотя приложение работает
        date: formatDateForInput(event.date),
      });
    }
  }, [event, eventId, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {`Событие "${event?.title}"`}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Измените форму для обновления события
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Название
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="title"
                  autoComplete="title"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("title")}
                />
              </div>
              {errors.title && (
                <p className="mt-3 text-sm leading-6 text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Описание
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("description")}
                />
              </div>
              {errors.description ? (
                <p className="mt-3 text-sm leading-6 text-red-500">
                  {errors.description.message}
                </p>
              ) : (
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Напишите несколько предложений о предстоящем мероприятии
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Дата проведения
              </label>
              <div className="mt-2">
                <input
                  id="date"
                  type="date"
                  className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("date")}
                />
              </div>
              {errors.date && (
                <p className="mt-3 text-sm leading-6 text-red-500">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={onCancel}
        >
          Отмена
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={!isDirty}
        >
          Обновить
        </button>
      </div>
    </form>
  );
};
