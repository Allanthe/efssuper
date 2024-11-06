import { 
    BsEnvelope, 
    BsGear, 
    BsHouseDoor, 
    BsKanban, 
    BsQuestionCircle, 
    BsFillBellFill, 
    BsFillLockFill, 
    BsFillCreditCard2BackFill, 
    BsFillPersonFill, 
    BsFillFileEarmarkTextFill, 
    BsFillWalletFill
} from "react-icons/bs";
import { 
    FaBriefcase, 
    FaIndustry, 
    FaUserShield 
} from "react-icons/fa"; // Correct import for Fa icons
import { BsBoxSeam } from 'react-icons/bs';

// Define SIDEBAR_ITEMS as a simple array of objects
export const SIDEBAR_ITEMS = [
    {
        title: "Home",
        path: "/",
        icon: <BsHouseDoor size={20} />
    },
    {
        title: "KYC",
        path: "/kyc",
        icon: <FaUserShield size={20} />, // Unique icon for KYC
        submenu: true,
        subMenuItems: [
            { title: 'Clients', path: '/kyc/kyc_all' },
            { title: 'Agent', path: '/kyc/agent' },
            { title: 'Business', path: '/kyc/business' },
            { title: 'Enterprise', path: '/kyc/enterprise' }

        ]
    },
    {
        title: "Client's Level",
        path: "/client",
        icon: <BsFillPersonFill size={20} />,
        submenu: true,
        subMenuItems: [
            { title: 'Clients', path: '/client/all' },
            { title: 'Agents', path: '/client/agent_all' },
        ]
    },
    {
        title: "Business",
        path: "/business",
        icon: <FaBriefcase size={20} />, // Unique icon for Business
        submenu: true,
        subMenuItems: [
            { title: 'Wallets', path: '/business/all_w' },
            { title: 'Add', path: '/business/add_w' },
        ]
    },
    {
        title: "Enterprise",
        path: "/enterprise", // Make sure the path is unique
        icon: <FaIndustry size={20} />, // Unique icon for Enterprise
        submenu: true,
        subMenuItems: [
            { title: 'Wallets', path: '/enterprise/all_w' },
            { title: 'Add', path: '/enterprise/add_w' },
        ]
    },
    
    {
        title: "Transactions",
        path: "/transaction",
        icon: <BsFillCreditCard2BackFill size={20} />
    },
    {
        title: "Compliance Mgt",
        path: "/compliance",
        icon: <BsQuestionCircle size={20} />
    },
    {
        title: "Wallets",
        path: "/wallet",
        icon: <BsFillWalletFill size={20} />
    },
    {
        title: "Audit logs",
        path: "/audit",
        icon: <BsFillFileEarmarkTextFill size={20} />
    },
    {
        title: "Notifications",
        path: "/notifications",
        icon: <BsFillBellFill size={20} />
    },
    {
        title: "Security",
        path: "/security",
        icon: <BsFillLockFill size={20} />
    },
    {
        title: "Settings",
        path: "/setting",
        icon: <BsGear size={20} />
    },
];
