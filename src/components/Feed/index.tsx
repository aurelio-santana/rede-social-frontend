import { Post } from "../../Model/Post";
import { getName } from "../../services/auth";
import Heading from "../Heading";
import PostItem from "../PostItem";
import Text from "../Text";
import { UserCircle } from "@phosphor-icons/react";

interface FeedProps {
    posts: Post[];
    handleLike: (postId: string) => void;
}

function Feed({ posts, handleLike }: FeedProps) {

    const name = getName();
    
    return (
        <div className="basis-5/6 overflow-y-auto scroll-smoth">
            <Heading className="border-b border-slate-400 mt-4">
                <Text size="lg" className="font-extrabold ml-5">
                    Página Inicial
                </Text>
                <div className="flex items-center ml-5 my-4">
                    <UserCircle size={48} weight="light" className="text-slate-50"/>
                    <Text className="font-extrabold ml-2">{name}</Text>
                </div>
            </Heading>
            <section>
                {posts &&
                posts.map((post: Post) => (
                    <PostItem post={post} handleLike={handleLike} key={post._id}></PostItem>
                ))}
            </section>
        </div>
    )
}

export default Feed;