export const useApiFetch = (request, opts) => {
  const config = useRuntimeConfig();
  return useFetch(request, {
    baseURL: process.dev ? `http://localhost:3000${config.public.baseURL}` : `https://www.xkb.com.cn${config.public.baseURL}`,
    // baseURL: `https://www.xkb.com.cn${config.public.baseURL}`,
    // baseURL: `${config.public.baseURL}`,
    // suspense: true,
    server: true,
    headers: {
      "siteId":35,
    },
    ...opts,
  });
};
