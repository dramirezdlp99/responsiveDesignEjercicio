'use client'; 

import React, { Component } from 'react';

// ===============================================
// 1. DEFINICIÓN DE INTERFACES (TypeScript y POO)
// ===============================================

// Interfaz para las propiedades de MenuItem
interface MenuItemProps {
  label: string;
  isActive?: boolean;
}

// Interfaz para las propiedades de ProfileCircle
interface ProfileCircleProps {
  name: string;
  size?: number;
  isBordered?: boolean;
}

// Interfaz para el Estado del componente Home (el estado gestiona el tema)
interface HomeState {
  theme: 'light' | 'dark';
  isClient: boolean;
}

// ===============================================
// 2. COMPONENTES DE CLASE (POO)
// ===============================================

// Componente de Clase para el Logo
class Logo extends Component<{}> {
  render() {
    return (
      // Se adapta al tema
      <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 transition-colors duration-300">
        Netflix<span className="text-red-600">.</span>
      </h1>
    );
  }
}

// Componente de Clase para los ítems del menú de navegación
class MenuItem extends Component<MenuItemProps> {
  render() {
    const { label, isActive = false } = this.props;

    return (
      <div className={`flex items-center gap-3 cursor-pointer p-2 relative transition-colors duration-200
        ${isActive 
          ? 'text-red-600 font-semibold' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}>
        {isActive && (
          <div className="w-1 h-5 bg-red-600 rounded-full absolute -left-4"></div>
        )}
        <span className="text-sm">{label}</span>
      </div>
    );
  }
}

// Componente de Clase para los círculos de perfil/usuario
class ProfileCircle extends Component<ProfileCircleProps> {
  render() {
    const { name, size = 10, isBordered = true } = this.props;

    return (
      <div className={`flex-shrink-0 w-${size} h-${size} relative`}>
        {/* La extensión (.png o .jpg) debe coincidir con el archivo guardado en /public */}
        <img
          src={`/${name}`}
          alt={name}
          // Adaptamos el borde al tema y usamos un fondo sutil para simular una imagen no cargada
          className={`rounded-full object-cover w-full h-full 
            ${isBordered ? 'border-2 border-white dark:border-gray-800' : ''} 
            bg-gray-300 dark:bg-gray-600 shadow-sm`}
          // Fallback: Si la imagen falla, solo se muestra el fondo gris/oscuro sin texto
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            // Quitamos la fuente para que solo se vea el fondo de color del className
            target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; 
          }}
        />
      </div>
    );
  }
}

// Componente de Clase principal: Home
export default class Home extends Component<{}, HomeState> {
  
  constructor(props: {}) {
    super(props);
    this.state = {
      theme: 'dark', // Iniciamos en tema oscuro por defecto según la imagen
      isClient: false,
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  // Lógica para aplicar el tema al DOM
  applyTheme(theme: 'light' | 'dark') {
    if (typeof window !== 'undefined') {
        const root = document.documentElement;
        root.classList.remove('light', 'dark'); // Limpiar clases anteriores
        root.classList.add(theme); // Aplicar la nueva clase
        localStorage.setItem('theme', theme); // Persistir el tema
    }
  }

  // Se ejecuta al montar el componente (para inicializar el tema)
  componentDidMount() {
    this.setState({ isClient: true });

    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      
      let initialTheme: 'light' | 'dark' = 'dark'; // Por defecto oscuro
      
      if (storedTheme === 'dark' || storedTheme === 'light') {
        initialTheme = storedTheme;
      } 
      
      this.setState({ theme: initialTheme }, () => {
          this.applyTheme(initialTheme); // Aplica el tema inicial al <html>
      });
    }
  }

  // Se ejecuta al actualizar el componente (para cambiar el tema)
  componentDidUpdate(_: {}, prevState: Readonly<HomeState>) {
    if (this.state.isClient && prevState.theme !== this.state.theme) {
      this.applyTheme(this.state.theme); // Aplica el nuevo tema al <html>
    }
  }
  
  // Método de la clase (comportamiento) para cambiar el estado del tema
  toggleTheme() {
    this.setState(prevState => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  }

  render() {
    const { theme } = this.state;
    const isDark = theme === 'dark';
    
    // Componentes de función interna para los íconos (SOLO SVG PERMITIDOS AQUÍ)
    const SunIcon = () => (
      <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
      </svg>
    );

    const MoonIcon = () => (
      <svg className="w-6 h-6 text-gray-500 dark:text-gray-100 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
      </svg>
    );
    
    // Datos para las Parties (SOLO 4 elementos en total)
    const partyData = [
      // Nombres terminados en .png
      { title: "Cadaver", subtitle: "Horror marathon", users: ["cadaver_user_1.png", "cadaver_user_2.png", "cadaver_user_3.png"] },
      { title: "Bladerunner 2049", subtitle: "Sci fi binge", users: ["bladerunner_user_1.png", "bladerunner_user_2.png", "bladerunner_user_3.png"] },
      { title: "Monsters Inc.", subtitle: "Don't make me grow up", users: ["monsters_inc_user_1.png", "monsters_inc_user_2.png"] },
      { title: "Friends", subtitle: "We were on a break!", users: ["friends_user_1.png", "friends_user_2.png", "friends_user_3.png"] },
    ];

    // Datos para Continue Watching (SOLO 4 elementos)
    const continueWatchingData = [
      // Nombres terminados en .jpg
      { title: "Haunting of Hill House", img: "cw_hillhouse.jpg", xp: "10XP" },
      { title: "Ratched", img: "cw_ratched.jpg", xp: "10XP" },
      { title: "El Camino", img: "cw_elcamino.jpg", xp: null },
      { title: "Stranger Things", img: "cw_strangerthings.jpg", xp: "10XP" },
    ];


    return (
      // Contenedor principal: Se utiliza grid para definir la estructura de 3 columnas
      <div className="font-sans min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 sm:p-8 md:p-10 mx-auto max-w-[1500px] 
        grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)_100px] xl:grid-cols-[240px_minmax(0,1fr)_100px] gap-6 lg:gap-8 transition-colors duration-300">
        
        {/* 1. Left Sidebar (Menú Principal) */}
        <aside className="col-span-1 lg:col-span-1 flex flex-col gap-8 p-4 sticky top-0 h-full lg:h-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-black/50">
          
          <div>
            <div className="mb-6">
              <Logo />
            </div>
            
            <nav className="flex flex-col gap-6">
              
              <p className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold tracking-wider">Menu</p>
              <MenuItem label="Browse" isActive={true} />
              <MenuItem label="Watchlist" />
              <MenuItem label="Coming soon" />

              <div className="mt-4">
                <p className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold tracking-wider mb-2">Social</p>
                <MenuItem label="Friends" />
                <MenuItem label="Parties" />
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold tracking-wider mb-2">General</p>
                <MenuItem label="Settings" />
                {/* Log Out reubicado justo debajo de Settings */}
                <MenuItem label="Log out" />
              </div>
            </nav>
          </div>
        </aside>

        {/* 2. Main Content Area */}
        <main className="col-span-1 lg:col-span-1 flex flex-col gap-8 bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-black/50">
          
          {/* Header de la sección principal (SÓLO FLECHAS) */}
          <header className="flex justify-start items-center p-2">
            
            {/* Navegación de Flechas */}
            <div className="flex items-center gap-4">
              {/* Íconos SVG permitidos */}
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-300 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              <svg className="w-5 h-5 text-gray-300 dark:text-gray-600 cursor-not-allowed" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </header>

          {/* Sección Principal de Contenido (The Witcher) */}
          <section className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-gray-800">
            
            {/* Imagen Principal - NOMBRE DE ARCHIVO: witcher_hero.jpg */}
            <img
              src="/witcher_hero.jpg"
              alt="The Witcher Series"
              // Usamos object-position para centrar a Geralt, si es necesario
              className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.4]" 
              // Fallback para la imagen de The Witcher
              onError={(e) => (e.currentTarget.style.filter = 'brightness(0.6)')}
            />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
              
              <div className="flex justify-between items-center">
                
                {/* Info de XP y Amigos */}
                <div className="flex items-center gap-3 text-sm bg-black/50 p-1 px-4 rounded-full backdrop-blur-sm">
                  <span className="text-xs font-semibold">10 XP / episode</span>
                  
                  <div className="flex -space-x-2">
                    {/* Avatares de Amigos - NOMBRES DE ARCHIVO: amigo_watch_1.png, amigo_watch_2.png, amigo_watch_3.png */}
                    <ProfileCircle name="amigo_watch_1.png" size={6} isBordered={false} />
                    <ProfileCircle name="amigo_watch_2.png" size={6} isBordered={false} />
                    <ProfileCircle name="amigo_watch_3.png" size={6} isBordered={false} />
                  </div>
                  <span className="text-xs text-gray-300">+5 friends are watching</span>
                </div>
                
                {/* Círculos de Avatares en la Esquina Superior Derecha - NOMBRES DE ARCHIVO: witcher_person_1.png, witcher_person_2.png, witcher_person_3.png */}
                <div className="flex -space-x-4">
                  <ProfileCircle name="witcher_person_1.png" size={10} />
                  <ProfileCircle name="witcher_person_2.png" size={10} />
                  <ProfileCircle name="witcher_person_3.png" size={10} />
                </div>
              </div>
              
              {/* Título y Botones */}
              <div className="flex flex-col gap-2">
                <h2 className="text-6xl font-extrabold tracking-tight">The Witcher</h2>
                <p className="text-md text-gray-200">98% Match · 2 seasons</p>
                
                <div className="flex gap-4 mt-4">
                  <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-3 px-8 rounded-full shadow-lg">
                    {/* Ícono SVG permitido */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                    Watch
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 transition-colors rounded-full backdrop-blur-sm">
                    <span className="text-2xl">+</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Sección Parties (SOLO 4 Cards en total) */}
          <section>
            <h3 className="text-2xl font-bold mb-5 text-gray-800 dark:text-gray-100">Parties</h3>
            
            {/* Grid con las Party Cards. Solo 4 elementos y ajustamos el grid a 4 columnas sin filas extras. */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              {partyData.map((party, index) => (
                // Fondo de tarjeta que se adapta al tema
                <div key={index} className="flex flex-col gap-4 p-5 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 transition-shadow hover:shadow-2xl dark:hover:shadow-red-900/50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col"> 
                      <p className="font-bold text-sm text-gray-800 dark:text-gray-100">{party.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">{party.subtitle}</p>
                    </div>
                    <div className="flex -space-x-1.5">
                      {/* Avatares de las Party Cards - Nombres de archivo según partyData */}
                      {party.users.map(user => (
                        <ProfileCircle key={user} name={user} size={6} isBordered={false} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sección Continue Watching (4 Cards) */}
          <section>
            <h3 className="text-2xl font-bold mb-5 text-gray-800 dark:text-gray-100">Continue watching</h3>
            
            <div className="flex flex-wrap gap-6 justify-start">
              
              {/* Iteramos solo sobre los 4 elementos de continueWatchingData */}
              {continueWatchingData.map((item, index) => (
                <div key={index} className="flex flex-col basis-40 flex-shrink-0">
                  <div className="relative h-56 rounded-xl overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-black/50">
                    {/* Imágenes de Contenido - Nombres de archivo según continueWatchingData */}
                    <img
                      src={`/${item.img}`}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      // Fallback: Ahora si la imagen no carga, se mostrará un fondo gris sutil sin texto
                      onError={(e) => (e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#e5e7eb')}
                    />
                    {item.xp && (
                      <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-semibold p-1 px-2 rounded">{item.xp}</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold mt-2 text-center text-gray-800 dark:text-gray-100">{item.title}</p>
                </div>
              ))}
            </div>
          </section>
          
        </main>

        {/* 3. Right Sidebar (Círculos y Botón Tema) */}
        <aside className="col-span-1 lg:col-span-1 flex flex-col items-center gap-6 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-black/50">
          
          {/* Botón Plus Rojo */}
          <button className="flex items-center justify-center w-12 h-12 bg-red-600 hover:bg-red-700 transition-colors rounded-full shadow-lg text-white text-3xl font-light">
            +
          </button>
          
          {/* Botón de Modo Oscuro/Claro (simula ser un círculo más, pero con funcionalidad) */}
          <button 
            onClick={this.toggleTheme}
            className={`flex items-center justify-center w-10 h-10 ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors rounded-full shadow-lg dark:shadow-black/70`}
            title={`Cambiar a modo ${isDark ? 'Claro' : 'Oscuro'}`}
          >
            {/* Ícono SVG permitido */}
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          
          {/* Lista de Círculos de Perfil - NOMBRES DE ARCHIVO: sidebar_person_1.png ... sidebar_person_7.png */}
          <div className="flex flex-col gap-4 mt-4">
            {/* Nombres terminados en .png */}
            {Array.from({ length: 7 }, (_, i) => i + 1).map(n => (
              <ProfileCircle key={n} name={`sidebar_person_${n}.png`} size={10} isBordered={false} />
            ))}
          </div>
        </aside>
        
      </div>
    );
  }
}