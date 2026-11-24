// Main JavaScript for Yingpei Wang's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initPrivateGate();
  initTheme();
  initMobileMenu();
  initProjectFilter();
  initCopyButtons();
  initSmoothScroll();
  initRenderMath();
});

// 0. Private Access Gate
const PASSCODE_HASH = '225645362eed232d691152098e0c8d75366321aab2f8124241fe985793f514eb'; // SHA-256 for 'yingpei2026'

async function hashPasscode(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function initPrivateGate() {
  const overlay = document.getElementById('private-lock-overlay');
  if (!overlay) return;
  
  if (sessionStorage.getItem('site_authenticated') === 'true') {
    overlay.remove();
  } else {
    document.body.style.overflow = 'hidden';
  }
}

window.verifyPasscode = async function() {
  const input = document.getElementById('passcode-input');
  const errorEl = document.getElementById('passcode-error');
  const overlay = document.getElementById('private-lock-overlay');
  
  if (!input) return;
  const hash = await hashPasscode(input.value.trim());
  
  if (hash === PASSCODE_HASH) {
    sessionStorage.setItem('site_authenticated', 'true');
    document.body.style.overflow = '';
    if (overlay) {
      overlay.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => overlay.remove(), 300);
    }
  } else {
    if (errorEl) {
      errorEl.classList.remove('hidden');
    }
    input.classList.add('ring-2', 'ring-rose-500', 'border-rose-500');
    setTimeout(() => {
      input.classList.remove('ring-2', 'ring-rose-500', 'border-rose-500');
    }, 1500);
  }
};

window.lockSite = function() {
  sessionStorage.removeItem('site_authenticated');
  location.reload();
};

// 1. Theme Management (Dark / Light)
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons();
  }
  
  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);
  
  updateThemeIcons();
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const sunIcons = document.querySelectorAll('.theme-sun-icon');
  const moonIcons = document.querySelectorAll('.theme-moon-icon');
  
  sunIcons.forEach(icon => {
    icon.classList.toggle('hidden', !isDark);
  });
  moonIcons.forEach(icon => {
    icon.classList.toggle('hidden', isDark);
  });
}

// 2. Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!menuBtn || !mobileMenu) return;
  
  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// 3. Project Filtering
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      filterButtons.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'dark:bg-blue-500');
        b.classList.add('bg-gray-100', 'text-gray-700', 'dark:bg-gray-800', 'dark:text-gray-300');
      });
      
      btn.classList.remove('bg-gray-100', 'text-gray-700', 'dark:bg-gray-800', 'dark:text-gray-300');
      btn.classList.add('bg-blue-600', 'text-white', 'dark:bg-blue-500');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// 4. Copy-to-Clipboard Utility
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = `<svg class="w-4 h-4 text-green-500 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Copied!`;
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      }
    });
  });
}

// 5. Smooth Scroll Offset
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 6. KaTeX LaTeX Math Auto-Rendering
function initRenderMath() {
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false
    });
  }
}

// Global modal helpers for article/note deep dives
window.openNoteModal = function(noteId) {
  const modal = document.getElementById('note-modal');
  const modalContent = document.getElementById('modal-body');
  const template = document.getElementById(`template-${noteId}`);
  
  if (modal && modalContent && template) {
    modalContent.innerHTML = template.innerHTML;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    initRenderMath();
  }
};

window.closeNoteModal = function() {
  const modal = document.getElementById('note-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
};
