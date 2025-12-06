window.SOALTEE_SERVICES = [
  {
    id:1,
    title: "Wedding Planning — Full package",
    category: "planning",
    price: 2000,
    excerpt: "End-to-end wedding planning: vendor management, schedule, logistics.",
    availability: "By quote",
    tags: ["wedding","planning","vendors"]
  },
  {
    id:2,
    title: "Sound System Hire — Small event PA",
    category: "sound",
    price: 250,
    excerpt: "PA system suitable for up to 150 guests; includes engineer.",
    availability: "Available",
    tags: ["sound","PA","equipment"]
  },
  {
    id:3,
    title: "Live Band — Duo/Trio",
    category: "music",
    price: 600,
    excerpt: "Acoustic duo or trio for weddings, receptions, and small parties.",
    availability: "Selected dates",
    tags: ["band","live","music"]
  },
  {
    id:4,
    title: "Corporate Event Planning",
    category: "planning",
    price: 1500,
    excerpt: "Corporate conferences and awards — AV, catering coordination and schedule.",
    availability: "By quote",
    tags: ["corporate","planning","conference"]
  },
  {
    id:5,
    title: "DJ Performance",
    category: "music",
    price: 400,
    excerpt: "Professional DJ with lighting options for parties and receptions.",
    availability: "Available",
    tags: ["DJ","music","party"]
  }
];





    (function(){
      const listEl = document.getElementById('servicesList');
      const search = document.getElementById('search');
      const category = document.getElementById('category');
      const minBudget = document.getElementById('minBudget');

      function render(items){
        if(!listEl) return;
        if(items.length === 0){
          listEl.innerHTML = '<p>No services match your filters.</p>';
          return;
        }
        listEl.innerHTML = items.map(s => `
          <article class="service" tabindex="0">
            <h3>${s.title}</h3>
            <p class="meta">${s.category} — from £${s.price}</p>
            <p>${s.excerpt}</p>
            <p><strong>Availability:</strong> ${s.availability}</p>
            <p><a href="contact.html?service=${encodeURIComponent(s.title)}" class="cta">Book / Enquire</a></p>
          </article>
        `).join('');
      }

      function filter(){
        const q = search.value.trim().toLowerCase();
        const cat = category.value;
        const min = Number(minBudget.value || 0);
        const results = window.SOALTEE_SERVICES.filter(s => {
          if(cat && s.category !== cat) return false;
          if(s.price < min) return false;
          if(q){
            return (s.title + ' ' + s.excerpt + ' ' + s.tags.join(' ')).toLowerCase().includes(q);
          }
          return true;
        });
        render(results);
      }




      
      document.addEventListener('DOMContentLoaded', () => {
        render(window.SOALTEE_SERVICES);
        [search, category, minBudget].forEach(el => el.addEventListener('input', filter));
      });
    })();
