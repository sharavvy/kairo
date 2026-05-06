"use strict";

const STORAGE = {
  users: "kairo_fixed_users",
  currentUser: "kairo_fixed_current_user",
  dishes: "kairo_menu_5_each_dishes",
  reviews: "kairo_fixed_reviews"
};

const categories = [
  "Рекомендованные",
  "Горячие блюда",
  "Закуски",
  "Салаты",
  "Супы",
  "Напитки",
  "Десерты",
  "Специальные предложения"
];

const recommendedDishIds = new Set(["dish-hot-1", "dish-app-1", "dish-salad-1", "dish-drink-1", "dish-special-1"]);

const defaultDishes = [
  {
    id: "dish-hot-1",
    title: "Стейк с перечным соусом",
    category: "Горячие блюда",
    description: "Мраморная говядина, соус демиглас, печеный картофель и зелень.",
    price: 1890,
    colors: ["#5a2d1a", "#16302d"]
  },
  {
    id: "dish-hot-2",
    title: "Паста с креветками",
    category: "Горячие блюда",
    description: "Паста в сливочном соусе с тигровыми креветками и пармезаном.",
    price: 1350,
    colors: ["#7a4b25", "#263d3a"]
  },
  {
    id: "dish-hot-3",
    title: "Утиная грудка с вишневым соусом",
    category: "Горячие блюда",
    description: "Нежная утка, вишневый соус, овощное пюре и микрозелень.",
    price: 1650,
    colors: ["#63301f", "#2f1f24"]
  },
  {
    id: "dish-hot-4",
    title: "Лосось с овощами гриль",
    category: "Горячие блюда",
    description: "Филе лосося, цукини, перец, лимонный соус и зелень.",
    price: 1720,
    colors: ["#8b4a39", "#23423d"]
  },
  {
    id: "dish-hot-5",
    title: "Ризотто с белыми грибами",
    category: "Горячие блюда",
    description: "Кремовое ризотто с грибами, пармезаном и ароматным маслом.",
    price: 1180,
    colors: ["#6e4c2f", "#1f302d"]
  },
  {
    id: "dish-app-1",
    title: "Тартар из лосося",
    category: "Закуски",
    description: "Лосось, авокадо, цитрусовая заправка и хрустящие тосты.",
    price: 1150,
    colors: ["#8e4d42", "#243b35"]
  },
  {
    id: "dish-app-2",
    title: "Брускетта с ростбифом",
    category: "Закуски",
    description: "Хрустящий хлеб, ростбиф, крем-сыр и маринованный лук.",
    price: 780,
    colors: ["#7b3a24", "#24231f"]
  },
  {
    id: "dish-app-3",
    title: "Сырное плато",
    category: "Закуски",
    description: "Подборка сыров, мед, орехи, виноград и гриссини.",
    price: 1450,
    colors: ["#9a6c35", "#222b25"]
  },
  {
    id: "dish-app-4",
    title: "Креветки темпура",
    category: "Закуски",
    description: "Креветки в легкой панировке с соусом спайси и лаймом.",
    price: 990,
    colors: ["#a15f2c", "#193a38"]
  },
  {
    id: "dish-app-5",
    title: "Паштет с ягодным конфитюром",
    category: "Закуски",
    description: "Куриный паштет, тосты, ягодный конфитюр и зелень.",
    price: 690,
    colors: ["#704426", "#31251e"]
  },
  {
    id: "dish-salad-1",
    title: "Буррата с томатами",
    category: "Салаты",
    description: "Сыр буррата, сладкие томаты, базилик и оливковое масло.",
    price: 980,
    colors: ["#6d2c26", "#3f4d2a"]
  },
  {
    id: "dish-salad-2",
    title: "Цезарь с курицей",
    category: "Салаты",
    description: "Куриное филе, романо, пармезан, сухари и фирменный соус.",
    price: 790,
    colors: ["#59612a", "#2a2a20"]
  },
  {
    id: "dish-salad-3",
    title: "Салат с креветками и авокадо",
    category: "Салаты",
    description: "Креветки, авокадо, микс салатов, черри и цитрусовая заправка.",
    price: 1120,
    colors: ["#365e46", "#a05b35"]
  },
  {
    id: "dish-salad-4",
    title: "Греческий салат",
    category: "Салаты",
    description: "Огурцы, томаты, перец, маслины, фета и оливковая заправка.",
    price: 650,
    colors: ["#496837", "#7e3e2e"]
  },
  {
    id: "dish-salad-5",
    title: "Теплый салат с говядиной",
    category: "Салаты",
    description: "Говядина, овощи, листья салата и пряная заправка.",
    price: 1050,
    colors: ["#623022", "#26352b"]
  },
  {
    id: "dish-soup-1",
    title: "Тыквенный крем-суп",
    category: "Супы",
    description: "Нежный крем-суп с кокосовым молоком, семечками и пряностями.",
    price: 690,
    colors: ["#9b5e23", "#2d2921"]
  },
  {
    id: "dish-soup-2",
    title: "Том-ям с креветками",
    category: "Супы",
    description: "Острый азиатский суп с креветками, грибами и кокосовым молоком.",
    price: 890,
    colors: ["#a04a2c", "#233a36"]
  },
  {
    id: "dish-soup-3",
    title: "Куриный суп с лапшой",
    category: "Супы",
    description: "Домашний бульон, курица, лапша, морковь и свежая зелень.",
    price: 520,
    colors: ["#b1843e", "#2d3028"]
  },
  {
    id: "dish-soup-4",
    title: "Грибной крем-суп",
    category: "Супы",
    description: "Шампиньоны, белые грибы, сливки и хрустящие гренки.",
    price: 650,
    colors: ["#6a5032", "#202723"]
  },
  {
    id: "dish-soup-5",
    title: "Борщ с говядиной",
    category: "Супы",
    description: "Классический борщ с говядиной, сметаной и бородинским хлебом.",
    price: 590,
    colors: ["#842c32", "#25211d"]
  },
  {
    id: "dish-drink-1",
    title: "Авторский лимонад",
    category: "Напитки",
    description: "Цитрус, мята, базилик, содовая и легкая сладость.",
    price: 520,
    colors: ["#245047", "#b1843e"]
  },
  {
    id: "dish-drink-2",
    title: "Морс из черной смородины",
    category: "Напитки",
    description: "Ягодный морс собственного приготовления с мягкой кислинкой.",
    price: 390,
    colors: ["#4b243e", "#193431"]
  },
  {
    id: "dish-drink-3",
    title: "Имбирный чай",
    category: "Напитки",
    description: "Черный чай, имбирь, лимон, мед и пряности.",
    price: 460,
    colors: ["#8d5e2b", "#2b241d"]
  },
  {
    id: "dish-drink-4",
    title: "Матча латте",
    category: "Напитки",
    description: "Матча, молоко, ванильный сироп и мягкая молочная пенка.",
    price: 480,
    colors: ["#4f6935", "#182a25"]
  },
  {
    id: "dish-drink-5",
    title: "Эспрессо тоник",
    category: "Напитки",
    description: "Эспрессо, тоник, лед и цитрусовый акцент.",
    price: 450,
    colors: ["#2f2a22", "#53665c"]
  },
  {
    id: "dish-dessert-1",
    title: "Шоколадный фондан",
    category: "Десерты",
    description: "Теплый шоколадный десерт с ягодами и шариком мороженого.",
    price: 620,
    colors: ["#3d2119", "#8b5e35"]
  },
  {
    id: "dish-dessert-2",
    title: "Чизкейк с ягодами",
    category: "Десерты",
    description: "Кремовый чизкейк, ягодный соус и свежие ягоды.",
    price: 590,
    colors: ["#7b4b44", "#27261f"]
  },
  {
    id: "dish-dessert-3",
    title: "Медовик",
    category: "Десерты",
    description: "Слоеный медовый торт со сливочным кремом.",
    price: 540,
    colors: ["#9c6a2d", "#2d261f"]
  },
  {
    id: "dish-dessert-4",
    title: "Панна-котта с манго",
    category: "Десерты",
    description: "Сливочная панна-котта, манговый соус и кокосовая стружка.",
    price: 560,
    colors: ["#a46b25", "#2c3427"]
  },
  {
    id: "dish-dessert-5",
    title: "Ягодный тарт",
    category: "Десерты",
    description: "Песочная основа, заварной крем и свежие ягоды.",
    price: 640,
    colors: ["#874140", "#252820"]
  },
  {
    id: "dish-special-1",
    title: "Сет для компании",
    category: "Специальные предложения",
    description: "Закуски, горячие блюда и десерты для дружеской встречи.",
    price: 5200,
    colors: ["#3b3426", "#1c4540"]
  },
  {
    id: "dish-special-2",
    title: "Ужин на двоих",
    category: "Специальные предложения",
    description: "Две закуски, два горячих блюда, десерт и напитки.",
    price: 3900,
    colors: ["#4a3124", "#233633"]
  },
  {
    id: "dish-special-3",
    title: "Семейный обед",
    category: "Специальные предложения",
    description: "Набор блюд для 4 гостей с салатами, горячим и десертами.",
    price: 6400,
    colors: ["#5f3a25", "#30301f"]
  },
  {
    id: "dish-special-4",
    title: "Дегустационный сет",
    category: "Специальные предложения",
    description: "Пять мини-блюд от шефа для знакомства с кухней ресторана.",
    price: 4500,
    colors: ["#6a3e2c", "#1c3531"]
  },
  {
    id: "dish-special-5",
    title: "Банкетное предложение",
    category: "Специальные предложения",
    description: "Подборка закусок и горячих блюд для праздничного стола.",
    price: 7800,
    colors: ["#3b3426", "#5a321c"]
  }
];

