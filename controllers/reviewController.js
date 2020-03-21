const catchAsync = require('./../utils/catchAsync');
console.log('XXX');
exports.getAllReviewsx = catchAsync( (req, res, next) => {
  res.status(200).json({
    status: 'success',
    location: 'GET api without params [getAllReviews]',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

console.log('yyyy');
