import styled from "styled-components";
import { format, isToday } from "date-fns";
import { HiPhoneOutgoing, HiOutlineClipboardCheck } from "react-icons/hi";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCurrencyDollar,
  HiCalendarDays,
} from "react-icons/hi2";
import {
  MdOutlineWorkHistory,
  MdOutlinePersonalInjury,
  MdDomainAdd,
} from "react-icons/md";
import { FaMale, FaFemale } from "react-icons/fa";

import { LiaStethoscopeSolid } from "react-icons/lia";
import { IoMedkitOutline } from "react-icons/io5";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid || (props.isPaid && props.hasInsurance)
      ? "var(--color-green-100)"
      : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid || (props.isPaid && props.hasInsurance)
      ? "var(--color-green-700)"
      : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component

function BookingDataBox({ appointment }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    wardPrice,
    extrasPrice,
    totalPrice,
    status,
    hasConsultation,
    hasInsurance,
    requiresSpecialEquipment,
    observations,
    isPaid,
    patients: {
      fullName: patientName,
      email,
      nationality,
      countryFlag,
      nationalID,
      sex,
      age,
      healthInsuranceNumber,
      insuranceInfo,
      medicalHistory,
      emergencyContact,
    },
    wards: { name: wardName },
    doctors: { full_name: doctorName },
  } = appointment;

  // Define a variable to check if it's paid, or covered by insurance, or payment is outstanding
  let paymentStatus;

  if (isPaid && hasInsurance) {
    paymentStatus = "Covered by insurance";
  } else if (hasInsurance) {
    paymentStatus = "Insurance claim pending";
  } else if (isPaid) {
    paymentStatus = "Billed to patient";
  } else {
    paymentStatus = "Payment outstanding";
  }

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <MdDomainAdd />
          <p>
            {status !== "discharged" ? "Estimated " : ""}
            {numNights} {numNights === 1 ? "night" : "nights"} in Ward{" "}
            <span>{wardName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {sex === "Male" ? <FaMale /> : <FaFemale />}
          <p>
            {patientName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          {countryFlag && (
            <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
          )}
          <span>&bull;</span>
          <p>{age} years old</p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>Health Insurance Number: {healthInsuranceNumber}</p>
        </Guest>

        <DataItem
          icon={<HiOutlineChatBubbleBottomCenterText />}
          label="Symptoms:"
        >
          {observations}
        </DataItem>

        <DataItem icon={<MdOutlineWorkHistory />} label="Medical History:">
          {medicalHistory}
        </DataItem>

        <DataItem
          icon={<MdOutlinePersonalInjury />}
          label="Requires Special Equipment?"
        >
          {requiresSpecialEquipment ? "Yes" : "No"}
        </DataItem>

        <DataItem icon={<HiCalendarDays />} label="Consultation Scheduled?">
          {hasConsultation ? "Yes" : "No"}
        </DataItem>

        {hasConsultation && (
          <DataItem icon={<LiaStethoscopeSolid />} label="Consulting Doctor:">
            {doctorName}
          </DataItem>
        )}

        <DataItem icon={<IoMedkitOutline />} label="Has Insurance?">
          {hasInsurance ? "Yes" : "No"}
        </DataItem>

        {hasInsurance && (
          <DataItem icon={<HiOutlineClipboardCheck />} label="Insurance Info:">
            {insuranceInfo}
          </DataItem>
        )}
        <DataItem icon={<HiPhoneOutgoing />} label="Emergency Contact:">
          {emergencyContact}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={"Total cost"}>
            {formatCurrency(totalPrice)}

            {hasConsultation &&
              ` (${formatCurrency(wardPrice)} stay + ${formatCurrency(
                extrasPrice
              )} consultation)`}
          </DataItem>
          <p>{paymentStatus}</p>
        </Price>
      </Section>

      <Footer>
        <p>Scheduled {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
