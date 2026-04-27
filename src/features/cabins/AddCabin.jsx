import { useState } from 'react';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  const [isOpenModal, setisOpenModal] = useState(false);

  return (
    <div>
      <Button
        variation='primary'
        size='medium'
        onClick={() => setisOpenModal((show) => !show)}
      >
        Add new cabin
      </Button>
      {isOpenModal && <CreateCabinForm />}
    </div>
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