const defaultReviews = [
  {
    id: "review-1",
    name: "Анна",
    rating: 5,
    text: "Красивый интерьер, спокойная музыка и очень удобное меню на сайте.",
    date: "2026-05-01",
    published: true
  },
  {
    id: "review-2",
    name: "Дмитрий",
    rating: 5,
    text: "Бронь оформляется быстро, карточки блюд понятные, дизайн выглядит современно.",
    date: "2026-05-02",
    published: true
  },
  {
    id: "review-3",
    name: "Мария",
    rating: 4,
    text: "Понравилась атмосфера зала и аккуратная подача блюд. Для вечерней встречи место подходит отлично.",
    date: "2026-05-03",
    published: true
  }
];

const state = {
  category: "Рекомендованные",
  search: "",
  reviewIndex: 0,
  currentUser: readStorage(STORAGE.currentUser, null)
};

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Сайт должен работать даже в браузерах, где localStorage недоступен.
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Игнорируем: отсутствие localStorage не должно ломать интерфейс.
  }
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatPrice(price) {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "long", year: "numeric" }).format(date);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function ensureData() {
  if (!readStorage(STORAGE.dishes, null)) {
    writeStorage(STORAGE.dishes, defaultDishes);
  }
  const savedReviews = readStorage(STORAGE.reviews, null);
  if (!savedReviews) {
    writeStorage(STORAGE.reviews, defaultReviews);
  } else {
    const savedIds = new Set(savedReviews.map((review) => review.id));
    const missingDefaults = defaultReviews.filter((review) => !savedIds.has(review.id));
    if (missingDefaults.length) {
      writeStorage(STORAGE.reviews, savedReviews.concat(missingDefaults));
    }
  }
  if (!readStorage(STORAGE.users, null)) {
    writeStorage(STORAGE.users, [
      {
        id: "admin",
        name: "Администратор",
        email: "admin@kairo.local",
        password: "admin123",
        role: "admin",
        createdAt: "2026-05-04"
      }
    ]);
  }
}

