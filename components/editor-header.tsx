
interface EditorHeaderProps {
    document_title: string;
    document_bg: string;
}
const EditorHeader: React.FC<EditorHeaderProps> =({document_title, document_bg}) => {
    return(
        <div className='flex-1 h-1/6 bg-gray-100 relative'>
            <div className="absolute bottom-0 left-1/2 w-1/2 transform -translate-x-1/2 p-5 ">
                <h1 className="text-4xl font-bold">{document_title}</h1>
            </div>
        </div>
    )
}
export default EditorHeader;