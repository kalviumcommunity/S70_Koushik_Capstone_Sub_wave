import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  { q: 'How do I reset my password?', a: 'Go to settings and click on "Change Password".' },
  { q: 'How do I cancel my subscription?', a: 'Go to Subscriptions, select the subscription, and click "Delete".' },
  { q: 'What payment methods do you accept?', a: 'We accept credit/debit cards and Google Pay.' },
];

const HelpSupport = () => {
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setQuestion('');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Help & Support</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
          <ul className="space-y-4">
            {faqs.map((faq, idx) => (
              <li key={idx}>
                <p className="font-medium">{faq.q}</p>
                <p className="text-gray-500 text-sm">{faq.a}</p>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="input-field w-full h-24"
              placeholder="How can we help you?"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              required
            />
            <button type="submit" className="button-primary w-full">Submit</button>
            {submitted && <p className="text-green-600 mt-2">Your question has been submitted!</p>}
          </form>
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>User Guides</li>
              <li>Billing & Payments</li>
              <li>Bug & Updates</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpSupport; 