import express from 'express'
const homeRouter = express.Router()

homeRouter.get('/', (req, res) => {
    const user = req.user
    res.render('home', {user})
})


export { homeRouter };