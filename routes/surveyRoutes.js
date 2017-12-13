const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
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

  app.post("/api/surveys/webhooks", (req, res) => {
    const path = new Path("/api/surveys/:surveyId/:choice");
    const uniqueClickEventData = _.chain(req.body)
      .filter(({ event }) => event === "click")
      .map(({ url, email }) => {
        const match = path.test(new URL(url).pathname);
        if (match) return { email, ...match };
      })
      .compact()
      .uniqBy(e => e.email + e.surveyId)
      .value();
    console.log(uniqueClickEventData);
    res.send({});
  });
};
