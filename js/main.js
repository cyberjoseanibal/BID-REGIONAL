
const canvas = document.getElementById('matrixCanvas');
let ctx, matrixInterval;
if (canvas) {
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const letters = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%#&_(),.;:?!|{}<>[]^~";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];
  for(let x = 0; x < columns; x++) drops[x] = 1;
  function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 20, 100, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const colors = ['#BC86FF', '#5504D5', '#B1A0FE', '#468DFC'];
    ctx.font = fontSize + 'px monospace';
    for(let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.globalAlpha = 0.6 + Math.random() * 0.4;
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    ctx.globalAlpha = 1;
  }
  matrixInterval = setInterval(drawMatrix, 33);
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

const particlesEl = document.getElementById('particles');
for(let i=0;i<35;i++){
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random()*100+'%';
  p.style.animationDuration = (8+Math.random()*14)+'s';
  p.style.animationDelay = (-Math.random()*20)+'s';
  p.style.width = p.style.height = (Math.random()>0.7?3:2)+'px';
  particlesEl.appendChild(p);
}

if (window.location.hash) {
  history.replaceState(null, null, window.location.pathname + window.location.search);
}
const overlay = document.getElementById('intro-overlay');
const introFp = document.getElementById('intro-fp');
const skipBtn = document.getElementById('skip-btn');
const fpStatus = document.getElementById('fp-status');
const scanModal = document.getElementById('scanModal');
const progressBar = document.getElementById('progressBar');
const scanMsg = document.getElementById('scanMsg');

const msgs = [
  'Iniciando escaneo biométrico...',
  'Leyendo perfil biométrico...',
  'Verificando identidad digital...',
  'Acceso autorizado'
];

function enterSite(){
  overlay.classList.add('intro-reveal');
  setTimeout(() => {
    overlay.classList.add('hidden');
    document.body.style.overflow='auto';
    if(matrixInterval) clearInterval(matrixInterval);
  }, 1000);
}

function runScan(){
  scanModal.classList.add('open');
  const title = document.querySelector('.intro-title');
  const gold = document.querySelector('.intro-title-gold');
  if(title) title.classList.add('glitch-out');
  if(gold) gold.classList.add('glitch-out');
  
  progressBar.style.transition = 'none';
  progressBar.style.width = '0%';
  progressBar.offsetHeight; // Force reflow
  
  progressBar.style.transition = 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
  progressBar.style.width = '100%';
  
  scanMsg.textContent = msgs[0];
  setTimeout(() => { scanMsg.textContent = msgs[1]; }, 300);
  setTimeout(() => { scanMsg.textContent = msgs[2]; }, 700);
  setTimeout(() => { scanMsg.textContent = msgs[3]; }, 1000);
  
  setTimeout(() => {
    scanModal.classList.remove('open');
    enterSite();
  }, 1300);
}

const titleEl = document.getElementById('type-target');
if (titleEl) {
  const originalText = titleEl.textContent;
  titleEl.textContent = '';
  let charIdx = 0;
  function typeWriter() {
    if (charIdx < originalText.length) {
      titleEl.textContent += originalText.charAt(charIdx);
      charIdx++;
      setTimeout(typeWriter, 50);
    }
  }
  setTimeout(typeWriter, 600);
}

introFp.addEventListener('click',()=>{
  if(fpStatus) fpStatus.textContent='Escaneando...';
  introFp.style.pointerEvents='none';
  runScan();
});

introFp.addEventListener('touchstart',(e)=>{
  e.preventDefault();
  if(fpStatus) fpStatus.textContent='Escaneando...';
  introFp.style.pointerEvents='none';
  runScan();
},{passive:false});

skipBtn.addEventListener('click', () => {
  introFp.style.pointerEvents='none';
  skipBtn.style.pointerEvents='none';
  runScan();
});

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
document.body.style.overflow='hidden';

const heroFp=document.getElementById('heroFp');
heroFp.addEventListener('click',()=>{
  heroFp.classList.add('scanning');
  setTimeout(()=>heroFp.classList.remove('scanning'),1600);
});
heroFp.addEventListener('touchstart',(e)=>{
  e.preventDefault();
  heroFp.classList.add('scanning');
  setTimeout(()=>heroFp.classList.remove('scanning'),1600);
},{passive:false});

const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
hamburger.addEventListener('click',()=>{
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobile(){
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobile);
  });
}

const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible')}
  });
},{threshold:0.12});
reveals.forEach(r=>observer.observe(r));

