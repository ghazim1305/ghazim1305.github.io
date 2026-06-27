const siteFixStyle=document.createElement('style');
siteFixStyle.textContent=`
.topbar{display:none!important}
.nav-wrap{background:rgba(255,255,255,.98)!important;border-bottom:1px solid rgba(6,27,54,.10)!important;box-shadow:0 8px 28px rgba(6,27,54,.10)!important}
.brand,.nav-links a,.menu-btn{color:var(--navy)!important}
.nav-links a.active,.nav-links a:hover{color:var(--green-2)!important}
.menu-btn{background:#f5f9f2!important;border-color:rgba(6,27,54,.16)!important}
.motion-ready .reveal-item,.motion-ready .reveal-item.is-visible{opacity:1!important;transform:none!important;transition:none!important}
.whatsapp-brand-icon{display:inline-block;width:1.18em;height:1.18em;object-fit:contain;flex:0 0 auto;vertical-align:-.18em;margin-right:.28em}
.whatsapp-float{background:transparent!important;border:0!important;padding:0!important;animation:none!important;box-shadow:0 13px 30px rgba(18,140,62,.30)!important}
.whatsapp-float::before{display:none!important}
.whatsapp-float .whatsapp-brand-icon{width:100%;height:100%;margin:0;filter:drop-shadow(0 8px 16px rgba(18,140,62,.28))}
@media(max-width:900px){.nav-links{background:#fff!important;border-color:rgba(6,27,54,.12)!important}.nav-links a{color:var(--navy)!important}}
@media(max-width:620px){.section{padding:48px 0}.page-hero{padding:54px 0 42px}footer{margin-top:46px;padding-top:46px}}
`;
document.head.appendChild(siteFixStyle);
document.querySelectorAll('.topbar').forEach(el=>el.remove());

const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if(menuButton && navLinks){
  menuButton.addEventListener('click', () => {
    const opened = navLinks.classList.toggle('open');
    menuButton.classList.toggle('is-open', opened);
    menuButton.setAttribute('aria-expanded', opened ? 'true' : 'false');
    menuButton.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu');
    const sr = menuButton.querySelector('.sr-only');
    if(sr) sr.textContent = opened ? 'Close menu' : 'Open menu';
  });
}
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click',()=>{
    navLinks?.classList.remove('open');
    menuButton?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded','false');
  });
});

document.querySelectorAll('form[data-contact-form]').forEach(form=>{
  form.addEventListener('submit', () => {
    const btn=form.querySelector('button[type="submit"]');
    if(btn){
      btn.disabled=true;
      btn.classList.add('is-loading');
      const label=btn.querySelector('.btn-label');
      if(label) label.textContent='Sending...';
    }
  });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!prefersReducedMotion && 'IntersectionObserver' in window){
  document.documentElement.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.08,rootMargin:'0px 0px -32px 0px'});
  document.querySelectorAll('.reveal-item').forEach((el,index)=>{
    el.style.transitionDelay = `${Math.min(index % 4,3) * 55}ms`;
    revealObserver.observe(el);
  });
}

const whatsappFloat = document.querySelector('.whatsapp-float');
if(whatsappFloat){
  const updateWhatsappFloat = () => {
    const hideAtTopOnMobile = window.innerWidth <= 620 && window.scrollY < 320;
    whatsappFloat.classList.toggle('float-hidden', hideAtTopOnMobile);
  };
  updateWhatsappFloat();
  window.addEventListener('scroll', updateWhatsappFloat, {passive:true});
  window.addEventListener('resize', updateWhatsappFloat);
}

function applyOfficialWhatsappLogo(){
  document.querySelectorAll('a[href*="wa.me"]').forEach(link=>{
    link.querySelectorAll('svg').forEach(svg=>svg.remove());
    Array.from(link.childNodes).forEach(node=>{
      if(node.nodeType===Node.TEXT_NODE && /^[\s◉☎📞]+$/u.test(node.textContent||'')) node.remove();
    });
    if(!link.querySelector('.whatsapp-brand-icon')){
      const icon=document.createElement('img');
      icon.src='/assets/img/whatsapp-logo.svg';
      icon.alt='';
      icon.setAttribute('aria-hidden','true');
      icon.className='whatsapp-brand-icon';
      const tooltip=link.querySelector('.float-label');
      link.insertBefore(icon,tooltip||link.firstChild);
    }
  });
}
applyOfficialWhatsappLogo();
