
const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");
if(menuToggle&&navLinks){menuToggle.addEventListener("click",()=>navLinks.classList.toggle("active"));navLinks.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>navLinks.classList.remove("active")))}
const header=document.querySelector(".site-header");
window.addEventListener("scroll",()=>{if(header)header.classList.toggle("scrolled",window.scrollY>20)});
const revealElements=document.querySelectorAll(".section,.card,.cta,.contact-wrap,.two-col");
revealElements.forEach(el=>el.classList.add("reveal"));
const revealObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}})},{threshold:.12});
revealElements.forEach(el=>revealObserver.observe(el));
document.querySelectorAll(".faq-question").forEach(btn=>{btn.addEventListener("click",()=>{const item=btn.closest(".faq-item");if(!item)return;document.querySelectorAll(".faq-item").forEach(other=>{if(other!==item)other.classList.remove("active")});item.classList.toggle("active")})});
document.querySelectorAll(".counter").forEach(counter=>{const target=Number(counter.dataset.target||0);let current=0;const step=Math.max(1,Math.ceil(target/70));const update=()=>{current+=step;if(current>=target)counter.textContent=target+"+";else{counter.textContent=current+"+";requestAnimationFrame(update)}};update()});
