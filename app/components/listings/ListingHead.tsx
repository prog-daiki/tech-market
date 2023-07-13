import useConditions from "@/app/hooks/useConditions";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";


interface ListingHeadProps {
  title: string;
  commodityConditionValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  commodityConditionValue,
  imageSrc,
  id,
  currentUser
}) => {

  const { getByValue } = useConditions();

  const commodityCondition = getByValue(commodityConditionValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${commodityCondition?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead
