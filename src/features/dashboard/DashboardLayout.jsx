import styled from "styled-components";
import useRecentBooking from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isBookingLoading } = useRecentBooking();
  const {
    stays,
    confirmedStays,
    isLoading: isStayingLoading,
  } = useRecentStays();

  if (isBookingLoading || isStayingLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>Statistic</div>
      <div>Today&apos;s activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
