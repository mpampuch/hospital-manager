import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, wards } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!wards.length) return <Empty resourceName="wards" />;

  // 1) FILTER
  const filterValue = searchParams.get("special-equipment") || "all";

  let filteredWards;
  if (filterValue === "all") filteredWards = wards;
  if (filterValue === "no-special-equipment")
    filteredWards = wards.filter((ward) => ward.specialEquipmentCost === 0);
  if (filterValue === "with-special-equipment")
    filteredWards = wards.filter((ward) => ward.specialEquipmentCost > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedWards = filteredWards.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1fr 1.6fr 1fr 1.4fr 0.2fr">
        <Table.Header>
          <div></div>
          <div>Ward</div>
          <div>Capacity</div>
          <div>Daily Cost</div>
          <div>Special Equipment Cost</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={wards}
          // data={filteredWards}
          data={sortedWards}
          render={(ward) => <CabinRow ward={ward} key={ward.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
