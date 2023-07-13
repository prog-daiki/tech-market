'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import useExhibitModal from "@/app/hooks/useExhibitModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import Input from "../inputs/Input";
import ConditionSelect from "../inputs/ConditionSelect";
import ImageUpload from "../inputs/ImageUpload";
import { useRouter } from 'next/navigation';


enum STEPS {
  CATEGORY = 0,
  CONDITION = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
  PRICE = 4,
}

const ExhibitModal = () => {

  const router = useRouter();
  const exhibitModal = useExhibitModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      brand: '',
      commodityCondition: null,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const category = watch('category');
  const commodityCondition = watch('commodityCondition');
  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }


  const onBack = () => {
    setStep((value) => value - 1);
  }
  const onNext = () => {
    setStep((value) => value + 1);
  }


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios.post('/api/listings', data)
      .then(() => {
        toast.success('出品が完了しました!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY)
        exhibitModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }



  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }
    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return 'Back'
  }, [step]);

  // bodycontent
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="商品のカテゴリーを選んでください"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        )
        )}
      </div>
    </div>
  )


  if (step === STEPS.CONDITION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="商品の状態を選択してください"
        />
        <ConditionSelect
          value={commodityCondition}
          onChange={(value) => setCustomValue('commodityCondition', value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="写真を追加してください"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc} />
      </div>
    )
  }


  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="名前とブランド名、説明文を入力してください"
        />
        <Input
          id="title"
          label="商品名"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="brand"
          label="ブランド名"
          register={register}
          errors={errors}
          required
          disabled={isLoading}
        />
        <hr />
        <Input
          id="description"
          label="商品の説明"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }


  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="価格を設定してください"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }



  return (
    <Modal
      isOpen={exhibitModal.isOpen}
      title="Tech Marketに出品しよう！"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onSubmit={handleSubmit(onSubmit)}
      onClose={exhibitModal.onClose}
      body={bodyContent}
    />
  )
}

export default ExhibitModal
