
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
// import getReservations from "@/app/actions/getReservations";

import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";
import getPurchases from "@/app/actions/getPurchases";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingById(params);
  const purchases = await getPurchases(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <EmptyState />
    );
  }

  return (
    <ListingClient
      listing={listing}
      purchases={purchases}
      currentUser={currentUser}
    />
  );
}

export default ListingPage;
