const express = require('express');
const {
  analyzeProfile,
  getProfiles,
  getProfileByUsername
} = require('../controllers/profileController');

const router = express.Router();

router.post('/analyze', analyzeProfile);
router.get('/', getProfiles);
router.get('/:username', getProfileByUsername);

module.exports = router;
