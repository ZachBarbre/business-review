const express = require('express'),
router = express.Router(),
businessModel = require('../models/indexModel');

/* GET home page. */
router.get('/:business_id?', async function(req, res, next) {
  let businessData = [];
  let reviewsData = [];
  let partial = '';
  const { business_id } = req.params;

  if (!!business_id){
    businessData = await businessModel.getBusinessById(business_id);
    reviewsData = await businessModel.getReviewsByBusinessID(business_id);
    // const starsArray 
    partial = 'partial-business'
    console.log(reviewsData.map(review => review.stars));
  } else{
    businessData = await businessModel.getAllBusiness();
    partial = 'partial-index'
  }

router.post('/', async function(req, res) {
  const { business_id, review_title, review_text , stars } = req.body;
  const restIdAsInt = parseInt(business_id);
  const starsAsInt = parseInt(stars);
  const postData = await businessModel.postReviewbyBusinessId(3, starsAsInt, review_text, restIdAsInt, review_title) 
  console.log(postData);
  res.sendStatus(200);
})


  res.render('template', 
  {locals:{
    title: 'Resturant Reviews', 
    businessData: businessData,
    reviewsData: reviewsData
  },
    partials:{
      partial: partial
    }
  });
});

module.exports = router;
