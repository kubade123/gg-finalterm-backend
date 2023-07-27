const videos = require('../models/videos');
const products = require('../models/products');

const getAllVideosHandler = (req, res) => {
  try {
    if (videos.length > 0) {
      res.status(200).json({
        status: 'success',
        message: 'Berikut adalah list video',
        videoList: videos.map((video) => ({ id: video.id, thumbnail: video.thumbnailURL })),
      });
    } else {
      throw new Error('List video kosong');
    }
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: error.message,
    });
  }
};

const getProductsByVideoIdHandler = (req, res) => {
  try {
    const { videoId } = req.params;
    const product = products.filter((p) => p.videoId === parseInt(videoId, 10));
    if (product.length > 0) {
      res.status(200).json({
        status: 'success',
        message: 'Berikut adalah productnya',
        productList: product,
      });
    } else {
      throw new Error('Product tidak ditemukan');
    }
  } catch (error) {
    res.status(404).json({
      status: 'Fail',
      message: error.message,
    });
  }
};

const getVideoDetailByVideoIdHandler = (req, res) => {
  try {
    const { id } = req.params;
    const videoFiltered = videos.filter((v) => v.id === parseInt(id, 10));
    if (videoFiltered.length > 0) {
      const product = products.filter((p) => p.videoId === parseInt(id, 10));
      const thumbnail = videoFiltered[0].thumbnailURL;
      const comment = videoFiltered[0].comments;
      if (product.length > 0) {
        res.status(200).json({
          status: 'success',
          videoThumbnail: thumbnail,
          productList: product,
          commentList: comment,
        });
      } else {
        throw new Error('Product tidak ditemukan');
      }
    } else {
      throw new Error('Video tidak ditemukan');
    }
  } catch (error) {
    res.status(404).json({
      status: 'Fail',
      message: error.message,
    });
  }
};

const getAllCommentsHandler = (req, res) => {
  try {
    const { id } = req.params;
    const videoFiltered = videos.filter((v) => v.id === parseInt(id, 10));
    if (videoFiltered.length > 0) {
      const comment = videoFiltered[0].comments;
      if (comment.length > 0) {
        res.status(200).json({
          status: 'success',
          message: `Berikut adalah comment list untuk ${videoFiltered[0].thumbnailURL}`,
          commentList: comment,
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: `Belum ada yang comment nih untuk ${videoFiltered[0].thumbnailURL}`,
        });
      }
    } else {
      throw new Error('Video tidak ditemukan');
    }
  } catch (error) {
    res.status(404).json({
      status: 'Fail',
      message: error.message,
    });
  }
};

const addCommentbyVideoIdHandler = (req, res) => {
  const { username, comment } = req.body;
  const { id } = req.params;
  const timestamp = new Date().toISOString();
  const index = videos.findIndex((video) => video.id === parseInt(id, 10));

  const newComment = {
    username,
    comment,
    timestamp,
  };

  try {
    if (newComment) {
      if (!username) {
        throw new Error('username kosong');
      }
      if (!comment) {
        throw new Error('Tulis komen Anda');
      }
      videos[index].comments.push(newComment);
      res.status(200).json({
        status: 'success',
        message: 'Comment berhasil ditambahkan',
        comment: newComment,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'Fail',
      message: error.message,
    });
  }
};

module.exports = {
  getAllVideosHandler,
  getProductsByVideoIdHandler,
  getVideoDetailByVideoIdHandler,
  getAllCommentsHandler,
  addCommentbyVideoIdHandler,
};
