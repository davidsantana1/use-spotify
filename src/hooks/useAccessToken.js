import axios from "axios";
import { useEffect, useState } from "react";

export default function useAccessToken() {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await axios.get("/api/getSpotifyToken");
        setAccessToken(response.data.access_token);
      } catch (err) {
        console.error(`⛔ Spotify API: ${err}`);
      }
    }

    fetchToken();
  }, [setAccessToken]);
  return [accessToken];
}
