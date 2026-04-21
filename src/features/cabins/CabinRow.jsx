import { useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { deleteCabin } from '../../services/apiCabins';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const ToasterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ToasterSpan = styled.span`
  font-weight: 500;
`;

const ToasterButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.8rem;
`;

const buttonType = {
  yes: css`
    background-color: var(--color-brand-600);
  `,
  no: css`
    background-color: var(--color-red-700);
  `,
};

const ToasterButton = styled.button`
  padding: 5px 12px;
  color: var(--color-grey-0);
  border: none;
  border-radius: 5px;
  ${(props) => buttonType[props.vari]}
`;

function CabinRow({ cabin }) {
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);

  const {
    id: cabinId,
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
  } = cabin;

  // const { isPending: isDeleting, mutate } = useMutation({
  //   mutationFn: (id) => deleteCabin(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['cabins'] });
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  // function handleDeleteCabin(cabinId) {
  //   mutate(cabinId);
  // }

  function handleConfirmDelete(id) {
    toast((t) => (
      <ToasterContainer>
        <ToasterSpan>Are you sure?</ToasterSpan>
        <ToasterButtonContainer>
          <ToasterButton vari='no' onClick={() => toast.dismiss(t.id)}>
            No
          </ToasterButton>

          <ToasterButton
            vari='yes'
            onClick={() => {
              toast.dismiss(t.id);
              toast.promise(deleteCabin(id), {
                loading: 'Deleting cabin...',
                success: () => {
                  queryClient.invalidateQueries({ queryKey: ['cabins'] });
                  return 'Cabin deleted successfully!';
                },
                error: (err) => err.message,
              });
            }}
          >
            Yes
          </ToasterButton>
        </ToasterButtonContainer>
      </ToasterContainer>
    ));
  }

  return (
    <>
      <TableRow role='row'>
        <Img
          onClick={() => toast('Thanks good job', { icon: '😊' })}
          src={image}
        />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={() => setShowForm((prev) => !prev)}>Edit</button>
          <button onClick={() => handleConfirmDelete(cabinId)}>Delete</button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

export default CabinRow;
