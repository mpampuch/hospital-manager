import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AppointmentTable from "../features/appointments/AppointmentTable";
import AppointmentTableOperations from "../features/appointments/AppointmentTableOperations";

function Appointments() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Appointments</Heading>
        <AppointmentTableOperations />
      </Row>

      <AppointmentTable />
    </>
  );
}

export default Appointments;
