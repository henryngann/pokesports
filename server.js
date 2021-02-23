const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

app.use(cors());
//Defines type of data going into database.
const pokemonSchema = new mongoose.Schema({
  id: "number",
  name: String,
  type: Array,
  weight: "number",
  image: String,
});

const Pokemon = mongoose.model("pokemon", pokemonSchema);
//modelname is the collection inside the database automatically adds an s

mongoose.connect("mongodb://localhost:27017/pokesports", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {});
app.listen(4000, function () {
  console.log("server running");
  const squirtle = new Pokemon({ name: "fluffy" });
});

// app.get("/pokemon", async function (req, res) {
//   try {
//     for (let i = 1; i < 26; i++) {
//       let instance = axios.create({});
//       let apiUrl = `https://pokeapi.co/api/v2/pokemon/` + i;
//       let pokemonData = await instance.get(apiUrl);

//       let pokemon = new Pokemon({
//         id: pokemonData.data.id,
//         image: pokemonData.data.sprites.front_default,
//         weight: pokemonData.data.weight,
//         name: pokemonData.data.name,
//         type: pokemonData.data.types,
//       });
//       pokemon.save(function (error, result) {
//         if (error) return console.log(error);
//         console.log(result);
//       });
//       console.log(pokemon.data);
//     }

//     res.send("success");
//   } catch (error) {
//     console.log(error);
//   }
// });

app.get("/pokemon", async function (req, res) {
  let pokemons = Pokemon.find({}).exec(function (err, pokemon) {
    res.send(pokemon);
  });
});
