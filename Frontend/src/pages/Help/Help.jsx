import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  QuestionMarkCircleIcon,
  ChatBubbleOvalLeftIcon,
  DocumentIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import HelpIcon from '../../assets/Help and support.png.jpg';
import SupportTeam from '../../assets/Support team illustration.png.png';
import TutorialIcon from '../../assets/Tutorial icon.png.png';
import CommunityIcon from '../../assets/Community icon.png.png';
import DocumentationIcon from '../../assets/Documentation icon.png.png';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="border-b border-gray-200"
    >
      <button
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-medium text-gray-900">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-6 flex-shrink-0"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-4">
          <p className="text-gray-500">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.a
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      href={`#${title.toLowerCase()}`}
      className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -top-2 -left-2 w-12 h-12 bg-white/5 rounded-full"
        />
        <img src={icon} alt={title} className="h-8 w-8 object-contain mb-4 relative z-10" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.a>
  );
};

const Help = () => {
  const faqs = [
    {
      question: 'How do I add a new subscription?',
      answer: 'To add a new subscription, go to the Subscriptions page and click the "Add Subscription" button. Fill in the required details like service name, cost, and billing cycle.',
    },
    {
      question: 'How can I track my spending?',
      answer: 'You can track your spending through the Budget page, which shows your monthly expenses, spending trends, and subscription costs breakdown.',
    },
    {
      question: 'Can I share subscriptions with others?',
      answer: 'Yes! You can share subscriptions with family members or friends through the Subscription Sharing feature. Just select the subscription and click "Share" to invite others.',
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'To cancel your subscription, go to the Settings page and select "Billing & Subscriptions". Click on "Cancel Subscription" and follow the prompts.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={HelpIcon} alt="Help" className="w-8 h-8 object-contain" />
            <h1 className="text-4xl font-bold text-white">Help & Support</h1>
          </div>
          <p className="text-lg text-white/80">Find answers and learn how to make the most of our platform</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={DocumentationIcon}
            title="Documentation"
            description="Browse our detailed documentation and user guides"
            delay={0.1}
          />
          <FeatureCard
            icon={HelpIcon}
            title="FAQ"
            description="Find answers to commonly asked questions"
            delay={0.2}
          />
          <FeatureCard
            icon={CommunityIcon}
            title="Community"
            description="Join our community forum for discussions"
            delay={0.3}
          />
          <FeatureCard
            icon={TutorialIcon}
            title="Tutorials"
            description="Watch video tutorials and learn best practices"
            delay={0.4}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <img src={SupportTeam} alt="Support Team" className="w-48 h-48 object-contain" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4">Still need help?</h2>
            <p className="text-white/80 mb-6">
              Our support team is available 24/7 to assist you with any questions or concerns.
            </p>
            <div className="space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 shadow-md"
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-white/20 text-white rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
              >
                Submit Ticket
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help; 