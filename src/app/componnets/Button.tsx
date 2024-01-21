type ButtonProps = {
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
};

export const Button: React.FC<ButtonProps> = ({ children, type, className }) => (
    <button type={type} className={className}>
        <span className="px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">
            {children}
        </span>
    </button>
);
