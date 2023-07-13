'use client';

import Select from 'react-select';
import useConditions from '@/app/hooks/useConditions';

export type ConditionSelectValue = {
  label: string;
  value: string;
}

interface ConditionSelectProps {
  value?: ConditionSelectValue;
  onChange: (value: ConditionSelectValue) => void;
}

const ConditionSelect: React.FC<ConditionSelectProps> = ({
  value,
  onChange
}) => {
  const { getAll, getByValue } = useConditions();

  return (
    <div>
      <Select
        placeholder="商品の状態"
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as ConditionSelectValue)}
        formatOptionLabel={(option: any) => (
          <div>{option.label}</div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  )
}

export default ConditionSelect
