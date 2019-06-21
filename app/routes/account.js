const router = require("express").Router()
const UserManager = require("../controllers/user")
const moment = require("moment")
const { loggedInOnly } = require("../middleware")

router.get("/", loggedInOnly, (req, res) => {
  res.render("account", {
    dob: moment(req.user.date_of_birth).format("YYYY-MM-DD"),
  })
})

router.post("/", loggedInOnly, async (req, res) => {
    UserManager.update(req.body).then(() => {
        res.render('account', {
            user: req.body,
            dob: moment(req.body.date_of_birth).format('YYYY-MM-DD'),
            success: "Votre profile a bien été mis à jour."
        })
    })
    .catch(error => {
        res.render('account', {
            user: req.body,
            dob: moment(req.body.date_of_birth).format("YYYY-MM-DD"),
            errors: [error]
        })
    })
})

module.exports = router
