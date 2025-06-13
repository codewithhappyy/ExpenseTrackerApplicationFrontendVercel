import { LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuLogOut } from 'react-icons/lu'

export const SIDE_MENU_DATA = [
    {
        id: "01",
        title: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard"
    },
    {
        id: "02",
        title: "Income",
        icon: LuWalletMinimal,
        path: "/income"
    },
    {
        id: "03",
        title: "Expense",
        icon: LuHandCoins,
        path: "/expense"
    },
    {
        id: "04",
        title: "Logout",
        icon: LuLogOut,
        path: "/logout"
    },
    
]