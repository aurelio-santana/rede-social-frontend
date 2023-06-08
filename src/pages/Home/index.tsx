import { useEffect, useState } from "react";
import api from '../../services/api'
import { getAuthHeader, getUserId } from "../../services/auth";
import Menu from "../../components/Menu";
import Feed from "../../components/Feed";
import MainScreen from "../../components/MainScreen";
import { Post } from "../../Model/Post";
import { likePost, unlikePost } from "../../services/Posts";
import { formatDate } from "../../components/DateTime";

function Home() {

    const [posts, setPosts] = useState<Post[]>([]);
    const authHeader = getAuthHeader();
    const userId = getUserId();


    useEffect(() => {
        async function getPosts() {
            try {
                const { data } = await api.get("/post/feed", {params: {userId: userId}});
                //console.log("1",data);
                console.log("2",data.posts[0]);
                //console.log("2",data.posts[0][0].comment[5].createdAt);
                //const olddate = data.posts[0][0].comment[5].createdAt;
                //const newdate = formatDate(olddate);
                //console.log("newdate :", newdate);

                if (data.posts[0] == undefined)
                    return;
                setPosts(data.posts[0]);

            } catch (err) {
                alert("Erro ao obter o Feed.");
            } 
        }

        getPosts();
    }, []);

    async function postCreated(post: Post) {
        console.log("nepossieklf", post);
        try {
            console.log("home post id", post.id);
            //const { data } = await api.get(`/post/get?id=${post}`, authHeader); //Alternativa
            const { data } = await api.get("/post/get", {params: {id: post}});

            console.log("data home", data);
            console.log("posts home", posts);

            if (posts == undefined)
                setPosts((posts) => [data, posts]);
            else {
                setPosts((posts) => [data, ... posts]);
            }

            
        } catch(err) {
            alert("Erro ao tentar obter post salvo.");
        }
    }

    async function handleLike(postId: string) {
        const [post, ...rest] = posts.filter((post) => post.id === postId);
    
        try {
            if (post && !post.like.includes(userId)) {
                const newPost = await likePost(post, userId);
                changePosts(newPost);
            } else {
                const newPost = await unlikePost(post, userId);
                changePosts(newPost);

            }
        } catch(err) {
            alert("Erro ao tentar realizar o like ou unlike.");
        }
    
    }

    function changePosts(newPost: Post) {
        setPosts((posts) => {
            const index = posts.indexOf(newPost);
            posts[index] = newPost;
            return [ ...posts];
        });
    }
    
    return (
        <MainScreen postCreated={postCreated}>
            <Feed posts={posts} handleLike={handleLike} />
        </MainScreen>
    )
}

export default Home;