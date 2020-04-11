import useLocalStorage from 'react-use-localstorage';

export const useSSRLocalStorage = (key, initial) =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  typeof window !== "undefined" ? useLocalStorage(key, initial) : [initial];

