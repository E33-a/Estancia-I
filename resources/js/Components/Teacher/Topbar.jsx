import { Link } from '@inertiajs/react';

export default function Topbar({ groups = [] }) {
    return (
        <header className="flex justify-between items-center w-full px-6 py-4 bg-surface shadow-sm sticky top-0 z-40">
            <div className="flex items-center gap-3">
                <h2 className="font-headline-md text-headline-md font-bold text-primary" style={{ fontFamily: 'Bricolage Grotesque' }}>
                    Raíces Vivas Control Center
                </h2>
                <div className="h-6 w-[1px] bg-outline-variant/50 mx-2"></div>
                <div className="relative">
                    <select 
                        defaultValue=""
                        className="bg-surface-container-low border-2 border-outline-variant rounded-lg font-label-lg text-label-lg px-4 py-2 pr-10 appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer text-on-surface"
                    >
                        <option value="" disabled>Seleccionar grupo...</option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                        expand_more
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-on-surface-variant pointer-events-none text-xl">
                        search
                    </span>
                    <input 
                        type="text"
                        placeholder="Search data..." 
                        className="bg-surface-container-lowest border-2 border-outline-variant/30 rounded-full py-2 pl-10 pr-4 focus:border-primary focus:ring-0 text-body-md w-64 transition-all outline-none"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-full">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <Link href={route('profile.edit')} className="p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-full">
                        <span className="material-symbols-outlined">account_circle</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}