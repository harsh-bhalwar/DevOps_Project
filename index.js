// index.js
import app from './app.js';

const PORT = process.env.PORT || 3000;


// Run the server only if executed directly
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});


export default app;
