import { BsEnvelope, BsGear, BsHouseDoor, BsKanban, BsQuestionCircle,BsBoxSeam } from "react-icons/bs";
import { SideBarItems } from "./types/types";

export const SIDEBAR_ITEMS: SideBarItems[] = [
    {
        title: "Dashboard",
        path: "/",
        icon: <BsHouseDoor size={20} />
    },
    {
        title: "Products",
        path: "/products",
        icon: <BsKanban size={20} />,
        submenu:true,
        subMenuItems:[
            {title: 'All', path: '/products'},
            {title: 'New',path:'product/new'}
        ]

    },
    {
        title: "Order",
        path: "/orders",
        icon: <BsBoxSeam size={20} />
    },
    {
        title: "Feedback",
        path: "/feedbacks",
        icon: <BsEnvelope size={20} />
    },
    {
        title: "Account",
        path: "/accounts",
        icon: <BsGear size={20} />
    },
    {
        title: "Help",
        path: "/help",
        icon: <BsQuestionCircle size={20} />
    },
];
