import React, { useState } from "react";
import { Mail, Lock, LogIn, Loader, XCircle, CheckCircle } from "lucide-react";

const Login = () => {
    // Estados para los campos del formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Estados para el feedback del usuario
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Función que simula el proceso de inicio de sesión
    const handleSubmit = (e) => {
        e.preventDefault();

        // Limpiar mensajes anteriores
        setError(null);
        setSuccessMessage(null);

        // Validación simple
        if (!email || !password) {
            setError("Por favor, ingresa tu correo electrónico y contraseña.");
            return;
        }

        setIsLoading(true);

        // --- SIMULACIÓN DE LLAMADA API (Reemplaza alert()) ---
        setTimeout(() => {
            setIsLoading(false);

            // Simulación de éxito (puedes cambiar esta lógica)
            if (email.includes("@") && password.length >= 6) {
                setSuccessMessage(`¡Inicio de sesión exitoso! Bienvenido/a, ${email}.`);
                // En una aplicación real, aquí se usaría useNavigate para redirigir a la página principal.
                setEmail(""); // Limpia el formulario si tiene éxito
                setPassword("");
            } else {
                setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
            }
        }, 1500); 
    };

    // Función para manejar el cambio en los inputs
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 font-sans">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-10"></div>
            
            <form
                onSubmit={handleSubmit}
                className="relative bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md transform transition-all duration-300 hover:shadow-3xl border border-gray-100"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <LogIn className="w-8 h-8 text-blue-600" />
                    </div>
                </div>

                <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
                    Acceso a la Academia
                </h2>

                {/* Mensajes de Feedback */}
                {error && (
                    <div className="flex items-center p-3 mb-4 text-sm font-medium text-red-700 bg-red-100 rounded-lg" role="alert">
                        <XCircle className="w-5 h-5 mr-2" />
                        <span>{error}</span>
                    </div>
                )}
                {successMessage && (
                    <div className="flex items-center p-3 mb-4 text-sm font-medium text-green-700 bg-green-100 rounded-lg" role="alert">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Campo de Correo Electrónico */}
                <div className="mb-6">
                    <label htmlFor="email" className="sr-only">Correo electrónico</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Correo electrónico académico"
                            value={email}
                            onChange={handleEmailChange}
                            disabled={isLoading}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-75 disabled:bg-gray-50"
                            required
                        />
                    </div>
                </div>

                {/* Campo de Contraseña */}
                <div className="mb-8">
                    <label htmlFor="password" className="sr-only">Contraseña</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="Contraseña (mín. 6 caracteres)"
                            value={password}
                            onChange={handlePasswordChange}
                            disabled={isLoading}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-75 disabled:bg-gray-50"
                            required
                        />
                    </div>
                </div>

                {/* Botón de Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader className="w-5 h-5 mr-2 animate-spin" />
                            Cargando...
                        </>
                    ) : (
                        "Entrar"
                    )}
                </button>
                
                <p className="mt-6 text-center text-sm text-gray-500">
                    <a href="/recuperar-contrasena" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        ¿Olvidaste tu contraseña?
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;