import React, { useState } from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu'
import Modal from '../Modal';

const TransactionCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete, notes, paymentMethod}) => {
    const [openMoreDetailsModal, setOpenMoreDetailsModal] = useState(false);

    const getAmountStyles = () => 
        type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

    return (
        <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/50'>
            <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
                {icon ? (
                    <img src={icon} alt={title} className='w-6 h-6' />
                ) : (
                    <LuUtensils className='text-2xl text-primary' />
                )}
            </div>

            <div className='flex-1 flex items-center justify-between'>
                <div>
                    <h6 className='text-sm font-medium text-gray-700'>{title}</h6>
                    <span className='text-xs text-gray-400 mt-1'>{date}</span>
                    <button className='text-xs text-gray-900 mt-1 ml-2 cursor-pointer' onClick={() => setOpenMoreDetailsModal(true)}>More details</button>
                </div>

                <div className='flex items-center gap-2'>
                    {!hideDeleteBtn && (
                        <button className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'>
                            <LuTrash2 size={18} onClick={onDelete}/>
                        </button>
                    )}

                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                        <h6 className='text-xs font-medium'>
                            {type === "income" ? "+" : "-"} Rs. {amount}
                        </h6>
                        {type === "income" ? (
                            <LuTrendingUp size={18} className='text-green-500' />
                        ) : (
                            <LuTrendingDown size={18} className='text-red-500' />
                        )}
                    </div>
                </div>

                <div>
                    {openMoreDetailsModal && (
                        <Modal
                            isOpen={openMoreDetailsModal}
                            onClose={() => setOpenMoreDetailsModal(false)}
                            title="More Details"
                        >
                            <div>
                                <div className='flex justify-between'>
                                    <h6 className='text-md text-gray-600'><span className='font-semibold text-gray-700'>Payment Method:</span> {paymentMethod}</h6>
                                    <p className='text-md text-gray-600'><span className='font-semibold text-gray-700'>Note:</span> {notes}</p>
                                </div>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TransactionCard