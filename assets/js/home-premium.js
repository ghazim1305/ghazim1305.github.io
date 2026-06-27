const homeFixStyle=document.createElement('style');
homeFixStyle.textContent=`
.promo{display:none!important}
.nav-shell{background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(244,250,239,.98))!important;border-bottom:1px solid rgba(10,47,89,.10)!important;box-shadow:0 10px 28px rgba(10,47,89,.08)!important}
.brand-name{color:#0a2f59!important}.brand-name small{color:#2f7f2b!important}.links{color:#0a2f59!important}
.menu-btn{color:#0a2f59!important;background:#f3f8ec!important;border-color:rgba(10,47,89,.12)!important}
.reveal,.reveal.show{opacity:1!important;transform:none!important;transition:none!important}
.whatsapp-brand-icon{display:inline-block;width:1.18em;height:1.18em;object-fit:contain;flex:0 0 auto;vertical-align:-.18em;margin-right:.28em}
.whatsapp{background:transparent!important;border:0!important;padding:0!important;animation:none!important;box-shadow:none!important}
.whatsapp .whatsapp-brand-icon{width:100%;height:100%;margin:0;filter:none!important}
@media(max-width:760px){.links{background:#fff!important;border-color:rgba(10,47,89,.12)!important;box-shadow:0 18px 40px rgba(10,47,89,.12)!important}.links a{color:#0a2f59!important}}
@media(max-width:480px){section{padding:56px 0}footer{margin-top:56px}}
`;
document.head.appendChild(homeFixStyle);
document.querySelectorAll('.promo').forEach(el=>el.remove());

const menuButton=document.querySelector('.menu-btn');
const menu=document.querySelector('.links');
if(menuButton&&menu){
  menuButton.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    menuButton.classList.toggle('active',open);
    menuButton.setAttribute('aria-expanded',String(open));
  });
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    menu.classList.remove('open');menuButton.classList.remove('active');menuButton.setAttribute('aria-expanded','false');
  }));
}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}
}),{threshold:.1,rootMargin:'0px 0px -30px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

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
      link.insertBefore(icon,link.firstChild);
    }
  });
}
applyOfficialWhatsappLogo();
