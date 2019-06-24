const router = require('express').Router()
const 

router.get('/', async (req, res) => {
    let projects = await 
    res.render('recherche')
})

module.exports = router