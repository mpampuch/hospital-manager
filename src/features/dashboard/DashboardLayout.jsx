import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import { useRedirect } from "../../context/RedirectContext";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { appointments, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  const { wards, isLoading: isLoading3 } = useCabins();
  const { updateRedirect } = useRedirect();
  updateRedirect("/");

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  let wardCount;
  if (wards) {
    // add all maxCapacity values together from all wards
    wardCount = wards.reduce((acc, cur) => acc + cur.maxCapacity, 0);
  }

  return (
    <StyledDashboardLayout>
      <Stats
        appointments={appointments}
        confirmedStays={confirmedStays}
        numDays={numDays}
        wardCount={wardCount}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart appointments={appointments} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
