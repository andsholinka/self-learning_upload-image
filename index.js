import express from 'express'
import dotenv from 'dotenv'
import router from './router.js'


const app = express()
dotenv.config()

app.get('/', (req, res, next) => {
    res.send({success: true})
})

app.use((err, req, res, next) => {
    res.send(err.message)
})

app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`App listens to port ${process.env.PORT}`);
});
