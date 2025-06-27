import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RiUserAddLine, RiUserLine, RiUserSettingsLine, RiUserSharedLine } from 'react-icons/ri';
import { subscriptionAPI } from '../services/api';
import toast from 'react-hot-toast';

const roleColors = {
  Owner: 'bg-blue-500',
  Admin: 'bg-green-500',
  Member: 'bg-gray-400',
};

const SubscriptionSharing = () => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');
  const [shared, setShared] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);

  useEffect(() => {
    const fetchShared = async () => {
      try {
        const subs = await subscriptionAPI.getAll();
        setShared(subs.data.filter(sub => sub.collaborators && sub.collaborators.length > 0));
      } catch {
        setShared([]);
      }
    };
    fetchShared();
  }, []);

  const handleInvite = async (subId) => {
    try {
      await subscriptionAPI.inviteCollaborator({ subscriptionId: subId, email: inviteEmail, role: inviteRole });
      toast.success('Collaborator invited!');
      setInviteEmail('');
      setInviteRole('Member');
    } catch {
      toast.error('Failed to invite collaborator');
    }
  };

  const handleShowLogs = async (subId) => {
    setSelectedSub(subId);
    try {
      const res = await subscriptionAPI.getActivityLogs(subId);
      setActivityLogs(res.data);
    } catch {
      setActivityLogs([]);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Subscription Sharing</h1>
      <div className="space-y-8">
        {shared.map((sub) => (
          <motion.div
            key={sub._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <RiUserSharedLine /> {sub.name}
            </h2>
            <div className="flex flex-wrap gap-4 mb-4">
              {sub.collaborators.map((member) => (
                <div
                  key={member.user}
                  className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2"
                >
                  <RiUserLine className="text-xl text-gray-500" />
                  <div>
                    <p className="font-medium">{member.user}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                  <span
                    className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${roleColors[member.role]}`}
                  >
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                className="input-field"
              />
              <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} className="input-field">
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
              <button
                onClick={() => handleInvite(sub._id)}
                className="button-primary flex items-center gap-1"
              >
                <RiUserAddLine /> Invite
              </button>
              <button
                onClick={() => handleShowLogs(sub._id)}
                className="button-primary flex items-center gap-1"
              >
                <RiUserSettingsLine /> Activity Logs
              </button>
            </div>
            {selectedSub === sub._id && activityLogs.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Activity Logs</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {activityLogs.map((log, idx) => (
                    <li key={idx}>{log.date ? new Date(log.date).toLocaleString() : ''} - {log.action} - {log.details}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionSharing; 