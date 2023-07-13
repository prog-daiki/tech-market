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
    title,
    description,
    imageSrc,
    category,
    price,
    brand,
    commodityCondition
  } = body;


  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      brand,
      commodityCondition: commodityCondition.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}
