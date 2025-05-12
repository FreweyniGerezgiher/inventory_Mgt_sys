import { jwtDecode } from "jwt-decode";

/**
 * Checks if the JWT token is expired.
 * @param {string} token - The JWT token.
 * @returns {boolean} - True if the token is expired, false otherwise.
 */
export const isTokenExpired = (token) => {
  if (!token) return true; // No token implies "expired" or unauthenticated.

  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;

    // Check if the current time is past the expiration time
    const currentTime = Date.now() / 1000; // Convert to seconds
    return exp < currentTime;
  } catch (error) {
    console.error("Failed to decode token", error);
    return true;
  }
};
