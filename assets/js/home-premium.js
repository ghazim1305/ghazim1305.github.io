
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
