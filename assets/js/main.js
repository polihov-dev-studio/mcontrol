(function () {
  const body = document.body;
  const toggle = document.querySelector('[data-mobile-toggle]');
  const nav = document.querySelector('[data-nav-menu]');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      body.classList.toggle('no-scroll', isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('no-scroll');
      });
    });
  }

  document.querySelectorAll('[data-accordion]').forEach((accordion) => {
    const items = accordion.querySelectorAll('.accordion-item');
    items.forEach((item, index) => {
      const button = item.querySelector('.accordion-button');
      const content = item.querySelector('.accordion-content');
      if (!button || !content) return;
      const contentId = `accordion-content-${index + 1}-${Math.random().toString(36).slice(2, 7)}`;
      content.id = contentId;
      button.setAttribute('aria-controls', contentId);
      button.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
      button.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach((other) => {
          other.classList.remove('active');
          const otherButton = other.querySelector('.accordion-button');
          if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  const pricingToggle = document.querySelector('[data-pricing-toggle]');
  if (pricingToggle) {
    const buttons = pricingToggle.querySelectorAll('button');
    const prices = document.querySelectorAll('[data-price]');
    const notes = document.querySelectorAll('[data-price-note]');

    const setPeriod = (period) => {
      buttons.forEach((button) => button.classList.toggle('active', button.dataset.period === period));
      prices.forEach((price) => {
        const next = price.dataset[period];
        if (next) price.innerHTML = next;
      });
      notes.forEach((note) => {
        note.textContent = period === 'yearly' ? 'при оплате за год, экономия 20%' : 'оплата помесячно';
      });
    };

    buttons.forEach((button) => button.addEventListener('click', () => setPeriod(button.dataset.period)));
    setPeriod('monthly');
  }

  const toast = document.querySelector('[data-toast]');
  const forms = document.querySelectorAll('[data-demo-form]');
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 4200);
  };

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach((field) => {
        if (!field.value.trim()) valid = false;
      });
      if (!valid) {
        showToast('Заполните обязательные поля, чтобы отправить заявку.');
        return;
      }
      const payload = Object.fromEntries(new FormData(form).entries());
      try {
        const saved = JSON.parse(localStorage.getItem('mantrova_demo_requests') || '[]');
        saved.push({ ...payload, createdAt: new Date().toISOString() });
        localStorage.setItem('mantrova_demo_requests', JSON.stringify(saved));
      } catch (error) {
        // LocalStorage can be disabled. The form still shows a success state.
      }
      form.reset();
      showToast('Спасибо! Заявка сохранена. Подключите обработчик формы в README перед публикацией.');
    });
  });
})();
