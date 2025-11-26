import React, { useState } from "react";
import { Link } from "react-router-dom";
// Componentes de iconos para la Navbar y las categorías
import { Search, User, LogOut, HelpCircle, X, Cpu, Landmark, Sigma, BookOpen } from "lucide-react"; 

// =================================================================
// 1. Navbar Component (Actualizada con las correcciones anteriores)
// =================================================================
const Navbar = ({ navItems }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    
    // Simulación de ruta activa (usar useLocation en un entorno real)
    const activePath = "/simulaciones"; 

    const closeAllPopups = () => {
        setIsSearchOpen(false);
        setIsUserMenuOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        setIsUserMenuOpen(false); 
        setIsMenuOpen(false); // Cierra el menú móvil
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        setIsSearchOpen(false); 
        setIsMenuOpen(false); // Cierra el menú móvil
    };

    return (
        <nav className="w-full bg-white shadow-lg sticky top-0 z-50">
            
            {/* Barra de Búsqueda Desplegable */}
            <div 
                className={`
                    absolute w-full p-4 bg-gray-50 border-b border-gray-200 shadow-xl z-10
                    transform transition-all duration-300 ease-out 
                    ${isSearchOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}
                `}
                style={{ top: '80px' }} // 80px es la altura del Navbar (h-20)
            >
                <div className="flex max-w-4xl mx-auto space-x-3">
                    <input
                        type="text"
                        placeholder="Escribe para buscar simulaciones, proyectos..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        onClick={toggleSearch} 
                        className="p-3 text-gray-500 hover:text-red-500 focus:outline-none focus:ring-0 bg-transparent border-none"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Contenedor Principal de la Navbar */}
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Logo */}
                    <Link to="/" className="shrink-0 hover:scale-[1.05] transition-transform duration-300">
                        {/* Usando un placeholder de texto para el logo ya que no tenemos acceso a 'src/img/...' */}
                        <div className="text-xl md:text-2xl font-black text-blue-600">
                            INGENIERÍA
                        </div>
                    </Link>

                    {/* Links desktop: Ocultar si la barra de búsqueda está abierta */}
                    <div 
                        className={`hidden md:flex md:items-center md:space-x-4 lg:space-x-8 h-full transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`relative h-full flex items-center px-2 font-medium text-sm lg:text-base transition-all duration-300 ease-in-out ${activePath === item.path ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-500 hover:border-b-2 hover:border-blue-300 border-b-2 border-transparent"}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Iconos y mobile menu */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        
                        {/* 1. Icono Búsqueda: Añadir focus:outline-none y bg-transparent */}
                        <button 
                            onClick={toggleSearch} 
                            className={`hidden md:flex items-center justify-center p-3 hover:bg-gray-100 rounded-full transition-colors duration-300 focus:outline-none focus:ring-0 bg-transparent border-none ${isSearchOpen ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                        >
                            <Search className="w-5 h-5"/>
                        </button>

                        {/* 2. Icono Perfil: Añadir focus:outline-none y bg-transparent */}
                        <div className="relative hidden md:block">
                            <button 
                                onClick={toggleUserMenu} 
                                className={`items-center justify-center p-3 hover:bg-gray-100 rounded-full transition-colors duration-300 focus:outline-none focus:ring-0 bg-transparent border-none ${isUserMenuOpen ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                            >
                                <User className="w-5 h-5"/>
                            </button>

                            {/* Menú Desplegable (Dropdown) */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl py-1 animate-fade-in z-20 border border-gray-100">
                                    <Link to="/login" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeAllPopups}>
                                        <LogOut className="w-4 h-4 mr-2"/> Iniciar Sesión
                                    </Link>
                                    <Link to="/ayuda" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeAllPopups}>
                                        <HelpCircle className="w-4 h-4 mr-2"/> Ayuda / Soporte
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-3 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-300 bg-transparent border-none"
                            onClick={() => { setIsMenuOpen(!isMenuOpen); closeAllPopups(); }}
                            aria-label="Abrir menú"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)} // Cierra el menú al hacer clic
                            className={`block px-3 py-2 rounded-md text-base font-medium ${activePath === item.path ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {/* Opciones de usuario en móvil */}
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-t mt-2">
                        <LogOut className="w-5 h-5 mr-2"/> Iniciar Sesión
                    </Link>
                </div>
            )}
        </nav>
    );
};


// =================================================================
// 2. CategoryBox Component (Recreado como función interna)
// =================================================================
const CategoryBox = ({ title, icon: Icon, path, description }) => (
    <Link 
        to={path} 
        className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center border-t-4 border-blue-600/70"
    >
        <div className="p-4 bg-blue-100 rounded-full inline-flex mx-auto mb-4">
            <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </Link>
);

// =================================================================
// 3. HOME Component (Estructura Principal)
// =================================================================
const Home = () => {
    // Definición de ítems para la Navbar y las categorías
    const navItems = [
        { name: "Simulaciones", path: "/simulaciones" },
        { name: "Aplicaciones Móviles", path: "/appmovil" },
        { name: "Proyecto Investigación", path: "/investigaciones" },
        { name: "Podcast", path: "/podcast" },
    ];

    const categories = [
        { title: "Simulaciones", icon: Cpu, path: "/simulaciones", description: "Modelos interactivos de física e ingeniería." },
        { title: "Investigación", icon: BookOpen, path: "/investigaciones", description: "Publicaciones y proyectos de la facultad." },
        { title: "Matemáticas", icon: Sigma, path: "/matematicas", description: "Herramientas y guías para el cálculo avanzado." },
    ];
    
    // Placeholder para imágenes (usaremos Placehold.co ya que las rutas locales fallarán)
    const heroImage = "https://placehold.co/1200x500/3C64C9/ffffff?text=HERO+Academico";
    const aboutImage = "https://placehold.co/600x400/2a4fa2/ffffff?text=Quienes+Somos";

    return (
        <div className="w-full min-h-screen overflow-x-hidden bg-gray-50 font-sans">
            <Navbar navItems={navItems} />

            {/* 1. Sección Hero (Simulación de Carrusel Estático) */}
            <header className="hero w-full relative h-[300px] sm:h-[450px] md:h-[600px] overflow-hidden shadow-lg">
                <div className="relative w-full h-full">
                    <img
                        src={heroImage}
                        alt="Fondo de Ingeniería"
                        className="w-full h-full object-cover object-center"
                        // Fallback de imagen en caso de error (aunque placehold debería funcionar)
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x500/4F46E5/ffffff?text=Academia+de+Ingenieria"; }}
                    />
                    {/* Overlay para mejor contraste de texto */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-0" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center text-white z-10">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                            Innovación y Excelencia en Ingeniería
                        </h1>
                        <p className="text-base sm:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                            Explora nuestras simulaciones interactivas, proyectos de investigación de vanguardia y recursos académicos.
                        </p>
                        <Link
                            to="/simulaciones"
                            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.03]"
                        >
                            Ir a Simulaciones
                        </Link>
                    </div>
                </div>
            </header>

            {/* 2. Sección de Categorías (Usando CategoryBox interno) */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                    Nuestras Áreas de Enfoque
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, index) => (
                        <CategoryBox
                            key={index}
                            title={cat.title}
                            icon={cat.icon}
                            path={cat.path}
                            description={cat.description}
                        />
                    ))}
                </div>
            </section>

            {/* 3. Sección Quiénes Somos (Con diseño de onda) */}
            <section
                className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-4 text-white"
                style={{
                    clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)',
                    marginTop: '5rem',
                    marginBottom: '5rem'
                }}
            >
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <h3 className="text-4xl font-extrabold mb-6 leading-tight">
                            ¿Quiénes somos?
                        </h3>
                        <p className="text-xl mb-8 leading-relaxed opacity-90">
                            Somos la Facultad de Ingeniería, comprometida con la formación de líderes y el avance de la ciencia y la tecnología en la región. Nuestra misión es transformar el futuro a través de la educación de calidad.
                        </p>
                        <Link
                            to="/quienes-somos"
                            className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer hover:scale-[1.05] inline-block"
                        >
                            Conoce más
                        </Link>
                    </div>
                    <div className="lg:w-1/2 mt-8 lg:mt-0">
                        <div className="relative rounded-xl overflow-hidden shadow-2xl">
                            <img
                                src={aboutImage}
                                alt="Edificio de la Universidad"
                                className="w-full h-auto object-cover transform hover:scale-105 transition duration-500"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/3C64C9/ffffff?text=Edificio"; }}
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Footer */}
            <footer className="bg-gray-900 text-white pt-16 pb-8 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Columna 1: Información de Contacto */}
                    <div className="md:col-span-1">
                        <h4 className="text-2xl font-bold mb-4 text-blue-300">Ingeniería</h4>
                        <p className="mb-2 text-sm text-gray-400">Calle Ficticia No. 10-20, Popayán, Colombia</p>
                        <p className="mb-2 text-sm text-gray-400">PBX: (602) 555-5555</p>
                        <p className="mb-4 text-sm text-gray-400">Email: contacto@uniautonoma.edu</p>
                    </div>

                    {/* Columna 2: Enlaces rápidos */}
                    <div className="md:col-span-1">
                        <h4 className="text-xl font-semibold mb-4">Secciones</h4>
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.name}><Link to={item.path} className="hover:text-blue-300 transition text-gray-400 hover:text-white">{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 3: Explorar */}
                    <div className="md:col-span-1">
                        <h4 className="text-xl font-semibold mb-4">Explorar</h4>
                        <ul className="space-y-2">
                            {categories.map((cat) => (
                                <li key={cat.title}><Link to={cat.path} className="hover:text-blue-300 transition text-gray-400 hover:text-white">{cat.title}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 4: Síguenos */}
                    <div className="md:col-span-1">
                        <h4 className="text-xl font-semibold mb-4">Síguenos</h4>
                        <div className="flex space-x-4">
                            {/* Iconos de Redes Sociales (SVG) */}
                            {/* Facebook */}
                            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                                <span className="sr-only">Facebook</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </a>
                            {/* Instagram */}
                            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>

                </div>

                <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-800 text-center">
                    <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Ingeniería Autónoma. Todos los derechos reservados. | Desarrollado por la Facultad de Ingeniería</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;