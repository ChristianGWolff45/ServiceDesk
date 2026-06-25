import { Issue } from "../pages/Issue";
import { useCategories } from "../hooks/useCategories";
import { Option } from "./Option";
import { Tag, Plus, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { UseLocations } from "../hooks/useLocations";
import { TicketOptions } from "./TicketOptions";
// title,
// description,
// options,
// createOption,
// updateOption,
// deleteOption,
// name,
export function TicketAdmin() {
  const {
    loading: locationsLoading,
    locations,
    createLocation,
    updateLocation,
    deleteLocation,
  } = UseLocations();
  const {
    categories,
    loading,
    updateCategory,
    createCategory,
    deleteCategory,
  } = useCategories();
  const [categoryName, setCategoryName] = useState("");
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState();
  return (
    <div className="bg-green-50">
      <div className="flex gap-8">
        <TicketOptions
          title="Category"
          description="Categories help define and assign issues"
          options={categories}
          name="category"
          createOption={createCategory}
          updateOption={updateCategory}
          deleteOption={deleteCategory}
        />
        <TicketOptions
          title="Location"
          description="Locations define what building or area the problem is occuring."
          options={locations}
          name="location"
          createOption={createLocation}
          updateOption={updateLocation}
          deleteOption={deleteLocation}
        />
      </div>
      <div>
        <h1 className="text-center text-4xl font-bold border-b border-emerald-900 p-4 m-8">
          Preview
        </h1>
        <Issue />
      </div>
    </div>
  );
}
