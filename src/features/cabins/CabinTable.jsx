import { useSearchParams } from "react-router";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";

function CabinTable() {
  const { cabins, isLoading, error } = useCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (error) return <p>something went wrong!</p>;

  const filterValue = searchParams.get("discount") || "all";

  let filterCabins;

  if (filterValue === "all") {
    filterCabins = cabins;
  }

  if (filterValue === "no-discount") {
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  if (filterValue === "with-discount") {
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filterCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
