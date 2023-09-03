import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minAppointmentLength,
      maxAppointmentLength,
      consultationPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/appointment">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minAppointmentLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minAppointmentLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/appointment">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxAppointmentLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxAppointmentLength")}
        />
      </FormRow>

      <FormRow label="Consultation price">
        <Input
          type="number"
          id="consultation-price"
          defaultValue={consultationPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "consultationPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
