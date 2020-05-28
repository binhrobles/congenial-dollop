// https://github.com/the-road-to-learn-react/react-local-storage
import React from 'react';

const useStateWithSessionStorage = (sessionStorageKey) => {
  const [value, setValue] = React.useState(
    sessionStorage.getItem(sessionStorageKey) || ''
  );

  React.useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, value);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return [value, setValue];
};

export default useStateWithSessionStorage;
