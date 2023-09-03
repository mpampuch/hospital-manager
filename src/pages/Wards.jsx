import WardTable from "../features/wards/WardTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddWard from "../features/wards/AddWard";
import WardTableOperations from "../features/wards/WardTableOperations";

function Wards() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Hospital Wards</Heading>
        <WardTableOperations />
      </Row>

      <Row>
        <WardTable />
        <AddWard />
      </Row>
    </>
  );
}

export default Wards;
