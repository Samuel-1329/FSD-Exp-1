// index.js

const express = require('express'); 

const app = express();
const port = 3000;

// Custom middleware function for logging requests
const requestLogger = (req, res, next) => {
	const timestamp = new Date().toISOString(); 
	console.log(`${timestamp} - ${req.method} ${req.url}`); 
	next(); // Pass control to the next middleware or route handler 
};

// Custom middleware for authentication 
const authenticateUser = (req, res, next) => {

// In a real app, this would involve checking tokens or sessions. 
	const authToken = req.headers.authorization;

	if (authToken === 'valid-token') {
		// User is authenticated, proceed to the next middleware or route handler. 
		next(); 
	} 
	else {
		// User is not authorized, end the request-response cycle. 
		res.status(401).send('Unauthorized');
	}
}

// Apply application-level middleware (runs for all requests) app.use(requestLogger); 
// Use authentication middleware for a specific route 
app.get('/secure-route', authenticateUser, (req, res) => {
	res.send('Welcome to the secure area!'); 
});

// Route handler without specific middleware 
app.get('/', (req, res) => {
	res.send('Hello from the main page!'); 
});

// Start the server 
app.listen(port, () => {
	console.log(`Server is running on port ${port}`); 
});