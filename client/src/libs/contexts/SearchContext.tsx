import { createCtx } from "libs/utils/createContext";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

type SearchContexT = {
  query: string;
  handleDebounce: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const [useSearch, Provider] = createCtx<SearchContexT>();

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const onQuerying = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleDebounce = useMemo(() => debounce(onQuerying), []);

  useEffect(() => {
    return () => {
      handleDebounce.cancel();
    };
  }, []);

  return <Provider value={{ handleDebounce, query }}>{children}</Provider>;
};

export { useSearch, SearchProvider };
