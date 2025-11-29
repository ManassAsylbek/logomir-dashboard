import { useSearchParams } from "react-router-dom";

export const useSessionToken = () => {
  const [searchParams] = useSearchParams();

  return searchParams.get("st");
};
