import * as Dialog from "@radix-ui/react-dialog";
import { TextInput } from "../TextInput"
import Text from "../Text";
import Button from "../Button";
import { getAuthHeader } from "../../services/auth";
import api from "../../services/api";
import { Post } from "../../Model/Post";
import Dropzone from "../Dropzone";
import  { FormEvent, useState } from "react";


interface CreatePostDialogProps {
    postCreated?: (post: Post) => void;
}

const teste = {
    "title": "titulo2",
    "content": "conteudo post2",
}


interface PostFormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    content: HTMLInputElement;
}

interface PostFormElement extends HTMLFormElement {
    readonly elements: PostFormElements;

}

function CreatePostDialog({ postCreated }: CreatePostDialogProps) {
    const [selectedFile, setSelectedFile] = useState<File>();
    const authHeader = getAuthHeader();
    async function handleSubmit(event: FormEvent<PostFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

/*     const formData = new FormData();
    formData.append("title", form.elements.title.value);
    formData.append("content", form.elements.content.value); */

    let formData;

    if (selectedFile) {
        formData = {
            title: form.elements.title.value,
            content: form.elements.content.value,
            file: selectedFile
        };
        } else {
            formData = {
            title: form.elements.title.value,
            content: form.elements.content.value,
            }
        }
    

    try {
        const { data } = await api.post("/post/create", formData, authHeader);

        postCreated && postCreated(data);
    } catch(err) {
        alert("Erro ao tentar salvar novo psot.");
    }
}
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#121214] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-2xl font-extrabold">
                    Novo Post
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
                    <Text>Título do Post</Text>
                    <TextInput.Root>
                        <TextInput.Input id="title" placeholder="Qual o título do post?" />
                    </TextInput.Root>

                    <Text>Conteúdo do Post</Text>
                    <TextInput.Root>
                        <TextInput.Input id="content" placeholder="Qual a mensagem?" />
                    </TextInput.Root>

                    <Dropzone onFileUploaded={setSelectedFile} />


                    <div className="mt-4 flex justify-end gap-4">
                        <Dialog.Close
                            type="button"
                            className="px-5 h-12 rounded-md hover:bg-zinc-600"
                        >
                            Fechar
                        </Dialog.Close>
                        <Button type="submit" className="flex-none w-48">
                            Postar
                        </Button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}

export default CreatePostDialog;