/**
 * Entry pages logic
 */
fetch('pages.json')
  .then(res => res.json())
  .then(files => {
    const nav = document.getElementById("entries")
    files.forEach(file => {
      const btn = document.createElement('button');
      btn.classList = "menubutton"
      btn.textContent = file.replace('.html', '');
      btn.onclick = () => loadPage(`pages/${file}`);
      nav.appendChild(btn);
    });
});

/**
 * Collapses or unfolds an element of the given id
 * @param {string} id the id of the element to collapse
 */
function collapse(id) {
  var content = document.getElementById(id);
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}


function loadPage(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading page:', error);
      document.getElementById('content').innerHTML = '<p>Failed to load content.</p>';
    });
}