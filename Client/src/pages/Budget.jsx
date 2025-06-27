import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { RiWalletLine, RiPieChartLine, RiArrowUpLine, RiArrowDownLine, RiEdit2Line, RiCheckLine, RiCloseLine } from 'react-icons/ri';
// import { budgetAPI } from '../services/api';
import toast from 'react-hot-toast';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const categoryIcons = {
  Streaming: <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">Streaming</span>,
  Productivity: <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Productivity</span>,
  Finance: <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">Finance</span>,
  Entertainment: <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs">Entertainment</span>,
  Other: <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">Other</span>,
};

const BudgetOverview = ({ totalBudget, totalSpent, categories, onEditBudget }) => {
  const percent = Math.min(100, Math.round((totalSpent / totalBudget) * 100));
  const doughnutData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const doughnutOptions = {
    plugins: { legend: { position: 'bottom' } },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-morphism p-8 rounded-2xl shadow-2xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Budget Overview</h2>
        <button onClick={onEditBudget} className="flex items-center gap-1 text-blue-600 hover:underline">
          <RiEdit2Line /> Set Budget
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/60 rounded-lg">
            <div>
              <p className="text-gray-500">Total Budget</p>
              <p className="text-2xl font-bold">${totalBudget}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <RiWalletLine className="text-2xl text-blue-600" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/60 rounded-lg">
            <div>
              <p className="text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold">${totalSpent}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <RiPieChartLine className="text-2xl text-green-600" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/60 rounded-lg">
            <div>
              <p className="text-gray-500">Remaining</p>
              <p className="text-2xl font-bold">${totalBudget - totalSpent}</p>
            </div>
            <div className={`p-3 rounded-full ${totalBudget - totalSpent > 0 ? 'bg-green-100' : 'bg-red-100'}`}> 
              {totalBudget - totalSpent > 0 ? (
                <RiArrowUpLine className="text-2xl text-green-600" />
              ) : (
                <RiArrowDownLine className="text-2xl text-red-600" />
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-3 rounded-full ${percent < 80 ? 'bg-green-400' : percent < 100 ? 'bg-yellow-400' : 'bg-red-500'}`}
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>{percent}% used</span>
              <span>{100 - percent}% left</span>
            </div>
          </div>
        </div>
        <div className="h-64">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {Object.keys(categories).map((cat) => (
          <span key={cat}>{categoryIcons[cat] || cat}</span>
        ))}
      </div>
    </motion.div>
  );
};

const RecentActivity = ({ activity }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl p-6 shadow-sm"
  >
    <h3 className="font-semibold mb-4">Recent Activity</h3>
    <ul className="divide-y divide-gray-200">
      {activity.map((item, idx) => (
        <li key={idx} className="py-2 flex justify-between items-center">
          <span>{item.desc}</span>
          <span className="text-xs text-gray-500">{item.date}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const Budget = () => {
  const [budgetData, setBudgetData] = useState({
    totalBudget: 1000,
    totalSpent: 750,
    categories: {
      Streaming: 250,
      Productivity: 200,
      Finance: 150,
      Entertainment: 100,
      Other: 50,
    },
    monthlyData: [
      { month: 'Jan', amount: 680 },
      { month: 'Feb', amount: 720 },
      { month: 'Mar', amount: 750 },
      { month: 'Apr', amount: 690 },
      { month: 'May', amount: 710 },
      { month: 'Jun', amount: 750 },
    ],
    activity: [
      { desc: 'Added Netflix subscription', date: '2024-06-01' },
      { desc: 'Updated budget to $1000', date: '2024-05-28' },
      { desc: 'Removed Disney+ subscription', date: '2024-05-20' },
      { desc: 'Added Spotify subscription', date: '2024-05-15' },
      { desc: 'Set Entertainment category to $100', date: '2024-05-10' },
    ],
    suggestions: [
      'Your total subscription spending exceeds $100. Consider canceling unused services.',
      'You have more than 2 streaming subscriptions. Consider consolidating.',
    ],
  });
  const [showModal, setShowModal] = useState(false);
  const [newBudget, setNewBudget] = useState(budgetData.totalBudget);
  const handleEditBudget = () => setShowModal(true);
  const handleSaveBudget = () => {
    setBudgetData((prev) => ({ ...prev, totalBudget: Number(newBudget) }));
    setShowModal(false);
    toast.success('Budget updated!');
  };
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Budget Tracking</h1>
      </div>
      <BudgetOverview
        totalBudget={budgetData.totalBudget}
        totalSpent={budgetData.totalSpent}
        categories={budgetData.categories}
        onEditBudget={handleEditBudget}
      />
      <RecentActivity activity={budgetData.activity} />
      {budgetData.suggestions && budgetData.suggestions.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl mt-8">
          <h3 className="font-semibold mb-2 text-yellow-700">AI Budgeting Suggestions</h3>
          <ul className="list-disc pl-6 text-yellow-800">
            {budgetData.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-8 shadow-xl w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">Set Your Budget</h2>
              <input
                type="number"
                min={0}
                value={newBudget}
                onChange={e => setNewBudget(e.target.value)}
                className="input-field w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  <RiCloseLine /> Cancel
                </button>
                <button
                  onClick={handleSaveBudget}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
                >
                  <RiCheckLine /> Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Budget; 