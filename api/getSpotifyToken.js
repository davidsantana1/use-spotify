const axios = require("axios");

const CLIENT_ID = "***REMOVED***";
const CLIENT_SECRET = "***REMOVED***";

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const authOptions = {
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      },
      data: "grant_type=client_credentials",
    };

    try {
      const response = await axios(authOptions);
      res.status(200).json({ access_token: response.data.access_token });
    } catch (error) {
      console.error("Error fetching token:", error);
      res.status(500).json({ error: "Error fetching token" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
