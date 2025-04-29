export default function FileUpload({ onChange, error }) {
    return (
        <div>
            <label className="font-semibold">Logo da empresa</label>
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
                className="w-full border-2 border-dashed border-gray-300 rounded-md p-2 cursor-pointer"
            />
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    )
}