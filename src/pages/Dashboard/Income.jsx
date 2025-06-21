import React, { useEffect, useState } from 'react'
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import IncomeOverview from '../../components/Income/IncomeOverview';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { IoMdDoneAll } from 'react-icons/io';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/layouts/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth'

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL);
      //console.log('API Response:', response.data);

      if (response.data && response.data.incomes) {
        const data = Array.isArray(response.data.incomes) ? response.data.incomes : [];
        //console.log('Processed Income Data:', data);
        setIncomeData(data);
      } else {
        setIncomeData([]);
      }
    } catch (error) {
      console.error("Error fetching income details:", error);
      toast.error("Failed to fetch income details");
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //validation check
    if(!source.trim()){
      toast.error("Income source is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Income amount must be greater than 0");
      return;
    }

    if(!date){
      toast.error("Income date is required");
      return;
    }

    try {
      const response = await axiosInstance.post(`${API_PATHS.INCOME.ADD}`, {
        source,
        amount: Number(amount),
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      await fetchIncomeDetails();
      toast.success("Income added successfully");
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income. Please try again later");
    }
  }

  //Delete Income
  const deleteIncome = async (id) => { 
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE(id));

      setOpenDeleteAlert({show: false, data: null});
      toast.success("Income deleted successfully");
      await fetchIncomeDetails();
      toast.success("Income deleted successfully");
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income. Please try again later");
    }

  };

  //handle download income details
  const handleDownloadIncomeDetails = async () => { 
    try{
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_EXCEL,
        {
          responseType: 'blob',
        }
      );

      //create a URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Income details downloaded successfully');
    } catch (error) {
      console.error('Error downloading income details:', error);
      toast.error('Failed to download income details. Please try again later');
    }

  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
          <div className='bg-white rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 p-6'>
            {loading ? (
              <div className='flex items-center justify-center h-[400px]'>
                <p className='text-gray-500'>Loading income data...</p>
              </div>
            ) : (
              <IncomeOverview
                transactions={incomeData}
                onAddIncome={() => setOpenAddIncomeModal(true)}
              />
            )}
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete= {(id) => setOpenDeleteAlert({show: true, data: id})}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm
            onAddIncome={handleAddIncome}
          />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={()=> deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income