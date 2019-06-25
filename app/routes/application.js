const router = require("express").Router()
const ApplicationManager = require("../controllers/application")

router.get("/accept/:id", async (req, res) => {
  await ApplicationManager.setAccepted(req.params.id)
    .then(_id => {
        res.redirect("/projets/" + _id)
    })
    .catch((err) => {
        res.redirect("back")
    })
})

router.get("/refuse/:id", async (req, res) => {
    await ApplicationManager.setRefused(req.params.id)
        .then(_id => {
            res.redirect("back")
        })
        .catch((err) => {
            res.redirect("back")
        })
})

module.exports = router
