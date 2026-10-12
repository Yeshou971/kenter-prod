/* =========================================================
   MAIN.JS — fichier JS unique, partagé par toutes les pages
   Chaque bloc vérifie la présence de ses éléments avant de
   s'exécuter, donc ce même fichier peut être inclus partout.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Menu mobile (toutes les pages) ---- */
  const navToggle = document.querySelector('.nav-toggle')
  const navLinks = document.querySelector('.navlinks')
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open')
    })
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'))
    })
  }

  /* ---- Filtres du catalogue (catalogue.html uniquement) ---- */
  const filterButtons = document.querySelectorAll('.filter-btn')
  const catalogueCards = document.querySelectorAll('#catGrid .card')
  if (filterButtons.length && catalogueCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        const f = btn.dataset.filter
        catalogueCards.forEach(c => {
          const cats = c.dataset.cat.split(' ')
          c.style.display = (f === 'all' || cats.includes(f)) ? '' : 'none'
        })
      })
    })
  }

  /* ---- Formulaire de contact (contact.html uniquement) ---- */
  const contactForm = document.querySelector('form.mini')
  if (contactForm) {
    const status = contactForm.querySelector('.form-status')
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      status.textContent = 'Envoi en cours…'
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        })
        if (response.ok) {
          status.textContent = 'Merci, votre message a bien été envoyé.'
          contactForm.reset()
        } else {
          status.textContent = "L'envoi a échoué. Écrivez-nous à k.entertainment@gmx.com."
        }
      } catch (err) {
        status.textContent = "L'envoi a échoué. Écrivez-nous à k.entertainment@gmx.com."
      }
    })
  }

})