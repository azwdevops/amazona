import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
};

export const requestAuthorized = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).send({ message: "Unauthorized request" });
  } else {
    const token = bearerToken.slice(7, bearerToken.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized request" });
      } else {
        req.user = data;
        next();
      }
    });
  }
};
