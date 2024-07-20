import express from "express";
import cors from "cors";
import Chance from "chance";

const PORT: number = 8080;

// Initialize the express app
const app = express();
app.use(cors());
app.use(express.json()); // json body parser

// Make some animals
const chance = new Chance();

// JS doesn't have range by default, so...
const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  };
});

app.get('/', (req, res) => {
  res.send("Welcome to Starboy Farms Inc.")
})

// GET endpoint to search for animals
app.get('/animals', (req, res) => {
  const q = req.query.q?.toLowerCase().trim() || '';
  const results = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q)
  );

  res.send(results);
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/animals/`)
);


// Query example... http://localhost:8080/animals/?q=horse

// npm run build ; node .
