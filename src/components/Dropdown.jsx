import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
export function Dropdown({
  dropdownStatus,
  changeDropdownStatus,
  setSelected,
  selected,
  selections,
}) {
  return (
    <div>
      <div>
        <button
          onClick={() => changeDropdownStatus(!dropdownStatus)}
          className="flex items-center bg-green-100 border border-emerald-900 rounded-lg w-full justify-between p-4 cursor-pointer text-2xl font-semibold text-emerald-900 "
        >
          {selected}
          {dropdownStatus ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
      {dropdownStatus && (
        <div className="flex flex-col border border-emerald-900 rounded-lg w-full">
          {selections.map((selection) => (
            <button
              onClick={() => {
                setSelected(selection);
                changeDropdownStatus(false);
              }}
              key={selection}
              className={`flex  items-center rounded-lg  justify-between p-4 cursor-pointer text-2xl font-semibold  ${selection === selected ? "text-white bg-emerald-900" : "text-emerald-900 hover:bg-green-100"}`}
            >
              {selection}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
