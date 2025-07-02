export const API_ROUTES = {
  AUTH: {
    ACTIVE_USER: "/auth/active-user",
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
  },
  MARKET: {
    MARKETS: "/market/markets",
    DEPTH: (id: string) => `/market/depth/${id}`,
    DECLARE_RESULT: (id: string) => `/market/${id}/declare-result`,
  },
  TRADE: {
    CREATE: (marketId) => `/order/${marketId}`,
  },
  USER: {
    GET_USER: (id: string) => `/user/${id}`,
  },
};
