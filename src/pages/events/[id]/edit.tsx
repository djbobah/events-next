import { EditEventForm } from "@/features/edit-event";
import { trpc, UpdateEventSchema } from "@/shared/api";
import { useRouter } from "next/router";

export default function EditEvent() {
  const router = useRouter();

  const { mutate } = trpc.event.update.useMutation({
    onSuccess: (data) => {
      router.push(`/events/${data.id}`);
    },
  });

  const handleSubmit = (data: UpdateEventSchema) => {
    mutate(data);
  };
  const handleCancel = () => {
    router.back();
  };

  return <EditEventForm onSubmit={handleSubmit} onCancel={handleCancel} />;
}
