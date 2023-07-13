'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafePurchase, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface ItemsClientProps {
  purchases: SafePurchase[],
  currentUser?: SafeUser | null,
}

const ItemsClient: React.FC<ItemsClientProps> = ({
  purchases,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  return (
    <Container>
      <div className="pt-4">
        <Heading
          title="購入履歴"
        />
      </div>
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {purchases.map((purchase: any) => (
          <ListingCard
            key={purchase.id}
            data={purchase.listing}
            purchase={purchase}
            actionId={purchase.id}
            // onAction={onCancel}
            disabled={deletingId === purchase.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default ItemsClient;
