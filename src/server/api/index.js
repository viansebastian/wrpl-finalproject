const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const volleyball = require("volleyball");
const { getUserById } = require("../db");
apiRouter.use(volleyball);

// COMPLETE - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  // if no authorization is found, error will be thrown by the next()
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    // header set with Bearer
    const token = auth.slice(prefix.length);
    console.log(token);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      } else {
        next({
          name: "AuthorizationHeaderError",
          message: "Authorization token malformed",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

//indicate in console whether req.user is found
apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const gamesRouter = require("./games");
apiRouter.use("/games", gamesRouter);

const hardwareRouter = require("./hardware");
apiRouter.use("/hardware", hardwareRouter);

const merchRouter = require("./merch");
apiRouter.use("/merch", merchRouter);

const adminRouter = require("./admin");
apiRouter.use("/admin", adminRouter)

apiRouter.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = apiRouter;
