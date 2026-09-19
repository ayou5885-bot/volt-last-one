// src/data/translations.ts

interface CommonTranslations {
  home: string;
  shop: string;
  categories: string;
  search: string;
  cart: string;
  checkout: string;
  back: string;
  continue: string;
  cancel: string;
  close: string;
  clear: string;
  apply: string;
  reset: string;
  loading: string;
  noResults: string;
  viewAll: string;
  learnMore: string;
  addToCart: string;
  buyNow: string;
  remove: string;
  quantity: string;
  price: string;
  total: string;
  subtotal: string;
  available: string;
  unavailable: string;
}

interface NavigationTranslations {
  home: string;
  shop: string;
  categories: string;
}

interface SearchTranslations {
  search: string;
  searchPlaceholder: string;
  searchProducts: string;
  noSearchResults: string;
}

interface ShopTranslations {
  title: string;
  allProducts: string;
  filters: string;
  filterBy: string;
  category: string;
  brand: string;
  price: string;
  availability: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  featured: string;
  priceLowToHigh: string;
  priceHighToLow: string;
  newest: string;
  clearFilters: string;
  productsFound: string;
  product: string;
  products: string;
  noProducts: string;
  tryDifferentFilters: string;
}

interface ProductTranslations {
  specifications: string;
  features: string;
  inStock: string;
  outOfStock: string;
  addToCart: string;
  addedToCart: string;
  quantity: string;
  relatedProducts: string;
  productNotFound: string;
}

interface CartTranslations {
  title: string;
  empty: string;
  emptyDescription: string;
  continueShopping: string;
  subtotal: string;
  total: string;
  remove: string;
  quantity: string;
  proceedToCheckout: string;
}

interface CheckoutTranslations {
  title: string;
  customerInformation: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  wilaya: string;
  orderSummary: string;
  placeOrder: string;
  requiredField: string;
  orderSuccess: string;
  orderSuccessDescription: string;
}

interface FooterTranslations {
  quickLinks: string;
  customerService: string;
  followUs: string;
  allRightsReserved: string;
}

interface NotFoundTranslations {
  title: string;
  description: string;
  backHome: string;
}

interface TranslationSchema {
  common: CommonTranslations;
  navigation: NavigationTranslations;
  search: SearchTranslations;
  shop: ShopTranslations;
  product: ProductTranslations;
  cart: CartTranslations;
  checkout: CheckoutTranslations;
  footer: FooterTranslations;
  notFound: NotFoundTranslations;
}

const en: TranslationSchema = {
  common: {
    home: 'Home',
    shop: 'Shop',
    categories: 'Categories',
    search: 'Search',
    cart: 'Cart',
    checkout: 'Checkout',
    back: 'Back',
    continue: 'Continue',
    cancel: 'Cancel',
    close: 'Close',
    clear: 'Clear',
    apply: 'Apply',
    reset: 'Reset',
    loading: 'Loading...',
    noResults: 'No results found',
    viewAll: 'View All',
    learnMore: 'Learn More',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    remove: 'Remove',
    quantity: 'Quantity',
    price: 'Price',
    total: 'Total',
    subtotal: 'Subtotal',
    available: 'Available',
    unavailable: 'Unavailable',
  },
  navigation: {
    home: 'Home',
    shop: 'Shop',
    categories: 'Categories',
  },
  search: {
    search: 'Search',
    searchPlaceholder: 'Search products...',
    searchProducts: 'Search Products',
    noSearchResults: 'No products match your search',
  },
  shop: {
    title: 'Shop',
    allProducts: 'All Products',
    filters: 'Filters',
    filterBy: 'Filter By',
    category: 'Category',
    brand: 'Brand',
    price: 'Price',
    availability: 'Availability',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    sortBy: 'Sort By',
    featured: 'Featured',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    newest: 'Newest',
    clearFilters: 'Clear Filters',
    productsFound: 'products found',
    product: 'product',
    products: 'products',
    noProducts: 'No products found',
    tryDifferentFilters: 'Try adjusting your filters',
  },
  product: {
    specifications: 'Specifications',
    features: 'Features',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Cart',
    quantity: 'Quantity',
    relatedProducts: 'Related Products',
    productNotFound: 'Product not found',
  },
  cart: {
    title: 'Cart',
    empty: 'Your cart is empty',
    emptyDescription: "Looks like you haven't added anything to your cart yet",
    continueShopping: 'Continue Shopping',
    subtotal: 'Subtotal',
    total: 'Total',
    remove: 'Remove',
    quantity: 'Quantity',
    proceedToCheckout: 'Proceed to Checkout',
  },
  checkout: {
    title: 'Checkout',
    customerInformation: 'Customer Information',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    wilaya: 'Wilaya',
    orderSummary: 'Order Summary',
    placeOrder: 'Place Order',
    requiredField: 'This field is required',
    orderSuccess: 'Order Placed Successfully',
    orderSuccessDescription:
      'Thank you for your order. We will contact you shortly to confirm the details.',
  },
  footer: {
    quickLinks: 'Quick Links',
    customerService: 'Customer Service',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved.',
  },
  notFound: {
    title: 'Page Not Found',
    description: "The page you are looking for doesn't exist or has been moved.",
    backHome: 'Back to Home',
  },
};

