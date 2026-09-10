import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';

export function useProducts(page = 1, limit = 20, filters?: any) {
  return useQuery({
    queryKey: ['products', page, limit, filters],
    queryFn: () => apiService.getProducts(page, limit, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useInfiniteProducts(limit = 20, filters?: any) {
  return useInfiniteQuery({
    queryKey: ['products-infinite', limit, filters],
    queryFn: ({ pageParam = 1 }) => apiService.getProducts(pageParam, limit, filters),
    getNextPageParam: (lastPage, pages) => {
      const { pagination } = lastPage.data;
      if (pagination && pagination.page < pagination.pages) {
        return pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => apiService.getProduct(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ['products-search', query],
    queryFn: () => apiService.searchProducts(query),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}
