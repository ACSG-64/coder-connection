export function CardsGridContainer({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div
            className="mx-auto grid max-w-screen-xl auto-rows-auto grid-cols-3 gap-5"
            style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
            }}
        >
            {children}
        </div>
    )
}
