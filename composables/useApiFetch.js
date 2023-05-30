export const useApiFetch = (request, opts) => {
  const config = useRuntimeConfig();
  return useFetch(request, {
    baseURL: `http://localhost:3000${config.public.baseURL}`,
    // suspense: true,
    server: true,
    headers: {
      "siteId":35,
    },
    ...opts,
  });
};
