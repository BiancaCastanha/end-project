async function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');

  for (const el of includes) {
    const file = el.getAttribute('data-include');
    try {
      const resp = await fetch(file);
      if (resp.ok) {
        const html = await resp.text();
        el.innerHTML = html;
        if (file.includes('header.html')){
            highlightCurrentPage();
        }
      } else {
        el.innerHTML = `<p>Erro ao carregar ${file}</p>`;
      }
    } catch (e) {
      el.innerHTML = `<p>Erro ao carregar ${file}: ${e}</p>`;
    }
  }
}

function highlightCurrentPage(){
    const links = document.querySelectorAll('nav a');
    const path = window.location.pathname;
    links.forEach(link => {
        const linkPath = link.getAttribute('href');

        if (path.endsWith(linkPath)) {
            link.classList.add('ativo');
        }
    });
}

window.addEventListener('DOMContentLoaded', includeHTML);
