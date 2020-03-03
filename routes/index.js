const express = require('express'),
router = express.Router(),
businessModel = require('../models/indexModel');

/* GET home page. */
router.get('/:business_id?', async function(req, res, next) {
  let businessData = [];
  let reviewsData = [];
  let partial = '';
  const { business_id } = req.params;
  
  console.log('review data', reviewsData);
  if (!!business_id){
    businessData = await businessModel.getBusinessById(business_id);
    reviewsData = await businessModel.getReviewsByBusinessID(business_id);
    partial = 'partial-business'
  } else{
    businessData = await businessModel.getAllBusiness();
    partial = 'partial-index'
  }
  console.log('business data', businessData);



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