function getDishes() {
  return readStorage(STORAGE.dishes, defaultDishes);
}

function setDishes(items) {
  writeStorage(STORAGE.dishes, items);
}

function getReviews() {
  return readStorage(STORAGE.reviews, defaultReviews);
}

function setReviews(items) {
  writeStorage(STORAGE.reviews, items);
}

function getUsers() {
  return readStorage(STORAGE.users, []);
}

function setUsers(items) {
  writeStorage(STORAGE.users, items);
}

function setMessage(element, text, type = "success") {
  if (!element) return;
  element.textContent = text;
  element.classList.remove("success", "error-text");
  element.classList.add(type === "success" ? "success" : "error-text");
}

function setFieldError(field, message) {
  const error = field.closest("label")?.querySelector(".error");
  if (error) error.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateRequired(field, message = "Заполните поле") {
  const value = field.value.trim();
  if (!value) {
    setFieldError(field, message);
    return false;
  }
  if (field.minLength > 0 && value.length < field.minLength) {
    setFieldError(field, `Минимум ${field.minLength} символов`);
    return false;
  }
  setFieldError(field, "");
  return true;
}

function validateEmail(field) {
  const basic = validateRequired(field, "Введите email");
  const value = field.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (basic && !ok) {
    setFieldError(field, "Введите корректный email");
    return false;
  }
  return basic && ok;
}

function renderCategories() {
  const wrap = qs("#categoryTabs");
  if (!wrap) return;
  wrap.innerHTML = categories.map((category) => `
    <button type="button" class="${category === state.category ? "active" : ""}" data-category="${escapeHtml(category)}">
      ${escapeHtml(category)}
    </button>
  `).join("");

  qsa("button", wrap).forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      renderCategories();
      renderMenu();
    });
  });
}