const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.style.background=window.scrollY>60
    ?'rgba(5,20,100,0.97)'
    :'rgba(5,20,100,0.75)';
  navbar.style.borderBottomColor=window.scrollY>60
    ?'rgba(188,134,255,0.18)'
    :'rgba(188,134,255,0.12)';
});

const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}, { threshold: 0.15, rootMargin: '-68px 0px -30% 0px' });
sections.forEach(sec => navObserver.observe(sec));

// ═══ PROFILE DATA FOR SECRETARIAT ═══
const profilesData = {
  sg: {
    name: "Arleen De Oca",
    role: "Secretaría General",
    img: "MULTIMEDIA/secretaria_general.webp",
    bio: `<p>Es Licenciada en Negocios Internacionales por la Universidad APEC, graduada Summa Cum Laude, y profesional certificada CAPM por el Project Management Institute (PMI). Su trayectoria profesional abarca roles en entornos legales y corporativos, pero su verdadera pasión es la educación como herramienta de transformación social.</p>
          <p>Su compromiso con el servicio comunitario tiene raíces que datan desde el 2016, con participación en iniciativas de impacto como: Proyecto Observando La Arena de la UNESCO, jornadas de concientización sobre el dengue, zika y VIH-SIDA por el Ministerio de Salud Pública, jornadas de reforestación junto al Ministerio de Medioambiente de la República Dominicana, y como parte del equipo organizador de la Fundación Manos Que Dan en sus jornadas de donaciones.</p>
          <p>En el año 2016, inició su vinculación con los Modelos de las Naciones Unidas como delegada, recorrido que la llevó a convertirse en voluntaria nacional del Programa de Liderazgo Educativo de la República Dominicana (PLE-RD) en 2023, y a ejercer los cargos de Vocal Regional y Supervisora Regional de Calidad dentro de las directivas del CELIDER12.</p>
          <p>En la actualidad, Arleen tiene el honor de desempeñarse como Secretaria General del Modelo Regional de Naciones Unidas 2026 de la Regional 12, comprometida con el potencial de la juventud dominicana y con trabajar para que ese potencial encuentre espacios donde crecer.</p>`,
    funciones: `<ul class="profile-list-items">
                  <li class="profile-list-item">Dirigir y coordinar, bajo la supervisión del PLE-RD, todo el proceso de organización y desarrollo del MR2026.</li>
                  <li class="profile-list-item">Liderar a las Secretarías Generales Adjuntas y a los distintos equipos de trabajo, velando por el cumplimiento eficiente de sus responsabilidades.</li>
                  <li class="profile-list-item">Elaborar el programa y la agenda oficial del evento.</li>
                  <li class="profile-list-item">Supervisar la preparación de documentos, materiales y guías necesarias para el desarrollo del modelo.</li>
                  <li class="profile-list-item">Coordinar los talleres formativos y las actividades de capacitación destinadas a los delegados.</li>
                  <li class="profile-list-item">Tomar decisiones de contingencia en situaciones imprevistas, garantizando la estabilidad y el buen desarrollo del evento en todo momento.</li>
                </ul>`,
    expectativas: `<p>Desde la Secretaría General, esperamos que el MR2026 sea un espacio donde las ideas de nuestros delegados trasciendan el debate y se conviertan en propuestas capaces de responder a los desafíos del mundo actual. Más allá de la organización y la logística, nuestra meta es impulsar una generación de jóvenes que comprenda que sus voces tienen valor y que, cuando se fundamentan en el diálogo, el análisis y la cooperación, pueden transformarse en soluciones globales.</p>
                   <p>Mi expectativa principal para el MR2026 R12 es simple: que cada delegado salga de ese auditorio sintiéndose protagonista de algo que valió la pena. Para lograrlo, la organización efectiva es el punto de partida. Esperamos que el evento inicie a tiempo, que las sesiones de trabajo se desarrollen con orden y fluidez, y que cerremos el día dentro del horario establecido. Una de mis metas es solidificar el respeto al tiempo de los delegados, sus docentes y sus familias como forma concreta de honrar el esfuerzo que pusieron en prepararse.</p>`
  },
  sga: {
    name: "Cesarina Santana",
    role: "General Académica",
    img: "MULTIMEDIA/secretaria_academica.webp",
    bio: `<p>Estudiante de Economía en el Instituto Tecnológico de Santo Domingo (INTEC), gracias a la beca Excelencia Popular. Economista por convicción y voluntaria por pasión, encontró en los Modelos de Naciones Unidas el espacio donde ambas vocaciones se entrelazan. Desde muy pequeña sintió curiosidad por comprender cómo funcionan las relaciones entre naciones y cómo se toman las decisiones que moldean el mundo.</p>
          <p>Inició su trayectoria en los MUN en 2021, con más sueños que experiencia, pero con una determinación clara por aprender y crecer. Aquella primera participación marcó un antes y un después: descubrió su amor por la diplomacia, el análisis crítico y el servicio voluntario. Fue allí donde no solo encontró su vocación, sino también el propósito de dedicar su vida a la toma de decisiones informadas y con impacto.</p>
          <p>A lo largo de cinco años de servicio, ha liderado más de 15 comisiones y delegaciones tanto a nivel nacional como internacional. Su desempeño fue reconocido en el MINUME XV, donde recibió el Galardón de Plata y el reconocimiento a Mejor Liderazgo. Como parte de mesas directivas, ha sido valorada por los delegados como una líder empática y cercana, y por sus colegas como una persona firme, ética y comprometida con la excelencia.</p>`,
    funciones: `<ul class="profile-list-items">
                  <li class="profile-list-item">Asegurar que el contenido académico de la simulación sea relevante, informativo y estimulante para los participantes.</li>
                  <li class="profile-list-item">Coordinar y supervisar el trabajo de las Mesas Directivas, asegurándose de que el contenido de la conferencia sea de alta calidad y esté alineado con los objetivos del PLE-RD.</li>
                  <li class="profile-list-item">Garantizar que los voluntarios en roles de Mesas Directivas tengan un sólido dominio de los temas asignados.</li>
                  <li class="profile-list-item">Designar las comisiones y países correspondientes a cada delegado.</li>
                  <li class="profile-list-item">Establecer criterios de evaluación uniformes y proporcionar guías de preparación estandarizadas.</li>
                  <li class="profile-list-item">Facilitar herramientas digitales a las Mesas Directivas para supervisar y dar seguimiento a la gestión en las comisiones.</li>
                  <li class="profile-list-item">Diseñar programas académicos de formación dirigidos a voluntarios, estudiantes y docentes de la Regional 12.</li>
                </ul>`,
    expectativas: `<p>Expresamos el liderazgo como un arte dinámico y en constante evolución, donde los jóvenes no sólo participan, sino que construyen activamente soluciones a problemáticas reales mediante el pensamiento crítico, la negociación, el análisis de contexto y la toma de decisiones informadas.</p>
                   <p>Bajo esta visión, el liderazgo se entiende como una herramienta práctica que permite influir positivamente en la sociedad desde el presente, formando individuos capaces de adaptarse a distintos escenarios y asumir roles clave en espacios tanto nacionales como internacionales. En cada escenario, buscamos que más jóvenes alzen la voz y asuman un rol activo en la construcción del mundo que desean.</p>`
  },
  sgl: {
    name: "Cindy Ubiera",
    role: "General Logística",
    img: "MULTIMEDIA/secretaria_logistica.webp",
    bio: `<p>Es licenciada en Contabilidad, graduada con honores de la Universidad O&M. En el ámbito profesional, se desempeña en funciones vinculadas a la gestión humana, destacándose por su compromiso, responsabilidad y vocación de servicio. Desde temprana edad ha demostrado ser una joven competitiva, apasionada por las distintas expresiones del arte y comprometida con iniciativas orientadas al cuidado del medio ambiente y al bienestar colectivo.</p>
          <p>Su trayectoria dentro del Programa de Liderazgo Educativo inició en el año 2015, donde comenzó a fortalecer sus habilidades de liderazgo, organización y trabajo en equipo. A lo largo de los años, ha sido reconocida por su destacada labor como voluntaria y por su desempeño en diversos roles de liderazgo.</p>
          <p>Desde 2023, forma parte del programa como voluntaria nacional, contribuyendo activamente al fortalecimiento de espacios formativos para la juventud. Asimismo, ejerce la presidencia del Club Distrital de Liderazgo Educativo 12-02. Su crecimiento personal y profesional ha estado guiado por la constancia, la disciplina y el firme propósito de aportar al desarrollo de iniciativas de impacto.</p>`,
    funciones: `<ul class="profile-list-items">
                  <li class="profile-list-item">Planificar integralmente todos los aspectos logísticos del evento: transporte, alimentación y otros servicios.</li>
                  <li class="profile-list-item">Supervisar la ejecución logística en tiempo real, asegurando la calidad, eficiencia y disponibilidad de recursos en cada comisión y área común.</li>
                  <li class="profile-list-item">Coordinar, equipar y capacitar al personal técnico y logístico para asegurar el correcto funcionamiento del evento.</li>
                  <li class="profile-list-item">Velar por la seguridad del evento, cumpliendo con las normas y protegiendo a las personas y bienes.</li>
                  <li class="profile-list-item">Establecer rúbricas de evaluación del desempeño logístico para medir el cumplimiento de los estándares operativos y la calidad de los procesos.</li>
                </ul>`,
    expectativas: `<p>La gestión logística del MR2026 R12 se fundamenta en una identidad estratégica, metódica y resolutiva. Estratégica, por su capacidad de anticipar necesidades y diseñar soluciones orientadas al cumplimiento de los objetivos específicos; metódica, por la aplicación de procesos organizados y criterios de planificación rigurosos; y resolutiva, por su capacidad de respuesta eficiente ante los desafíos e incidencias que puedan surgir durante la preparación y ejecución del evento.</p>
                   <p>Nuestra meta es construir un entorno operativo impecable y seguro donde los delegados se sientan cómodos para debatir, sabiendo que toda la organización logística está diseñada a la perfección para respaldar su participación.</p>`
  }
};

