
const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if(menuButton && navLinks){
  menuButton.addEventListener('click', () => {
    const opened = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });
}
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click',()=>navLinks?.classList.remove('open'));
});
document.querySelectorAll('form[data-contact-form]').forEach(form=>{
  form.addEventListener('submit', () => {
    const btn=form.querySelector('button[type="submit"]');
    if(btn){btn.disabled=true;btn.textContent='Sending...';}
  });
});