const fr: TranslationSchema = {
  common: {
    home: 'Accueil',
    shop: 'Boutique',
    categories: 'Catégories',
    search: 'Rechercher',
    cart: 'Panier',
    checkout: 'Commande',
    back: 'Retour',
    continue: 'Continuer',
    cancel: 'Annuler',
    close: 'Fermer',
    clear: 'Effacer',
    apply: 'Appliquer',
    reset: 'Réinitialiser',
    loading: 'Chargement...',
    noResults: 'Aucun résultat trouvé',
    viewAll: 'Voir tout',
    learnMore: 'En savoir plus',
    addToCart: 'Ajouter au panier',
    buyNow: 'Acheter maintenant',
    remove: 'Retirer',
    quantity: 'Quantité',
    price: 'Prix',
    total: 'Total',
    subtotal: 'Sous-total',
    available: 'Disponible',
    unavailable: 'Indisponible',
  },
  navigation: {
    home: 'Accueil',
    shop: 'Boutique',
    categories: 'Catégories',
  },
  search: {
    search: 'Rechercher',
    searchPlaceholder: 'Rechercher des produits...',
    searchProducts: 'Rechercher des produits',
    noSearchResults: 'Aucun produit ne correspond à votre recherche',
  },
  shop: {
    title: 'Boutique',
    allProducts: 'Tous les produits',
    filters: 'Filtres',
    filterBy: 'Filtrer par',
    category: 'Catégorie',
    brand: 'Marque',
    price: 'Prix',
    availability: 'Disponibilité',
    minPrice: 'Prix minimum',
    maxPrice: 'Prix maximum',
    sortBy: 'Trier par',
    featured: 'En vedette',
    priceLowToHigh: 'Prix croissant',
    priceHighToLow: 'Prix décroissant',
    newest: 'Nouveautés',
    clearFilters: 'Réinitialiser les filtres',
    productsFound: 'produits trouvés',
    product: 'produit',
    products: 'produits',
    noProducts: 'Aucun produit trouvé',
    tryDifferentFilters: 'Essayez d\'ajuster vos filtres',
  },
  product: {
    specifications: 'Spécifications',
    features: 'Caractéristiques',
    inStock: 'En stock',
    outOfStock: 'Rupture de stock',
    addToCart: 'Ajouter au panier',
    addedToCart: 'Ajouté au panier',
    quantity: 'Quantité',
    relatedProducts: 'Produits similaires',
    productNotFound: 'Produit introuvable',
  },
  cart: {
    title: 'Panier',
    empty: 'Votre panier est vide',
    emptyDescription: "Il semble que vous n'ayez encore rien ajouté à votre panier",
    continueShopping: 'Continuer mes achats',
    subtotal: 'Sous-total',
    total: 'Total',
    remove: 'Retirer',
    quantity: 'Quantité',
    proceedToCheckout: 'Passer la commande',
  },
  checkout: {
    title: 'Commande',
    customerInformation: 'Informations client',
    fullName: 'Nom complet',
    email: 'E-mail',
    phone: 'Téléphone',
    address: 'Adresse',
    city: 'Ville',
    wilaya: 'Wilaya',
    orderSummary: 'Récapitulatif de la commande',
    placeOrder: 'Passer la commande',
    requiredField: 'Ce champ est obligatoire',
    orderSuccess: 'Commande passée avec succès',
    orderSuccessDescription:
      'Merci pour votre commande. Nous vous contacterons prochainement pour confirmer les détails.',
  },
  footer: {
    quickLinks: 'Liens rapides',
    customerService: 'Service client',
    followUs: 'Suivez-nous',
    allRightsReserved: 'Tous droits réservés.',
  },
  notFound: {
    title: 'Page introuvable',
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    backHome: "Retour à l'accueil",
  },
};

