import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useAuthContext } from "../context/AuthContext";
export function Comment({ comment, bg, text, border }) {
  const { token } = useAuthContext();
  const { user: author, userLoading, setUserId } = useUser(token);
  useEffect(() => {
    setUserId(comment.author_id);
  }, []);

  if (userLoading || !author) {
    return <p>loading</p>;
  }
  return (
    <div className={`m-4 border border-${border}  bg-white rounded-xl`}>
      <div className="flex gap-4 items-center m-4">
        <h1 className="font-semibold text-xl">
          {author.firstName + " " + author.lastName}
        </h1>
        <div className={` bg-${bg} rounded-sm text-${text} m-1`}>
          <p>{author.role}</p>
        </div>
        <p>
          {new Date(comment.created_at).toLocaleDateString([], {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <p className="m-4">{comment.body}</p>
    </div>
  );
}
