/* ─── MATRIX BACKGROUND — SGC R.12 MR 2026 ─── */
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
    /* Alternating purple/lavanda tones for depth */
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

/* ─── PARTICLES ─── */
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

/* ─── INTRO ─── */
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
  overlay.classList.add('warp-speed');
  setTimeout(() => {
    overlay.classList.add('hidden');
    document.body.style.overflow='auto';
    if(matrixInterval) clearInterval(matrixInterval);
  }, 800);
}

function runScan(){
  scanModal.classList.add('open');
  const title = document.querySelector('.intro-title');
  const gold = document.querySelector('.intro-title-gold');
  if(title) title.classList.add('glitch-out');
  if(gold) gold.classList.add('glitch-out');
  let prog=0;
  scanMsg.textContent=msgs[0];
  const interval=setInterval(()=>{
    prog+=4;
    progressBar.style.width=prog+'%';
    if(prog===24)scanMsg.textContent=msgs[1];
    if(prog===60)scanMsg.textContent=msgs[2];
    if(prog===84)scanMsg.textContent=msgs[3];
    if(prog>=100){
      clearInterval(interval);
      setTimeout(()=>{
        scanModal.classList.remove('open');
        enterSite();
      }, 300);
    }
  }, 15);
}

/* ─── TYPING EFFECT ─── */
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

/* Touch support */
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
// Force scroll to top on load and prevent browser auto-scroll restoration
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
document.body.style.overflow='hidden';

/* ─── HERO FP INTERACTION ─── */
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

/* ─── HAMBURGER ─── */
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

/* ─── SCROLL REVEAL ─── */
const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible')}
  });
},{threshold:0.12});
reveals.forEach(r=>observer.observe(r));

/* ─── NAV SCROLL STYLE ─── */
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.style.background=window.scrollY>60
    ?'rgba(5,20,100,0.97)'
    :'rgba(5,20,100,0.75)';
  navbar.style.borderBottomColor=window.scrollY>60
    ?'rgba(188,134,255,0.18)'
    :'rgba(188,134,255,0.12)';
});

/* ─── ACTIVE NAV HIGHLIGHTING ─── */
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
}, { threshold: 0.25, rootMargin: '-68px 0px -30% 0px' });
sections.forEach(sec => navObserver.observe(sec));
