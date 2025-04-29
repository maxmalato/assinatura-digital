export default function InputField({ label, type, value, onChange, placeholder, error }) {
    return (
        <div>
            <label className="font-semibold">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder={placeholder}
                maxLength={type === 'text' ? 50 : type === 'email' ? 50 : 30}
            />
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    )
}