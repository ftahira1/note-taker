// TODO: Import router
const router = require('express').Router();

// TODO: Import modules for tips/feedback
const notesRoutes = require('./notes');

// TODO: Use our routes
router.use('/api', notesRoutes);
// TODO: Export router
module.exports = router;
