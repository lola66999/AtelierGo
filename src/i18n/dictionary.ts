const uz = {
  // Navbar
  "nav.home": "Bosh sahifa",
  "nav.tailors": "Atelyelar",
  "nav.map": "Xarita",
  "nav.favorites": "Sevimlilar",
  "nav.orders": "Buyurtmalar",
  "nav.login": "Kirish",
  "nav.logout": "Chiqish",
  "nav.menu": "Menyu",
  "nav.becomeTailor": "Tikuvchi bo'lish",
  "nav.tagline": "Tikuvchilar va atelyelar",
  "nav.city": "Toshkent",

  // Footer
  "footer.about":
    "O'zingizga yaqin tikuvchi va atelyelarni toping, portfolio bilan tanishing va bevosita bog'laning.",
  "footer.pages": "Sahifalar",
  "footer.forTailors": "Tikuvchilar uchun",
  "footer.dashboard": "Kabinet",
  "footer.rights": "Barcha huquqlar himoyalangan.",

  // Hero
  "hero.title": "Yaqin atelye va tikuvchilarni toping!",
  "hero.subtitle":
    "Kiyim tikish, ta'mirlash va boshqa xizmatlar endilikda yanada oson.",
  "hero.allCategories": "Barcha kategoriyalar",
  "hero.searchPlaceholder": "Ism, xizmat yoki manzil bo'yicha qidiring",
  "hero.search": "Qidirish",

  // Kategoriyalar
  "cat.kostyum": "Kostyum-shim",
  "cat.kundalik": "Kundalik kiyim",
  "cat.koylak": "Ko'ylak",
  "cat.toy": "To'y libosi",
  "cat.shim": "Shim toraytirish",
  "cat.tamirlash": "Kiyim ta'mirlash",
  "cat.milliy": "Milliy kiyimlar",

  // Yaqin atelyelar
  "nearby.title": "Yaqin atelyelar",
  "nearby.subLocated": "Sizning joylashuvingizga eng yaqin tikuvchilar",
  "nearby.subDefault": "Toshkent markaziga nisbatan masofa ko'rsatilgan",
  "nearby.locate": "Joylashuvimni aniqlash",
  "nearby.all": "Barchasini ko'rish →",
  "nearby.noGeo": "Brauzeringiz lokatsiyani qo'llab-quvvatlamaydi",
  "nearby.denied": "Lokatsiyaga ruxsat berilmadi",

  // Tikuvchi bo'lish banneri
  "banner.title": "Siz tikuvchimisiz?",
  "banner.text":
    "Profil yarating, ishlaringiz portfoliosini joylang va yangi mijozlar toping.",
  "banner.updateTitle": "Profilingizni yangilang",
  "banner.updateText":
    "Yangi ishlar va narxlarni qo'shing, mijozlar sizni tezroq topadi.",
  "banner.toDashboard": "Kabinetga o'tish",

  // Ulashish
  "share.button": "Ulashish",
  "share.copy": "Havolani nusxalash",
  "share.copied": "Nusxalandi!",
  "share.more": "Boshqa ilovalar",
  "share.text": "{name}: AtelierGo'da tikuvchi",

    // Banner slaydlari
  "hero.s2.title": "Ishlar portfoliosini ko'ring",
  "hero.s2.text":
    "Tikuvchilarning haqiqiy ishlari bilan tanishing va o'zingizga mosini tanlang.",
  "hero.s3.title": "Buyurtmani onlayn bering",
  "hero.s3.text":
    "So'rov yuboring, tikuvchi javob beradi va buyurtma holatini kuzatib borasiz.",
  "hero.s4.title": "Tikuvchimisiz? Mijozlar sizni kutmoqda",
  "hero.s4.text":
    "Profil yarating, narxlarni belgilang va yaqin atrofdagi mijozlarga ko'rinib turing.",
  "hero.prev": "Oldingi",
  "hero.next": "Keyingi",
};

export type TKey = keyof typeof uz;
type Dict = Record<TKey, string>;

