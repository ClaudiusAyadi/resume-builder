export default router => {
	// Catch-all route for 404s
	router.all('*', (req, res) => {
		const code = 404;
		res.status(code).json({
			status: code,
			success: false,
			message: `4️⃣0️⃣4️⃣  - ${req.originalUrl} not found!`,
		});
	});

	return router;
};
