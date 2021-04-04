import { Router } from "express";
const router = Router();

router.get("/api", (req, res) => {
  return res.json({
    msg: "Welcome to api v0.1",
  });
});

export default router;
