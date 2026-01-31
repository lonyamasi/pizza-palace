require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/health", (req, res) => {
//   res.send("Pizza Palace API running");
// });

// Get all pizza sizes
app.get("/api/sizes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pizza_sizes");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching sizes");
  }
});

// Get all toppings
app.get("/api/toppings", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM toppings");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching toppings");
  }
});

// Preview order totals
app.post("/api/orders/preview", async (req, res) => {
  const orderItems = req.body;

  try {
    let subtotal = 0;

    for (const item of orderItems) {
      const { size, toppings, quantity } = item;

      const sizeResult = await pool.query(
        "SELECT base_price FROM pizza_sizes WHERE name = $1",
        [size]
      );
      if (sizeResult.rows.length === 0) throw new Error(`Invalid size: ${size}`);
      let price = parseFloat(sizeResult.rows[0].base_price);

      const toppingResult = await pool.query(
        `SELECT name, ${size.toLowerCase()}_price AS price FROM toppings WHERE name = ANY($1)`,
        [toppings]
      );

      const toppingPrices = toppingResult.rows.map(t => parseFloat(t.price));
      price += toppingPrices.reduce((a, b) => a + b, 0);

      subtotal += price * quantity;
    }

    const gst = Math.ceil(subtotal * 0.05 * 100) / 100;
    const total = parseFloat((subtotal + gst).toFixed(2));

    res.json({
      subtotal: parseFloat(subtotal.toFixed(2)),
      gst: parseFloat(gst.toFixed(2)),
      total
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error calculating preview");
  }
});

// Create a new order (with DB insert)
app.post("/api/orders", async (req, res) => {
  const orderItems = req.body;

  try {
    let subtotal = 0;
    const itemDetails = [];

    for (const item of orderItems) {
      const { size, toppings, quantity } = item;

      const sizeResult = await pool.query(
        "SELECT base_price FROM pizza_sizes WHERE name = $1",
        [size]
      );
      if (sizeResult.rows.length === 0) throw new Error(`Invalid size: ${size}`);
      let price = parseFloat(sizeResult.rows[0].base_price);

      const toppingResult = await pool.query(
        `SELECT name, ${size.toLowerCase()}_price AS price FROM toppings WHERE name = ANY($1)`,
        [toppings]
      );

      const toppingPrices = toppingResult.rows.map(t => parseFloat(t.price));
      const toppingNames = toppingResult.rows.map(t => t.name);
      price += toppingPrices.reduce((a, b) => a + b, 0);

      const itemTotal = price * quantity;
      subtotal += itemTotal;

      itemDetails.push({
        description: `${quantity} ${size}, ${toppingNames.length} Topping Pizza - ${toppingNames.join(" and ")}`,
        price: parseFloat(itemTotal.toFixed(2)),
        size,
        toppings: toppingNames,
        quantity
      });
    }

    const gst = Math.ceil(subtotal * 0.05 * 100) / 100;
    const total = parseFloat((subtotal + gst).toFixed(2));

    const orderInsert = await pool.query(
      "INSERT INTO orders (subtotal, gst, total) VALUES ($1, $2, $3) RETURNING id",
      [subtotal, gst, total]
    );
    const orderId = orderInsert.rows[0].id;

    for (const item of itemDetails) {
      await pool.query(
        "INSERT INTO order_items (order_id, size, toppings, price, quantity) VALUES ($1, $2, $3, $4, $5)",
        [orderId, item.size, item.toppings, item.price, item.quantity]
      );
    }

    res.json({
      items: itemDetails,
      subtotal: parseFloat(subtotal.toFixed(2)),
      gst: parseFloat(gst.toFixed(2)),
      total
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing order");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});