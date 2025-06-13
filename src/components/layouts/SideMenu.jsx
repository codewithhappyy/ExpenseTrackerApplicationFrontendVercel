import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/userContext'
import { useNavigate, Link } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = (path) => {
        if (path === "/logout") {
            clearUser();
            localStorage.clear();
            navigate("/login");
        } else {
            navigate(path);
        }
    }
    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
            <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
                {!user?.profileImageUrl ? (
                    <img src={user?.profileImageUrl} alt="profile" className='w-20 h-20 bg-slate-400 rounded-full' />
                ) : (
                    <CharAvatar
                        name={user?.name}
                        width='w-20'
                        height='h-20'
                        style="text-xl"
                    />
                )}

                <h5 className='text-gray-950 font-medium leading-6'>
                    {user?.name || ""}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu-${index}`}
                    onClick={() => handleClick(item.path)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${activeMenu === item.title
                            ? 'text-white bg-primary'
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                >
                    <item.icon className='text-xl' />
                    <span>{item.title}</span>
                </button>
            ))}
        </div>
    )
}

export default SideMenu