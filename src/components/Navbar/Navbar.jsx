import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, LogOut, HelpCircle, X } from "lucide-react"; 
// Importar useLocation (asumiendo que estás usando react-router-dom v6)
// import { useLocation } from "react-router-dom"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // const location = useLocation(); // Descomentar en la implementación real
  // const activePath = location.pathname; 
  const activePath = "/simulaciones"; 

  const navItems = [
    { name: "Simulaciones", path: "/simulaciones" },
    { name: "Aplicaciones Móviles", path: "/appmovil" },
    { name: "Proyecto Investigación", path: "/investigaciones" },
    { name: "Podcast", path: "/podcast" },
  ];

  const closeAllPopups = () => {
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsUserMenuOpen(false); 
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsSearchOpen(false); 
  };

  return (
    <nav className="w-full bg-white shadow-lg sticky top-0 z-50">
      {/* Barra de Búsqueda Desplegable (SOLO VISIBLE CUANDO isSearchOpen es TRUE) */}
      <div 
        className={`
          absolute w-full p-4 bg-gray-50 border-b border-gray-200 shadow-xl z-10
          transform transition-all duration-300 ease-out 
          ${isSearchOpen ? 'top-20 opacity-100' : 'top-0 opacity-0 pointer-events-none'}
        `}
        style={{ top: isSearchOpen ? '80px' : '0' }} // Controla la posición basado en h-20
      >
        <div className="flex max-w-4xl mx-auto space-x-3">
          <input
            type="text"
            placeholder="Escribe para buscar simulaciones, proyectos..."
            className="w-full p-3 border border-gray-300 rounded-lg  focus:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={toggleSearch} 
            className="p-3 text-gray-500 hover:text-red-500 focus:outline-none focus:ring-0"
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
            <img
              src="src/img/logos autonoma_2.png"
              alt="Logo de Academia Ingeniería"
              className="h-12 md:h-14 w-auto"
            />
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
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl py-1 animate-fade-in z-20">
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
                {/* ... SVG del menú ... */}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {/* ... (mantener como está o aplicar focus:outline-none si contiene botones) ... */}
    </nav>
  );
};

export default Navbar;