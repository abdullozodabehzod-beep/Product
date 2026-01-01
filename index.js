const burger=document.querySelector('.burger');
const navLinks=document.querySelector('.nav-links');
burger.addEventListener('click',()=>navLinks.classList.toggle('active'));

const sections=document.querySelectorAll('section');
const navItems=document.querySelectorAll('nav ul li a');
window.addEventListener('scroll',()=>{
  let current='';
  sections.forEach(section=>{
    const sectionTop=section.offsetTop-70;
    if(scrollY>=sectionTop) current=section.getAttribute('id');
  });
  navItems.forEach(a=>a.classList.remove('active'));
  document.querySelector('nav ul li a[href*="'+current+'"]')?.classList.add('active');
});

const themeToggle=document.getElementById('themeToggle');
themeToggle.addEventListener('click',()=>document.body.classList.toggle('dark'));

const typingText=["Быстро","Удобно","Надежно"];
let typeIndex=0,charIndex=0;
const typingEl=document.querySelector('.typing');
function type(){
  if(charIndex<typingText[typeIndex].length){
    typingEl.textContent+=typingText[typeIndex][charIndex];
    charIndex++;
    setTimeout(type,200);
  }else{
    setTimeout(erase,1000);
  }
}
function erase(){
  if(charIndex>0){
    typingEl.textContent=typingText[typeIndex].substring(0,charIndex-1);
    charIndex--;
    setTimeout(erase,100);
  }else{
    typeIndex=(typeIndex+1)%typingText.length;
    setTimeout(type,500);
  }
}
type();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:0.1});
document.querySelectorAll('section, .card, .testimonial').forEach(el=>observer.observe(el));

const progressFills=document.querySelectorAll('.progress-bar-fill');
progressFills.forEach(fill=>fill.style.width=fill.getAttribute('data-percentage'));

const lazyImages=document.querySelectorAll('.lazy-img');
const lazyObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const img=entry.target;
      img.src=img.dataset.src;
      lazyObserver.unobserve(img);
    }
  });
});
lazyImages.forEach(img=>lazyObserver.observe(img));

const videoBtn=document.getElementById('videoBtn');
const videoModal=document.getElementById('videoModal');
const closeModal=document.querySelector('.modal-close');
videoBtn.addEventListener('click',()=>videoModal.classList.add('active'));
closeModal.addEventListener('click',()=>videoModal.classList.remove('active'));
videoModal.addEventListener('click',e=>{if(e.target===videoModal) videoModal.classList.remove('active');});

document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  alert('Спасибо! Ваше сообщение отправлено.');
});