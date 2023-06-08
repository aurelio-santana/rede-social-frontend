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
            {posts == undefined || posts.length == 0 ? (
                <div className="flex flex-col colum content-center items-center mt-6">
                    <Text size="lg" className="font-extrabold ml-5">
                        Sem posts a serem exibidos.
                    </Text>
                    <Text size="sm" className="ml-5">
                        Você ainda não segue ninguem, ou as pessoas que você segue não publicaram nenhum post.
                    </Text>
                </div>
            ) : (
                <div>
                    {posts &&
                    posts.map((post: Post) => (
                        <PostItem post={post} handleLike={handleLike} key={post.id}></PostItem>
                    ))}
                </div>
            )}
            </section>
        </div>
    )
}

export default Feed;