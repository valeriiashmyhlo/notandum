import Link from 'next/link';

type BackButtonProps = {
    href: string;
    children?: React.ReactNode;
    className?: string;
};

export const BackButton: React.FC<BackButtonProps> = (props) => {
    return (
        <Link href={props.href} className="flex items-center font-medium text-blue-600 hover:underline mb-3">
            <svg className="w-3 h-3 ms-2 mr-1 rotate-180" aria-hidden="true" fill="none" viewBox="0 0 14 10">
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                />
            </svg>
            {props.children}
        </Link>
    );
};
