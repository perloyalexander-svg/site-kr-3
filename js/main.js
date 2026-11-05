function toast(msg) {
  let wrap = document.querySelector('.toast-container');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'toast-container position-fixed bottom-0 start-50 translate-middle-x p-3';
    document.body.appendChild(wrap);
  }
  const el = document.createElement('div');
  el.className = 'toast align-items-center text-bg-dark border-0';
  el.setAttribute('role', 'status');
  el.innerHTML = '<div class="d-flex"><div class="toast-body"></div></div>';
  el.querySelector('.toast-body').textContent = msg;
  wrap.appendChild(el);
  const instance = bootstrap.Toast.getOrCreateInstance(el, { delay: 2000 });
  el.addEventListener('hidden.bs.toast', () => el.remove());
  instance.show();
}

function init() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-pills .nav-link').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  const printBtn = document.getElementById('btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  const shareBtn = document.getElementById('btn-share');
  if (shareBtn) {
    shareBtn.textContent = 'Скачать';
    shareBtn.addEventListener('click', async () => {
      if (typeof state === 'undefined') {
        toast('Открой редактор или генератор, чтобы скачать открытку');
        return;
      }
      await downloadCard(state);
      toast('Открытка скачана');
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
