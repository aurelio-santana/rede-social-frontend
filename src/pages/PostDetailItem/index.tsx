import { Post } from "../../Model/Post"
import PostItem from "../../components/PostItem"
import { likePost, unlikePost } from "../../services/Posts";
import { getAuthHeader, getEmail, getUserId } from "../../services/auth";
import Text from "../../components/Text";
import { Heart, UserCircle } from "@phosphor-icons/react";
import { TextInput } from "../../components/TextInput";
import Button from "../../components/Button";
import { FormEvent } from "react";
import api from "../../services/api";
import { formatDate } from "../../components/DateTime";

interface PostDetailItemProps {
    postDetail: Post;
    setPostDetail: (post: Post) => void;
}

interface CommentFormElements extends HTMLFormControlsCollection {
    description: HTMLInputElement;
}

interface CommentFormElment extends HTMLFormElement {
    readonly elements: CommentFormElements;
}

function PostDetailItem({ postDetail, setPostDetail }: PostDetailItemProps) {
    const userId = getUserId();
    const email = getEmail();

    async function handleLike() {
        try {
            if (postDetail.like.includes(getUserId())) {
                const newPost = await unlikePost(postDetail, userId);
                setPostDetail({ ...newPost }); 
            } else {
                const newPost = await likePost(postDetail, userId);
                setPostDetail({ ...newPost }); 
            }
        } catch (err) {
            alert("Erro ao tentar relizar o like.");
        }
    }

    async function handleSaveComment(event: FormEvent<CommentFormElment>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = {
            userId: userId, //TODO getAuthHeader
            content: form.elements.description.value,
        }
        try {
            await api.post(`/post/${postDetail.id}/comment/create`, data, getAuthHeader());
            const response = await api.get("/post/get", {params: {id: postDetail.id}});
            setPostDetail(response.data);
            form.elements.description.value = "";
        } catch (err) {
            alert("Erro ao tentar salvar comentário.")
        }
    }

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

    //TODO async function handleLikeComment() {}

    return (
        <div className="basis-5/6 overflow-y-auto scroll-smooth">
            {postDetail && <PostItem post={postDetail} handleLike={handleLike} />}

            <form onSubmit={handleSaveComment} className="mx-8 mb-8 pt-2">
                <div className="mb-2">
                    <Text>Insira seu comentário.</Text>
                </div> 
                <TextInput.Root>
                    <TextInput.Input
                        id="description"
                        placeholder="Comente este post... "
                    />
                </TextInput.Root>
                <Button type="submit" className="mt-4">
                    Incluir comentário
                </Button>
            </form>
            <section className="border-t border-slate-400 w-full pt-2">
                <Text className="mx-8 my-8 font-extrabold">Comentários:</Text>
                <ul className="mx-8">
                    {postDetail.comment && postDetail.comment.map(comment =>  (
                        <li className="flex justify-between items-center my-8 border rounded-lg border-slate-500 px-3 py-2 pe-6" key={comment.id}>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <UserCircle
                                        size={32}
                                        weight="light"
                                        className="text-slate-50"
                                    />
                                    <Text size="md" className="font-bold">{comment.name}</Text>
                                    <Text size="sm" className="text-gray-400">
                                        <span className="mr-2">{"•"}</span>
                                        {handleCreatedAt(comment.createdAt)}
                                    </Text>
                                </div >
                                <Text className="">{comment.content}</Text>
                            </div>
{/*                             <div
                                className="hover:bg-sky-400 rounded-full p-1"
                                onClick={() => handleLike(post.id)}
                            >
                                {post.like.includes(getUserId()) ? (
                                    <Heart size={24} className="text-red-500" weight="fill" />
                                ) : (
                                    <Heart size={24} className="text-slate-50" />
                                )} 
                    
                            </div> */}
                            {/* <Text size="sm">{post.like.length}</Text> */}
                            <div className="flex items-center border border-slate-700 bg-slate-700 rounded-md py-0.5 px-1 space-x-1"> 
                            {/* <Heart size={14} className="text-red-500" weight="fill" /> */}
                            <Heart size={14} className="text-slate-50" />
                            <Text className="text-[10px]">{2775}</Text>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
    
}

export default PostDetailItem;