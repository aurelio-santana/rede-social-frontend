import { Post } from "../Model/Post";
import api from "./api";
import { getAuthHeader } from "./auth";

async function likePost(post: Post, userId: string): Promise<Post> {
    const request = {userId: userId}
    api.put(`/post/${post.id}/like`, request, {headers: {'Content-Type': 'multipart/form-data'}});
    //api.post(`/posts/${post.id}/like`, null, getAuthHeader());

    return like(post, userId);  
}

function like(post: Post, userId: string) {
    post.like.push(userId);
    return post;
}


async function unlikePost(post: Post, userId: string): Promise<Post> {
    const request = {userId: userId}
    api.put(`/post/${post.id}/like`, request, {headers: {'Content-Type': 'multipart/form-data'}});
    //api.post(`/posts/${post.id}/unlike`, null, getAuthHeader());

    return unlike(post, userId); 
}

function unlike(post: Post, userId: string) {
    const index =  post.like.indexOf(userId);
    post.like.splice(index, 1);
    return post;
}


export { likePost, unlikePost };