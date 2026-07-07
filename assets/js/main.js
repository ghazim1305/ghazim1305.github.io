const siteFixStyle=document.createElement('style');
siteFixStyle.textContent=`
.topbar{display:none!important}
.nav-wrap{background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(244,250,239,.98))!important;border-bottom:1px solid rgba(10,47,89,.10)!important;box-shadow:0 10px 28px rgba(10,47,89,.08)!important}
.brand,.nav-links a,.menu-btn{color:#0a2f59!important}
.nav-links a.active,.nav-links a:hover{color:#2f7f2b!important}
.menu-btn{background:#f3f8ec!important;border-color:rgba(10,47,89,.12)!important}
.motion-ready .reveal-item,.motion-ready .reveal-item.is-visible{opacity:1!important;transform:none!important;transition:none!important}
.whatsapp-brand-icon{display:inline-block;width:1.18em;height:1.18em;object-fit:contain;flex:0 0 auto;vertical-align:-.18em;margin-right:.28em}
.whatsapp-float{background:transparent!important;border:0!important;padding:0!important;animation:none!important;box-shadow:none!important}
.whatsapp-float::before{display:none!important}
.whatsapp-float .whatsapp-brand-icon{width:100%;height:100%;margin:0;filter:none!important}
.hero{padding:58px 0 54px!important}
.hero-grid{gap:36px!important}
.page-hero{padding:48px 0 40px!important}
.section{padding:62px 0!important}
.section-head{margin-bottom:26px!important}
.article h2{margin-top:30px!important}
.article h3{margin-top:22px!important}
.hero-card,.card,.article{padding:clamp(22px,3vw,34px)!important}
footer{margin-top:42px!important;padding-top:46px!important}
.cta{padding:34px!important}
.social-row .social-link{width:52px!important;height:52px!important;padding:0!important;border-radius:16px!important;gap:0!important;font-size:0!important}
.social-row .social-link .social-label{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important}
.social-row .social-icon,.social-row .ui-icon,.social-row .whatsapp-brand-icon{width:21px!important;height:21px!important;margin:0!important;display:block!important;object-fit:contain!important}
@media(max-width:900px){.nav-links{background:#fff!important;border-color:rgba(10,47,89,.12)!important}.nav-links a{color:#0a2f59!important}.hero-grid,.content-layout,.contact-grid,.footer-grid{gap:24px!important}}
@media(max-width:620px){.hero{padding:42px 0 38px!important}.page-hero{padding:38px 0 32px!important}.section{padding:48px 0!important}.section-head{margin-bottom:22px!important}footer{margin-top:32px!important;padding-top:40px!important}.cta{padding:26px!important}}
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
    const footerTextLink = link.classList.contains('footer-whatsapp-text') || (link.closest('footer') && !link.closest('.social-row') && !link.classList.contains('social-whatsapp'));
    if(footerTextLink){
      link.querySelectorAll('svg, .whatsapp-brand-icon').forEach(icon=>icon.remove());
      return;
    }
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