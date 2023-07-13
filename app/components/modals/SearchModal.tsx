"use client"

import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useCallback, useMemo, useState } from "react";
import ConditionSelect, { ConditionSelectValue } from "../inputs/ConditionSelect";
import qs from 'query-string';
import Heading from "../Heading";

enum STEPS {
  CONDITION = 0,
  // BRAND = 1,
  // INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [commodityCondition, setCommodityCondition] = useState<ConditionSelectValue>();

  const [step, setStep] = useState(STEPS.CONDITION);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    // if (step !== STEPS.INFO) {
    //   return onNext();
    // }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const updatedQuery: any = {
      ...currentQuery,
      commodityConditionValue: commodityCondition?.value,
    };
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    setStep(STEPS.CONDITION);
    searchModal.onClose();
    router.push(url);

  }, [searchModal, commodityCondition, router, params])

  // const actionLabel = useMemo(() => {
  //   if (step === STEPS.INFO) {
  //     return 'Search'
  //   }
  //   return 'Next'
  // }, [step]);

  // const secondaryActionLabel = useMemo(() => {
  //   if (step === STEPS.CONDITION) {
  //     return undefined
  //   }
  //   return 'Back'
  // }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="どの状態の商品をお探しですか?"
      />
      <ConditionSelect
        value={commodityCondition}
        onChange={(value) =>
          setCommodityCondition(value as ConditionSelectValue)}
      />
    </div>
  )


  return (
    <Modal
      isOpen={searchModal.isOpen}
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
      title="検索フォーム"
      actionLabel="検索"
      body={bodyContent}
    />
  )
}

export default SearchModal
