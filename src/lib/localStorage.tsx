export const getLocalStorage = (key: string) => {
  const localStorageValue = localStorage.getItem(key);
  return localStorageValue ? JSON.parse(localStorageValue) : null;
};
