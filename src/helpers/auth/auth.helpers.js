import moment from "moment";
import cookie from "react-cookies";

import { AUTH_ACCESS_TOKEN } from "../../constants/auth.constants";

/**
 * Loads token from session cookie
 */
export const getTokens = () => {
  const cookieToken = cookie.load(AUTH_ACCESS_TOKEN);

  return {
    accessToken: cookieToken?.accessToken,
    refreshToken: cookieToken?.refreshToken,
    expiresAt: cookieToken?.expiresAt,
  };
};

/**
 * Save token and refresh token to session cookie,
 * Default value used for demo API
 */
export const saveTokens = ({ expiresIn = "3600", token }) => {
  const cookieToken = {
    accessToken: token,
    expiresAt: moment().add(expiresIn, "seconds").format(),
  };
  cookie.save(AUTH_ACCESS_TOKEN, cookieToken, {
    path: "/",
    expires: moment().add(expiresIn, "seconds").toDate(),
  });
};

/**
 * Clear token from session cookie
 */
export const clearTokens = () => {
  return cookie.remove(AUTH_ACCESS_TOKEN, { path: "/" });
};

/**
 * simplify code in slice with helper
 */
export const authErrorHelper = (state) => {
  state.user = null;
  state.isAuthenticated = false;
  state.error = true;
  state.loading = false;
};
