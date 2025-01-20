import { useLocalStorage } from 'usehooks-ts';

export const useLastLogin = () => {
  const [value, setValue] = useLocalStorage('lastLogin', '');
  return {
    value,
    setValue,
  };
};
