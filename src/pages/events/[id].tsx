import { EventDetail } from "@/entities/event";
import { trpc } from "@/shared/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { EditEventButton } from "@/features/edit-event";

export default function Event() {
  const router = useRouter();
  const session = useSession();

  const { data, isLoading } = trpc.event.findUnique.useQuery({
    id: Number(router.query.id),
  });

  if (isLoading) {
    return "Loading...";
  }
  if (session.status === "unauthenticated") {
    return "Forbidden";
  }

  if (!data) {
    return "No data";
  }

  return (
    <EventDetail
      {...data}
      action={data.isEditable && <EditEventButton eventId={data.id} />}
    />
  );
}
