const bookRoutes = require('./books');

module.exports = (app, apiRoutes) => {
    apiRoutes.get('/health', (req, res) => res.json({ status: 'success' }));

    apiRoutes.use('/books', bookRoutes);
};