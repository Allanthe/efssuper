
import { 
    BsEnvelope, 
    BsGear, 
    BsHouseDoor, 
    BsKanban, 
    BsQuestionCircle, 
    BsBoxSeam, 
    BsFillBellFill, 
    BsFillLockFill, 
    BsFillCreditCard2BackFill, 
    BsFillPersonFill, 
    BsFillFileEarmarkTextFill, 
    BsFillWalletFill 
} from "react-icons/bs";
import { SideBarItems } from "./types/types";


export const SIDEBAR_ITEMS: SideBarItems[] = [
    {
        title: "Dashboard",
        path: "/",
        icon: <BsHouseDoor size={20} />
    },
    {
        title: "Clients",
        path: "/client",
        icon: <BsFillPersonFill size={20} />,
        submenu: true,
        subMenuItems: [
            { title: 'All', path: '/client/all' }, // Link to the All Clients page
            { title: 'KYC', path: '/client/kyc' }
        ]
    },
    {
        title: "Business",
        path: "/business",
        icon: <BsBoxSeam size={20} />  // Box icon for business
    },
    {
        title: "Transactions",
        path: "/transaction",
        icon: <BsFillCreditCard2BackFill size={20} />  // Credit card icon for transactions
    },
    {
        title: "Compliance Mgt",
        path: "/compliance",
        icon: <BsQuestionCircle size={20} />
    },
    {
        title: "Wallets",
        path: "/wallet",
        icon: <BsFillWalletFill size={20} />  // Unique wallet icon
    },
    {
        title: "Audit logs",
        path: "/audit",
        icon: <BsFillFileEarmarkTextFill size={20} />  // File icon for audit logs
    },
    {
        title: "Notifications",
        path: "/notifications",
        icon: <BsFillBellFill size={20} />  // Bell icon for notifications
    },
    {
        title: "Security",
        path: "/security",
        icon: <BsFillLockFill size={20} />  // Lock icon for security
    },
    {
        title: "Settings",
        path: "/setting",
        icon: <BsGear size={20} />  // Gear icon for settings
    },
];
