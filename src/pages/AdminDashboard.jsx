import { useState, useEffect } from 'react';
import userService from '../services/userService';
import { Users, Trash2, Shield, ShieldAlert, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
      toast.error('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter((user) => user._id !== id));
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  const requestAdminRole = async (id) => {
      // Placeholder: In a real app, you might have a specific endpoint or use updateUser
      // For now, let's assume we just want to show the intent or maybe use updateUser if the backend supports it directly via PUT
      try {
           const userToPromote = users.find(u => u._id === id);
           if (!userToPromote) return;
           
           await userService.updateUser(id, { ...userToPromote, role: 'admin' });
           setUsers(users.map(user => user._id === id ? { ...user, role: 'admin' } : user));
           toast.success(`Promoted ${userToPromote.name} to Admin`);
      } catch (err) {
          toast.error('Failed to update role');
      }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) return (
      <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-slate-800 flex items-center gap-2"
        >
          <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
            <Shield size={28} />
          </div>
          User Management
        </motion.h1>

        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full md:w-96"
        >
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none shadow-sm"
            />
        </motion.div>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">{error}</div>}

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
            {filteredUsers.map((user) => (
            <motion.div 
                key={user._id} 
                variants={item}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-6 rounded-2xl relative group hover:shadow-xl transition-all duration-300"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">{user.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                                {user.role.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="text-sm text-slate-500 flex items-center gap-2">
                        <span className="font-medium text-slate-700">Email:</span> {user.email}
                    </div>
                    <div className="text-sm text-slate-500 flex items-center gap-2">
                        <span className="font-medium text-slate-700">ID:</span> <span className="font-mono text-xs">{user._id}</span>
                    </div>
                </div>

                <div className="flex gap-3 mt-auto border-t border-slate-100 pt-4">
                    {user.role !== 'admin' && (
                        <button 
                            onClick={() => requestAdminRole(user._id)}
                            className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                        >
                            <ShieldAlert size={16} /> Promote
                        </button>
                    )}
                    <button 
                        onClick={() => handleDeleteUser(user._id)}
                        className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredUsers.length === 0 && (
          <div className="text-center py-20 text-slate-500">
              No users found matching your search.
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;
