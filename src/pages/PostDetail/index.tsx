import { getAuthHeader } from "../../services/auth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { Post } from "../../Model/Post";
import MainScreen from "../../components/MainScreen";
import PostDetailItem from "../PostDetailItem";

function PostDetail() {
    const { postId } = useParams();
    const [postDetail, setPostDetail] = useState<Post>();

    useEffect(() => {
        async function getPostDetail() {
            try {
                const { data } = await api.get(`/post/get?id=${postId}`);
                setPostDetail(data);
            } catch(err) {
                alert("Erro ao tentar obter os detalhes do post.")
            }
        }

        getPostDetail();
    }, []);
    return (
        <MainScreen>
            {postDetail && <PostDetailItem postDetail={postDetail} setPostDetail={setPostDetail} />}
        </MainScreen>
    )
}

export default PostDetail;