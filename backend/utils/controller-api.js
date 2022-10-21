const axios = require("axios");
const fs = require("fs");

const baseURL = process.env.ZU_CONTROLLER_ENDPOINT || "http://localhost:9993/";

var token;
if (process.env.ZU_CONTROLLER_TOKEN) {
  token = process.env.ZU_CONTROLLER_TOKEN;
} else {
  token = fs.readFileSync("C:/ProgramData/ZeroTier/One/authtoken.secret", "utf8");
}

module.exports = axios.create({
  baseURL: baseURL,
  responseType: "json",
  headers: {
    "X-ZT1-Auth": token,
  },
});
