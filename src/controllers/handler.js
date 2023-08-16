const mongoose = require('mongoose');
const Video = require('../models/videos');
const Product = require('../models/products');

const addVideoHandler = (req, res) => {
  const video = new Video({
    title: req.body.title,
    thumbnailURL: req.body.thumbnailURL,
    category: req.body.category,
    description: req.body.description,
    comments: req.body.comments,
  });
  try {
    const videoToSave = video.save();
    res.status(200).json(videoToSave);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const addProductHandler = (req, res) => {
  const { videoId } = req.params;
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    productLink: req.body.productLink,
    description: req.body.description,
    video: videoId,
  });

  try {
    const productToSave = product.save();
    res.status(200).json(productToSave);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllVideosHandler = async (req, res) => {
  try {
    if (Video.length > 0) {
      const videoResult = await Video.find();
      res.status(200).json({
        status: 'success',
        message: 'Berikut adalah list video',
        videoList: videoResult.map((video) => ({
          id: video.id,
          title: video.title,
          thumbnail: video.thumbnailURL,
          description: video.description,
        })),
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

const getProductsByVideoIdHandler = async (req, res) => {
  try {
    const { videoId } = req.params;
    const videoObjectId = new mongoose.Types.ObjectId(videoId);
    const product = await Product.find({ video: videoObjectId }).exec();
    // const product = products.filter((p) => p.videoId === parseInt(videoId, 10));
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

const getVideoDetailByVideoIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const videoObjectId = new mongoose.Types.ObjectId(id);
    const videoFiltered = await Video.findById(id).exec();
    // const videoFiltered = videos.filter((v) => v.id === parseInt(id, 10));
    if (videoFiltered) {
      const product = await Product.find({ video: videoObjectId }).exec();
      // const product = products.filter((p) => p.videoId === parseInt(id, 10));
      const thumbnail = videoFiltered.thumbnailURL;
      const comment = videoFiltered.comments;
      res.status(200).json({
        status: 'success',
        title: videoFiltered.title,
        videoThumbnail: thumbnail,
        productList: product.length > 0 ? product : [],
        commentList: comment,
      });
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

const getAllCommentsHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const videoFiltered = await Video.findById(id);
    // const videoFiltered = videos.filter((v) => v.id === parseInt(id, 10));
    if (videoFiltered) {
      const comment = videoFiltered.comments;
      if (comment.length > 0) {
        res.status(200).json({
          status: 'success',
          message: `Berikut adalah comment list untuk ${videoFiltered.title}`,
          commentList: comment,
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: `Belum ada yang comment nih untuk ${videoFiltered.title}`,
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
  // const timestamp = new Date().toISOString();
  // const index = Video.findById(id);
  // const index = videos.findIndex((video) => video.id === parseInt(id, 10));

  const newComment = {
    username,
    comment,
  };

  try {
    if (newComment) {
      if (!username) {
        throw new Error('username kosong');
      }
      if (!comment) {
        throw new Error('Tulis komen Anda');
      }
      Video.findByIdAndUpdate(id, { $push: { comments: newComment } }).exec();
      //  .then(console.log(newComment));
      // videos[index].comments.push(newComment);
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
  addVideoHandler,
  addProductHandler,
};
