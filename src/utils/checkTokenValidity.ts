export const isTokenExpired = () => {
    const expiry = localStorage.getItem('spotify_token_expiry');
    if (!expiry) return true;
    return Date.now() > Number(expiry);
  };
