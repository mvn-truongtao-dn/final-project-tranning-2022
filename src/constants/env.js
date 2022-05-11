import packageJson from "../package.json";

export const ENV = {
  VERSION: packageJson.version || "",
  API_HOST: process.env.REACT_APP_API_HOST ?? "",
};
