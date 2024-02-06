type ButtonProps = {
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ children, type, className, disabled }) => (
    <button
        type={type}
        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-800 ${className} ${
            disabled ? 'cursor-not-allowed bg-blue-400' : 'cursor-pointer bg-blue-700'
        }`}
        disabled={disabled}
    >
        {children}
    </button>
);
