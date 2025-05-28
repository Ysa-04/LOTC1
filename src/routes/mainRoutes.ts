import express, {Router} from "express";
import { appendFile } from "fs";
const router:Router = express.Router();

router.get("/", (req, res) => {
    res.render('index');
});
router.get("/404landingpage", (req, res) => {
    res.render("404landingpage");
});
router.get("/404", (req, res) => {
    res.render("404");
});
router.get("/10-rounds", (req, res) => {
    res.redirect("/quiz/start");
});
router.get("/blacklist", (req, res) => {
    res.render("blacklist");
});
router.get("/favorite", (req, res) => {
    res.render("favorite");
});
router.get("/highscore", (req, res) => {
    res.render("highscore");
});
router.get("/homepage", (req, res) => {
    res.render("homepage");
});
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/mistakes", (req, res) => {
    res.render("mistakes");
});
router.get("/register", (req, res) => {
    res.render("register");
});
router.get("/result", (req, res) => {
    res.render("result");
});
/* router.get("/sudden-death", (req, res) => {
    res.render("suddend-death");
}); */

export default router;



