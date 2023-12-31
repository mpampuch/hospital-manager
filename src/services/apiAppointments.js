import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getAppointments({ filter, sortBy, page }) {
  let query = supabase
    .from("appointments")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, wards(name), patients(fullName, email)",
      { count: "exact" }
    );

  // FILTER
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Appointments could not be loaded");
  }

  return { data, count };
}

export async function getAppointment(id) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, wards(*), patients(*), doctors(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Appointment not found");
  }

  return data;
}

// Returns all appointments that are were created after the given date. Useful to get appointments created in the last 30 days, for example.
// date: ISOString
export async function getAppointmentsAfterDate(date) {
  const { data, error } = await supabase
    .from("appointments")
    .select("created_at, totalPrice, extrasPrice, isPaid")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Appointments could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, patients(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Appointments could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, patients(fullName, nationality, countryFlag, sex)")
    .or(
      `and(status.eq.scheduled,startDate.eq.${getToday()}),and(status.eq.admitted,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL Appointments ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Appointments could not get loaded");
  }

  return data;
}

export async function updateAppointment(id, obj) {
  const { data, error } = await supabase
    .from("appointments")
    .update(obj)
    .eq("id", id)
    .select("*, patients(fullName)")
    .single();

  if (error) {
    console.error(error);
    throw new Error("Appointment could not be updated");
  }
  return data;
}

export async function deleteAppointment(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Appointment could not be deleted");
  }
  return data;
}
