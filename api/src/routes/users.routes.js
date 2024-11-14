export default router => {
	router.get('/', (req, res) => {
		res.json({ message: 'Users route' });
	});

	return router;
};
