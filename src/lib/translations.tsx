import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'am' | 'en' | 'ar' | 'fr';

interface TranslationData {
  title: string;
  subtitle: string;
  home: string;
  balegize: string;
  aizoyn: string;
  arif: string;
  shekay: string;
  ticker: string;
  footerText: string;
  contact: string;
  name: string;
  email: string;
  password: string;
  submit: string;
  account: string;
  localTime: string;
  globalTime: string;
  // New strings
  addPlan: string;
  planPlaceholder: string;
  timePlaceholder: string;
  save: string;
  success: string;
  failure: string;
  didSuccess: string;
  streak: string;
  medName: string;
  takeMed: string;
  habitChallenge: string;
  day: string;
  selfCare: string;
  depressionGuidance: string;
  addictionRecovery: string;
  startChallenge: string;
}

const translations: Record<Language, TranslationData> = {
  am: {
    title: "አሪዝ ቴክ",
    subtitle: "ከአሪዝ ጋር ይዘምኑ",
    home: "አሪዝ ቤት",
    balegize: "ባለጊዜ",
    aizoyn: "አይዞኝ",
    arif: "አሪፍ አይቸኩልም",
    shekay: "አሪዝ ሸቃይ",
    ticker: "አዲስ መረጃ፦ አሪዝ ቴክ ለኢትዮጵያ አዳዲስ የቴክኖሎጂ አማራጮችን ይዞ መጥቷል።",
    footerText: "ለማንኛውም ጥያቄ እና አስተያየት",
    contact: "ስልክ",
    name: "ስም",
    email: "ኢሜይል",
    password: "የይለፍ ቃል",
    submit: "ግባ",
    account: "አካውንት",
    localTime: "የሀገር ውስጥ",
    globalTime: "የውጭ ዓለም",
    addPlan: "እቅድ ጨምር",
    planPlaceholder: "እቅድዎን እዚህ ይጻፉ",
    timePlaceholder: "ሰዓት ይምረጡ",
    save: "መዝግብ",
    success: "ተሳክቷል",
    failure: "አልተሳካም",
    didSuccess: "እቅዱ ተሳካ አልተሳካም?",
    streak: "ተከታታይ ቀናት",
    medName: "የመድሃኒት ስም",
    takeMed: "መድሃኒት መውሰጃ",
    habitChallenge: "የ60 ቀን ቻሌንጅ",
    day: "ቀን",
    selfCare: "ራስን ማርካት",
    depressionGuidance: "ከድብርት መውጫ",
    addictionRecovery: "ከሱስ መውጫ",
    startChallenge: "ቻሌንጅ ጀምር"
  },
  en: {
    title: "Ariz Tech",
    subtitle: "Update with Ariz",
    home: "Ariz Home",
    balegize: "Balegize",
    aizoyn: "Ayizony",
    arif: "Arif Aychekulm",
    shekay: "Ariz Shekay",
    ticker: "Latest News: Ariz Tech brings new technological options for Ethiopia.",
    footerText: "For any questions or feedback",
    contact: "Phone",
    name: "Name",
    email: "Email",
    password: "Password",
    submit: "Sign In",
    account: "Account",
    localTime: "Local Time",
    globalTime: "Global Time",
    addPlan: "Add Plan",
    planPlaceholder: "Write your plan here",
    timePlaceholder: "Select time",
    save: "Save",
    success: "Success",
    failure: "Failed",
    didSuccess: "Did the plan succeed or fail?",
    streak: "Streak",
    medName: "Medication Name",
    takeMed: "Medication Reminder",
    habitChallenge: "60-Day Challenge",
    day: "Day",
    selfCare: "Self-Satisfaction",
    depressionGuidance: "Overcoming Depression",
    addictionRecovery: "Addiction Recovery",
    startChallenge: "Start Challenge"
  },
  ar: {
    title: "أريز تيك",
    subtitle: "تحديث مع أريز",
    home: "بيت أريز",
    balegize: "باليغيزي",
    aizoyn: "أيزوين",
    arif: "أريف لا يستعجل",
    shekay: "أريز شقاي",
    ticker: "آخر الأخبار: أريز تيك تقدم خيارات تكنولوجية جديدة لإثيوبيا.",
    footerText: "لأية أسئلة أو تعليقات",
    contact: "هاتف",
    name: "الاسم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    submit: "تسجيل الدخول",
    account: "الحساب",
    localTime: "التوقيت المحلي",
    globalTime: "التوقيت العالمي",
    addPlan: "أضف خطة",
    planPlaceholder: "اكتب خطتك هنا",
    timePlaceholder: "اختر الوقت",
    save: "حفظ",
    success: "نجاح",
    failure: "فشل",
    didSuccess: "هل نجحت الخطة أم فشلت؟",
    streak: "سلسلة",
    medName: "اسم الدواء",
    takeMed: "تذكير الدواء",
    habitChallenge: "تحدي 60 يومًا",
    day: "يوم",
    selfCare: "الرضا عن النفس",
    depressionGuidance: "التغلب على الاكتئاب",
    addictionRecovery: "التعافي من الإدمان",
    startChallenge: "ابدأ التحدي"
  },
  fr: {
    title: "Ariz Tech",
    subtitle: "Mise à jour avec Ariz",
    home: "Ariz Maison",
    balegize: "Balegize",
    aizoyn: "Ayizony",
    arif: "Arif Aychekulm",
    shekay: "Ariz Shekay",
    ticker: "Dernières nouvelles : Ariz Tech apporte de nouvelles options technologiques.",
    footerText: "Pour toute question ou commentaire",
    contact: "Téléphone",
    name: "Nom",
    email: "E-mail",
    password: "Mot de passe",
    submit: "Connexion",
    account: "Compte",
    localTime: "Heure locale",
    globalTime: "Heure mondiale",
    addPlan: "Ajouter un plan",
    planPlaceholder: "Écrivez votre plan ici",
    timePlaceholder: "Sélectionnez l'heure",
    save: "Enregistrer",
    success: "Succès",
    failure: "Échec",
    didSuccess: "Le plan a-t-il réussi ou échoué ?",
    streak: "Série",
    medName: "Nom du médicament",
    takeMed: "Rappel de médicament",
    habitChallenge: "Défi de 60 jours",
    day: "Jour",
    selfCare: "Auto-satisfaction",
    depressionGuidance: "Surmonter la dépression",
    addictionRecovery: "Récupération d'addiction",
    startChallenge: "Démarrer le défi"
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ariz_lang');
    return (saved as Language) || 'am';
  });

  useEffect(() => {
    localStorage.setItem('ariz_lang', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};