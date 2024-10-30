export type SideBarItems = {
    title: string;
    path: string;
    icon?:JSX.Element;
    submenu: boolean;
    subMenuItems: SideBarItems[];



}