function renderMenu() {
  const grid = qs("#menuGrid");
  if (!grid) return;

  const search = state.search.trim().toLowerCase();
  const items = getDishes().filter((dish) => {
    const isRecommended = recommendedDishIds.has(dish.id) || dish.recommended === true;
    const categoryOk = state.category === "Рекомендованные" ? isRecommended : dish.category === state.category;
    const searchOk = !search || `${dish.title} ${dish.description} ${dish.category}`.toLowerCase().includes(search);
    return categoryOk && searchOk;
  });

  if (!items.length) {
    grid.innerHTML = `<div class="empty-state">По вашему запросу ничего не найдено.</div>`;
    return;
  }

  grid.innerHTML = items.map((dish) => {
    const colors = dish.colors || ["#5a321c", "#1b3633"];
    const imagePath = dish.image || `assets/dishes/${dish.id}.jpg`;
    return `
      <article class="dish-card">
        <button
          class="dish-img"
          type="button"
          style="--dish-a:${escapeHtml(colors[0])};--dish-b:${escapeHtml(colors[1])};--dish-image:url('${escapeHtml(imagePath)}')"
          data-dish-image="${escapeHtml(imagePath)}"
          data-dish-title="${escapeHtml(dish.title)}"
          data-dish-description="${escapeHtml(dish.description)}"
          aria-label="Открыть фото блюда ${escapeHtml(dish.title)}">
        </button>
        <div class="dish-body">
          <span class="dish-category">${escapeHtml(dish.category)}</span>
          <h3>${escapeHtml(dish.title)}</h3>
          <p>${escapeHtml(dish.description)}</p>
          <strong class="dish-price">${formatPrice(Number(dish.price))}</strong>
        </div>
      </article>
    `;
  }).join("");
}

function getPublishedReviews() {
  return getReviews().filter((review) => review.published !== false).slice().reverse();
}

function updateReviewCarousel() {
  const track = qs("#reviewsList");
  const counter = qs("#reviewCounter");
  const prev = qs("[data-review-prev]");
  const next = qs("[data-review-next]");
  const reviews = getPublishedReviews();

  if (!track || !reviews.length) return;

  if (state.reviewIndex < 0) state.reviewIndex = reviews.length - 1;
  if (state.reviewIndex >= reviews.length) state.reviewIndex = 0;

  track.style.transform = `translateX(-${state.reviewIndex * 100}%)`;
  if (counter) counter.textContent = `${state.reviewIndex + 1} / ${reviews.length}`;
  [prev, next].forEach((button) => {
    if (button) button.disabled = reviews.length < 2;
  });
}

function renderReviews() {
  const list = qs("#reviewsList");
  const counter = qs("#reviewCounter");
  if (!list) return;
  const reviews = getPublishedReviews();

  if (!reviews.length) {
    list.innerHTML = `<div class="empty-state">Пока нет опубликованных отзывов.</div>`;
    if (counter) counter.textContent = "";
    return;
  }

  if (state.reviewIndex >= reviews.length) state.reviewIndex = 0;

  list.innerHTML = reviews.map((review) => `
    <article class="review-card">
      <strong>${escapeHtml(review.name)}</strong>
      <span>${"★".repeat(Number(review.rating))}${"☆".repeat(5 - Number(review.rating))}</span>
      <time datetime="${escapeHtml(review.date || "")}">${escapeHtml(formatDate(review.date))}</time>
      <p>${escapeHtml(review.text)}</p>
    </article>
  `).join("");

  updateReviewCarousel();
}

