import InputError from '@/Components/InputError';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, onSuccess }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            onSuccess: () => onSuccess && onSuccess()
        });
    };

    return (
        <section className="space-y-4">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-on-surface-variant mb-1">Nombre Completo</label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border-2 border-outline-variant focus:border-primary focus:ring-0 font-body-md text-sm bg-transparent"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError className="mt-1" message={errors.name} />
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-on-surface-variant mb-1">Correo Electrónico</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border-2 border-outline-variant focus:border-primary focus:ring-0 font-body-md text-sm bg-transparent"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError className="mt-1" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-3 bg-error-container rounded-lg text-xs text-on-error-container">
                        Tu dirección de correo electrónico no está verificada.
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="underline block mt-1 hover:text-primary font-bold"
                        >
                            Haz clic aquí para volver a enviar el correo de verificación.
                        </Link>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-green-600">
                                Se ha enviado un nuevo enlace de verificación a tu correo.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="bg-primary hover:bg-primary-container text-white font-bold py-2 px-6 rounded-lg text-sm transition-all disabled:opacity-50"
                        style={{ fontFamily: 'Bricolage Grotesque' }}
                    >
                        Guardar Cambios
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs font-bold text-secondary flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span> Guardado correctamente.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}