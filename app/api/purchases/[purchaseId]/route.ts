import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  purchaseId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { purchaseId } = params;

  if (!purchaseId || typeof purchaseId !== 'string') {
    throw new Error('Invalid ID');
  }

  const purchase = await prisma.purchase.deleteMany({
    where: {
      id: purchaseId,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } }
      ]
    }
  });

  return NextResponse.json(purchase);
}