// ═══ ACCORDIONS FOR GEMS & COMISIONES ═══
document.querySelectorAll('.committee-header').forEach(header => {
  header.addEventListener('click', () => {
    const accordion = header.parentElement;
    const body = header.nextElementSibling;
    const isActive = accordion.classList.contains('active');

    // Close other accordions in the same gem card
    const siblings = accordion.parentElement.querySelectorAll('.committee-accordion');
    siblings.forEach(sib => {
      sib.classList.remove('active');
      sib.querySelector('.committee-body').style.maxHeight = null;
    });

    if (!isActive) {
      accordion.classList.add('active');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

// ═══ TABS FOR TEAM ═══
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    
    // Toggle active tab button
    btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Toggle active tab panel
    const panels = btn.closest('section').querySelectorAll('.tab-panel');
    panels.forEach(p => {
      if (p.getAttribute('id') === targetId) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  });
});

// ═══ MODAL CONTROLS ═══
const welcomeModal = document.getElementById('welcomeModal');
const openWelcomeBtn = document.getElementById('openWelcomeBtn');
const closeWelcomeBtn = document.getElementById('closeWelcomeBtn');

const profileModal = document.getElementById('profileModal');
const closeProfileBtn = document.getElementById('closeProfileBtn');

// Welcome Modal Event Listeners
if (openWelcomeBtn && welcomeModal) {
  openWelcomeBtn.addEventListener('click', () => {
    welcomeModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}
if (closeWelcomeBtn && welcomeModal) {
  closeWelcomeBtn.addEventListener('click', () => {
    welcomeModal.classList.remove('open');
    document.body.style.overflow = '';
  });
}

// Profile Modal Event Listeners
document.querySelectorAll('.secretaria-card').forEach(card => {
  card.addEventListener('click', () => {
    const profileKey = card.getAttribute('data-profile');
    const data = profilesData[profileKey];
    if (data && profileModal) {
      // Set values
      document.getElementById('profileImg').src = data.img;
      document.getElementById('profileImg').alt = data.name;
      document.getElementById('profileName').textContent = data.name;
      document.getElementById('profileRole').textContent = data.role;
      
      document.getElementById('tab-bio').innerHTML = data.bio;
      document.getElementById('tab-funciones').innerHTML = data.funciones;
      document.getElementById('tab-expectativas').innerHTML = data.expectativas;
      
      // Reset profile tabs
      profileModal.querySelectorAll('.profile-tab-link').forEach(link => {
        if (link.getAttribute('data-tab') === 'tab-bio') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      profileModal.querySelectorAll('.profile-tab-content').forEach(content => {
        if (content.getAttribute('id') === 'tab-bio') {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
      
      profileModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

if (closeProfileBtn && profileModal) {
  closeProfileBtn.addEventListener('click', () => {
    profileModal.classList.remove('open');
    document.body.style.overflow = '';
  });
}

// Close modals when clicking outside inner content
window.addEventListener('click', (e) => {
  if (e.target === welcomeModal) {
    welcomeModal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (e.target === profileModal) {
    profileModal.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Profile Modal Internal Tab Switch
document.querySelectorAll('.profile-tab-link').forEach(link => {
  link.addEventListener('click', () => {
    const targetTab = link.getAttribute('data-tab');
    
    // Toggle active tab link
    link.parentElement.querySelectorAll('.profile-tab-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    // Toggle active tab content
    link.closest('.profile-main').querySelectorAll('.profile-tab-content').forEach(content => {
      if (content.getAttribute('id') === targetTab) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  });
});
