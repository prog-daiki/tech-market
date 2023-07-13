
const conditions = [
  { value: '未使用品', label: '未使用品 : 開封済みだが、使用されていない' },
  { value: 'Aランク', label: 'Aランク : 使用感は少ない' },
  { value: 'Bランク', label: 'Bランク : 特に目立つ傷はないが、使用感はある' },
  { value: 'Cランク', label: 'Cランク : ひび割れ、付帯パーツの劣化が見られる' },
]


const formattedConditions = conditions.map((condition) => ({
  value: condition.value,
  label: condition.label,
}));

const useConditions = () => {
  const getAll = () => formattedConditions;

  const getByValue = (value: string) => {
    return formattedConditions.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useConditions;
