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
