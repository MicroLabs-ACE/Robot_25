import { useCallback } from "react";
import {
  ref,
  set,
  push,
  onValue,
  update,
  get,
  DatabaseReference,
} from "firebase/database";
import { database } from "../firebase/config";

interface OrderData {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    isCombo: boolean;
  }>;
  tableNumber: string;
  totalAmount: number;
  status: string;
  timestamp: string;
}

interface Order extends OrderData {
  id: string;
}

// Define valid chef access keys
const VALID_CHEF_KEYS = {
  "CHEF-2025-001": "Head Chef",
  "CHEF-2025-002": "Sous Chef",
  "CHEF-2025-003": "Line Chef",
};

export const useFirebase = () => {
  // Chef key verification
  const verifyChefKey = useCallback(async (key: string) => {
    try {
      return key in VALID_CHEF_KEYS;
    } catch (error) {
      console.error("Error verifying chef key:", error);
      return false;
    }
  }, []);

  // Place a new order
  const placeOrder = useCallback(async (orderData: OrderData) => {
    try {
      // First, try to send to backend server
      const backendResponse = await fetch("http://localhost:3001/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableNumber: orderData.tableNumber,
          items: orderData.items
            .filter((item) => !item.isCombo)
            .map((item) => ({
              id: item.id,
              quantity: item.quantity,
            })),
          combos: orderData.items
            .filter((item) => item.isCombo)
            .map((item) => ({
              id: item.id,
              quantity: item.quantity,
            })),
          notes: "", // You can add a notes field to your order form if needed
        }),
      });

      if (!backendResponse.ok) {
        throw new Error(`Backend server error: ${backendResponse.status}`);
      }

      const backendResult = await backendResponse.json();
      console.log("Order sent to backend:", backendResult);

      // Also save to Firebase as backup
      const ordersRef = ref(database, "orders");
      const newOrderRef = push(ordersRef);
      await set(newOrderRef, orderData);

      return newOrderRef.key;
    } catch (error) {
      console.error("Error placing order:", error);

      // If backend fails, try Firebase only
      try {
        console.log("Backend failed, using Firebase fallback");
        const ordersRef = ref(database, "orders");
        const newOrderRef = push(ordersRef);
        await set(newOrderRef, orderData);
        return newOrderRef.key;
      } catch (firebaseError) {
        console.error("Firebase fallback also failed:", firebaseError);
        throw error; // Throw the original error
      }
    }
  }, []);

  // Listen to orders
  const listenToOrders = useCallback((callback: (orders: Order[]) => void) => {
    const ordersRef = ref(database, "orders");

    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const orders: Order[] = [];
      snapshot.forEach((childSnapshot) => {
        const order = childSnapshot.val() as OrderData;
        orders.push({
          ...order,
          id: childSnapshot.key as string,
        });
      });

      // Sort by timestamp, newest first
      orders.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      callback(orders);
    });

    return unsubscribe;
  }, []);

  // Update order status
  const updateOrderStatus = useCallback(
    async (orderId: string, status: string) => {
      try {
        const orderRef = ref(database, `orders/${orderId}`);
        await update(orderRef, { status });
      } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
      }
    },
    []
  );

  // Send robot to table
  const sendRobotToTable = useCallback(async (tableNumber: string) => {
    try {
      const robotCommandRef = ref(database, "robotCommands");
      await set(robotCommandRef, {
        destination: tableNumber,
        timestamp: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error("Error sending robot command:", error);
      throw error;
    }
  }, []);

  return {
    verifyChefKey,
    placeOrder,
    listenToOrders,
    updateOrderStatus,
    sendRobotToTable,
  };
};