const ru: Dict = {
  "nav.home": "Главная",
  "nav.tailors": "Ателье",
  "nav.map": "Карта",
  "nav.favorites": "Избранное",
  "nav.orders": "Заказы",
  "nav.login": "Войти",
  "nav.logout": "Выйти",
  "nav.menu": "Меню",
  "nav.becomeTailor": "Стать мастером",
  "nav.tagline": "Портные и ателье",
  "nav.city": "Ташкент",

  "footer.about":
    "Найдите ближайших портных и ателье, изучите портфолио и свяжитесь напрямую.",
  "footer.pages": "Страницы",
  "footer.forTailors": "Для мастеров",
  "footer.dashboard": "Кабинет",
  "footer.rights": "Все права защищены.",

  "hero.title": "Найдите ближайшее ателье или портного!",
  "hero.subtitle":
    "Пошив, ремонт одежды и другие услуги теперь стали ещё проще.",
  "hero.allCategories": "Все категории",
  "hero.searchPlaceholder": "Поиск по имени, услуге или адресу",
  "hero.search": "Найти",

  "cat.kostyum": "Костюмы и брюки",
  "cat.kundalik": "Повседневная одежда",
  "cat.koylak": "Платья",
  "cat.toy": "Свадебные наряды",
  "cat.shim": "Подгонка брюк",
  "cat.tamirlash": "Ремонт одежды",
  "cat.milliy": "Национальная одежда",

  "nearby.title": "Ближайшие ателье",
  "nearby.subLocated": "Мастера, ближайшие к вашему местоположению",
  "nearby.subDefault": "Расстояние указано от центра Ташкента",
  "nearby.locate": "Определить моё местоположение",
  "nearby.all": "Смотреть все →",
  "nearby.noGeo": "Ваш браузер не поддерживает геолокацию",
  "nearby.denied": "Доступ к геолокации не разрешён",

  "banner.title": "Вы мастер?",
  "banner.text":
    "Создайте профиль, добавьте портфолио работ и находите новых клиентов.",
  "banner.updateTitle": "Обновите свой профиль",
  "banner.updateText":
    "Добавьте новые работы и цены, чтобы клиенты находили вас быстрее.",
  "banner.toDashboard": "Перейти в кабинет",

  "share.button": "Поделиться",
  "share.copy": "Скопировать ссылку",
  "share.copied": "Скопировано!",
  "share.more": "Другие приложения",
  "share.text": "{name}: мастер на AtelierGo",

    "hero.s2.title": "Смотрите портфолио работ",
  "hero.s2.text":
    "Изучите реальные работы мастеров и выберите подходящего.",
  "hero.s3.title": "Оформите заказ онлайн",
  "hero.s3.text":
    "Отправьте заявку, мастер ответит, а вы будете следить за статусом заказа.",
  "hero.s4.title": "Вы мастер? Вас ждут клиенты",
  "hero.s4.text":
    "Создайте профиль, укажите цены и станьте заметны для клиентов поблизости.",
  "hero.prev": "Назад",
  "hero.next": "Вперёд",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.tailors": "Ateliers",
  "nav.map": "Map",
  "nav.favorites": "Favorites",
  "nav.orders": "Orders",
  "nav.login": "Log in",
  "nav.logout": "Log out",
  "nav.menu": "Menu",
  "nav.becomeTailor": "Become a tailor",
  "nav.tagline": "Tailors and ateliers",
  "nav.city": "Tashkent",

  "footer.about":
    "Find tailors and ateliers near you, browse their portfolios and get in touch directly.",
  "footer.pages": "Pages",
  "footer.forTailors": "For tailors",
  "footer.dashboard": "Dashboard",
  "footer.rights": "All rights reserved.",

  "hero.title": "Find a nearby atelier or tailor!",
  "hero.subtitle":
    "Tailoring, alterations and other services are now easier than ever.",
  "hero.allCategories": "All categories",
  "hero.searchPlaceholder": "Search by name, service or address",
  "hero.search": "Search",

  "cat.kostyum": "Suits & trousers",
  "cat.kundalik": "Everyday clothes",
  "cat.koylak": "Dresses",
  "cat.toy": "Wedding dresses",
  "cat.shim": "Trouser tapering",
  "cat.tamirlash": "Clothing repair",
  "cat.milliy": "Traditional clothing",

  "nearby.title": "Nearby ateliers",
  "nearby.subLocated": "Tailors closest to your location",
  "nearby.subDefault": "Distance is shown from the centre of Tashkent",
  "nearby.locate": "Find my location",
  "nearby.all": "View all →",
  "nearby.noGeo": "Your browser does not support geolocation",
  "nearby.denied": "Location access was denied",

  "banner.title": "Are you a tailor?",
  "banner.text": "Create a profile, add your portfolio and find new clients.",
  "banner.updateTitle": "Update your profile",
  "banner.updateText": "Add new work and prices so clients can find you faster.",
  "banner.toDashboard": "Go to dashboard",

  "share.button": "Share",
  "share.copy": "Copy link",
  "share.copied": "Copied!",
  "share.more": "More apps",
  "share.text": "{name}: tailor on AtelierGo",

    "hero.s2.title": "Browse real portfolios",
  "hero.s2.text": "See tailors' actual work and choose the one that suits you.",
  "hero.s3.title": "Place your order online",
  "hero.s3.text":
    "Send a request, the tailor replies, and you can follow the order status.",
  "hero.s4.title": "Are you a tailor? Clients are waiting",
  "hero.s4.text":
    "Create a profile, set your prices and be seen by clients nearby.",
  "hero.prev": "Previous",
  "hero.next": "Next",
};

export const dictionary = { uz, ru, en };
export type Lang = keyof typeof dictionary;
export const LANGS: Lang[] = ["uz", "ru", "en"];