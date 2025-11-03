// index.js
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from DevOps Demo' });
});

// Check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

export default app;