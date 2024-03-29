type UploadFileProps = {
    onChange: (fileName: string) => void;
};

export const UploadFile: React.FC<UploadFileProps> = ({ onChange }) => (
    <>
        <p className="block mb-2 text-sm font-medium text-gray-900">Upload file</p>
        <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        >
            <div className="flex flex-col items-center justify-center p-5">
                <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="mb-2 text-xs text-gray-500">Only JSONL for now..</p>
                <p className="text-xs text-gray-500">The file must have the following structure:</p>
                <code className="text-xs text-gray-500">&#123;&quot;content&quot;: &quot;text&quot;&#125;</code>
            </div>
            <input
                id="dropzone-file"
                name="file"
                type="file"
                className="hidden"
                onChange={(e) => e.target.files && onChange(e.target.files[0].name)}
            />
        </label>
    </>
);
