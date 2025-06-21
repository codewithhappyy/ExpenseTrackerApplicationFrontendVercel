import React, { useState, useMemo, useEffect } from 'react'
import { LuTarget, LuPlus, LuTrash2 } from 'react-icons/lu'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import moment from 'moment'
import Modal from '../Modal'

const BudgetOverview = ({ transactions }) => {
    const [budgets, setBudgets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newBudget, setNewBudget] = useState({ category: '', limit: '' });
    const [loading, setLoading] = useState(false);

    const uniqueCategories = useMemo(() => {
        const categories = transactions.map(t => t.category).filter(Boolean)
        return [...new Set(categories)].sort()
    }, [transactions])

    const categorySpending = useMemo(() => {
        const currentMonth = moment().format('YYYY-MM');
        const spending = {};
        
        transactions.forEach(transaction => {
            if (!transaction || !transaction.date || !transaction.category) return;
            
            const transactionMonth = moment(transaction.date).format('YYYY-MM');
            
            if (transactionMonth === currentMonth) {
                const category = transaction.category.trim();
                spending[category] = (spending[category] || 0) + Number(transaction.amount || 0);
            }
        });
        
        return spending;
    }, [transactions]);

    const fetchBudgets = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.BUDGET.GET);
            setBudgets(response.data.budgets || []);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    const handleSetBudget = async () => {
        if (!newBudget.category || !newBudget.limit || newBudget.limit <= 0) {
            toast.error('Please enter valid category and limit');
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.post(API_PATHS.BUDGET.SET, {
                category: newBudget.category,
                limit: Number(newBudget.limit)
            });
            
            toast.success('Budget set successfully');
            setNewBudget({ category: '', limit: '' });
            setShowModal(false);
            fetchBudgets();
        } catch (error) {
            console.error('Error setting budget:', error);
            toast.error('Failed to set budget');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBudget = async (category) => {
        try {
            await axiosInstance.delete(API_PATHS.BUDGET.DELETE(category));
            toast.success('Budget deleted successfully');
            fetchBudgets();
        } catch (error) {
            console.error('Error deleting budget:', error);
            toast.error('Failed to delete budget');
        }
    };

    const getBudgetStatus = (spent, limit) => {
        const percentage = (spent / limit) * 100;
        if (percentage >= 100) return 'alert';
        if (percentage >= 80) return 'warning';
        return 'normal';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'alert': return 'bg-red-100 border-red-300';
            case 'warning': return 'bg-yellow-100 border-yellow-300';
            default: return 'bg-white border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'alert': return <span className="text-red-500 text-lg">🚨</span>;
            case 'warning': return <span className="text-yellow-500 text-lg">⚠️</span>;
            default: return null;
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <LuTarget className="text-xl text-purple-600" />
                    <h5 className="text-lg font-semibold">Budget Overview</h5>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                    <LuPlus size={16} />
                    Set Budget
                </button>
            </div>

            {budgets.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <LuTarget className="mx-auto text-4xl mb-2 text-gray-300" />
                    <p>No budgets set yet</p>
                    <p className="text-sm">Click "Set Budget" to get started</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {budgets.map((budget) => {
                        const spent = categorySpending[budget.category] || 0;
                        const status = getBudgetStatus(spent, budget.limit);
                        const percentage = Math.min((spent / budget.limit) * 100, 100);

                        return (
                        <div 
                                key={budget._id || budget.category}
                                className={`p-4 rounded-lg border-2 ${getStatusColor(status)}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <h6 className="font-medium">{budget.category}</h6>
                                        {getStatusIcon(status)}
                                    </div>
                                    <button
                                        onClick={() => handleDeleteBudget(budget.category)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <LuTrash2 size={16} />
                                    </button>
                                </div>
                                
                                <div className="mb-2">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Spent: Rs. {spent}</span>
                                        <span>Budget: Rs. {budget.limit}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full transition-all ${
                                                status === 'alert' ? 'bg-red-500' : 
                                                status === 'warning' ? 'bg-yellow-500' : 
                                                'bg-green-500'
                                            }`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-right text-xs text-gray-600 mt-1">
                                        {percentage.toFixed(1)}% used
                                    </div>
                                </div>

                                {status === 'alert' && (
                                    <div className="text-red-600 text-sm font-medium">
                                        ⚠️ Budget exceeded! You've spent Rs. {spent - budget.limit} over budget.
                                    </div>
                                )}
                                {status === 'warning' && (
                                    <div className="text-yellow-600 text-sm font-medium">
                                        ⚠️ Warning: You've used {percentage.toFixed(1)}% of your budget.
                            </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Set Budget">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                            value={newBudget.category}
                            onChange={(e) => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select a category</option>
                            {uniqueCategories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        </div>
                        
                    <div>
                        <label className="block text-sm font-medium mb-2">Monthly Limit (Rs.)</label>
                        <input
                            type="number"
                            placeholder="Enter budget limit"
                            value={newBudget.limit}
                            onChange={(e) => setNewBudget(prev => ({ ...prev, limit: e.target.value }))}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            min="1"
                            />
                        </div>
                        
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSetBudget}
                            disabled={loading}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                        >
                            {loading ? 'Setting...' : 'Set Budget'}
                        </button>
                    </div>
            </div>
            </Modal>
        </div>
    );
};

export default BudgetOverview;