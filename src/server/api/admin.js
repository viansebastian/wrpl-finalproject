const express = require("express");
const adminsRouter = express.Router();

const {
  getTransactTable, 
  updateTable
} = require("../db/admin");

// GET - /api/admins - get all video admins
adminsRouter.get("/transact", async (req, res, next) => {
  try {
    const transacts = await getTransactTable();
    res.send(transacts);
  } catch (error) {
    next(error);
  }
});

adminsRouter.post("/update", async (req, res, next) => {
    try {
        // Extract required parameters from req.body
        const { stripe_id, productname, price, quantity } = req.body;

        // Call updateTable function with extracted parameters
        await updateTable(stripe_id, productname, price, quantity);

        // Send success response
        res.status(200).json({ message: 'Table updated successfully.' });
    } catch (error) {
        // Pass error to Express error handler middleware
        next(error);
    }
});



module.exports = adminsRouter;