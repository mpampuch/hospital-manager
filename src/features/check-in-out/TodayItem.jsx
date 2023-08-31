import styled from "styled-components";
import { Link } from "react-router-dom";

import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
import { FaMale, FaFemale } from "react-icons/fa";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1.2rem 1.2rem 1fr 11rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, patients, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "scheduled" && <Tag type="green">Arriving</Tag>}
      {status === "admitted" && <Tag type="blue">Cleared</Tag>}

      <Flag src={patients.countryFlag} alt={`Flag of ${patients.country}`} />
      {patients.sex === "Male" ? <FaMale /> : <FaFemale />}
      <Guest>{patients.fullName}</Guest>
      <div>
        {status === "scheduled" ? "Est. " : ""}
        {numNights} {numNights === 1 ? "night" : "nights"}
      </div>

      {status === "scheduled" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Admit
        </Button>
      )}
      {status === "admitted" && <CheckoutButton appointmentId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
