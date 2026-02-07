import { useAuth } from '../context/AuthContext';
import { LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto"
    >
      <motion.div variants={item} className="glass-card rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
            <LayoutDashboard size={28} />
          </div>
          Dashboard
        </h1>
        <p className="text-slate-600 text-lg mb-6">
          Welcome back, <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{user?.name}</span>!
        </p>
        <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl">
          <p className="text-indigo-800 font-medium">
            This is a protected route. You can only see this if you are logged in.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((card) => (
          <motion.div 
            key={card} 
            variants={item}
            whileHover={{ y: -5 }}
            className="glass-card p-6 rounded-2xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-4 shadow-lg shadow-indigo-200"></div>
            <h3 className="font-bold text-slate-800 mb-2 text-lg">Feature Card {card}</h3>
            <p className="text-slate-500 leading-relaxed">
              This is a placeholder for dashboard content with a modern glass effect card.
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
