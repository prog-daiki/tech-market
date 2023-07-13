import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  // conditionValue?: string;
  commodityConditionValue?: string;
  // brand?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const { userId, commodityConditionValue, category } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (commodityConditionValue) {
      query.commodityConditionValue = commodityConditionValue;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  }
  catch (error: any) {
    throw new Error(error);
  }
}
