import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { useLocale } from "next-intl";

export function useApiQuery<T>(
  endpoint: string,
  params: Record<string, any> = {},
  options?: UseQueryOptions<T, Error, T, [string, string, Record<string, any>, string]>,
  enabled?: boolean
) {
  const locale = useLocale();

  const queryFn = async () => {
    let url = `${endpoint}?${new URLSearchParams(params)}`;

    // Faqat /base/poll/ endpointi uchun maxsus yondashuv
    if (endpoint.includes('/base/poll/')) {
      // Timestamp qo'shish orqali har safar yangi so'rov yuborish
      url += `&_t=${Date.now()}`;
    }

    return fetchApi<T>(url, {
      headers: endpoint.includes('/base/poll/') ? {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      } : {}
    });
  };

  return useQuery<T, Error, T, [string, string, Record<string, any>, string]>({
    queryKey: ["api", endpoint, params, locale],
    queryFn,
    ...options,
    enabled: enabled ?? true,
    // Faqat /base/poll/ endpointi uchun staleTime-ni 0 ga o'rnatamiz
    staleTime: endpoint.includes('/base/poll/') ? 0 : 5 * 60 * 1000, // 5 minutes for other endpoints
  });
}

export function useApiMutation<T, V extends object | undefined>(
  endpoint: string,
  options?: UseMutationOptions<T, Error, V>
) {
  return useMutation<T, Error, V>({
    mutationFn: (variables: V) => fetchApi<T>(endpoint, { method: 'POST', body: variables }),
    ...options,
  });
}

