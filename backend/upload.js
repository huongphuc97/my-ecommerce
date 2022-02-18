const multer = require('multer');

const mime = require('mime-types');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/image/products')
    },
    filename: function (req, file, cb) {
        let ext = mime.extension(file.mimetype)
        if (ext == 'jpeg'){
            ext = 'jpg'
        }
      cb(null, 'product-' + Date.now() + '.' + ext)
    }
})
  
const upload = multer({ storage: storage });

module.exports = upload;