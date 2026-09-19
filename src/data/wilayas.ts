export interface Wilaya {
  code: string;
  nameAr: string;
  nameFr: string;
  shippingPrice: number;
}

/**
 * All 69 Algerian wilayas (including the 11 new wilayas created in 2026
 * by Law 26-06) with a per-wilaya shipping price (in DZD).
 *
 * IMPORTANT: The `shippingPrice` values below are PLACEHOLDERS grouped into
 * rough zones (Algiers & suburbs cheapest, far south most expensive).
 * Replace them with your real delivery company's rates (e.g. Yalidine,
 * ZR Express, etc.) before going live. Prices are easy to edit — just
 * change the number for each wilaya.
 */
export const wilayas: Wilaya[] = [
  { code: '01', nameAr: 'أدرار', nameFr: 'Adrar', shippingPrice: 1200 },
  { code: '02', nameAr: 'الشلف', nameFr: 'Chlef', shippingPrice: 600 },
  { code: '03', nameAr: 'الأغواط', nameFr: 'Laghouat', shippingPrice: 800 },
  { code: '04', nameAr: 'أم البواقي', nameFr: 'Oum El Bouaghi', shippingPrice: 700 },
  { code: '05', nameAr: 'باتنة', nameFr: 'Batna', shippingPrice: 700 },
  { code: '06', nameAr: 'بجاية', nameFr: 'Béjaïa', shippingPrice: 600 },
  { code: '07', nameAr: 'بسكرة', nameFr: 'Biskra', shippingPrice: 800 },
  { code: '08', nameAr: 'بشار', nameFr: 'Béchar', shippingPrice: 1200 },
  { code: '09', nameAr: 'البليدة', nameFr: 'Blida', shippingPrice: 400 },
  { code: '10', nameAr: 'البويرة', nameFr: 'Bouira', shippingPrice: 500 },
  { code: '11', nameAr: 'تمنراست', nameFr: 'Tamanrasset', shippingPrice: 1500 },
  { code: '12', nameAr: 'تبسة', nameFr: 'Tébessa', shippingPrice: 800 },
  { code: '13', nameAr: 'تلمسان', nameFr: 'Tlemcen', shippingPrice: 700 },
  { code: '14', nameAr: 'تيارت', nameFr: 'Tiaret', shippingPrice: 650 },
  { code: '15', nameAr: 'تيزي وزو', nameFr: 'Tizi Ouzou', shippingPrice: 500 },
  { code: '16', nameAr: 'الجزائر', nameFr: 'Alger', shippingPrice: 400 },
  { code: '17', nameAr: 'الجلفة', nameFr: 'Djelfa', shippingPrice: 750 },
  { code: '18', nameAr: 'جيجل', nameFr: 'Jijel', shippingPrice: 650 },
  { code: '19', nameAr: 'سطيف', nameFr: 'Sétif', shippingPrice: 650 },
  { code: '20', nameAr: 'سعيدة', nameFr: 'Saïda', shippingPrice: 750 },
  { code: '21', nameAr: 'سكيكدة', nameFr: 'Skikda', shippingPrice: 650 },
  { code: '22', nameAr: 'سيدي بلعباس', nameFr: 'Sidi Bel Abbès', shippingPrice: 700 },
  { code: '23', nameAr: 'عنابة', nameFr: 'Annaba', shippingPrice: 700 },
  { code: '24', nameAr: 'قالمة', nameFr: 'Guelma', shippingPrice: 700 },
  { code: '25', nameAr: 'قسنطينة', nameFr: 'Constantine', shippingPrice: 650 },
  { code: '26', nameAr: 'المدية', nameFr: 'Médéa', shippingPrice: 500 },
  { code: '27', nameAr: 'مستغانم', nameFr: 'Mostaganem', shippingPrice: 650 },
  { code: '28', nameAr: 'المسيلة', nameFr: "M'Sila", shippingPrice: 700 },
  { code: '29', nameAr: 'معسكر', nameFr: 'Mascara', shippingPrice: 700 },
  { code: '30', nameAr: 'ورقلة', nameFr: 'Ouargla', shippingPrice: 1000 },
  { code: '31', nameAr: 'وهران', nameFr: 'Oran', shippingPrice: 600 },
  { code: '32', nameAr: 'البيض', nameFr: 'El Bayadh', shippingPrice: 900 },
  { code: '33', nameAr: 'إليزي', nameFr: 'Illizi', shippingPrice: 1500 },
  { code: '34', nameAr: 'برج بوعريريج', nameFr: 'Bordj Bou Arréridj', shippingPrice: 600 },
  { code: '35', nameAr: 'بومرداس', nameFr: 'Boumerdès', shippingPrice: 450 },
  { code: '36', nameAr: 'الطارف', nameFr: 'El Tarf', shippingPrice: 750 },
  { code: '37', nameAr: 'تندوف', nameFr: 'Tindouf', shippingPrice: 1500 },
  { code: '38', nameAr: 'تسمسيلت', nameFr: 'Tissemsilt', shippingPrice: 650 },
  { code: '39', nameAr: 'الوادي', nameFr: 'El Oued', shippingPrice: 900 },
  { code: '40', nameAr: 'خنشلة', nameFr: 'Khenchela', shippingPrice: 750 },
  { code: '41', nameAr: 'سوق أهراس', nameFr: 'Souk Ahras', shippingPrice: 750 },
  { code: '42', nameAr: 'تيبازة', nameFr: 'Tipaza', shippingPrice: 450 },
  { code: '43', nameAr: 'ميلة', nameFr: 'Mila', shippingPrice: 650 },
  { code: '44', nameAr: 'عين الدفلى', nameFr: 'Aïn Defla', shippingPrice: 500 },
  { code: '45', nameAr: 'النعامة', nameFr: 'Naâma', shippingPrice: 900 },
  { code: '46', nameAr: 'عين تموشنت', nameFr: 'Aïn Témouchent', shippingPrice: 700 },
  { code: '47', nameAr: 'غرداية', nameFr: 'Ghardaïa', shippingPrice: 900 },
  { code: '48', nameAr: 'غليزان', nameFr: 'Relizane', shippingPrice: 650 },
  { code: '49', nameAr: 'تيميمون', nameFr: 'Timimoun', shippingPrice: 1400 },
  { code: '50', nameAr: 'برج باجي مختار', nameFr: 'Bordj Badji Mokhtar', shippingPrice: 1600 },
  { code: '51', nameAr: 'أولاد جلال', nameFr: 'Ouled Djellal', shippingPrice: 850 },
  { code: '52', nameAr: 'بني عباس', nameFr: 'Béni Abbès', shippingPrice: 1400 },
  { code: '53', nameAr: 'عين صالح', nameFr: 'In Salah', shippingPrice: 1600 },
  { code: '54', nameAr: 'عين قزام', nameFr: 'In Guezzam', shippingPrice: 1800 },
  { code: '55', nameAr: 'تقرت', nameFr: 'Touggourt', shippingPrice: 950 },
  { code: '56', nameAr: 'جانت', nameFr: 'Djanet', shippingPrice: 1700 },
  { code: '57', nameAr: 'المغير', nameFr: 'El M\'Ghair', shippingPrice: 900 },
  { code: '58', nameAr: 'المنيعة', nameFr: 'El Meniaa', shippingPrice: 1100 },

  // --- 11 new wilayas created by Law 26-06 (2026 territorial reorganization) ---
  // Delivery coverage to these newer wilayas may be more limited depending on
  // your courier; prices below are estimated close to their "mother" wilaya
  // and should be verified/adjusted once you confirm actual courier rates.
  { code: '59', nameAr: 'أفلو', nameFr: 'Aflou', shippingPrice: 800 },
  { code: '60', nameAr: 'بريكة', nameFr: 'Barika', shippingPrice: 700 },
  { code: '61', nameAr: 'القنطرة', nameFr: 'El Kantara', shippingPrice: 800 },
  { code: '62', nameAr: 'بئر العاتر', nameFr: 'Bir El Ater', shippingPrice: 800 },
  { code: '63', nameAr: 'العريشة', nameFr: 'El Aricha', shippingPrice: 750 },
  { code: '64', nameAr: 'قصر الشلالة', nameFr: 'Ksar Chellala', shippingPrice: 650 },
  { code: '65', nameAr: 'عين وسارة', nameFr: 'Aïn Oussara', shippingPrice: 750 },
  { code: '66', nameAr: 'مسعد', nameFr: 'Messaad', shippingPrice: 750 },
  { code: '67', nameAr: 'قصر البخاري', nameFr: 'Ksar El Boukhari', shippingPrice: 500 },
  { code: '68', nameAr: 'بوسعادة', nameFr: 'Bou Saâda', shippingPrice: 700 },
  { code: '69', nameAr: 'الأبيض سيدي الشيخ', nameFr: 'El Abiodh Sidi Cheikh', shippingPrice: 900 },
];

export function getWilayaByCode(code: string): Wilaya | undefined {
  return wilayas.find((w) => w.code === code);
}
