const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const videosJsonPath = '../data/videos.json';
const videos = require(videosJsonPath);

router.get('/videos', (req, res) => {
    return res.json(
      videos.reduce((accumulator, curr) => {
        accumulator.push({ // Reduce video info array down to the required attributes per video
          id: curr.id,
          title: curr.title,
          channel: curr.channel,
          image: curr.image,
        });
      
        return accumulator;
      }, [])
    );
  });

  router.get('/videos/:id', (req, res) => {
    const id = req.params.id;
    const video = videos.find(video => video.id === id);
  
    if (video) {
      return res.json(video);
    } else {
      return res.status(404).send({
        message: 'No video with that id exists'
      })
    }
  });


module.exports = router