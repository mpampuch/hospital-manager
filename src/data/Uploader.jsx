import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import { wards } from "./data-wards";
import { patients } from "./data-patients";
import { doctors } from "./data-doctors";
import { appointments } from "./data-appointments";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

function randomBoolean() {
  return Math.random() < 0.5;
}

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteWards() {
  const { error } = await supabase.from("wards").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deletePatients() {
  const { error } = await supabase.from("patients").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteDoctors() {
  const { error } = await supabase.from("doctors").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteAppointments() {
  const { error } = await supabase.from("appointments").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createWards() {
  const { error } = await supabase.from("wards").insert(wards);
  if (error) console.log(error.message);
}

async function createPatients() {
  const { error } = await supabase.from("patients").insert(patients);
  if (error) console.log(error.message);
}

async function createDoctors() {
  const { error } = await supabase.from("doctors").insert(doctors);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  console.log("finalBookings", finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

// Function to generate random medical appointment details
function generateSymptoms() {
  const symptoms = [
    "Fever",
    "Cough",
    "Shortness of breath",
    "Fatigue",
    "Headache",
    "Sore throat",
    "Muscle aches",
    "Loss of taste or smell",
    "Congestion",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Chills",
    "Body aches",
    "Runny nose",
    "Sneezing",
    "Fainting",
    "Chest pain",
    "Rash",
    "Joint pain",
  ];

  // Shuffle the symptoms array to get random symptoms without duplicates
  const shuffledSymptoms = shuffleArray(symptoms);

  // Select a random number of symptoms (between 1 and 4)
  const numSymptoms = Math.floor(Math.random() * 4) + 1;

  // Take the first 'numSymptoms' symptoms from the shuffled array
  const selectedSymptoms = shuffledSymptoms.slice(0, numSymptoms);

  return selectedSymptoms.join(", ");
}

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

async function createAppointments() {
  // Appointments need a patientId, doctorId, and a wardId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all patientIds, doctorIds, and wardIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: patientsIds } = await supabase
    .from("patients")
    .select("id")
    .order("id");
  const allPatientIds = patientsIds.map((patient) => patient.id);
  const { data: doctorsIds } = await supabase
    .from("doctors")
    .select("id")
    .order("id");
  const allDoctorIds = doctorsIds.map((doctor) => doctor.id);
  const { data: wardsIds } = await supabase
    .from("wards")
    .select("id")
    .order("id");
  const allWardIds = wardsIds.map((ward) => ward.id);

  const finalAppointments = appointments.map((appointment) => {
    // Here relying on the order of wards, as they don't have and ID yet
    const ward = wards.at(appointment.wardId - 1);
    const numNights = subtractDates(appointment.endDate, appointment.startDate);
    const wardPrice = numNights * ward.dailyCost;
    const numGuests = 0;
    const hasConsultation = randomBoolean();
    const hasInsurance = randomBoolean();
    const requiresSpecialEquipment = randomBoolean();
    const isPaid = randomBoolean();
    const observations = generateSymptoms();

    const extrasPrice = appointment.hasConsultation ? 100 : 0; // hardcoded consultation price
    const totalPrice = wardPrice + extrasPrice;

    // TODO Make sure this is working correctly
    let status;
    if (
      isPast(new Date(appointment.endDate)) &&
      !isToday(new Date(appointment.endDate))
    )
      status = "discharged";
    if (
      isFuture(new Date(appointment.startDate)) ||
      isToday(new Date(appointment.startDate))
    )
      status = "scheduled";
    if (
      (isFuture(new Date(appointment.endDate)) ||
        isToday(new Date(appointment.endDate))) &&
      isPast(new Date(appointment.startDate)) &&
      !isToday(new Date(appointment.startDate))
    )
      status = "admitted";

    return {
      ...appointment,
      numNights,
      wardPrice,
      extrasPrice,
      totalPrice,
      patientId: allPatientIds.at(appointment.patientId - 1),
      doctorId: allDoctorIds.at(appointment.doctorId - 1),
      wardId: allWardIds.at(appointment.wardId - 1),
      status,
      numGuests,
      hasConsultation,
      hasInsurance,
      requiresSpecialEquipment,
      isPaid,
      observations,
    };
  });
  console.log("finalAppointments", finalAppointments);

  const { error } = await supabase
    .from("appointments")
    .insert(finalAppointments);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Appointments need to be deleted FIRST
    await deleteAppointments();
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();
    await deletePatients();
    await deleteDoctors();
    await deleteWards();

    // Appointments need to be created LAST
    await createWards();
    await createPatients();
    await createDoctors();
    await createGuests();
    await createCabins();
    await createBookings();
    await createAppointments();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  async function uploadAppointments() {
    setIsLoading(true);
    await deleteAppointments();
    await createAppointments();
    setIsLoading(false);
  }
  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>
      <Button onClick={uploadAppointments} disabled={isLoading}>
        Upload Appointments ONLY
      </Button>
      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
