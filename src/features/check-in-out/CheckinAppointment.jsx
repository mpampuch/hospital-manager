import styled from "styled-components";
import AppointmentDataBox from "../appointments/AppointmentDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useAppointment } from "../appointments/useAppointment";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { useRedirect } from "../../context/RedirectContext";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinAppointment() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addConsultation, setAddConsultation] = useState(false);
  const { appointment, isLoading } = useAppointment();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { redirectTo } = useRedirect();
  useEffect(() => setConfirmPaid(appointment?.isPaid ?? false), [appointment]);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin({ redirect: redirectTo });

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: appointmentId,
    patients,
    totalPrice,
    // numGuests,
    hasConsultation,
    // numNights,
  } = appointment;

  const optionalConsultationPrice = settings.consultationPrice;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addConsultation) {
      checkin({
        appointmentId,
        consulation: {
          hasConsultation: true,
          extrasPrice: optionalConsultationPrice,
          totalPrice: totalPrice + optionalConsultationPrice,
        },
      });
    } else {
      checkin({ appointmentId, consulation: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          Admit patient for appointment #{appointmentId}
        </Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <AppointmentDataBox appointment={appointment} />

      {!hasConsultation && (
        <Box>
          <Checkbox
            checked={addConsultation}
            onChange={() => {
              setAddConsultation((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Requires consultation? ({formatCurrency(optionalConsultationPrice)})
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {patients.fullName} or their insurer will cover the
          total amount of{" "}
          {!addConsultation
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalConsultationPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalConsultationPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Admit {patients.fullName}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinAppointment;
