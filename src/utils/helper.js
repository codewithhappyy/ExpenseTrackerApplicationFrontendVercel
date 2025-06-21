import moment from 'moment';
import axiosInstance from './axiosInstance';
import { API_PATHS } from './apiPaths';

export const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}   

export const getInitials = (name) => {
    if(!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export const addThousandsSeparator = (value) => {
    if(value == null || isNaN(value) ) return '';
    
    const [integerPart, decimalPart] = value.toString().split('.');

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if(decimalPart) {
        return `${formattedInteger}.${decimalPart}`;
    }

    return formattedInteger;
}

export const prepareExpenseChartData = (data) => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map((item) => ({
        category: item?.category || 'Other',
        amount: Number(item?.amount) || 0,
    }));
}

export const prepareIncomeBarChartData = (transactions) => {
    //console.log('Preparing chart data from transactions:', transactions);

    if (!transactions || !Array.isArray(transactions)) return [];

    const sortedData = [...transactions].sort((a, b) => moment(a.date).diff(moment(b.date)));
    
    const chartData = sortedData.map(transaction => ({
        date: moment(transaction.date).format('DD MMM'),
        month: moment(transaction.date).format('DD MMM YYYY'),
        amount: Number(transaction.amount) || 0,
        source: transaction.source || 'Other'
    }));

    //console.log('Processed chart data:', chartData);
    return chartData;
}

export const prepareExpenseLineChartData = (transactions) => {
    //console.log('Preparing expense line chart data:', transactions);

    if (!transactions || !Array.isArray(transactions)) {
        console.log('No valid transactions data, returning empty array');
        return [];
    }

    const sortedData = [...transactions].sort((a, b) => moment(a.date).diff(moment(b.date)));
    const chartData = sortedData.map(transaction => ({
        month: moment(transaction.date).format('DD MMM YYYY'),
        amount: Number(transaction.amount) || 0,
        category: transaction?.category || 'Other'
    }));

    console.log('Processed expense line chart data:', chartData);
    return chartData;
}

export const getRecentReports = async (limit = 3) => {
    try {
      const response = await axiosInstance.get(`${API_PATHS.REPORTS.GET_RECENT}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent reports:', error);
      throw error;
    }
  };