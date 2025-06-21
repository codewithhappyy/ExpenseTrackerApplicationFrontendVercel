import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import InfoCard from '../../components/Cards/InfoCard'
import { addThousandsSeparator } from '../../utils/helper'
import toast from 'react-hot-toast'

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard } from 'react-icons/io'
import RecentTransactions from '../../components/Dashboard/RecentTransactions'
import FinanceOverview from '../../components/Dashboard/FinanceOverview'
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart'
import RecentIncome from '../../components/Dashboard/RecentIncome'
import Past3MonthsReports from '../../components/Reports/Past3MonthsReports'

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 
    
    const fetchDashboardData = async () => {
        if (!isMounted) return; 
        
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
            //console.log(response.data);
            
            if (isMounted && response.data) { 
                setDashboardData(response.data);
            }
        } catch (error) {
            if (isMounted) { 
                setError('Failed to fetch dashboard data. Please try again.');
                toast.error('Failed to fetch dashboard data');
            }
        } finally {
            if (isMounted) { 
                setIsLoading(false);
            }
        }
    };
    
    fetchDashboardData();
    
    return () => {
        isMounted = false; 
    };
}, []);

  if (isLoading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-gray-500">Loading dashboard data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense)}
            color="bg-red-500"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions 
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate('/expense')}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpense?.transactions}
            onSeeMore={() => navigate('/expense')}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpense.transactions || {}}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}  
            totalIncome={dashboardData?.last60DaysIncome?.total || 0}    
          />    

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            onSeeMore={() => navigate('/income')}
          />
        </div>

        <div className='mt-6'>
          <Past3MonthsReports />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;