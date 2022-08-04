const express = require("express");

const {
  getBootcamps,
  getBootcamp,
  createBootcamp, 
  updateBootcamp,
  deleteBootcamp,
  getBootcampByUserId,
  getBootcampsInRadius
} = require("../controllers/bootcamps");

const Bootcamp = require('../models/Bootcamp');

// Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const router = express.Router();

const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/userOwned').post(protect, authorize("publisher", "admin"), getBootcampByUserId)

router
  .route("/")
  .get(advancedResults(Bootcamp, ""), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

module.exports = router;
