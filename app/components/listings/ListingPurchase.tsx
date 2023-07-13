'use client';


import Button from "../Button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onSubmit: () => void;
  disabled?: boolean;
}

const ListingPurchase: React.FC<
  ListingReservationProps
> = ({
  price,
  totalPrice,
  onSubmit,
  disabled,
}) => {
    return (
      <div
        className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
        <div className="flex flex-row items-center gap-1 p-4">
          <div className="text-2xl font-semibold">
            ¥ {price}
          </div>
        </div>
        <hr />
        <hr />
        <div className="p-4">
          <Button
            disabled={disabled}
            label="購入する"
            onClick={onSubmit}
          />
        </div>
        <hr />
        <div
          className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
          <div>
            合計金額（送料込み）
          </div>
          <div>
            ¥ {totalPrice}
          </div>
        </div>
      </div>
    );
  }

export default ListingPurchase;
