const { Foundation } = require("@mui/icons-material");
const db = require("./client");

const getTransactTable = async () => {
  try {
    const { rows } = await db.query(`
          SELECT * FROM admin_transact;
          `);
    return rows;
  } catch (err) {
    throw err;
  }
};

const updateTable = async (stripe_id, productname, price, quantity) => {
    try {
        // Calculate subtotal
        const subtotal = price * quantity;

        // Query to search for product details
        const searchQuery = `SELECT id, stock, type FROM concat_table WHERE productname = $1`;

        // Execute the search query
        const searchResult = await db.query(searchQuery, [productname]);
        const {stock, type } = searchResult.rows[0];

        // Construct INSERT query for admin_transact table
        const insertQuery = `INSERT INTO admin_transact (name, price, stock, type, quantity, subtotal) VALUES ($1, $2, $3, $4, $5, $6)`;

        // Execute the INSERT query
        await db.query(insertQuery, [productname, price, stock, type, quantity, subtotal]);

        console.log('Admin transaction table updated successfully.');
    } catch (error) {
        console.error('Error in updateTable function:', error);
        throw error; // Propagate the error back to the caller
    }
};


module.exports = {
    getTransactTable, 
    updateTable,
};

// console.log('hjello')

// getTransactTable()
//   .then(rows => {
//     console.log("Fetched rows:", rows);
//   })
//   .catch(err => {
//     console.error("Error in .then()/.catch():", err);
//   });