const mangoose = require("mongoose");
const Survey = mangoose.model("surveys");
const requireLogin = require("../middlewares/requireLogin");
const requireCredit = require("../middlewares/requireCredit");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = app => {
  app.post(
    "/api/surveys/new",
    requireLogin,
    requireCredit,
    async (req, res) => {
      let user = req.user;
      const { title, subject, body, recipientString } = req.body;
      const recipients = recipientString
        .split(",")
        .map(email => ({ email: email.trim() }));
      const survey = new Survey({
        title,
        subject,
        body,
        recipients,
        _user: user.id,
        dateSent: Date.now()
      });

      const mailer = new Mailer(survey, surveyTemplate(survey));
      try {
        const response = await mailer.send();
        if (response.statusCode === 202) {
          await survey.save();
          user.credits--;
          user = await user.save();
        }
        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );
};
