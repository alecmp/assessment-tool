const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Assessment = require('../../models/Assessment');

const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  auth,
  //   check('user', 'Text is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newAssessment = new Assessment({
        user: req.user.id,
        customerprofile: req.body.customerprofile,
        virtualpenetration: req.body.virtualpenetration,
        securitycontrol: req.body.securitycontrol,
        csirt: req.body.csirt,
        survey: req.body.survey
      });

      const assessment = await newAssessment.save();

      res.json(assessment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/assessments/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ msg: 'Assessments not found' });
    }

    res.json(assessment);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/assessments
// @desc     Get all assessments of the current user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(assessments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/assessment/:id
// @desc     Get assessment by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ msg: 'Assessment not found' });
    }

    res.json(assessment);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ msg: 'Assessment not found' });
    }

    // Check user
    if (assessment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await assessment.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
