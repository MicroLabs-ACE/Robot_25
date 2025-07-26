const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory storage (replace with database in production)
let orders = [];
let currentTableNumber = "";

// Validation middleware
const validateOrder = (req, res, next) => {
  const { tableNumber, items, combos } = req.body;
  
  if (!tableNumber) {
    return res.status(400).json({ error: "Table number is required." });
  }
  
  if ((!items || items.length === 0) && (!combos || combos.length === 0)) {
    return res.status(400).json({ error: "At least one item or combo is required." });
  }
  
  next();
};

// POST endpoint for placing orders
app.post("/api/order", validateOrder, (req, res) => {
  try {
    const { tableNumber, items = [], combos = [], notes = "" } = req.body;
    
    const order = {
      id: Date.now().toString(),
      tableNumber: String(tableNumber),
      items,
      combos,
      notes,
      status: "pending",
      createdAt: new Date().toISOString(),
      total: calculateTotal(items, combos)
    };
    
    orders.push(order);
    currentTableNumber = order.tableNumber;
    
    console.log(`Order received for table ${tableNumber}:`, {
      items: items.length,
      combos: combos.length,
      total: order.total
    });
    
    res.status(201).json({ 
      message: `Order for table ${tableNumber} received.`,
      orderId: order.id,
      total: order.total
    });
    
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET endpoint for fetching table number (for Arduino)
app.get("/api/table", (req, res) => {
  try {
    console.log(`Arduino fetched table number: ${currentTableNumber}`);
    res.status(200).json({ tableNumber: currentTableNumber });
  } catch (error) {
    console.error("Error fetching table number:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET endpoint for fetching all orders (for chef dashboard)
app.get("/api/orders", (req, res) => {
  try {
    const { status } = req.query;
    let filteredOrders = orders;
    
    if (status) {
      filteredOrders = orders.filter(order => order.status === status);
    }
    
    res.status(200).json({ orders: filteredOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT endpoint for updating order status (for chef dashboard)
app.put("/api/orders/:orderId/status", (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    const order = orders.find(o => o.id === orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    
    order.status = status;
    order.updatedAt = new Date().toISOString();
    
    console.log(`Order ${orderId} status updated to: ${status}`);
    
    res.status(200).json({ 
      message: `Order status updated to ${status}`,
      order 
    });
    
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE endpoint for clearing orders (for testing)
app.delete("/api/orders", (req, res) => {
  try {
    orders = [];
    currentTableNumber = "";
    console.log("All orders cleared");
    res.status(200).json({ message: "All orders cleared." });
  } catch (error) {
    console.error("Error clearing orders:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Helper function to calculate order total
function calculateTotal(items = [], combos = []) {
  const menuItems = {
    'rice-meat': 3000,
    'jollof-chicken': 4000,
    'jollof-big-chicken': 5000,
    'coke': 600,
    'water': 300,
    'moi-moi': 1000
  };
  
  const comboMeals = {
    'combo-1': 3400,
    'combo-2': 4100,
    'combo-3': 5500,
    'combo-4': 3700,
    'combo-5': 4700
  };
  
  let total = 0;
  
  // Calculate items total
  items.forEach(item => {
    const price = menuItems[item.id] || 0;
    total += price * (item.quantity || 1);
  });
  
  // Calculate combos total
  combos.forEach(combo => {
    const price = comboMeals[combo.id] || 0;
    total += price * (combo.quantity || 1);
  });
  
  return total;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    ordersCount: orders.length
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Health check: http://localhost:${port}/api/health`);
});