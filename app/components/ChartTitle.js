export default function ChartTitle({ children }) {
    return (
        <h2 className="font-medium text-tremor-metric bg-dark-tremor-brand-faint text-white text-center py-4">
            {children}
        </h2>
    );
}