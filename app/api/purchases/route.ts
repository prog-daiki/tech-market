import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request,
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    listingId,
    totalPrice
  } = body;

  if (!listingId || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndPurchase = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      purchases: {
        create: {
          userId: currentUser.id,
          totalPrice,
        }
      }
    }
  });

  return NextResponse.json(listingAndPurchase);
}
