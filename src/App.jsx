import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Code2, Sparkles, Zap, ArrowRight, Heart } from 'lucide-react';


export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ['продающий', 'безупречный', 'мощный', 'ваш'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 80 : 180;
    const pause = isDeleting ? 0 : 2500;

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => setIsDeleting(true), pause);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 300);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(currentWord.substring(0, isDeleting ? charIndex - 1 : charIndex + 1));
      setCharIndex((prev) => isDeleting ? prev - 1 : prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);


  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-body selection:bg-emerald-400 selection:text-zinc-900 overflow-hidden">
      {/* Кастомные стили и шрифты для сложной типографики */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Unbounded:wght@500;700;900&display=swap');
        
        .font-display { font-family: 'Unbounded', sans-serif; }
        .font-body { font-family: 'Manrope', sans-serif; }
        
        /* Эффект контурного текста */
        .text-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
          color: transparent;
          transition: all 0.4s ease;
        }
        .text-outline:hover {
          color: #fff;
          -webkit-text-stroke: 1px transparent;
          text-shadow: 0 0 20px rgba(255,255,255,0.5);
        }


        /* Эффект маркера */
        .marker-highlight {
          position: relative;
          display: inline-block;
          color: #09090b;
          z-index: 1;
          padding: 0 0.2em;
        }
        .marker-highlight::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -2%;
          width: 104%;
          height: 110%;
          background: #34d399; /* Emerald 400 */
          z-index: -1;
          transform: translateY(-50%) rotate(-2deg);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .marker-highlight:hover::before {
          transform: translateY(-50%) rotate(1deg) scale(1.05);
          background: #a855f7; /* Purple 500 */
        }
        .marker-highlight:hover {
          color: white;
        }


        /* Бегущая строка */
        .marquee-wrapper {
          display: flex;
          overflow: hidden;
        }
        .marquee-container {
          display: flex;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }


        /* Волнистое подчеркивание и другие эффекты */
        .wavy-underline {
          text-decoration: underline;
          text-decoration-style: wavy;
          text-decoration-color: #f43f5e; /* Rose 500 */
          text-decoration-thickness: 3px;
          text-underline-offset: 6px;
        }
        
        /* Глитч-линия при наведении */
        .hover-line-through {
          position: relative;
        }
        .hover-line-through::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 0%;
          height: 4px;
          background-color: #f43f5e;
          transition: width 0.4s ease;
        }
        .hover-line-through:hover::after {
          width: 100%;
        }


        /* Печатная машинка */
        .typewriter-cursor {
          display: inline-block;
          width: 3px;
          background: #34d399;
          animation: blink 0.8s step-end infinite;
          margin-left: -2px;
          position: relative;
          top: -0.05em;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Эффект шума на фоне */
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
      `}} />


      <div className="fixed inset-0 pointer-events-none bg-noise z-50 mix-blend-overlay"></div>


      {/* Навигация */}
      <nav className={`fixed w-full top-0 z-40 transition-all duration-300 border-b ${scrolled ? 'bg-[#09090b]/80 backdrop-blur-md border-zinc-800 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="font-display font-black text-2xl tracking-tighter flex items-center gap-2">
            VEXIO <span className="text-emerald-400 text-sm font-body font-bold px-2 py-1 border border-emerald-400 rounded-full">HR</span>
          </div>
          <div className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-widest">
            <a href="#culture" className="hover:text-emerald-400 transition-colors hover:-translate-y-1 transform inline-block">Культура</a>
            <a href="#vacancies" className="hover:text-purple-400 transition-colors hover:-translate-y-1 transform inline-block">Вакансии</a>
            <a href="#benefits" className="hover:text-rose-400 transition-colors hover:-translate-y-1 transform inline-block">Плюшки</a>
          </div>
          <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-emerald-400 hover:scale-105 transition-all">
            Написать нам
          </button>
        </div>
      </nav>


      {/* Hero Section */}
      <header className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-32 pb-20">
        <div className="max-w-5xl">
          <p className="text-emerald-400 font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
            <Zap size={20} className="fill-emerald-400" />
            Vexio Careers
          </p>
          <h1 className="text-[12vw] sm:text-7xl md:text-[6.5rem] leading-[0.9] font-display font-black uppercase tracking-tighter">
            Мы пишем <span className="text-outline inline-block text-left min-w-[10ch]">{displayText || 'продающий'}<span className="typewriter-cursor">&nbsp;</span></span> код <br />
            и ищем <span className="marker-highlight">своих</span> людей
          </h1>
          <p className="mt-12 text-xl md:text-2xl text-zinc-400 max-w-2xl font-medium leading-relaxed">
            В Vexio нет микроменеджмента и унылых задач. Мы создаем сайты, которые получают награды, и сервисы, которыми пользуются миллионы. <span className="text-white border-b-2 border-emerald-400 hover:bg-emerald-400 hover:text-black transition-all cursor-pointer">Присоединяйся к нам.</span>
          </p>
        </div>
        
        <div className="mt-20 flex gap-4 animate-bounce">
          <ArrowDown />
        </div>
      </header>


      {/* Бегущая строка */}
      <div className="bg-emerald-400 text-zinc-900 py-6 transform -rotate-2 scale-110 mb-20 border-y-4 border-black z-10 relative shadow-2xl">
        <div className="marquee-wrapper">
          <div className="marquee-container font-display font-black text-4xl md:text-6xl uppercase tracking-tight w-max">
            {/* Блок 1 */}
            <div className="flex items-center gap-8 md:gap-16 px-4 md:px-8">
              <span>Удаленка</span> <Sparkles className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
              <span>Гибкий график</span> <Sparkles className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
              <span>Современный стек</span> <Sparkles className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
              <span>ДМС</span> <Sparkles className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
              <span className="line-through opacity-50">Бюрократия</span> <Sparkles className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
            </div>
            {/* Блок 2 (Дубликат для бесшовного скролла) */}
            <div className="flex items-center gap-8 md:gap-16 px-4 md:px-8">
              <span>Удаленка</span> <Sparkles className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
              <span>Гибкий график</span> <Sparkles className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
              <span>Современный стек</span> <Sparkles className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
              <span>ДМС</span> <Sparkles className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
              <span className="line-through opacity-50">Бюрократия</span> <Sparkles className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>


      {/* Культура & Ценности */}
      <section id="culture" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-display font-black mb-16 uppercase">
          Почему <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400">именно мы?</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-xl md:text-3xl leading-snug font-medium">
          <div>
            Забудь про <span className="hover-line-through text-zinc-500">душные митинги</span> по утрам. Мы ценим <span className="wavy-underline text-white">результат</span>, а не время, проведенное за монитором. Наш код чист, а совесть еще чище.
          </div>
          <div>
            Мы любим <span className="marker-highlight bg-rose-400">эксперименты</span>. Ошибаться можно и нужно. У каждого в команде есть право голоса, независимо от грейда. Твоя идея может стать основой следующего <span className="italic text-purple-400">крупного релиза</span>.
          </div>
        </div>
      </section>


      {/* Вакансии */}
      <section id="vacancies" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase">
            Горящие <br/> <span className="text-outline">вакансии</span>
          </h2>
          <p className="text-zinc-400 max-w-sm text-lg">Не нашел свою роль? Отправь резюме на <a href="#" className="text-emerald-400 underline decoration-2 underline-offset-4 hover:bg-emerald-400 hover:text-black transition-all">hr@vexio.dev</a>, мы всегда в поиске талантов.</p>
        </div>


        <div className="flex flex-col border-b border-zinc-800">
          <JobCard 
            title="Senior Frontend Engineer" 
            stack="React / TypeScript / Three.js" 
            tag="Удаленка" 
            color="hover:bg-emerald-400"
          />
          <JobCard 
            title="UX/UI Designer" 
            stack="Figma / Animations / UX Research" 
            tag="Офис / Гибрид" 
            color="hover:bg-purple-500"
          />
          <JobCard 
            title="Middle Backend Developer" 
            stack="Node.js / PostgreSQL / Redis" 
            tag="Удаленка" 
            color="hover:bg-rose-500"
          />
          <JobCard 
            title="Project Manager" 
            stack="Agile / Смысл / Здравый смысл" 
            tag="Удаленка" 
            color="hover:bg-blue-500"
          />
        </div>
      </section>


      {/* Footer / CTA */}
      <footer className="py-32 px-6 text-center bg-zinc-950 relative overflow-hidden">
        {/* Декоративные элементы на фоне */}
        <div className="absolute top-10 left-10 text-zinc-900 opacity-20">
          <Code2 size={120} />
        </div>
        <div className="absolute bottom-10 right-10 text-zinc-900 opacity-20">
          <Heart size={120} />
        </div>


        <h2 className="text-6xl md:text-[8rem] font-display font-black uppercase tracking-tighter mb-10">
          Готов <span className="italic font-light text-zinc-500">к</span> <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-purple-400 to-rose-400">лучшей работе?</span>
        </h2>
        
        <button className="group relative inline-flex items-center justify-center px-12 py-6 text-2xl font-bold text-black bg-white rounded-full overflow-hidden transition-transform hover:scale-105">
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
          <span className="relative flex items-center gap-4">
            Отправить резюме 
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </span>
        </button>
        
        <p className="mt-16 text-zinc-500 font-medium">
          © {new Date().getFullYear()} Vexio Studio. All code and bugs reserved.
        </p>
      </footer>
    </div>
  );
}


// Компонент карточки вакансии
function JobCard({ title, stack, tag, color }) {
  return (
    <div className={`group relative flex flex-col md:flex-row justify-between md:items-center p-8 border-t border-zinc-800 transition-colors duration-300 cursor-pointer ${color} hover:text-black`}>
      <div className="z-10">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 border border-current rounded-full">
            {tag}
          </span>
        </div>
        <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-zinc-400 group-hover:text-black/70 font-medium text-lg font-mono">
          {stack}
        </p>
      </div>
      
      <div className="mt-6 md:mt-0 z-10 flex items-center gap-4">
        <span className="font-bold uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
          Откликнуться
        </span>
        <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all transform group-hover:scale-110 group-hover:-rotate-45">
          <ArrowUpRight size={32} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}


// Простая иконка стрелки вниз
function ArrowDown() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  );
}
