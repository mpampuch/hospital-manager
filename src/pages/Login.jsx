import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

import { useEffect, useState } from "react";
import { useResetDate } from "../features/settings/useResetDate";
import { useUpdateResetDate } from "../features/settings/useUpdateResetDate";
import {
  deleteWards,
  deletePatients,
  deleteDoctors,
  deleteAppointments,
  createWards,
  createPatients,
  createDoctors,
  createAppointments,
} from "../data/reset-data";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function is24HoursOld(targetDate) {
  // Create a Date object for the current date and time
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - targetDate;

  // Check if the time difference is greater than or equal to 24 hours
  return timeDifference >= 24 * 60 * 60 * 1000;
}
function Login() {
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Retrieve reset date from the API
  const { resetdate, isLoading } = useResetDate();

  const { isUpdating, updateResetDate } = useUpdateResetDate();

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
    console.log("reset date", resetdate);

    let isOld;
    if (resetdate) {
      const { dateResetted: resettedDateStr } = resetdate;
      // console.log("resettedDateStr", resettedDateStr);

      const resettedDateObj = new Date(resettedDateStr);
      is24HoursOld(resettedDateObj);
      // Example usage:
      isOld = is24HoursOld(resettedDateObj);
    }

    if (isOld) {
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
      updateResetDate({ dateResetted: dateString });
      console.log("New date uploaded to database");
    } else {
      console.log("The date is less than 24 hours old.");
    }
  }, [resetdate, updateResetDate]);

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
