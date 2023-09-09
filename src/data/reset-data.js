import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import { subtractDates } from "../utils/helpers";

import { wards } from "./data-wards";
import { patients } from "./data-patients";
import { doctors } from "./data-doctors";
import { appointments } from "./data-appointments";

export function randomBoolean(cutoff = 0.5) {
  if (cutoff > 1 || cutoff < 0)
    throw new Error("Cutoff must be between 0 and 1");
  return Math.random() < cutoff;
}

export async function deleteWards() {
  const { error } = await supabase.from("wards").delete().gt("id", 0);
  if (error) console.error(error.message);
}

export async function deletePatients() {
  const { error } = await supabase.from("patients").delete().gt("id", 0);
  if (error) console.error(error.message);
}

export async function deleteDoctors() {
  const { error } = await supabase.from("doctors").delete().gt("id", 0);
  if (error) console.error(error.message);
}

export async function deleteAppointments() {
  const { error } = await supabase.from("appointments").delete().gt("id", 0);
  if (error) console.error(error.message);
}

export async function createWards() {
  const { error } = await supabase.from("wards").insert(wards);
  if (error) console.error(error.message);
}

export async function createPatients() {
  const { error } = await supabase.from("patients").insert(patients);
  if (error) console.error(error.message);
}

export async function createDoctors() {
  const { error } = await supabase.from("doctors").insert(doctors);
  if (error) console.error(error.message);
}

// Function to generate random medical appointment details
export function generateSymptoms() {
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
export function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export async function createAppointments() {
  // Appointments need a patientId, doctorId, and a wardId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all patientIds, doctorIds, and wardIds, and then replace the original IDs in the appointments data with the actual ones from the DB
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

    const requiresSpecialEquipment = randomBoolean();
    const observations = generateSymptoms();

    const extrasPrice = appointment.hasConsultation ? 100 : 0; // hardcoded consultation price
    const totalPrice = wardPrice + extrasPrice;

    let status;
    let hasInsurance;
    let isPaid;
    if (
      isPast(new Date(appointment.endDate)) &&
      !isToday(new Date(appointment.endDate))
    )
      status = "discharged";
    hasInsurance = randomBoolean(0); // 100% chance of being paid
    isPaid = randomBoolean(0); // 100% chance of having insurance
    if (
      isFuture(new Date(appointment.startDate)) ||
      isToday(new Date(appointment.startDate))
    )
      status = "scheduled";
    hasInsurance = randomBoolean(0.5); // 50% chance of being paid
    isPaid = randomBoolean(0.1); // 10% chance of being paid
    if (
      (isFuture(new Date(appointment.endDate)) ||
        isToday(new Date(appointment.endDate))) &&
      isPast(new Date(appointment.startDate)) &&
      !isToday(new Date(appointment.startDate))
    )
      status = "admitted";
    hasInsurance = randomBoolean(0.5); // 50% chance of being paid
    isPaid = randomBoolean(0.6); // 60% chance of being paid

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

  const { error } = await supabase
    .from("appointments")
    .insert(finalAppointments);
  if (error) console.error(error.message);
}
