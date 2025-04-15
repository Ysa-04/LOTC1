import express from "express";

export default function landingpage404Router() {
    const router = express.Router();

    router.get("/", (req, res) => {
        res.render("404landingpage");
    });
    return router;
}