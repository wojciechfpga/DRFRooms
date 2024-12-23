import ReservationDetails from '../../../components/ReservationPageComponents/ReservationDeatils';

export default function ReservationPage({ params }) {
  const { id } = params;

  return (
    <div className="container mx-auto mt-10">
      <ReservationDetails reservationId={id} />
    </div>
  );
}
