import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  const [isOpenModal, setisOpenModal] = useState(false);

  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button variation="primary" size="medium">
          Add new cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens="table">
        <Button variation="primary" size="medium">
          Show Table
        </Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;

/*
<Modal>
      <Modal.Toggle opens='new-cabin'>
        <Button>Add new cabin</Button>
      </Modal.Toggle>
      <Modal.Window name='new-cabin'>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
*/

/* <div>
      <Button
        variation='primary'
        size='medium'
        onClick={() => setisOpenModal((show) => !show)}
      >
        Add new cabin
      </Button>

      {isOpenModal && (
        <Modal onClose={() => setisOpenModal((show) => !show)}>
          <CreateCabinForm onCloseModal={() => setisOpenModal((show) => !show)} />
        </Modal>
      )}
    </div>
*/
