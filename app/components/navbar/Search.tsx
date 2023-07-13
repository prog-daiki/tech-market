"use client";

import useConditions from '@/app/hooks/useConditions';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useConditions();

  const conditionValue = params?.get('conditionValue');

  const conditionLabel = useMemo(() => {
    if (conditionValue) {
      return getByValue(conditionValue as string)?.label;
    }
    return '商品の状態';
  }, [conditionValue, getByValue]);

  return (
    <div onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-4 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div
        className="flex flex-row items-center justify-between">
        {/* <div className="text-sm font-semibold px-6">
          カテゴリー
        </div> */}
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {conditionLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">なにをお探しですか？</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
