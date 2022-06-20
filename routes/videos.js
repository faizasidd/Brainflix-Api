const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const videosJsonPath = '../data/videos.json';
const videos = require(videosJsonPath);

// GET /videos that responds with an array of videos.

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

// GET /videos/:id that responds with an object containing the details of the video with an id of :id.

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

 // POST /videos that will add a new video to the video list.

  router.post('/videos', (req, res) => {
    const date = new Date();
    const newVideo = {
      ...req.body, //title, channel, description, image
      id: uuidv4(),
      views: 0,
      likes: 0,
      duration: '0:20',
      timestamp: date.getTime(),
      video: 'https://project-2-api.herokuapp.com/stream',
      comments: []
    }
  
    videos.push(newVideo);
  
    return res.json(newVideo);
  })  

module.exports = router