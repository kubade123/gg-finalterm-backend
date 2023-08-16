const { express } = require('../../app');
const {
  getAllVideosHandler, getProductsByVideoIdHandler,
  getAllCommentsHandler, addCommentbyVideoIdHandler,
  getVideoDetailByVideoIdHandler, addVideoHandler, addProductHandler,
} = require('../controllers/handler');

const router = express.Router();

// Menambahkan sebuah video
router.post('/videos', (req, res) => {
  addVideoHandler(req, res);
});

// Menambahkan sebuah product
router.post('/products/:videoId', (req, res) => {
  addProductHandler(req, res);
});

// Menampilkan list semua video
router.get('/videos', (req, res) => {
  getAllVideosHandler(req, res);
});

// Menampilkan detail dari sebuah video
router.get('/videos/:id', (req, res) => {
  getVideoDetailByVideoIdHandler(req, res);
});

// Ambil list product dari sebuah video
router.get('/products/:videoId', (req, res) => {
  getProductsByVideoIdHandler(req, res);
});

// Ambil list comment dari sebuah video
router.get('/videos/:id/comments', (req, res) => {
  getAllCommentsHandler(req, res);
});

// Nambah comment ke sebuah video
router.post('/videos/:id/comments', (req, res) => {
  addCommentbyVideoIdHandler(req, res);
});

// Page Not Found Route (404)
router.get('*', (req, res) => {
  res.status(404).send('Page Not Found Sir');
});

module.exports = router;
