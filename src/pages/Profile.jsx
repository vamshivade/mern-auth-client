import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-2xl mx-auto pt-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-3xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-40 relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="w-32 h-32 bg-white p-2 rounded-full shadow-xl"
            >
              <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-5xl font-bold text-indigo-600">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="pt-20 pb-10 px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-1">{user?.name}</h2>
            <p className="text-slate-500 font-medium mb-8">{user?.email}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-lg mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-50 border border-slate-100 p-5 rounded-2xl"
            >
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-bold uppercase tracking-wider">User ID</span>
              </div>
              <p className="text-slate-800 font-mono text-sm truncate" title={user?._id}>
                {user?._id}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-50 border border-slate-100 p-5 rounded-2xl"
            >
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-bold uppercase tracking-wider">Joined</span>
              </div>
              <p className="text-slate-800 font-medium">
                {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
