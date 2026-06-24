import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
export function Dropdown(changeDropdownStatus, setSelected, selections) {
  const dropdownStatus = false;
  return (
    <div>
      <div>
        <button></button>
        {dropdownStatus ? ChevronUp : ChevronDown}
      </div>
    </div>
  );
}
