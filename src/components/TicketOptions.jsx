import { Tag, Plus, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Option } from "./Option";

export function TicketOptions({
  title,
  description,
  options,
  createOption,
  updateOption,
  deleteOption,
  name,
}) {
  const [optionName, setOptionName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editOptionId, setEditOptionId] = useState();
  return (
    <div className="w-full p-8 flex flex-col gap-8 bg-white m-8 rounded-xl border border-emerald-900">
      <div className="flex gap-4 items-center">
        <Tag className="h-12 w-auto bg-green-200  text-emerald-900 p-2 rounded-lg" />
        <div>
          <h1 className="font-semibold text-2xl">Ticket {title}</h1>
          <p className="font-light text-xl">{description}</p>
        </div>
      </div>
      <div className="border p-4  border-emerald-900 rounded-2xl flex flex-col gap-4">
        <div className="w-full">
          <h1 className="font-semibold text-lg">{title}</h1>
          <input
            className="border-emerald-900 border h-10 focus:outline-none p-1 text-lg rounded-lg w-full"
            placeholder={`e.g. ${title} 1`}
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
          ></input>
        </div>
        <div className="flex gap-4">
          <button className="flex cursor-pointer gap-2 h-10 p-1  pl-4 pr-4 justify-center bg-sky-600 rounded-lg text-white text-lg items-center">
            <Plus />
            <p
              className="text-center"
              onClick={() => {
                if (isEditing) {
                  updateOption(editOptionId, optionName);
                } else {
                  createOption(optionName);
                }
                setIsEditing(false);
                setOptionName("");
              }}
            >
              {isEditing ? "Save Changes" : `Add ${title}`}
            </p>
          </button>
          {isEditing && (
            <button className="h-10 p-1 pl-4 pr-4 cursor-pointer font-semibold justify-center bg-green-200  rounded-lg  text-lg items-center">
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="bg-white  rounded-xl flex flex-col border border-emerald-900">
        {options.map((option, index) => {
          return (
            <Option
              key={option.id}
              isFirst={index === 0}
              optionTitle={option[name]}
              optionId={option.id}
              setIsEditing={setIsEditing}
              setEditId={setEditOptionId}
              setEditName={setOptionName}
              deleteOption={deleteOption}
            />
          );
        })}
      </div>
    </div>
  );
}
