document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  document.querySelectorAll('#year, #year2, #year3, #year4').forEach(el => el.textContent = year);

  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !open);
      mainNav.style.display = open ? '' : 'block';
      mainNav.setAttribute('aria-hidden', open);
    });
  }

  document.addEventListener('keydown', e => {
    if(e.key === 'Enter' && document.activeElement?.matches('.service')){
      document.activeElement.querySelector('.cta')?.click();
    }
  });
});
