import { useEffect, useRef } from "react";
import ApiClient from "./apiClient";

type Options = {
  persistInFlight?: boolean;
  api?: ApiClient;
};

function useApi({ persistInFlight, api: providedApi }: Options = {}) {
  const localApi = useRef<ApiClient>();

  // Lazily construct the client if we weren't provided with one
  if (localApi.current === undefined && providedApi === undefined) {
    localApi.current = new ApiClient();
  }

  // Use the provided client if available
  const api = providedApi ?? localApi.current!;

  function handleCleanup() {
    !persistInFlight && api.clear();
  }

  useEffect(() => handleCleanup);

  return api;
}

export default useApi;
