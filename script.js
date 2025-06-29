/**
 * Entry pages logic
 */

let pages;

fetch('Pages.json')
  .then(res => res.json())
  .then(files => {
    pages = files;
    const nav = document.getElementById("entries")
    for(let i = 0; i < files.length; i++){
      const file = files[i];
      const btn = document.createElement('button');
      btn.classList = "menubutton"
      btn.textContent = file.replace('.html', '');
      btn.onclick = () => {
        loadPage(`Pages/${file}`, i);
      };
      nav.appendChild(btn);
    }
});


function loadPage(url, index) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
      const current = document.querySelector(".page");
      if(index!=0){
        const btn = document.createElement('button');
        btn.classList = "menubutton previous"
        btn.textContent = "Previous Entry";
        btn.onclick = () => {
          loadPage(`Pages/${pages[index-1]}`, index-1);
        };
        current.appendChild(btn);
      }
      if(index != pages.length-1){
        const btn = document.createElement('button');
        btn.classList = "menubutton next"
        btn.textContent = "Next Entry";
        btn.onclick = () => {
          loadPage(`Pages/${pages[index+1]}`, index+1);
        };
        current.appendChild(btn);
      }
    })
    .catch(error => {
      console.error('Error loading page:', error);
      document.getElementById('content').innerHTML = '<p>Failed to load content.</p>';
    });
}

/**
 * Collapses or unfolds an element of the given id
 * @param {string} id the id of the element to collapse
 */
function collapse(id) {
  let content = document.getElementById(id);
  if (content.style.maxHeight) {
    content.style.overflow = "hidden"
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    content.addEventListener("transitionend",function handler(){content.removeEventListener("transitionend",handler);content.style.overflow="visible"; })
  }
}

function copy(id, self){
  const code = document.getElementById(id).textContent;
  const btn = document.getElementById(self);

  navigator.clipboard.writeText(code).then(() => {
    btn.classList.add('clicked');
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.textContent = "Copy";
      btn.classList.remove("clicked");
    }, 900);
  });
}