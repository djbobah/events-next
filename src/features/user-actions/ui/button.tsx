import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export const UserActions = () => {
  const session = useSession();

  const router = useRouter();
  const handleClickSignIn = () => {
    router.push("/api/auth/signin");
  };
  return (
    <div className="font-semibold text-slate-500">
      {session.status === "authenticated" ? (
        <button onClick={() => signOut()} className="flex items-center">
          {`${session.data.user.name}`}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.06147 18.1227L3.00012 12.0613L9.06147 6"
              stroke="#64848b"
              strokeWidth="null"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="my-path"
            ></path>
            <path
              d="M21 12.0615H3"
              stroke="#64848b"
              strokeWidth="null"
              strokeLinecap="round"
              className="my-path"
            ></path>
          </svg>
        </button>
      ) : (
        <button onClick={handleClickSignIn} className="flex items-center">
          Войти
          <svg
            className="transition-all duration-500  group-hover:translate-x-1 ml-1"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 9L14.25 9M10.5 13.5L14.4697 9.53033C14.7197 9.28033 14.8447 9.15533 14.8447 9C14.8447 8.84467 14.7197 8.71967 14.4697 8.46967L10.5 4.5"
              stroke="#64848b"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};
