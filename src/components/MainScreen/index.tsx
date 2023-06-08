import { ReactNode } from "react";
import Menu from "../../components/Menu";

import { Post } from "../../Model/Post";


interface MainScreenProps {
    children: ReactNode;
    postCreated?: (post: Post) => void;
}

function MainScreen(props: MainScreenProps) {
    return (
        <div className="w-screen h-screen flex">
            <Menu postCreated={props.postCreated} />
            {props.children}
        </div>
    )
}

export default MainScreen;