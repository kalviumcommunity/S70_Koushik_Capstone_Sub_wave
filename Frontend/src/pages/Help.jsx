import React, { useState } from 'react';

const Help = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'general', label: 'General', icon: '📋' },
    { id: 'subscriptions', label: 'Subscriptions', icon: '💳' },
    { id: 'billing', label: 'Billing', icon: '💰' },
    { id: 'technical', label: 'Technical', icon: '🔧' }
  ];

  const faqs = {
    general: [
      {
        question: 'What is SubWave?',
        answer: 'SubWave is a subscription management platform that helps you track, organize, and optimize your digital subscriptions. It provides insights into your spending, renewal reminders, and budget management tools.'
      },
      {
        question: 'How do I get started?',
        answer: 'Getting started is easy! Simply sign up for an account, verify your email, and start adding your subscriptions. You can manually add subscriptions or import them from your email receipts.'
      },
      {
        question: 'Is my data secure?',
        answer: 'Yes, we take security seriously. All your data is encrypted and stored securely. We never share your personal information with third parties without your explicit consent.'
      }
    ],
    subscriptions: [
      {
        question: 'How do I add a subscription?',
        answer: 'You can add subscriptions by clicking the "Add Subscription" button on your dashboard. Fill in the details like name, amount, billing cycle, and next renewal date.'
      },
      {
        question: 'Can I edit my subscriptions?',
        answer: 'Yes, you can edit any subscription by clicking on it in your subscriptions list. You can update the amount, billing cycle, or any other details.'
      },
      {
        question: 'How do I cancel a subscription?',
        answer: 'To cancel a subscription, go to your subscriptions list, click on the subscription, and select "Cancel Subscription". Note that this only removes it from SubWave - you\'ll need to cancel with the service provider separately.'
      }
    ],
    billing: [
      {
        question: 'How accurate are the spending calculations?',
        answer: 'Spending calculations are based on the information you provide when adding subscriptions. Make sure to enter the correct amounts and billing cycles for accurate tracking.'
      },
      {
        question: 'Can I set budget limits?',
        answer: 'Yes, you can set monthly budget limits in the Budget section. You\'ll receive notifications when you approach or exceed your budget.'
      },
      {
        question: 'How do I export my data?',
        answer: 'You can export your subscription data as a CSV file from the Settings page. This includes all your subscriptions, spending history, and budget information.'
      }
    ],
    technical: [
      {
        question: 'What browsers are supported?',
        answer: 'SubWave works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your browser.'
      },
      {
        question: 'Can I use SubWave on mobile?',
        answer: 'Yes, SubWave is fully responsive and works great on mobile devices. You can access all features from your smartphone or tablet.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'If you forgot your password, click on "Forgot Password" on the login page. Enter your email address and we\'ll send you a password reset link.'
      }
    ]
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Help & Support</h1>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">Get help via email within 24 hours</p>
              <a href="mailto:support@subwave.com" className="text-indigo-600 hover:text-indigo-500 font-medium">
                support@subwave.com
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
              <button className="text-indigo-600 hover:text-indigo-500 font-medium">
                Start Chat
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-sm text-gray-600 mb-4">Browse our detailed guides</p>
              <button className="text-indigo-600 hover:text-indigo-500 font-medium">
                View Docs
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              
              {/* Category Tabs */}
              <div className="flex space-x-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm ${
                      activeCategory === category.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Content */}
            <div className="p-6">
              <div className="space-y-4">
                {faqs[activeCategory].map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-4 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <span className="text-gray-500">
                        {expandedFaq === index ? '−' : '+'}
                      </span>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Still Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📧 Email: support@subwave.com</p>
                  <p>📞 Phone: +1 (555) 123-4567</p>
                  <p>🕒 Hours: Monday - Friday, 9 AM - 6 PM EST</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Follow Us</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>🐦 Twitter: @SubWaveApp</p>
                  <p>📘 Facebook: /SubWaveApp</p>
                  <p>📸 Instagram: @SubWaveApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help; 