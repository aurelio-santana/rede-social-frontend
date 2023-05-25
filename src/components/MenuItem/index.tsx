import { ReactNode } from "react";
import { House, IconProps } from "@phosphor-icons/react";
import { Slot } from "@radix-ui/react-slot";
import { Link } from "react-router-dom";


interface MenuItemProps {
    children: ReactNode;
    route: string;
}

function MenuItemRoot(props: MenuItemProps) {
    return (
        <li className="mt-5">
            <Link to={props.route}>
                <div className="flex items-center px-4 rounded-full hover:bg-sky-400 ml-2">
                    {props.children}



                   {/*  <House size={48} className="text-slate-50" weight="fill"></House>
                    <Text className="font-extrabold ml-4">Página Inicial</Text> */}
                </div>
            </Link>
        </li>
    );
}

interface MenuItemIconProps {
    children: ReactNode;
}

function MenuItemIcon(props: MenuItemIconProps) {
    return (

        <Slot className="text-slate-50 text-5xl" weight="fill">
            {props.children}
        </Slot>
    );
}

export const MenuItem = {
    Root: MenuItemRoot,
    Icon: MenuItemIcon,

};