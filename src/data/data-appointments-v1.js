import { add, sub, format } from "date-fns";

import { doctors as doctorsSamp } from "./data-doctors";
import { wards as wardsSamp } from "./data-cabins";
import { patients as patientsSamp } from "./data-guests";

// Sample data for wards, patients, and doctors (assuming you have these arrays)
const wards = assignUniqueIds(wardsSamp); // Assign unique IDs to wards
const patients = patientsSamp; // Replace with your patient data
const doctors = assignUniqueIds(doctorsSamp); // Assign unique IDs to doctors

// Function to assign unique IDs to an array of objects
function assignUniqueIds(data) {
  return data.map((item, index) => ({ ...item, id: index + 1 }));
}

// Function to generate random date within a specified range
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Function to generate a random boolean value
function randomBoolean() {
  return Math.random() < 0.5;
}

// Function to generate random status
// Status can be checked-in, checked-out, or scheduled
function randomStatus() {
  const statuses = ["checked-in", "checked-out", "scheduled"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

// Function to generate sample appointments
function generateAppointments(numAppointments) {
  const appointments = [];
  const usedPatientIds = new Set();

  for (let i = 0; i < numAppointments; i++) {
    const startDate = randomDate(
      sub(new Date(), { months: 1 }),
      add(new Date(), { months: 2 })
    );
    const endDate = add(startDate, {
      days: Math.floor(Math.random() * 7) + 1, // Random appointment duration between 1 and 7 days
    });

    // Generate a unique patientId
    let patientId;
    do {
      patientId = patients[Math.floor(Math.random() * patients.length)].id;
    } while (usedPatientIds.has(patientId));
    usedPatientIds.add(patientId);

    const appointment = {
      created_at: format(
        sub(startDate, { days: Math.floor(Math.random() * 30) }),
        "yyyy-MM-dd'T'HH:mm:ssxxx"
      ),
      startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
      endDate: format(endDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
      numNights: null,
      numGuests: null,
      cabinPrice: 0,
      extrasPrice: 0,
      totalPrice: 0,
      status: randomStatus(),
      hasConsultation: randomBoolean(),
      hasInsurance: randomBoolean(),
      requiresSpecialEquipment: randomBoolean(),
      isPaid: randomBoolean(),
      observations: "Sample observation text", // Replace with your observation text
      wardId: wards[Math.floor(Math.random() * wards.length)].id,
      patientId: patientId,
      doctorId: doctors[Math.floor(Math.random() * doctors.length)].id,
    };

    appointments.push(appointment);
  }

  return appointments;
}

const numAppointmentsToGenerate = 26; // Adjust the number of appointments as needed
const appointments = generateAppointments(numAppointmentsToGenerate);

export { appointments };
