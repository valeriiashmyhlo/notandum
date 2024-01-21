type InputProps = {
    name: string;
    placeholder: string;
    required: boolean;
    type: string;
    label: string;
    componentType?: 'textarea' | 'input';
};

export const Input: React.FC<InputProps> = ({ name, placeholder, required, type, label, componentType = 'input' }) => (
    <div className="relative w-full mr-3">
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
            {label}
        </label>
        {componentType === 'textarea' ? (
            <textarea
                id={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5"
                name={name}
                placeholder={placeholder}
                required={required}
            />
        ) : (
            <input
                id={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5"
                name={name}
                placeholder={placeholder}
                required={required}
                type={type}
            />
        )}
    </div>
);
