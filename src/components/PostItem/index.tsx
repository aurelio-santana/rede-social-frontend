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

    console.log("img :",post);

    function handleCreatedAt(createdAt: string) {
        const currDate = Date.now();
        const postDate = new Date(createdAt).getTime();
        const difDate = currDate - postDate;

        switch(true) {
            case (difDate<60000):
                return "agora"; //seconds

            case (difDate<3600000): { //36 = 1hr  
                const time = Math.floor(difDate/60000)
                if (time == 1)
                    return `há ${time} minuto`
                else return `há ${time} minutos`
            }
            case (difDate<86400000): { //86 = 24hr
                const time = Math.floor(difDate/3600000)
                if (time == 1)
                    return `há ${time} hora`
                else return `há ${time} horas`
            }
            case (difDate<2592000000): { //25 = 30d
                const time = Math.floor(difDate/86400000)
                if (time == 1)
                    return `há ${time} dia`
                else return `há ${time} dias`
            }
            case (difDate>=2592000000): { //86 = 24hr
                const time = Math.floor(difDate/2592000000)
                if (time == 1)
                    return `há ${time} mês`
                else return `há ${time} meses`
            }
            default: return "erro na data"
        }
    }

    return (
        <div className="border-b border-slate-500" key={post.id}>
            <Heading className="flex items-center ml-5 my-4">
                <UserCircle size={48} weight="light" />
                <Text className="font-extrabold ml-2">{post.name}</Text>
            </Heading>
            <div className="ml-16 flex flex-col gap-2 mr-8">
                <Link 
                    to={`/posts/${post.id}`}
                    className="border-b border-slate-400 border-opacity-40 mb-2 pb-2 flex"
                >
                    <Heading size="sm">{post.title}</Heading>
                    <Text size="sm" className="text-gray-400 self-center">
                        <span className="m-2">{"•"}</span>
                        {handleCreatedAt(post.createdAt)}
                    </Text>
                </Link>
                
                {post.photoUri ? (
                    <div>
                        <Text className="mb-4" asChild>
                            <p>{post.content}</p>
                        </Text>
                        <img
                            /* src={`http://localhost:9000/${post.image}`} */
                            src={post.photoUri}
                            className="max-w-lg rounded-lg"
                        ></img>
                    </div>
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
                    onClick={() => handleLike(post.id)}
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