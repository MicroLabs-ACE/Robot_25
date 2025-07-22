import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  Send, 
  LogOut,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFirebase } from '../hooks/useFirebase';
import { formatCurrency } from '../utils/formatCurrency';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isCombo: boolean;
}

interface Order {
  id: string;
  items: OrderItem[];
  tableNumber: string;
  totalAmount: number;
  status: 'pending' | 'preparing' | 'delivered';
  timestamp: string;
}

const ChefDashboardPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'preparing' | 'delivered'>('pending');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isRobotSending, setIsRobotSending] = useState(false);
  const { isChef, setIsChef } = useAuth();
  const { listenToOrders, updateOrderStatus, sendRobotToTable } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    const chefKey = localStorage.getItem('chefKey');
    if (!chefKey) {
      navigate('/chef/login');
      return;
    }

    // Setup orders listener
    const unsubscribe = listenToOrders((newOrders) => {
      // Ensure status is typed correctly
      const mappedOrders = newOrders.map(order => ({
        ...order,
        status: order.status as 'pending' | 'preparing' | 'delivered'
      }));
      setOrders(mappedOrders);
    });

    return () => {
      unsubscribe();
    };
  }, [listenToOrders, navigate]);

  const handleUpdateStatus = async (orderId: string, newStatus: 'pending' | 'preparing' | 'delivered') => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const handleSendRobot = async (tableNumber: string) => {
    if (!selectedOrder) return;
    
    setIsRobotSending(true);
    
    try {
      await sendRobotToTable(tableNumber);
      toast.success(`Robot dispatched to Table ${tableNumber}`);
      
      // After sending the robot, automatically update order status to delivered
      await updateOrderStatus(selectedOrder.id, 'delivered');
      
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error sending robot:', error);
      toast.error('Failed to send robot');
    } finally {
      setIsRobotSending(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('chefKey');
    setIsChef(false);
    navigate('/chef/login');
    toast.success('Logged out successfully');
  };

  const filteredOrders = orders.filter(order => order.status === activeTab);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-NG', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      day: 'numeric',
      month: 'short'
    });
  };

  // Redirect if not a chef
  if (!isChef) {
    navigate('/chef/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Chef Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage orders and control robot delivery
          </p>
        </div>
        <button 
          onClick={handleLogout}
          className="mt-4 md:mt-0 btn btn-outline flex items-center"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
      
      {/* Order Status Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center py-3 px-4 font-medium transition-colors border-b-2 ${
            activeTab === 'pending'
              ? 'border-orange-500 text-orange-500'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <Clock size={18} className="mr-2" />
          Pending
          <span className="ml-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 text-xs font-semibold px-2 py-1 rounded-full">
            {orders.filter(order => order.status === 'pending').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('preparing')}
          className={`flex items-center py-3 px-4 font-medium transition-colors border-b-2 ${
            activeTab === 'preparing'
              ? 'border-orange-500 text-orange-500'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <ClipboardList size={18} className="mr-2" />
          Preparing
          <span className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs font-semibold px-2 py-1 rounded-full">
            {orders.filter(order => order.status === 'preparing').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('delivered')}
          className={`flex items-center py-3 px-4 font-medium transition-colors border-b-2 ${
            activeTab === 'delivered'
              ? 'border-orange-500 text-orange-500'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <CheckCircle size={18} className="mr-2" />
          Delivered
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-2">
          {filteredOrders.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No {activeTab} orders</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {activeTab === 'pending' 
                  ? 'When customers place new orders, they will appear here.' 
                  : activeTab === 'preparing' 
                    ? 'Orders being prepared will appear here.' 
                    : 'Completed orders will be listed here.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div 
                  key={order.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg ${
                    selectedOrder?.id === order.id ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white mr-3">
                          Table {order.tableNumber}
                        </span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full order-status-${order.status}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(order.timestamp)}
                      </p>
                    </div>
                    <div className="text-lg font-bold text-orange-500">
                      {formatCurrency(order.totalAmount)}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div className="text-gray-700 dark:text-gray-300">
                          {item.quantity}x {item.name} {item.isCombo && <span className="text-xs text-orange-500">(Combo)</span>}
                        </div>
                        <div className="text-gray-700 dark:text-gray-300">{formatCurrency(item.price * item.quantity)}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {order.status === 'pending' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateStatus(order.id, 'preparing');
                        }}
                        className="btn btn-primary py-1.5 px-3 text-sm"
                      >
                        Start Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        className="btn btn-primary py-1.5 px-3 text-sm"
                      >
                        Send Robot
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Robot Control Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Robot Control Panel</h2>
          
          {!selectedOrder ? (
            <div className="text-center py-8">
              <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={24} className="text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Select a prepared order to send the robot
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="font-medium text-gray-900 dark:text-white mb-1">
                  Preparing order for Table {selectedOrder.tableNumber}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total: {formatCurrency(selectedOrder.totalAmount)}
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                  Send robot to Table {selectedOrder.tableNumber}
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((table) => (
                    <button
                      key={table}
                      onClick={() => handleSendRobot(table)}
                      disabled={isRobotSending}
                      className={`h-12 rounded-md font-bold 
                        ${table === selectedOrder.tableNumber 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        } transition-colors`}
                    >
                      {table}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="btn btn-outline flex-1 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSendRobot(selectedOrder.tableNumber)}
                  disabled={isRobotSending}
                  className="btn btn-primary flex-1 py-2 flex items-center justify-center"
                >
                  <Send size={16} className="mr-2" />
                  {isRobotSending ? 'Sending...' : 'Send Robot'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChefDashboardPage;