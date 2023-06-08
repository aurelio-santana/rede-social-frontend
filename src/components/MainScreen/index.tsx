import { ReactNode, useEffect, useState } from "react";
import api from '../../services/api'
import { getAuthHeader } from "../../services/auth";
import Menu from "../../components/Menu";
import Feed from "../../components/Feed";
import { Post } from "../../Model/Post";


interface MainScreenProps {
    children: ReactNode;
    postCreated?: (post: Post) => void;
}

function MainScreen(props: MainScreenProps) {
    


    console.log("post no mainscreen2" + props.children);
    return (
        <div className="w-screen h-screen flex">
            <Menu postCreated={props.postCreated} />
            {props.children}
        </div>
    )
}

export default MainScreen;