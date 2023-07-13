
import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getPurchases from "@/app/actions/getPurchases";
import ItemsClient from "./ItemsClient";


const ItemsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="認証されていません！"
        subtitle="ログインしてください"
      />
    );
  }

  const purchases = await getPurchases({ userId: currentUser.id });

  if (purchases.length === 0) {
    return (
      <EmptyState
        title="購入した商品はまだありません！"
        subtitle="欲しい商品を購入しよう！"
      />
    );
  }

  return (
    <ItemsClient
      purchases={purchases}
      currentUser={currentUser}
    />
  );
}

export default ItemsPage;
