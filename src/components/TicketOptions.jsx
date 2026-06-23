import { Issue } from "../pages/Issue";
import { useCategories } from "../hooks/useCategories";
export function TicketOptions() {
  const { categories } = useCategories();
  console.log(categories);
  return (
    <div className="bg-green-50">
      <div>
        <div></div>
        <div></div>
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
