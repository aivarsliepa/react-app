const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "React App credits",
      source: req.body.id
    });
    let user = req.user;
    if (charge.status === "succeeded") {
      user.credits += 5;
      user = await user.save();
    }
    res.send(user);
  });
};
