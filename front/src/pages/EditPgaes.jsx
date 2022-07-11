import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const EditPgaes = () => {
  const query = useQuery();

  return <div>{}</div>;
};

export default EditPgaes;
