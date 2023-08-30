import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { appointments, isLoading, count } = useBookings();
  // console.log("appointments", appointments);

  if (isLoading) return <Spinner />;

  if (!appointments.length) return <Empty resourceName="appointments" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1.2fr 1.6fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div style={{ transform: "translate(1.4rem)" }}>Status</div>
          <div>Estimated Cost</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={appointments}
          render={(appointment) => {
            console.log("appointment", appointment); // Log the 'appointment' object
            return (
              <BookingRow key={appointment.id} appointment={appointment} />
            );
          }}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
