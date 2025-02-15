import express from 'express';
import { Subscribe } from '../models/subscribe.model.js';

const router = express.Router();

// Route to render the home page
router.get("/", (req, res, next) => {
    res.render("index.ejs");
});

// Route to render the subscription page
router.get("/subscribe", (req, res, next) => {
    res.render("subscribe.ejs");
});

// POST route to handle subscription
router.post("/subscribe", async (req, res, next) => {
    let { email } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        req.flash("error", "Please enter a valid email address.");
        return res.redirect("/subscribe"); // Redirect to subscription page if email is invalid
    }

    try {
        // Check if the email is already subscribed
        const existingSubscriber = await Subscribe.findOne({ email });
        if (existingSubscriber) {
            req.flash("error", "This email is already subscribed.");
            return res.redirect("/subscribe"); // Redirect if email is already subscribed
        }

        // Save the new subscription to the database
        let subs = new Subscribe({ email });
        await subs.save();

        // Set a success message and redirect to the home page
        req.flash("success", "You have been successfully subscribed!");
        res.redirect("/");  // Redirect to home page after successful subscription
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong. Please try again later.");
        res.redirect("/subscribe");  // Redirect back to subscription page if an error occurs
    }
});

export { router as indexRouter };
