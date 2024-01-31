type ButtonProps = {
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ children, type, className, disabled }) => (
    <button
        type={type}
        className={`text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className} ${
            disabled ? 'cursor-not-allowed bg-blue-400' : 'cursor-pointer'
        }`}
        disabled={disabled}
    >
        <span
        // className="px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
        >
            {children}
        </span>
    </button>
);
