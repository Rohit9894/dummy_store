import jwt from "jsonwebtoken";
const genrateToken = (id) => {
  return jwt.sign({ id }, "hush", {
    expiresIn: "30d",
  });
};
export default genrateToken;
