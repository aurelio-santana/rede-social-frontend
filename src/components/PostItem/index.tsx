import { UserCircle, Chat, Heart } from "@phosphor-icons/react";
import { Post } from "../../Model/Post";
import Heading from "../Heading";
import Text from "../Text";
import { getUserId } from "../../services/auth";
import { Link } from "react-router-dom";

interface PostItemProps {
    post: Post;
    handleLike: (postId: string) => void;
}


function PostItem({ post, handleLike }: PostItemProps) {
    return (
        <div className="border-b border-slate-400" key={post._id}>
            <Heading className="flex items-center ml-5 my-4">
                <UserCircle size={48} weight="light" />
                <Text className="font-extrabold ml-2">{post.name}</Text>
            </Heading>
            <div className="ml-16 flex flex-col gap-2">
                <Link to={`/posts/${post._id}`}><Heading size="sm">{post.title}</Heading></Link>
                {post.image ? (
                    <img
                        src={`http://localhost:9000/${post.content}`}
                        className="max-w-lg rounded-lg"
                    ></img>
                ) : (
                    <Text asChild>
                        <p>{post.content}</p>
                    </Text>
                    )
                }
                
            </div>
            <footer className="flex items-center ml-16 my-4 space-x-2">
                <Chat size={24} className="text-slate-50" />
                <Text size="sm">{post.comment.length}</Text>

                <div
                    className="hover:bg-sky-400 rounded-full p-1"
                    onClick={() => handleLike(post._id)}
                >
                    {post.like.includes(getUserId()) ? (
                        <Heart size={24} className="text-red-500" weight="fill" />
                    ) : (
                        <Heart size={24} className="text-slate-50" />
                    )} 
                    
                </div>
                <Text size="sm">{post.like.length}</Text>
            </footer>
        </div>

    )
}

export default PostItem;