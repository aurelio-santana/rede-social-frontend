import { Post } from "../../Model/Post"
import PostItem from "../../components/PostItem"
import { likePost, unlikePost } from "../../services/Posts";
import { getAuthHeader, getEmail, getUserId } from "../../services/auth";
import Text from "../../components/Text";
import { UserCircle } from "@phosphor-icons/react";
import { TextInput } from "../../components/TextInput";
import Button from "../../components/Button";
import { FormEvent } from "react";
import api from "../../services/api";

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
            description: form.elements.description.value,
        }

        try {
            await api.post(`/posts/${postDetail._id}/comments`, data, getAuthHeader());

            const response = await api.get(`/posts/${postDetail._id}`, getAuthHeader());
            setPostDetail(response.data);

            form.elements.description.value = "";
        } catch (err) {
            alert("Erro ao tentar salvar comentário.")
        }
        
    }

    return (
        <div className="basis-5/6 overflow-y-auto scroll-smooth">
            {postDetail && <PostItem post={postDetail} handleLike={handleLike} />}

            <form onSubmit={handleSaveComment} className="mx-8 mb-8">
                <Text>Insira seu comentário.</Text>
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
            <section className="border-t border-slate-400 w-full">
                <Text className="mx-8 my-8 font-extrabold">Comentários:</Text>
                <ul className="mx-8">
                    {postDetail.comment && postDetail.comment.map(comment =>  (
                        <li className="my-8 border rounded-lg" key={comment._id}>
                            <div className="flex items-center gap-2">
                                <UserCircle
                                    size={32}
                                    weight="light"
                                    className="text-slate-50"
                                />
                                <Text size="sm">{comment.name}</Text>
                            </div>
                            <Text>{comment.content}</Text>
                        </li>
                    ))}
                </ul>
            </section>
        </div>

    );
    
}



export default PostDetailItem;