const ar: TranslationSchema = {
  common: {
    home: 'الرئيسية',
    shop: 'المتجر',
    categories: 'التصنيفات',
    search: 'بحث',
    cart: 'السلة',
    checkout: 'إتمام الطلب',
    back: 'رجوع',
    continue: 'متابعة',
    cancel: 'إلغاء',
    close: 'إغلاق',
    clear: 'مسح',
    apply: 'تطبيق',
    reset: 'إعادة تعيين',
    loading: 'جارٍ التحميل...',
    noResults: 'لا توجد نتائج',
    viewAll: 'عرض الكل',
    learnMore: 'معرفة المزيد',
    addToCart: 'أضف إلى السلة',
    buyNow: 'اشترِ الآن',
    remove: 'إزالة',
    quantity: 'الكمية',
    price: 'السعر',
    total: 'المجموع',
    subtotal: 'المجموع الفرعي',
    available: 'متوفر',
    unavailable: 'غير متوفر',
  },
  navigation: {
    home: 'الرئيسية',
    shop: 'المتجر',
    categories: 'التصنيفات',
  },
  search: {
    search: 'بحث',
    searchPlaceholder: 'ابحث عن المنتجات...',
    searchProducts: 'البحث عن المنتجات',
    noSearchResults: 'لا توجد منتجات مطابقة لبحثك',
  },
  shop: {
    title: 'المتجر',
    allProducts: 'جميع المنتجات',
    filters: 'الفلاتر',
    filterBy: 'تصفية حسب',
    category: 'الفئة',
    brand: 'العلامة التجارية',
    price: 'السعر',
    availability: 'التوفر',
    minPrice: 'أقل سعر',
    maxPrice: 'أعلى سعر',
    sortBy: 'الترتيب حسب',
    featured: 'مميز',
    priceLowToHigh: 'السعر: من الأقل إلى الأعلى',
    priceHighToLow: 'السعر: من الأعلى إلى الأقل',
    newest: 'الأحدث',
    clearFilters: 'مسح الفلاتر',
    productsFound: 'منتجات متوفرة',
    product: 'منتج',
    products: 'منتجات',
    noProducts: 'لا توجد منتجات',
    tryDifferentFilters: 'حاول تعديل الفلاتر',
  },
  product: {
    specifications: 'المواصفات',
    features: 'الميزات',
    inStock: 'متوفر في المخزون',
    outOfStock: 'نفدت الكمية',
    addToCart: 'أضف إلى السلة',
    addedToCart: 'تمت الإضافة إلى السلة',
    quantity: 'الكمية',
    relatedProducts: 'منتجات ذات صلة',
    productNotFound: 'المنتج غير موجود',
  },
  cart: {
    title: 'السلة',
    empty: 'سلتك فارغة',
    emptyDescription: 'يبدو أنك لم تضف أي منتج إلى سلتك بعد',
    continueShopping: 'متابعة التسوق',
    subtotal: 'المجموع الفرعي',
    total: 'المجموع',
    remove: 'إزالة',
    quantity: 'الكمية',
    proceedToCheckout: 'المتابعة لإتمام الطلب',
  },
  checkout: {
    title: 'إتمام الطلب',
    customerInformation: 'معلومات العميل',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    address: 'العنوان',
    city: 'المدينة',
    wilaya: 'الولاية',
    orderSummary: 'ملخص الطلب',
    placeOrder: 'تأكيد الطلب',
    requiredField: 'هذا الحقل مطلوب',
    orderSuccess: 'تم تأكيد طلبك بنجاح',
    orderSuccessDescription: 'شكرًا لطلبك. سنتواصل معك قريبًا لتأكيد التفاصيل.',
  },
  footer: {
    quickLinks: 'روابط سريعة',
    customerService: 'خدمة العملاء',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة.',
  },
  notFound: {
    title: 'الصفحة غير موجودة',
    description: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    backHome: 'العودة إلى الرئيسية',
  },
};

export const translations = { en, fr, ar } as const;

export type TranslationSchemaType = TranslationSchema;
export type TranslationGroup = keyof TranslationSchema;
export type SupportedTranslationLanguage = keyof typeof translations;
