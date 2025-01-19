export interface FileUploadProps {
    title: string;
    supportedFormats: string;
    maxSize: string;
    onFileSelect: (file: File) => void;
}