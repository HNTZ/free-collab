const router = require("express").Router()
const UserManager = require("../controllers/user")
const moment = require("moment")
const { loggedInOnly } = require("../middleware")

router.get("/", loggedInOnly, (req, res) => {
    console.log(typeof req.user._id)
    console.log(typeof req.user.skills[0])
    res.render("account", {
    dob: moment(req.user.date_of_birth).format("YYYY-MM-DD"),
  })
})

router.post("/", loggedInOnly, async (req, res) => {
    res.locals.user = {
        ...req.user, 
        ...req.body,
        skills: typeof req.body.skills === 'object' ? req.body.skills : [req.body.skills]
    }
    UserManager.update(req.body).then(() => {
        res.render('account', {
            dob: moment(req.body.date_of_birth).format('YYYY-MM-DD'),
            success: "Votre profile a bien été mis à jour."
        })
    })
    .catch(error => {
        res.render('account', {
            dob: moment(req.body.date_of_birth).format("YYYY-MM-DD"),
            errors: [error]
        })
    })
})

module.exports = router
