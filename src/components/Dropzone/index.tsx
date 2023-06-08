import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Text from "../Text";

interface DropzoneProps {
    onFileUploaded: (file: File) => void;
}

function Dropzone({ onFileUploaded }: DropzoneProps) {
    const [selectedFileUrl, setSelectedFileUrl] = useState("");

    const onDrop = useCallback(
        (acceptedFiles: any[]) => {
            const file = acceptedFiles[0];

            const fileURL = URL.createObjectURL(file);

            setSelectedFileUrl(fileURL);
            onFileUploaded(file);
        },
        [onFileUploaded]
    );
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div className="flex mt-4" {...getRootProps()}>
            <input {...getInputProps()} />

            {selectedFileUrl ? (
                <img src={selectedFileUrl} className="max-h-96 rounded-lg" />
            ) : (
                <Text size="sm">Arraste a Imagem para cá...</Text>
            )}
        </div>
    );
}

export default Dropzone;