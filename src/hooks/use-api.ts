import { useState } from "react";
import { shortenUrl, getPaginatedUrls } from "@/lib/api";

import { toast } from "sonner";

export const useApi = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as string | null,
  });

  const handleError = (error: unknown) => {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    setState((prev) => ({ ...prev, error: message }));
    toast("Error", {
      description: message,
    });
  };

  const fetchUrls = async (page: number, limit: number) => {
    setState({ loading: true, error: null });
    try {
      return await getPaginatedUrls(page, limit);
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const createShortUrl = async (originalUrl: string) => {
    setState({ loading: true, error: null });
    try {
      return await shortenUrl(originalUrl);
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return {
    apiState: state,
    fetchUrls,
    createShortUrl,
  };
};
