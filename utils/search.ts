import { Item } from 'reducers/search';

type SearchFunction = (targetArray: Item[], value: string) => Item[];

const searchFunction: SearchFunction = (targetArray, value) => {
  if (value === '') {
    return [];
  }

  // 소문자, 대문자 상관없게 하기
  const regExpValue = new RegExp(value, 'i');
  return targetArray.filter(({ title }) => regExpValue.test(title));
};

export default searchFunction;
