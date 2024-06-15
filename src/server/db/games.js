const db = require("./client");

//get all games - functional
const getAllGames = async () => {
  try {
    const { rows } = await db.query(`
          SELECT * FROM games;
          `);
    return rows;
  } catch (err) {
    throw err;
  }
};

//get videogame based on its id -  functional
async function getGameById(id) {

  try {
    console.log(id);
    const {
      rows: [games],
    } = await db.query(
      `
      SELECT * FROM games
      WHERE id = $1;
      `,
      [id]
    );
    return games;
  } catch (error) {
    throw error;
  }
}

async function getGameByStripeId(id) {

  try {
    console.log(id);
    const {
      rows: [games],
    } = await db.query(
      `
      SELECT * FROM games
      WHERE stripe_id = $1;
      `,
      [id]
    );
    console.log(games);
    return games;
  } catch (error) {
    throw error;
  }
}

//post a new game
const createGame = async ({
  stripeId,
  productName,
  genre,
  deliveryType,
  price,
  stock,
  condition,
  description,
  publisher,
  productImage,
  playerRange,
  esrbRating,
  featured
}) => {
  try {
    const query = `
      INSERT INTO games(stripe_id, productname, genre, delivery, price, stock, condition, description, publisher, productimage, playerrange, esrb, featured) 
      VALUES('${stripeId}', '${productName}', '${genre}', '${deliveryType}', ${price}, ${stock}, '${condition}', '${description}', '${publisher}', '${productImage}', '${playerRange}', '${esrbRating}', ${featured})
      RETURNING *;
    `;
    
    const { rows } = await db.query(query);

    return rows[0]; // Assuming you expect to insert one row and return it
  } catch (error) {
    throw new Error(`Error creating game: ${error.message}`);
  }
};


// Assuming you have imported your createGame function and have access to it
// Example of calling createGame function with sample data
// const exampleGameData = {
//   stripeId: 'STRIPE123',
//   productName: 'Sample Game',
//   genre: 'Adventure',
//   deliveryType: 'Download',
//   price: 49.99,
//   stock: 100,
//   condition: 'New',
//   description: 'This is a sample game description.',
//   publisher: 'Sample Publisher',
//   productImage: 'https://example.com/sample-game.jpg',
//   playerRange: 'Single Player',
//   esrbRating: 'E',
//   featured: true,
// };

// // Call createGame function with example data
// // createGame(exampleGameData)
// //   .then((createdGame) => {
// //     console.log('Game created:', createdGame);
// //     // Handle success
// //   })
// //   .catch((error) => {
// //     console.error('Error creating game:', error.message);
// //     // Handle error
// //   });




// const createGame = async (fields = {}) => {
//   const newFields = Object.fromEntries(
//     Object.entries(fields).map(([key, values]) => [key.toLowerCase(), values])
//   );
//   // build the set string
//   const insertString = Object.keys(newFields)
//     .map((key, index) => `$${index + 1}`)
//     .join(", ");

//   // return early if this is called without fields
//   if (insertString.length === 0) {
//     return;
//   }

//   try {
//     const {
//       rows: [game],
//     } = await db.query(
//       `
//         INSERT INTO games(stripe_id, productName, genre, delivery, price, stock, condition, description, publisher, productImage, playerRange, esrb, featured)
//         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
//         RETURNING *;`,
//       Object.values(fields)
//     );

//     return game;
//   } catch (err) {
//     throw err;
//   }
// };

async function updateGame(id, fields = {}) {
  /*
    This function was adapted from the function of same name from gamestore project
    This line of code creates a comma-separated string of key-value pairs
    in the format of `"key"=$index`, where key is a property name from
    the fields object (this is the request body that is passed as the second parameter in api/videogames.js),
    and $index represents a placeholder for a parameter, starting index from 1 and incrementing
    each key so that each following entry has an appropriate id
    */

  /*
   this helper function takes all the keys from the fields object (what the updated info is, basically) 
   and converts them to lowercase to avoid any SQL field naming issues.
   */
  const newFields = Object.fromEntries(
    Object.entries(fields).map(([key, values]) => [key.toLowerCase(), values])
  );
  const setString = Object.keys(newFields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  // above ultimately results in: (name, description, price, inStock, isPopular, imgUrl)

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    console.log(setString);
    console.log(id);
    const {
      rows: [game],
    } = await db.query(
      `
      UPDATE games
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `,
      //below is the same as if it was body.name, body.description, etc. but shorthand
      Object.values(fields)
    );
    return game;
  } catch (error) {
    throw error;
  }
}

async function deleteGame(id) {
  try {
    const {
      rows: [delVideoGame],
    } = await db.query(
      `
        DELETE FROM games
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );
    return delVideoGame;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createGame,
  getAllGames,
  getGameByStripeId,
  getGameById,
  updateGame,
  deleteGame,
};
