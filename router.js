import express from 'express'
import multer from 'multer'
import path from 'path'

const __dirname = path.resolve()

var router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
    cb(null, __dirname + '/uploads')
    },
    filename(req, file, cb) {
    cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
    },
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
    return cb(null, true)
    } else {
    cb('Images only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
    },
})

router.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        res.status(500);
        return next(Error);
    }
    // res.send(`/${req.file.path}`)
    res.send({message:`success`})
})

export default router;