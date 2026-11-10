const motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
const elements=document.querySelectorAll('.reveal');
document.querySelectorAll('.project-grid .reveal').forEach((el,i)=>el.style.setProperty('--delay',`${i*130}ms`));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
 if(entry.isIntersecting){entry.target.classList.add('visible')}else{entry.target.classList.remove('visible')}
}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});
elements.forEach(el=>observer.observe(el));
let ticking=false;
function updateScroll(){
 const root=document.documentElement;
 document.querySelector('.progress').style.width=(root.scrollTop/Math.max(1,root.scrollHeight-root.clientHeight)*100)+'%';
 if(!motionQuery.matches){
  document.querySelector('.system-art').style.translate=`0 ${Math.min(root.scrollTop*.15,100)}px`;
 }
 ticking=false;
}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true}},{passive:true});
updateScroll();
const video=document.querySelector('#showcase');const recordings={gameplay:{src:'assets/gun-showcase.mp4',poster:'assets/gun.jpg',label:'GUN SYSTEM / GAMEPLAY SHOWCASE',note:'Multiple weapon types in action. Use the controls to play, seek, or go fullscreen.'},scripts:{src:'assets/scripts.mp4',poster:'assets/scripts.jpg',label:'GUN SYSTEM / SCRIPTS & ORGANIZATION',note:'A look at the weapon configuration, shared modules, and organized project hierarchy.'}};document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-video]').forEach(b=>b.setAttribute('aria-selected',b===button));const r=recordings[button.dataset.video];video.pause();video.src=r.src;video.poster=r.poster;video.load();document.querySelector('#video-label').textContent=r.label;document.querySelector('#video-note').textContent=r.note;document.querySelector('#video-download').href=r.src}));video.addEventListener('error',()=>document.querySelector('#video-note').textContent='Playback unavailable in this browser. Download the recording using the link below.');