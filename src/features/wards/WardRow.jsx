import styled from "styled-components";

import CreateWardForm from "./CreateWardForm";
import { useDeleteWard } from "./useDeleteWard";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateWard } from "./useCreateWard";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-3px);
`;

const Ward = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Cost = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const SpecialEqupmentCost = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-red-700);
`;

function WardRow({ ward }) {
  const { isDeleting, deleteWard } = useDeleteWard();
  const { isCreating, createWard } = useCreateWard();

  const {
    id: wardId,
    name,
    maxCapacity,
    dailyCost,
    specialEquipmentCost,
    image,
    description,
  } = ward;

  function handleDuplicate() {
    createWard({
      name: `Copy of ${name}`,
      maxCapacity,
      dailyCost,
      specialEquipmentCost,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Ward>{name}</Ward>
      <div>
        Fits up to {maxCapacity} {maxCapacity === 1 ? "patient" : "patients"}
      </div>
      <Cost>{formatCurrency(dailyCost)}</Cost>
      {specialEquipmentCost ? (
        <SpecialEqupmentCost>
          {formatCurrency(specialEquipmentCost)}
        </SpecialEqupmentCost>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={wardId} />

            <Menus.List id={wardId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateWardForm wardToEdit={ward} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="ward"
                disabled={isDeleting}
                onConfirm={() => {
                  deleteWard(wardId);
                }}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default WardRow;
