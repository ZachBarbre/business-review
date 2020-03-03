const express = require('express'),
router = express.Router(),
businessModel = require('../models/indexModel');

/* GET home page. */
router.get('/:business_id?', async function(req, res, next) {
  let businessData = [];
  let reviewsData = [];
  const { business_id } = req.params;
  reviewsData = await businessModel.getReviewsByBusinessID(business_id);
  console.log('review data', reviewsData);
  if (!!business_id){
    businessData = await businessModel.getBusinessById(business_id);
    
  } else{
    businessData = await businessModel.getAllBusiness();
  }
  console.log('business data', businessData);



  res.render('template', 
  {locals:{
    title: 'Resturant Reviews', 
    businessData: businessData
  },
    partials:{
      partial: 'partial-index'
    }
  });
});

module.exports = router;
