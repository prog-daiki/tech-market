'use client';

import { SafeListing, SafePurchase, SafeUser } from "@/app/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingPurchase from "@/app/components/listings/ListingPurchase";

interface ListingClientProps {
  purchases?: SafePurchase[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  purchases = [],
  currentUser
}) => {

  const loginModal = useLoginModal();
  const router = useRouter();

  const category = useMemo(() => {
    return categories.find((items) =>
      items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = (listing.price + 1000);

  const onCreatePurchase = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios.post('/api/purchases', {
      totalPrice,
      listingId: listing?.id
    })
      .then(() => {
        toast.success('Listing purchased!');
        router.push('/items');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
    [
      totalPrice,
      listing?.id,
      router,
      currentUser,
      loginModal
    ]);




  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            commodityCondition={listing.commodityCondition}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              brand={listing.brand}
              description={listing.description}
              commodityCondition={listing.commodityCondition}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingPurchase
                price={listing.price}
                totalPrice={totalPrice}
                onSubmit={onCreatePurchase}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