function renderAdminList() {
  const panel = qs("#adminPanel");
  const list = qs("#adminDishList");
  if (!panel || !list) return;

  panel.hidden = state.currentUser?.role !== "admin";
  if (panel.hidden) return;

  list.innerHTML = getDishes().map((dish) => `
    <div class="admin-item">
      <div>
        <strong>${escapeHtml(dish.title)}</strong>
        <span>${escapeHtml(dish.category)} · ${formatPrice(Number(dish.price))}</span>
      </div>
      <button class="small-btn" type="button" data-delete-dish="${escapeHtml(dish.id)}">Удалить</button>
    </div>
  `).join("");

  qsa("[data-delete-dish]", list).forEach((button) => {
    button.addEventListener("click", () => {
      const next = getDishes().filter((dish) => dish.id !== button.dataset.deleteDish);
      setDishes(next);
      renderMenu();
      renderAdminList();
    });
  });
}

function updateUserUI() {
  const box = qs("#currentUser");
  const adminPanel = qs("#adminPanel");
  const accountButton = qs('[data-modal-open="accountModal"]');
  const accountTitle = qs("#accountModalTitle");
  const loginForm = qs("#loginForm");
  const tabsBox = qs(".auth-tabs");
  const loginTab = qs('[data-auth-tab="login"]');
  const registerTab = qs('[data-auth-tab="register"]');
  const loginPanel = qs('[data-auth-panel="login"]');
  const registerPanel = qs('[data-auth-panel="register"]');

  if (state.currentUser) {
    if (box) {
      box.innerHTML = `
        <strong>Вы вошли как ${escapeHtml(state.currentUser.name)}</strong><br>
        <span>${escapeHtml(state.currentUser.email)}</span><br>
        <button class="small-btn" type="button" id="logoutBtn">Выйти</button>
      `;
      qs("#logoutBtn")?.addEventListener("click", () => {
        state.currentUser = null;
        removeStorage(STORAGE.currentUser);
        updateUserUI();
        renderAdminList();
      });
    }
    if (loginForm) loginForm.hidden = true;
    if (tabsBox) tabsBox.hidden = true;
    if (loginPanel) {
      loginPanel.hidden = false;
      loginPanel.classList.add("active");
    }
    if (registerPanel) {
      registerPanel.hidden = true;
      registerPanel.classList.remove("active");
    }
    if (loginTab) {
      loginTab.classList.add("active");
      loginTab.setAttribute("aria-selected", "true");
    }
    if (registerTab) {
      registerTab.classList.remove("active");
      registerTab.setAttribute("aria-selected", "false");
    }
    if (accountButton) accountButton.textContent = "Профиль";
    if (accountTitle) accountTitle.textContent = "Профиль";
  } else {
    if (box) box.innerHTML = "";
    if (loginForm) loginForm.hidden = false;
    if (tabsBox) tabsBox.hidden = false;
    if (accountButton) accountButton.textContent = "Аккаунт";
    if (accountTitle) accountTitle.textContent = "Аккаунт гостя";
  }

  if (adminPanel) adminPanel.hidden = state.currentUser?.role !== "admin";
}

function setupNavigation() {
  const burger = qs(".burger");
  const menu = qs("#navMenu");
  if (!burger || !menu) return;

  const closeMenu = () => {
    burger.setAttribute("aria-expanded", "false");
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    burger.setAttribute("aria-expanded", "true");
    menu.classList.add("open");
    document.body.classList.add("menu-open");
  };

  burger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  menu.addEventListener("click", (event) => {
    const item = event.target.closest("a, button");
    if (!item) return;
    closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!menu.classList.contains("open")) return;
    if (menu.contains(event.target) || burger.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const desktopQuery = window.matchMedia("(min-width: 1181px)");
  const handleViewportChange = () => {
    if (desktopQuery.matches) closeMenu();
  };

  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", handleViewportChange);
  } else if (typeof desktopQuery.addListener === "function") {
    desktopQuery.addListener(handleViewportChange);
  }

  handleViewportChange();
}

function setupModals() {
  const openButtons = qsa("[data-modal-open]");
  const modals = qsa(".modal");
  let lastFocused = null;

  const closeModal = (modal) => {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
  };

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modals.forEach((item) => item.setAttribute("aria-hidden", "true"));
    lastFocused = document.activeElement;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const firstInput = modal.querySelector("input, button, select, textarea, a");
    setTimeout(() => firstInput?.focus(), 0);
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", () => openModal(button.dataset.modalOpen));
  });

  modals.forEach((modal) => {
    qsa("[data-modal-close]", modal).forEach((item) => {
      item.addEventListener("click", () => closeModal(modal));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeModal(qs('.modal[aria-hidden="false"]'));
  });
}

function setupAuthTabs() {
  const tabs = qsa("[data-auth-tab]");
  const panels = qsa("[data-auth-panel]");
  if (!tabs.length || !panels.length) return;

  const activate = (target) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.authTab === target;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    panels.forEach((panel) => {
      const active = panel.dataset.authPanel === target;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.authTab));
  });

  return activate;
}

