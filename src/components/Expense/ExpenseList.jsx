import React, { useMemo, useState } from 'react'
import { LuDownload, LuFilter, LuX, LuSearch, LuCalendar, LuCreditCard, LuTag } from 'react-icons/lu'
import TransactionCard from '../Cards/TransactionCard'
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [hadFilterApplied, setHadFilterApplied] = useState(false);

    const [filters, setFilters] = useState({
        category: '',
        paymentMethod: '',
        dateFrom: '',
        dateTo: '',
        searchText: ''
    });

    const uniqueCategories = useMemo(() => {
        const categories = transactions.map(t => t.category).filter(Boolean)
        return [...new Set(categories)].sort()
    }, [transactions])

    const uniquePaymentMethods = useMemo(() => {
        const methods = transactions.map(t => t.paymentMethod).filter(Boolean)
        return [...new Set(methods)].sort()
    }, [transactions])

    const filteredTransactions = transactions.filter(transaction => {
        const matchesCategory = !filters.category || transaction.category === filters.category;
        const matchesPaymentMethod = !filters.paymentMethod || transaction.paymentMethod === filters.paymentMethod;
        const matchesDate = (!filters.dateFrom || moment(transaction.date).isSameOrAfter(filters.dateFrom)) &&
            (!filters.dateTo || moment(transaction.date).isSameOrBefore(filters.dateTo));
        
        const matchesSearch = !filters.searchText || 
            transaction.category?.toLowerCase().includes(filters.searchText.toLowerCase()) ||
            transaction.notes?.toLowerCase().includes(filters.searchText.toLowerCase()) ||
            transaction.paymentMethod?.toLowerCase().includes(filters.searchText.toLowerCase());

        return matchesCategory && matchesPaymentMethod && matchesDate && matchesSearch;
    })

    const handleFilter = () => {
        setShowFilters(!showFilters);
    }

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        setHadFilterApplied(true);
        setShowFilters(false);
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            paymentMethod: '',
            dateFrom: '',
            dateTo: '',
            searchText: ''
        });
        setHadFilterApplied(false);
    };

    const removeFilter = (filterKey) => {
        setFilters(prev => ({ ...prev, [filterKey]: '' }));
    };

    const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

    return (
        <div className='card'>
            {/* Header Section */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
                <div>
                    <h5 className='text-xl font-semibold text-gray-800 mb-1'>All Expenses</h5>
                    <p className='text-sm text-gray-600'>
                        {hadFilterApplied ? `${filteredTransactions.length} of ${transactions.length} expenses` : `${transactions.length} total expenses`}
                    </p>
                </div>

                <div className='flex items-center gap-3'>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            showFilters 
                                ? 'bg-blue-100 text-blue-700 shadow-md' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={handleFilter}
                    >
                        <LuFilter className='text-base' />
                        Filters
                        {hasActiveFilters && (
                            <span className='bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                                {Object.values(filters).filter(f => f !== '').length}
                            </span>
                        )}
                    </button>
                    
                    <button 
                        className='flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium'
                        onClick={onDownload}
                    >
                        <LuDownload className='text-base' />
                        Download
                    </button>
                </div>
            </div>

            <div className='mb-6'>
                <div className='relative'>
                    <LuSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg' />
                    <input
                        type='text'
                        placeholder='Search expenses by category, notes, or payment method...'
                        value={filters.searchText}
                        onChange={(e) => handleFilterChange('searchText', e.target.value)}
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200 text-gray-900 placeholder-gray-500'
                    />
                    {filters.searchText && (
                        <button
                            onClick={() => handleFilterChange('searchText', '')}
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                        >
                            <LuX className='text-lg' />
                        </button>
                    )}
                </div>
            </div>

            {showFilters && (
                <div className='mb-8 p-6 rounded-2xl border border-gray-200 shadow-lg'>
                    <div className='flex items-center gap-2 mb-6'>
                        <div className='bg-blue-100 p-2 rounded-lg'>
                            <LuFilter className='text-blue-600 text-md' />
                        </div>
                        <h6 className='text-md font-semibold text-gray-800'>Advanced Filters</h6>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6'>
                        <div className='space-y-2'>
                            <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
                                <LuTag className='text-purple-500' />
                                Category
                            </label>
                            <select 
                                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none bg-white text-gray-900 transition-all duration-200 hover:border-gray-400 cursor-pointer text-sm'
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                            >
                                <option value=''>All Categories</option>
                                {uniqueCategories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className='space-y-2'>
                            <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
                                <LuCreditCard className='text-green-500' />
                                Payment Method
                            </label>
                            <select 
                                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none bg-white text-gray-900 transition-all duration-200 hover:border-gray-400 cursor-pointer text-sm'
                                value={filters.paymentMethod}
                                onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                            >
                                <option value=''>All Payment Methods</option>
                                {uniquePaymentMethods.map((method) => (
                                    <option key={method} value={method}>{method}</option>
                                ))}
                            </select>
                        </div>

                        <div className='space-y-2'>
                            <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
                                <LuCalendar className='text-blue-500' />
                                Date From
                            </label>
                            <input 
                                type='date' 
                                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none bg-white text-gray-900 transition-all duration-200 hover:border-gray-400 text-sm'
                                value={filters.dateFrom}
                                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
                                <LuCalendar className='text-blue-500' />
                                Date To
                            </label>
                            <input 
                                type='date' 
                                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none bg-white text-gray-900 transition-all duration-200 hover:border-gray-400 text-sm'
                                value={filters.dateTo}
                                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center pt-4 border-t border-gray-200'>
                        <div className='flex flex-wrap gap-3'>
                            <button 
                                className='flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm'
                                onClick={applyFilters}
                            >
                                <LuFilter className='text-sm' />
                                Apply Filters
                            </button>
                            <button 
                                className='flex items-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium text-sm'
                                onClick={clearFilters}
                            >
                                <LuX className='text-sm' />
                                Clear All
                            </button>
                        </div>
                        
                        <div className='bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm'>
                            <span className='text-sm font-medium text-gray-600'>
                                <span className='text-primary font-semibold'>{filteredTransactions.length}</span> of{' '}
                                <span className='text-gray-800 font-medium'>{transactions.length}</span> expenses
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {hasActiveFilters && (
                <div className='mb-6'>
                    <div className='flex items-center gap-2 mb-3'>
                        <span className='text-sm font-medium text-gray-700'>Active Filters:</span>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {filters.category && (
                            <span className='inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium'>
                                <LuTag className='text-xs' />
                                {filters.category}
                                <button
                                    onClick={() => removeFilter('category')}
                                    className='ml-1 text-purple-600 hover:text-purple-800 hover:bg-purple-200 rounded-full p-0.5'
                                >
                                    <LuX className='text-xs' />
                                </button>
                            </span>
                        )}
                        {filters.paymentMethod && (
                            <span className='inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium'>
                                <LuCreditCard className='text-xs' />
                                {filters.paymentMethod}
                                <button
                                    onClick={() => removeFilter('paymentMethod')}
                                    className='ml-1 text-green-600 hover:text-green-800 hover:bg-green-200 rounded-full p-0.5'
                                >
                                    <LuX className='text-xs' />
                                </button>
                            </span>
                        )}
                        {filters.dateFrom && (
                            <span className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
                                <LuCalendar className='text-xs' />
                                From: {moment(filters.dateFrom).format('MMM DD, YYYY')}
                                <button
                                    onClick={() => removeFilter('dateFrom')}
                                    className='ml-1 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full p-0.5'
                                >
                                    <LuX className='text-xs' />
                                </button>
                            </span>
                        )}
                        {filters.dateTo && (
                            <span className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
                                <LuCalendar className='text-xs' />
                                To: {moment(filters.dateTo).format('MMM DD, YYYY')}
                                <button
                                    onClick={() => removeFilter('dateTo')}
                                    className='ml-1 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full p-0.5'
                                >
                                    <LuX className='text-xs' />
                                </button>
                            </span>
                        )}
                        {filters.searchText && (
                            <span className='inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                                <LuSearch className='text-xs' />
                                "{filters.searchText}"
                                <button
                                    onClick={() => removeFilter('searchText')}
                                    className='ml-1 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-200 rounded-full p-0.5'
                                >
                                    <LuX className='text-xs' />
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {(hadFilterApplied ? filteredTransactions : transactions).length > 0 ? (
                    (hadFilterApplied ? filteredTransactions : transactions).map((transaction) => (
                        <TransactionCard
                            key={transaction._id}
                            type='expense'
                            title={transaction.category}
                            icon={transaction.icon}
                            date={moment(transaction.date).format('DD MMM YYYY')}
                            amount={transaction.amount}
                            onDelete={() => onDelete(transaction._id)}
                            notes={transaction.notes}
                            paymentMethod={transaction.paymentMethod}
                        />
                    ))
                ) : (
                    <div className='col-span-full'>
                        <div className='text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300'>
                            <div className='bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                                <LuSearch className='text-gray-400 text-2xl' />
                            </div>
                            <h3 className='text-lg font-medium text-gray-900 mb-2'>No expenses found</h3>
                            <p className='text-gray-500 mb-4'>
                                {hasActiveFilters 
                                    ? 'Try adjusting your filters to see more results' 
                                    : 'Start by adding your first expense'
                                }
                            </p>
                            {hasActiveFilters && (
                                <button 
                                    onClick={clearFilters}
                                    className='text-blue-600 hover:text-blue-800 font-medium'
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ExpenseList