import { useState } from "react";
import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import { useRecentAppointments } from "./useRecentAppointments";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useWards } from "../wards/useWards";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import { useRedirect } from "../../context/RedirectContext";
import { useEffect } from "react";
import { useSettings } from "../settings/useSettings";
import { useUpdateSetting } from "../settings/useUpdateSetting";
import { isFuture, isPast, isToday } from "date-fns";
import {
  deleteWards,
  deletePatients,
  deleteDoctors,
  deleteAppointments,
  createWards,
  createPatients,
  createDoctors,
  createAppointments,
} from "../../data/reset-data";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function is24HoursOld(targetDate) {
  // Create a Date object for the current date and time
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - targetDate;

  // Check if the time difference is greater than or equal to 24 hours
  return timeDifference >= 24 * 60 * 60 * 1000;
}

function DashboardLayout() {
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Retrieve settings from the API
  const { settings, isLoading: isLoading4 } = useSettings();
  // console.log("settings", settings);
  const { isUpdating, updateSetting } = useUpdateSetting();

  useEffect(() => {
    async function uploadAll() {
      setIsLoadingData(true);
      // Appointments need to be deleted FIRST
      await deleteAppointments();
      await deletePatients();
      await deleteDoctors();
      await deleteWards();

      // Appointments need to be created LAST
      await createWards();
      await createPatients();
      await createDoctors();
      await createAppointments();

      setIsLoadingData(false);
    }
    console.log("settings", settings);

    let isOld;
    if (settings) {
      const { dateResetted: resettedDateStr } = settings;
      // console.log("resettedDateStr", resettedDateStr);

      const resettedDateObj = new Date(resettedDateStr);
      is24HoursOld(resettedDateObj);
      // Example usage:
      isOld = is24HoursOld(resettedDateObj);
    }

    if (isOld || isOld === undefined || isOld === null) {
      console.log("The date is 24 hours old or older.");
      console.log("Resetting");
      uploadAll();
      console.log("Resetted");
      // console.log("Uploading current reset date to database");

      const dateObject = new Date(); // Replace this with your date object
      // console.log("dateObject", dateObject);
      const year = dateObject.getFullYear();
      const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to month since it's zero-based, and pad with '0' if needed
      const day = dateObject.getDate().toString().padStart(2, "0"); // Pad with '0' if needed

      const dateString = `${year}-${month}-${day}`;
      // console.log("dateString", dateString);
      updateSetting({ dateResetted: dateString });
      // console.log("New date uploaded to database");
    } else {
      console.log("The date is less than 24 hours old.");
    }
  }, [settings, updateSetting]);

  const { appointments, isLoading: isLoading1 } = useRecentAppointments();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  const { wards, isLoading: isLoading3 } = useWards();

  const { updateRedirect } = useRedirect();
  useEffect(() => {
    // Call updateRedirect after the component has rendered
    updateRedirect("/");
  }, [updateRedirect]);

  if (isLoading1 || isLoading2 || isLoading3 || isLoading4) return <Spinner />;

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