function setupReveal() {
  const targets = qsa(".reveal");
  if (!targets.length) return;
  if (!("IntersectionObserver" in window)) {
    targets.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((target) => observer.observe(target));
}

function setupBookingForm() {
  const form = qs("#bookingForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredOk = ["date", "time", "guests", "name", "phone"].every((name) => validateRequired(form.elements[name]));
    const phone = form.elements.phone.value.trim();
    const phoneOk = /^\+?[0-9\s()\-]{10,18}$/.test(phone);
    if (phone && !phoneOk) setFieldError(form.elements.phone, "Введите корректный телефон");
    if (requiredOk && phoneOk) {
      setMessage(qs("#bookingMessage"), "Заявка отправлена. Администратор свяжется с вами для подтверждения.");
      form.reset();
    } else {
      setMessage(qs("#bookingMessage"), "Проверьте заполнение формы.", "error");
    }
  });
}

function setupRegisterForm() {
  const form = qs("#registerForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameOk = validateRequired(form.elements.name, "Введите имя");
    const emailOk = validateEmail(form.elements.email);
    const passOk = validateRequired(form.elements.password, "Введите пароль");
    const confirmOk = validateRequired(form.elements.confirmPassword, "Повторите пароль");
    const match = form.elements.password.value === form.elements.confirmPassword.value;

    if (confirmOk && !match) setFieldError(form.elements.confirmPassword, "Пароли не совпадают");
    if (!(nameOk && emailOk && passOk && confirmOk && match)) {
      setMessage(qs("#registerMessage"), "Исправьте ошибки в форме.", "error");
      return;
    }

    const email = form.elements.email.value.trim().toLowerCase();
    const users = getUsers();
    if (users.some((user) => user.email === email)) {
      setFieldError(form.elements.email, "Пользователь с таким email уже есть");
      setMessage(qs("#registerMessage"), "Такой email уже зарегистрирован.", "error");
      return;
    }

    users.push({
      id: uid("user"),
      name: form.elements.name.value.trim(),
      email,
      password: form.elements.password.value,
      role: "guest",
      createdAt: new Date().toISOString()
    });
    setUsers(users);
    form.reset();
    setMessage(qs("#registerMessage"), "Аккаунт создан. Теперь можно войти.");
    qs('[data-auth-tab="login"]')?.click();
    const loginEmail = qs('#loginForm input[name="email"]');
    if (loginEmail) loginEmail.value = email;
  });
}

function setupLoginForm() {
  const form = qs("#loginForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailOk = validateEmail(form.elements.email);
    const passOk = validateRequired(form.elements.password, "Введите пароль");
    if (!(emailOk && passOk)) {
      setMessage(qs("#loginMessage"), "Введите email и пароль.", "error");
      return;
    }

    const email = form.elements.email.value.trim().toLowerCase();
    const password = form.elements.password.value;
    const user = getUsers().find((item) => item.email === email && item.password === password);
    if (!user) {
      setMessage(qs("#loginMessage"), "Неверный email или пароль.", "error");
      return;
    }

    state.currentUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    writeStorage(STORAGE.currentUser, state.currentUser);
    form.reset();
    setMessage(qs("#loginMessage"), "Вход выполнен успешно.");
    const reviewName = qs("#reviewForm input[name='name']");
    if (reviewName) reviewName.value = user.name;
    updateUserUI();
    renderAdminList();
  });
}

