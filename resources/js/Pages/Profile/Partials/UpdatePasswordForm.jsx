import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ onSuccess }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className="space-y-4">
            <form onSubmit={updatePassword} className="space-y-4">
                <div>
                    <label htmlFor="current_password" className="block text-xs font-semibold text-on-surface-variant mb-1">Contraseña Actual</label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        className="w-full px-4 py-2 rounded-lg border-2 border-outline-variant focus:border-secondary focus:ring-0 font-body-md text-sm bg-transparent"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                    />
                    <InputError message={errors.current_password} className="mt-1" />
                </div>

                <div>
                    <label htmlFor="password" className="block text-xs font-semibold text-on-surface-variant mb-1">Nueva Contraseña</label>
                    <input
                        id="password"
                        ref={passwordInput}
                        type="password"
                        className="w-full px-4 py-2 rounded-lg border-2 border-outline-variant focus:border-secondary focus:ring-0 font-body-md text-sm bg-transparent"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-xs font-semibold text-on-surface-variant mb-1">Confirmar Nueva Contraseña</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        className="w-full px-4 py-2 rounded-lg border-2 border-outline-variant focus:border-secondary focus:ring-0 font-body-md text-sm bg-transparent"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="bg-secondary hover:bg-on-secondary-container text-white font-bold py-2 px-6 rounded-lg text-sm transition-all disabled:opacity-50"
                        style={{ fontFamily: 'Bricolage Grotesque' }}
                    >
                        Actualizar Contraseña
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs font-bold text-secondary flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span> Actualizada.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}