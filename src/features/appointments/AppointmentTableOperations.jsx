import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function AppointmentTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "scheduled", label: "Scheduled" },
          { value: "admitted", label: "Admitted" },
          { value: "discharged", label: "Discharged" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          { value: "startDate-desc", label: "Sort by date (later first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by cost (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by cost (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default AppointmentTableOperations;
