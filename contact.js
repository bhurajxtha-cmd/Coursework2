(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const key = "soaltee_enquiries";
  const modal = document.getElementById("thankYouModal");
  const closeModalBtn = document.getElementById("closeModal");

  function showError(inp, msg) {
    const err = document.getElementById(inp.id + "Error");
    inp.classList.add("invalid");
    if (err) err.textContent = msg;
  }

  function clearError(inp) {
    const err = document.getElementById(inp.id + "Error");
    inp.classList.remove("invalid");
    if (err) err.textContent = "";
  }

  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Set today's date as min for eventDate input
  const eventDateField = document.getElementById("eventDate");
  if (eventDateField) {
    eventDateField.min = new Date().toISOString().split("T")[0];
  }

  function openModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  closeModalBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.name;
    const email = form.email;
    const message = form.message;
    const phone = form.phone;
    const eventDate = form.eventDate;

    [name, email, message, phone, eventDate].forEach(clearError);






    
    const namePattern = /^[A-Za-z\s'.-]{2,}$/;
    if (!name.value.trim() || !namePattern.test(name.value.trim())) {
      showError(name, "Please enter a valid name (letters only, 2+ chars).");
      valid = false;
    }






    
    if (!email.value.trim() || !validEmail(email.value.trim())) {
      showError(email, "Please enter a valid email.");
      valid = false;
    }






    
    if (!message.value.trim() || message.value.trim().length < 10) {
      showError(message, "Message must be 10+ characters.");
      valid = false;
    }




    
    if (phone.value.trim()) {
      const phonePattern = /^\+?[0-9\s\-]{7,15}$/;
      if (!phonePattern.test(phone.value.trim())) {
        showError(phone, "Please enter a valid phone number.");
        valid = false;
      }
    }






    
    if (eventDate && eventDate.value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(eventDate.value);
      if (selected < today) {
        showError(eventDate, "Event date cannot be in the past.");
        valid = false;
      }
    }

    if (!valid) {
      document.getElementById("formStatus").textContent = "Please fix the highlighted errors.";
      return;
    }





    
    const enquiry = {
      id: Date.now(),
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      service: form.service ? form.service.value.trim() : "",
      eventDate: eventDate ? eventDate.value : "",
      budget: form.budget ? form.budget.value : "",
      message: message.value.trim(),
      savedAt: new Date().toISOString(),
    };




    
    if (document.getElementById("consent").checked) {
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      list.push(enquiry);
      localStorage.setItem(key, JSON.stringify(list));
    }

    form.reset();
    openModal(); // show thank you modal
    document.getElementById("formStatus").textContent = "";
  });





  
  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem(key);
      document.getElementById("formStatus").textContent = "Saved enquiries cleared.";
    });
  }
})();
