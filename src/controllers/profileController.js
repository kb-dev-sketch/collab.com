const profileService = require('../services/profileService');

async function analyzeProfile(req, res, next) {
  try {
    const { username } = req.body;

    if (!username || typeof username !== 'string' || !username.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Username is required'
      });
    }

    const profile = await profileService.analyzeAndSaveProfile(username.trim());

    res.status(201).json({
      success: true,
      message: 'Profile analyzed successfully',
      data: profile
    });
  } catch (error) {
    next(error);
  }
}

async function getProfiles(req, res, next) {
  try {
    const profiles = await profileService.getAllProfiles();

    res.json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    next(error);
  }
}

async function getProfileByUsername(req, res, next) {
  try {
    const profile = await profileService.getProfileByUsername(req.params.username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  analyzeProfile,
  getProfiles,
  getProfileByUsername
};
