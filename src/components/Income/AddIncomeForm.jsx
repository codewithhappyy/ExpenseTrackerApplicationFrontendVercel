import React, { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        amount: '',
        source: '',
        date: '',
        icon: '',
    });

    const handleChange = (key, value) => setIncome({...income, [key]: value});
  return (
    <div>
        <EmojiPickerPopup 
            icon={income.icon}
            setIcon={(icon)=>handleChange('icon', icon)}
        />
      <Input
        value={income.source}
        onChange={(e) => handleChange('source', e.target.value)}
        label='Income Source'
        placeholder='Freelance, Salary, etc.'
        type='text'
      />

      <Input
        value={income.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        label='Income Amount'
        placeholder='Enter Income Amount'
        type='number'
      />

      <Input
        value={income.date}
        onChange={(e) => handleChange('date', e.target.value)}
        label='Income Date'
        placeholder='Select Income Date'
        type='date'
      />

      <div className='flex justify-end gap-2'>
        <button type='button' className='add-btn add-btn-fill' onClick={()=>onAddIncome(income)}>
            Add Income
        </button>
      </div>
    </div>
  )
}

export default AddIncomeForm