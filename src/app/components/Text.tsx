export const Text = ({ children, className }: { children: string; className?: string }) => (
    <p className={className} style={{ wordBreak: 'break-word', textWrap: 'pretty' }}>
        {children}
    </p>
);
