const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');
const auth = require('../middleware/auth');

router.get('/', problemController.getProblems);
router.get('/progress', auth, problemController.getUserProgress);
router.post('/toggle', auth, problemController.toggleProblemCompletion);

module.exports = router;
