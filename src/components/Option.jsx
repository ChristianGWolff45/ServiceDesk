import { Pencil, Trash2 } from "lucide-react";

export function Option({
  optionTitle,
  optionId,
  setEditId,
  setEditName,
  setIsEditing,
  isFirst,
  deleteOption,
}) {
  return (
    <div
      className={`flex justify-between p-4 items-center ${isFirst ? "" : "border-t border-emerald-700"}`}
    >
      <h1 className="text-xl font-semibold">{optionTitle}</h1>
      <div className="flex gap-4">
        <button
          onClick={() => {
            setIsEditing(true);
            setEditId(optionId);
            setEditName(optionTitle);
          }}
          className="flex p-1 pl-2 pr-2 border cursor-pointer border-emerald-900 rounded-lg gap-2 text-emerald-900 text-lg items-center"
        >
          <Pencil />
          <p>Edit</p>
        </button>
        <button
          onClick={() => deleteOption(optionId)}
          className="text-red-700 text cursor-pointer"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
