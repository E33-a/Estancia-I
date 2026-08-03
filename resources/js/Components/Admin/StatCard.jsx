export default function StatCard({ title, value, icon, variant = 'default', badge }) {
    if (variant === 'highlight') {
        return (
            <div className="bg-primary p-lg rounded-xl sunset-shadow-lg text-on-primary flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-start">
                    <div className="p-sm bg-white/20 rounded-lg text-white">
                        <span className="material-symbols-outlined">{icon}</span>
                    </div>
                </div>
                <div className="mt-lg">
                    <p className="font-label-lg text-label-lg opacity-80 uppercase tracking-wider">{title}</p>
                    <p className="font-display-lg text-display-lg mt-xs">
                        {value} {badge && <span className="text-lg font-normal">{badge}</span>}
                    </p>
                </div>
            </div>
        );
    }

    const iconColorMap = {
        primary: 'bg-primary-container/10 text-primary',
        tertiary: 'bg-tertiary-container/10 text-tertiary',
        secondary: 'bg-secondary-container/20 text-secondary'
    };

    return (
        <div className="bg-surface-container-lowest p-lg rounded-xl sunset-shadow border border-outline-variant flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start">
                <div className={`p-sm rounded-lg ${iconColorMap[variant] || iconColorMap.primary}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
            </div>
            <div className="mt-lg">
                <p className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">{title}</p>
                <p className="font-display-lg text-display-lg mt-xs">{value}</p>
            </div>
        </div>
    );
}