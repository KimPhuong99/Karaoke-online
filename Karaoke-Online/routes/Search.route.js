const express = require('express');


const router = express.Router();

router.get('/', async (req, res) => {
  
    try {

        res.render('Search')
      } catch (err) {
        console.log(err);
        res.end('View error log in console.');
      }
})
router.get('/sing/:id', async (req, res) => {
  
  try {
    const id=req.params.id;
      res.render('Sing',{
        id : id
      })
    } catch (err) {
      console.log(err);
      res.end('View error log in console.');
    }
})
module.exports = router;