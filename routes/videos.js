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



module.exports = router