const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(express.json());
app.use(cors());

let currentTableNumber = "";

//  a POST request to http://<your_server_ip>:3000/order
app.post("/api/order", (req, res) => {
  try {
    const { tableNumber } = req.body;

    if (tableNumber) {
      currentTableNumber = String(tableNumber);
      console.log(`Received order for table: ${currentTableNumber}`);
      res
        .status(200)
        .json({ message: `Order for table ${currentTableNumber} received.` });
    } else {
      res.status(400).json({ error: "Table number is required." });
    }
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// e.g., a GET request to http://<your_server_ip>:3000/get-table-number
app.get("/api/table", (req, res) => {
  try {
    console.log(`Arduino fetched table number: ${currentTableNumber}`);
    res.status(200).json({ tableNumber: currentTableNumber });
  } catch (error) {
    console.error("Error fetching table number:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