function setupReviewCarousel() {
  const prev = qs("[data-review-prev]");
  const next = qs("[data-review-next]");

  if (prev) {
    prev.addEventListener("click", () => {
      state.reviewIndex -= 1;
      updateReviewCarousel();
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      state.reviewIndex += 1;
      updateReviewCarousel();
    });
  }
}

function setupReviewForm() {
  const form = qs("#reviewForm");
  if (!form) return;
  if (state.currentUser) form.elements.name.value = state.currentUser.name;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameOk = validateRequired(form.elements.name, "Введите имя");
    const ratingOk = validateRequired(form.elements.rating, "Выберите оценку");
    const textOk = validateRequired(form.elements.text, "Напишите отзыв");
    if (!(nameOk && ratingOk && textOk)) {
      setMessage(qs("#reviewMessage"), "Заполните все поля отзыва.", "error");
      return;
    }

    const reviews = getReviews();
    reviews.push({
      id: uid("review"),
      name: form.elements.name.value.trim(),
      rating: Number(form.elements.rating.value),
      text: form.elements.text.value.trim(),
      date: new Date().toISOString(),
      published: true
    });
    setReviews(reviews);
    state.reviewIndex = 0;
    setMessage(qs("#reviewMessage"), "Спасибо! Отзыв опубликован.");
    const savedName = state.currentUser?.name || "";
    form.reset();
    if (savedName) form.elements.name.value = savedName;
    renderReviews();
  });
}

function setupDishForm() {
  const form = qs("#dishForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (state.currentUser?.role !== "admin") return;

    const titleOk = validateRequired(form.elements.title, "Введите название");
    const categoryOk = validateRequired(form.elements.category, "Выберите категорию");
    const descOk = validateRequired(form.elements.description, "Добавьте описание");
    const priceOk = validateRequired(form.elements.price, "Укажите цену") && Number(form.elements.price.value) > 0;
    if (!priceOk) setFieldError(form.elements.price, "Цена должна быть больше 0");

    if (!(titleOk && categoryOk && descOk && priceOk)) {
      setMessage(qs("#dishMessage"), "Проверьте данные блюда.", "error");
      return;
    }

    const dishes = getDishes();
    dishes.push({
      id: uid("dish"),
      title: form.elements.title.value.trim(),
      category: form.elements.category.value,
      description: form.elements.description.value.trim(),
      price: Number(form.elements.price.value),
      image: form.elements.image?.value.trim() || "assets/dishes/default.jpg",
      colors: ["#6b3d22", "#183a35"]
    });
    setDishes(dishes);
    form.reset();
    setMessage(qs("#dishMessage"), "Блюдо добавлено.");
    renderMenu();
    renderAdminList();
  });
}

function setupDishImageLightbox() {
  const grid = qs("#menuGrid");
  const modal = qs("#imageLightbox");
  const image = qs("#imageLightboxImg");
  const title = qs("#imageLightboxTitle");
  const text = qs("#imageLightboxText");
  if (!grid || !modal || !image || !title || !text) return;

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-dish-image]");
    if (!button) return;

    qsa(".modal").forEach((item) => item.setAttribute("aria-hidden", "true"));
    image.src = button.dataset.dishImage;
    image.alt = button.dataset.dishTitle || "Фото блюда";
    title.textContent = button.dataset.dishTitle || "Фото блюда";
    text.textContent = button.dataset.dishDescription || "";
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    qs("[data-modal-close]", modal)?.focus();
  });
}

function setupSearch() {
  const input = qs("#menuSearch");
  if (!input) return;
  input.addEventListener("input", () => {
    state.search = input.value;
    renderMenu();
  });
}

function init() {
  ensureData();
  setupNavigation();
  setupModals();
  setupAuthTabs();
  setupReveal();
  setupBookingForm();
  setupRegisterForm();
  setupLoginForm();
  setupReviewCarousel();
  setupReviewForm();
  setupDishForm();
  setupDishImageLightbox();
  setupSearch();
  renderCategories();
  renderMenu();
  renderReviews();
  updateUserUI();
  renderAdminList();
}

document.addEventListener("DOMContentLoaded", init);
