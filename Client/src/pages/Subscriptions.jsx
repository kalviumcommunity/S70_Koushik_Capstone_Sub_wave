import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import {
  RiAddLine,
  RiSearchLine,
  RiFilterLine,
  RiEditLine,
  RiDeleteBinLine,
  RiShareLine,
  RiUpload2Line,
  RiFile2Line
} from 'react-icons/ri';
import { deleteSubscription } from '../features/subscriptions/subscriptionSlice';
import { subscriptionAPI } from '../services/api';
import toast from 'react-hot-toast';

const SubscriptionCard = ({ subscription, onEdit, onDelete, onShare }) => {
  const [files, setFiles] = useState([]);
  const [showFiles, setShowFiles] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    try {
      const res = await subscriptionAPI.getFiles(subscription._id);
      setFiles(res.data);
      setShowFiles(true);
    } catch {
      toast.error('Failed to fetch files');
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subscriptionId', subscription._id);
    try {
      await subscriptionAPI.uploadFile(formData);
      toast.success('File uploaded');
      fetchFiles();
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={subscription.icon || '/default-icon.png'}
            alt={subscription.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-lg">{subscription.name}</h3>
            <p className="text-gray-500">{subscription.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onShare(subscription)}
            className="p-2 text-gray-500 hover:text-primary-600 rounded-full hover:bg-gray-100"
          >
            <RiShareLine />
          </button>
          <button
            onClick={() => onEdit(subscription)}
            className="p-2 text-gray-500 hover:text-primary-600 rounded-full hover:bg-gray-100"
          >
            <RiEditLine />
          </button>
          <button
            onClick={() => onDelete(subscription)}
            className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
          >
            <RiDeleteBinLine />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Next Renewal</p>
          <p className="font-medium">
            {new Date(subscription.nextRenewal).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Monthly Cost</p>
          <p className="font-bold text-lg">${subscription.amount}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <label className="flex items-center gap-1 cursor-pointer">
          <RiUpload2Line />
          <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
          <span className="text-sm">Upload Invoice/Receipt</span>
        </label>
        <button onClick={fetchFiles} className="flex items-center gap-1 text-blue-600 text-sm">
          <RiFile2Line /> View Files
        </button>
      </div>
      {showFiles && files.length > 0 && (
        <div className="mt-2 bg-gray-50 rounded p-2">
          <div className="font-semibold mb-1 text-gray-700">Files:</div>
          <ul className="space-y-1">
            {files.map((file, idx) => (
              <li key={idx}>
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  {file.filename}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {subscription.shared && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-500">Shared with</p>
          <div className="flex items-center space-x-2 mt-2">
            {subscription.sharedWith.map((user) => (
              <img
                key={user._id}
                src={user.avatar || '/default-avatar.png'}
                alt={user.name}
                className="w-8 h-8 rounded-full"
                title={user.name}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Subscriptions = () => {
  const dispatch = useDispatch();
  const { subscriptions, filters } = useSelector((state) => state.subscriptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleDelete = async (subscription) => {
    try {
      await subscriptionAPI.delete(subscription._id);
      dispatch(deleteSubscription(subscription._id));
      toast.success('Subscription deleted successfully');
    } catch (error) {
      toast.error('Failed to delete subscription');
    }
  };

  const handleEdit = (subscription) => {
    // Implement edit functionality
    toast.error('Edit functionality coming soon!');
  };

  const handleShare = (subscription) => {
    // Implement share functionality
    toast.error('Share functionality coming soon!');
  };

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || sub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Subscriptions</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="button-primary flex items-center space-x-2"
        >
          <RiAddLine />
          <span>Add New</span>
        </motion.button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <RiFilterLine className="text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            <option value="all">All Categories</option>
            <option value="streaming">Streaming</option>
            <option value="productivity">Productivity</option>
            <option value="finance">Finance</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredSubscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription._id}
              subscription={subscription}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onShare={handleShare}
            />
          ))}
        </AnimatePresence>
        {filteredSubscriptions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-2 text-center py-12"
          >
            <p className="text-gray-500">No subscriptions found</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions; 