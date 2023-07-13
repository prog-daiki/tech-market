import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getPurchases(
  params: IParams
) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const purchases = await prisma.purchase.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safePurchases = purchases.map(
      (purchase) => ({
        ...purchase,
        createdAt: purchase.createdAt.toISOString(),
        listing: {
          ...purchase.listing,
          createdAt: purchase.listing.createdAt.toISOString(),
        },
      }));

    return safePurchases;
  } catch (error: any) {
    throw new Error(error);
  }
}
