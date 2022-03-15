import express from 'express';

const login = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { username, password } = req.body;

    const user = {
      username,
      password,
    };

    if (username === process.env.USER) {
      if (password === process.env.PASSWORD) {
        res.locals.user = user;
        next();
      } else {
        res.status(400).json({
          error: 'Incorrect username or password',
        });
      }
    } else {
      res.status(400).json({
        error: 'Incorrect username or password',
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default login;
