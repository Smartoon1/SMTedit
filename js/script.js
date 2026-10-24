const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const m=$('#menu'),n=$('#nav');
if(m)m.addEventListener('click',()=>n.classList.toggle('open'));
// scroll progress, sticky header, back-to-top
const bar=document.createElement('div');bar.id='progress';document.body.prepend(bar);
const top=document.createElement('button');top.id='top';top.innerHTML='&uarr;';top.setAttribute('aria-label','Back to top');document.body.append(top);
top.onclick=()=>scrollTo({top:0,behavior:'smooth'});
addEventListener('scroll',()=>{
const h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
bar.style.width=p+'%';$('header').classList.toggle('scrolled',h.scrollTop>40);top.classList.toggle('show',h.scrollTop>500);
},{passive:true});
// scroll reveal with stagger
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.card,section h2,.tools,.faq details,form,.stat,.alt-bg p,section>.wrap>p').forEach((el,i)=>{
el.classList.add('reveal');el.style.transitionDelay=(Array.from(el.parentNode.children).indexOf(el)%4)*0.12+'s';io.observe(el)});
// counters
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);
const el=e.target,end=+el.dataset.count;let c=0;const step=Math.max(1,Math.ceil(end/60));
const t=setInterval(()=>{c=Math.min(end,c+step);el.textContent=c+(el.dataset.suffix||'');if(c>=end)clearInterval(t)},25)}),{threshold:.6});
$$('[data-count]').forEach(el=>co.observe(el));
// contact form -> WhatsApp
const f=$('#contactForm');
if(f)f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f);
const t=`Hello SMt, my name is ${d.get('name')}.%0AService: ${d.get('service')}%0A${encodeURIComponent(d.get('message'))}`;
window.open('https://wa.me/2348000000000?text='+t,'_blank');});
$('#yr').textContent=new Date().getFullYear();
