import logo_menu from "../../assets/logo_menu.svg";
import Text from "../Text";
import { House, User, UsersThree } from "@phosphor-icons/react";
import { MenuItem } from "../MenuItem";
import { Post } from "../../Model/Post";
import CreatePostButton from "../CreatePostButton";
import CreatePostDialog from "../CreatePostDialog";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface MenuProps {
    postCreated?: (post: Post) => void;
}

function Menu(props: MenuProps) {

    const [open, setOpen] = useState(false);
    function postCreated(post: Post) {
        console.log("post no menu" + post);
        setOpen(false);
        props.postCreated && props.postCreated(post);
        console.log("props menu" + props.postCreated);
    }


    return (
        <div className="basis-1/6 border-r border-slate-400 ml-4 pt-4">
            <div className="flex items-center ml-4">
                <img src={logo_menu} alt="Logo Menu" />
                <Text className="font-extrabold ml-4">Parrot</Text>
            </div>

            <ul className="pr-2">
                
                <MenuItem.Root route="/home">

                    <MenuItem.Icon>
                        <House />
                    </MenuItem.Icon>    
                    <Text className="font-extrabold ml-4">Página Inicial</Text>
                </MenuItem.Root>
                
                <MenuItem.Root route="/profile">
                    <MenuItem.Icon>
                        <User />
                    </MenuItem.Icon>    
                    <Text className="font-extrabold ml-4">Perfil</Text>
                </MenuItem.Root>

                <MenuItem.Root route="/friends">
                    <MenuItem.Icon>
                        <UsersThree />
                    </MenuItem.Icon>    
                    <Text className="font-extrabold ml-4">Amigos</Text>
                </MenuItem.Root>

            </ul>
            <footer className="flex flex-col items-center">
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <CreatePostButton />
                    <CreatePostDialog postCreated={postCreated}/>
                </Dialog.Root>
            </footer>
        </div>
    );
}

export default Menu;