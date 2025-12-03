document.addEventListener('DOMContentLoaded', () => {
      const key = 'soaltee_enquiries';
      const admin = document.getElementById('adminArea');

      function load(){
        const list = JSON.parse(localStorage.getItem(key) || '[]').reverse();
        if(list.length === 0){
          admin.innerHTML = '<p>No saved enquiries.</p>';
          return;
        }
        admin.innerHTML = '<table class="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Service</th><th>Event date</th><th>Budget</th><th>Message</th><th>Saved</th></tr></thead><tbody>' +
          list.map(e=>`<tr>
            <td>${e.name}</td><td>${e.email}</td><td>${e.service || ''}</td><td>${e.eventDate || ''}</td><td>${e.budget || ''}</td><td>${e.message}</td><td>${new Date(e.savedAt).toLocaleString()}</td>
          </tr>`).join('') + '</tbody></table>';
      }

      document.getElementById('exportBtn').addEventListener('click', () => {
        const data = localStorage.getItem(key) || '[]';
        const blob = new Blob([data], {type:'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'soaltee_enquiries.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
      });

      document.getElementById('deleteAllBtn').addEventListener('click', () => {
        if(confirm('Delete all saved enquiries?')){ localStorage.removeItem(key); load(); }
      });

      load();
    });