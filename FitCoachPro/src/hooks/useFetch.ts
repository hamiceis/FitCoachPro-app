import { useState, useEffect } from "react";
import { api } from "@/services/api";

interface FetchResult<T> {
  data: T | undefined;
  error: string | null;
  loading: boolean;
}

export function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get<T>(url);
          setData(response.data);
          setError(null); // Limpar o erro em caso de sucesso
      } catch (error: any) {
          setError(error.response?.data.message || 'Erro na solicitação');
      } finally {
        setLoading(false)
      }
    }

    if (url) {
      fetchData();
    }

  }, [url]);

 
  return {
    data,
    error,
    loading
  };
}
