import Button from "../../ui/Button";
import CreateWardForm from "./CreateWardForm";
import Modal from "../../ui/Modal";

function AddWard() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="ward-form">
          <Button>Add new ward</Button>
        </Modal.Open>
        <Modal.Window name="ward-form">
          <CreateWardForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddWard;
