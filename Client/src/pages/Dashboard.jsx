import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { RiWalletLine, RiFileListLine, RiTimeLine } from 'react-icons/ri';
import { fetchSubscriptionsStart, fetchSubscriptionsSuccess, fetchSubscriptionsFailure } from '../features/subscriptions/subscriptionSlice';
import { subscriptionAPI } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="text-2xl text-white" />
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { subscriptions, isLoading } = useSelector((state) => state.subscriptions);
  const [monthly, setMonthly] = useState({});
  const [category, setCategory] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchSubscriptionsStart());
      try {
        const response = await subscriptionAPI.getAll();
        dispatch(fetchSubscriptionsSuccess(response.data));
      } catch (error) {
        dispatch(fetchSubscriptionsFailure(error.message));
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [m, c, s] = await Promise.all([
          subscriptionAPI.getMonthlyAnalytics(),
          subscriptionAPI.getCategoryAnalytics(),
          subscriptionAPI.getBudgetSuggestions()
        ]);
        setMonthly(m.data);
        setCategory(c.data);
        setSuggestions(s.data.suggestions);
      } catch {}
    };
    fetchAnalytics();
  }, []);

  const totalMonthlySpending = subscriptions.reduce(
    (total, sub) => total + sub.amount,
    0
  );

  const upcomingRenewals = subscriptions
    .filter((sub) => {
      const renewalDate = new Date(sub.nextRenewal);
      const today = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);
      return renewalDate >= today && renewalDate <= sevenDaysFromNow;
    })
    .sort((a, b) => new Date(a.nextRenewal) - new Date(b.nextRenewal));

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Spending',
        data: [300, 450, 380, 420, 400, totalMonthlySpending],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Spending Trend',
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="button-primary"
        >
          Add Subscription
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Subscriptions"
          value={subscriptions.length}
          icon={RiFileListLine}
          color="bg-blue-500"
        />
        <StatCard
          title="Monthly Spending"
          value={`$${totalMonthlySpending.toFixed(2)}`}
          icon={RiWalletLine}
          color="bg-green-500"
        />
        <StatCard
          title="Upcoming Renewals"
          value={upcomingRenewals.length}
          icon={RiTimeLine}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Spending Overview</h2>
          <Line data={chartData} options={chartOptions} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Upcoming Renewals</h2>
          <div className="space-y-4">
            {upcomingRenewals.map((sub) => (
              <div
                key={sub._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={sub.icon || '/default-icon.png'}
                    alt={sub.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{sub.name}</p>
                    <p className="text-sm text-gray-500">
                      Renews on {new Date(sub.nextRenewal).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">${sub.amount}</p>
              </div>
            ))}
            {upcomingRenewals.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No upcoming renewals in the next 7 days
              </p>
            )}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Monthly Spending</h3>
          <Bar
            data={{
              labels: Object.keys(monthly),
              datasets: [
                {
                  label: 'Spending ($)',
                  data: Object.values(monthly),
                  backgroundColor: '#fbbf24',
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Category Breakdown</h3>
          <Pie
            data={{
              labels: Object.keys(category),
              datasets: [
                {
                  data: Object.values(category),
                  backgroundColor: [
                    '#fbbf24', '#60a5fa', '#34d399', '#f87171', '#a78bfa', '#f472b6', '#facc15', '#38bdf8', '#818cf8', '#f59e42'
                  ],
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
          />
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl mt-8">
          <h3 className="font-semibold mb-2 text-yellow-700">AI Budgeting Suggestions</h3>
          <ul className="list-disc pl-6 text-yellow-800">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 