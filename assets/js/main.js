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
  const FORM_ENDPOINT = 'https://functions.yandexcloud.net/d4el3kuenb92272k0ql3';

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 5200);
  };

  forms.forEach((form) => {
    form.addEventListener('submit', async (event) => {
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

      const button = form.querySelector('button[type="submit"]');
      const originalButtonText = button ? button.textContent : '';
      const payload = Object.fromEntries(new FormData(form).entries());

      if (button) {
        button.disabled = true;
        button.textContent = 'Отправляем...';
      }

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.ok === false) {
          throw new Error(result.message || 'Не удалось отправить заявку');
        }

        form.reset();
        showToast('Спасибо! Заявка отправлена. Мы скоро свяжемся с вами.');
      } catch (error) {
        console.error('Form submit error:', error);
        showToast('Не удалось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.');
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = originalButtonText;
        }
      }
    });
  });
})();
