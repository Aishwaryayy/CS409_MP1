const nav = document.getElementById('navbar');
const links = Array.from(document.querySelectorAll('#nav-links a'));
const indicator = document.getElementById('position-indicator');
const sections = links.map(a => document.querySelector(a.getAttribute('href')));

function handleResizeClass() {
  if (window.scrollY > 10) nav.classList.add('shrink');
  else nav.classList.remove('shrink');
}
window.addEventListener('scroll', handleResizeClass);
handleResizeClass();

function smoothTo(target) {
  const top = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight + 1;
  window.scrollTo({ top, behavior: 'smooth' });
}
links.forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const el = document.querySelector(a.getAttribute('href'));
  if (el) smoothTo(el);
}));

function updateIndicator() {
  const y = window.scrollY + nav.offsetHeight;     

  let idx = 0;
  for (let i = 0; i < sections.length; i++) {
    const top = sections[i].offsetTop;
    const nextTop = i < sections.length - 1 ? sections[i + 1].offsetTop : Number.POSITIVE_INFINITY;
    if (top <= y && y < nextTop) { idx = i; break; }
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) idx = sections.length - 1;
  }

  links.forEach((a, i) => a.classList.toggle('active', i === idx));

  const active = links[idx];
  const navRect = nav.getBoundingClientRect();
  const rect = active.getBoundingClientRect();
  indicator.style.left = `${rect.left - navRect.left}px`;
  indicator.style.width = `${rect.width}px`;
}

window.addEventListener('scroll', updateIndicator);
window.addEventListener('resize', updateIndicator);
window.addEventListener('load', updateIndicator);


const modal = document.getElementById('modal');
document.getElementById('open-modal').addEventListener('click', () => modal.classList.add('show'));
document.getElementById('close-modal').addEventListener('click', () => modal.classList.remove('show'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });

const track = document.getElementById('carousel-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel .prev');
const nextBtn = document.querySelector('.carousel .next');
const dotsWrap = document.getElementById('carousel-dots');

let index = 0;
slides.forEach((_s, i) => {
  const b = document.createElement('button');
  if (i === 0) b.classList.add('active');
  b.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(b);
});
const dots = Array.from(dotsWrap.children);

function goTo(i) {
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d, di) => d.classList.toggle('active', di === index));
}
prevBtn.addEventListener('click', () => goTo(index - 1));
nextBtn.addEventListener('click', () => goTo(index + 1));

const lines = [
  'deploy on first try (no cap)', 
  'when flexbox centers on the first attempt',
  'css be like: it works on my machine',
];
document.querySelectorAll('.meme-caption').forEach(el => {
  el.textContent = lines[Math.floor(Math.random() * lines.length)];
});

window.addEventListener('load', () => {
  goTo(0);
  updateIndicator();
});