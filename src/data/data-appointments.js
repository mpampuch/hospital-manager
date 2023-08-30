import { add } from "date-fns";

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

export const appointments = [
  // APPOINTMENT 1
  {
    created_at: fromToday(-20, true),
    startDate: fromToday(0),
    endDate: fromToday(7),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "checked-in",
    hasConsultation: true,
    hasInsurance: true,
    requiresSpecialEquipment: true,
    isPaid: false,
    observations: "Sample observation text",
    wardId: 6, // Random ward ID
    patientId: 8, // Random patient ID
    doctorId: 5, // Random doctor ID
  },
  // APPOINTMENT 2
  {
    created_at: fromToday(-33, true),
    startDate: fromToday(-23),
    endDate: fromToday(-13),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "scheduled",
    hasConsultation: true,
    hasInsurance: false,
    requiresSpecialEquipment: false,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 4, // Random ward ID
    patientId: 9, // Random patient ID
    doctorId: 13, // Random doctor ID
  },
  // APPOINTMENT 3
  {
    created_at: fromToday(-20, true),
    startDate: fromToday(0),
    endDate: fromToday(10),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "scheduled",
    hasConsultation: true,
    hasInsurance: true,
    requiresSpecialEquipment: false,
    isPaid: false,
    observations: "Sample observation text",
    wardId: 1, // Random ward ID
    patientId: 10, // Random patient ID
    doctorId: 19, // Random doctor ID
  },
  // ... Continue with more appointment objects

  // ... (previous appointments)

  // APPOINTMENT 4
  {
    created_at: fromToday(-10, true),
    startDate: fromToday(1),
    endDate: fromToday(5),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "scheduled",
    hasConsultation: true,
    hasInsurance: true,
    requiresSpecialEquipment: false,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 3, // Random ward ID
    patientId: 11, // Random patient ID
    doctorId: 6, // Random doctor ID
  },
  // APPOINTMENT 5
  {
    created_at: fromToday(-5, true),
    startDate: fromToday(7),
    endDate: fromToday(10),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "checked-out",
    hasConsultation: false,
    hasInsurance: true,
    requiresSpecialEquipment: true,
    isPaid: false,
    observations: "Sample observation text",
    wardId: 2, // Random ward ID
    patientId: 12, // Random patient ID
    doctorId: 29, // Random doctor ID
  },
  // APPOINTMENT 6
  {
    created_at: fromToday(-12, true),
    startDate: fromToday(0),
    endDate: fromToday(2),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "checked-in",
    hasConsultation: true,
    hasInsurance: true,
    requiresSpecialEquipment: true,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 5, // Random ward ID
    patientId: 13, // Random patient ID
    doctorId: 18, // Random doctor ID
  },
  // APPOINTMENT 7
  {
    created_at: fromToday(-15, true),
    startDate: fromToday(0),
    endDate: fromToday(),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "scheduled",
    hasConsultation: false,
    hasInsurance: true,
    requiresSpecialEquipment: false,
    isPaid: false,
    observations: "Sample observation text",
    wardId: 7, // Random ward ID
    patientId: 14, // Random patient ID
    doctorId: 9, // Random doctor ID
  },
  // APPOINTMENT 8
  {
    created_at: fromToday(-7, true),
    startDate: fromToday(25),
    endDate: fromToday(30),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "checked-in",
    hasConsultation: true,
    hasInsurance: false,
    requiresSpecialEquipment: true,
    isPaid: false,
    observations: "Sample observation text",
    wardId: 4, // Random ward ID
    patientId: 15, // Random patient ID
    doctorId: 25, // Random doctor ID
  },
  // APPOINTMENT 9
  {
    created_at: fromToday(-12, true),
    startDate: fromToday(0),
    endDate: fromToday(4),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "scheduled",
    hasConsultation: true,
    hasInsurance: true,
    requiresSpecialEquipment: false,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 1, // Random ward ID
    patientId: 16, // Random patient ID
    doctorId: 32, // Random doctor ID
  },
  // APPOINTMENT 10
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(5),
    endDate: fromToday(9),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "checked-out",
    hasConsultation: false,
    hasInsurance: false,
    requiresSpecialEquipment: false,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 8, // Random ward ID
    patientId: 17, // Random patient ID
    doctorId: 10, // Random doctor ID
  },
  // ... Continue with more appointment objects

  // ... (previous appointments)

  // APPOINTMENT 11
  {
    created_at: fromToday(-16, true),
    startDate: fromToday(-2),
    endDate: fromToday(0),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "scheduled",
    hasConsultation: true,
    hasInsurance: true,
    requiresSpecialEquipment: true,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 6, // Random ward ID
    patientId: 18, // Random patient ID
    doctorId: 7, // Random doctor ID
  },
  // APPOINTMENT 12
  {
    created_at: fromToday(-12, true),
    startDate: fromToday(22),
    endDate: fromToday(27),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "checked-in",
    hasConsultation: true,
    hasInsurance: false,
    requiresSpecialEquipment: false,
    isPaid: false,
    observations: "Sample observation text",
    wardId: 3, // Random ward ID
    patientId: 19, // Random patient ID
    doctorId: 15, // Random doctor ID
  },
  // APPOINTMENT 13
  {
    created_at: fromToday(-18, true),
    startDate: fromToday(-2),
    endDate: fromToday(0),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "scheduled",
    hasConsultation: true,
    hasInsurance: true,
    requiresSpecialEquipment: false,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 2, // Random ward ID
    patientId: 20, // Random patient ID
    doctorId: 22, // Random doctor ID
  },
  // APPOINTMENT 14
  {
    created_at: fromToday(-25, true),
    startDate: fromToday(5),
    endDate: fromToday(10),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "checked-out",
    hasConsultation: false,
    hasInsurance: true,
    requiresSpecialEquipment: true,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 5, // Random ward ID
    patientId: 21, // Random patient ID
    doctorId: 28, // Random doctor ID
  },
  // APPOINTMENT 15
  {
    created_at: fromToday(-12, true),
    startDate: fromToday(-2),
    endDate: fromToday(6),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "scheduled",
    hasConsultation: false,
    hasInsurance: false,
    requiresSpecialEquipment: true,
    isPaid: false,
    observations: "Sample observation text",
    wardId: 7, // Random ward ID
    patientId: 22, // Random patient ID
    doctorId: 9, // Random doctor ID
  },
  // APPOINTMENT 16
  {
    created_at: fromToday(-8, true),
    startDate: fromToday(11),
    endDate: fromToday(15),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "checked-in",
    hasConsultation: true,
    hasInsurance: true,
    requiresSpecialEquipment: true,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 4, // Random ward ID
    patientId: 23, // Random patient ID
    doctorId: 12, // Random doctor ID
  },
  // APPOINTMENT 17
  {
    created_at: fromToday(-11, true),
    startDate: fromToday(20),
    endDate: fromToday(25),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "scheduled",
    hasConsultation: true,
    hasInsurance: false,
    requiresSpecialEquipment: false,
    isPaid: false,
    observations: "Sample observation text",
    wardId: 1, // Random ward ID
    patientId: 24, // Random patient ID
    doctorId: 11, // Random doctor ID
  },
  // APPOINTMENT 18
  {
    created_at: fromToday(-19, true),
    startDate: fromToday(10),
    endDate: fromToday(14),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "checked-out",
    hasConsultation: true,
    hasInsurance: true,
    requiresSpecialEquipment: false,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 8, // Random ward ID
    patientId: 25, // Random patient ID
    doctorId: 10, // Random doctor ID
  },
  // APPOINTMENT 19
  {
    created_at: fromToday(-4, true),
    startDate: fromToday(8),
    endDate: fromToday(12),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "scheduled",
    hasConsultation: false,
    hasInsurance: false,
    requiresSpecialEquipment: false,
    isPaid: false,
    observations: "Sample observation text",
    wardId: 2, // Random ward ID
    patientId: 26, // Random patient ID
    doctorId: 19, // Random doctor ID
  },
  // APPOINTMENT 20
  {
    created_at: fromToday(-14, true),
    startDate: fromToday(30),
    endDate: fromToday(35),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "checked-in",
    hasConsultation: true,
    hasInsurance: true,
    requiresSpecialEquipment: true,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 6, // Random ward ID
    patientId: 27, // Random patient ID
    doctorId: 30, // Random doctor ID
  },
  // APPOINTMENT 21
  {
    created_at: fromToday(-9, true),
    startDate: fromToday(-6),
    endDate: fromToday(0),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "scheduled",
    hasConsultation: true,
    hasInsurance: false,
    requiresSpecialEquipment: false,
    isPaid: false,
    observations: "Sample observation text",
    wardId: 3, // Random ward ID
    patientId: 28, // Random patient ID
    doctorId: 20, // Random doctor ID
  },
  // APPOINTMENT 22
  {
    created_at: fromToday(-7, true),
    startDate: fromToday(-5),
    endDate: fromToday(1),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "checked-out",
    hasConsultation: false,
    hasInsurance: false,
    requiresSpecialEquipment: false,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 7, // Random ward ID
    patientId: 29, // Random patient ID
    doctorId: 18, // Random doctor ID
  },
  // APPOINTMENT 23
  {
    created_at: fromToday(-10, true),
    startDate: fromToday(-4),
    endDate: fromToday(4),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "scheduled",
    hasConsultation: true,
    hasInsurance: true,
    requiresSpecialEquipment: false,
    isPaid: true,
    observations: "Sample observation text",
    wardId: 1, // Random ward ID
    patientId: 30, // Random patient ID
    doctorId: 25, // Random doctor ID
  },
  // APPOINTMENT 24
  {
    created_at: fromToday(-6, true),
    startDate: fromToday(-3),
    endDate: fromToday(3),
    numNights: null,
    numGuests: null,
    wardPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
    status: "checked-in",
    hasConsultation: true,
    hasInsurance: false,
    requiresSpecialEquipment: true,
    isPaid: false,
    observations: "Sample observation text",
    wardId: 8, // Random ward ID
    patientId: 31, // Random patient ID
    doctorId: 17, // Random doctor ID
  },
  // ... Continue with more appointment objects
];
