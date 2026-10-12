import { Business, GalleryItem, Testimonial, TimelineEvent, StatItem, FeatureCard, FounderInfo } from '../types';
import heroDroneImg from '../assets/images/hero_drone_farm_1785129555098.jpg';
import galleryDroneImg from '../assets/images/regenerated_image_1791441858294.png';
import poultryImg from '../assets/images/gavran_poultry_1785129569706.jpg';
import nurseryImg from '../assets/images/kgroup_nursery_1785129580449.jpg';
import founderImg from '../assets/images/founder_anuj_1785129596095.jpg';
import galleryImg1 from '../assets/images/regenerated_image_1785386555124.jpg';
import galleryImg2 from '../assets/images/regenerated_image_1785157600316.jpg';
import galleryImg3 from '../assets/images/regenerated_image_1785390194723.jpg';
import eggsImg from '../assets/images/organic_gavran_eggs_1785387513206.jpg';
import eggBasketImg from '../assets/images/gavran_eggs_basket_1790570762396.jpg';
import eggHandsImg from '../assets/images/gavran_eggs_hands_1790570797337.jpg';
import eggBowlImg from '../assets/images/gavran_eggs_bowl_1790570810098.jpg';
import eggCollectionImg from '../assets/images/gavran_eggs_collection_1790570823569.jpg';
import hqImg from '../assets/images/kgroup_hq_entrance_1785388879413.jpg';
import lobbyImg from '../assets/images/kgroup_welcome_lobby_1785388893947.jpg';
import innovationImg from '../assets/images/kgroup_innovation_hub_1785388907634.jpg';
import surajJadhavImg from '../assets/images/suraj_jadhav_client_1785417940771.jpg';
import amarJadhavImg from '../assets/images/amar_jadhav_client_1785417954968.jpg';
import ganeshKanchanImg from '../assets/images/ganesh_kanchan_portrait_1785417972318.jpg';

export type Language = 'en' | 'mr';

export const TRANSLATIONS = {
  en: {
    nav: {
      brand: "KANCHAN PATIL GROUP",
      tagline: "Growing Nature. Building Trust.",
      home: "Home",
      presence: "Presence",
      about: "About",
      businesses: "Businesses",
      founder: "Founder",
      gallery: "Gallery",
      contact: "Contact",
      aiConcierge: "AI Concierge",
      contactUs: "Contact Us",
      poultryName: "Gavran Poultry Farms",
      poultryDesc: "Fresh Country Chicken & Organic Eggs",
      nurseryName: "K Group of Nursery",
      nurseryDesc: "Indoor, Outdoor & Landscape Nursery",
      langSwitchLabel: "Language",
    },
    hero: {
      welcome: "WELCOME TO",
      brand: "KANCHAN PATIL GROUP",
      tagline: "Growing Nature. Building Trust.",
      description: "A premier diversified corporate group pioneering sustainable agriculture, high-yield eco poultry farming, and lush nursery plant cultivation.",
      exploreBusinesses: "Explore Businesses",
      contactUs: "Contact Us",
      locateFarm: "Locate Farm in Pune",
      badge: "Pure Gavran Poultry & High-Tech Nursery",
    },
    about: {
      eyebrow: "OUR STORY & PHILOSOPHY",
      titlePre: "About",
      titleHighlight: "Kanchan Patil Group",
      p1: "Kanchan Patil Group stands at the crossroads of agrarian heritage and forward-looking biotechnology. Rooted in the fertile landscapes of Uruli Kanchan, Pune, we champion sustainable rural entrepreneurship.",
      p2: "From raising 100% natural, pasture-roaming native Gavran birds to nurturing high-grade ornamental and shade flora, our operations adhere strictly to bio-security, organic nourishment, and fair-trade transparency.",
      badge1: "100% Natural & Organic",
      badge2: "Bio-Secure Sanctuary",
      badge3: "Modern Agri-Technology",
      missionTitle: "Our Mission",
      missionText: "To lead agricultural modernization by delivering chemical-free native poultry, healthy botanical flora, and ethical business standards.",
      visionTitle: "Our Vision",
      visionText: "To be recognized nationally as a beacon of sustainable farming, organic integrity, and customer trust.",
    },
    businesses: {
      eyebrow: "PORTFOLIO OF ENTERPRISES",
      titlePre: "Businesses Under",
      titleHighlight: "KANCHAN PATIL GROUP",
      subtitle: "Pioneering quality, sustainability, and authentic farm excellence across Maharashtra.",
      learnMore: "Learn More",
      exploreDivision: "Explore Division",
      viewAll: "View Highlights",
      highlightsTitle: "Key Highlights",
    },
    why: {
      eyebrow: "THE K GROUP ADVANTAGE",
      titlePre: "Why Choose",
      titleHighlight: "KANCHAN PATIL GROUP",
      subtitle: "Rooted in honesty, engineered for modern excellence.",
    },
    founder: {
      eyebrow: "LEADERSHIP & VISION",
      titlePre: "Meet Our",
      titleHighlight: "Founder",
      quoteLabel: "Visionary Statement",
      bioTitle: "Biography & Leadership",
      connectWhatsapp: "Connect on WhatsApp",
    },
    stats: {
      eyebrow: "KEY METRICS",
      title: "Impact Across Numbers",
      subtitle: "Quantifying our commitment to agricultural and horticultural distinction.",
    },
    gallery: {
      eyebrow: "VISUAL CHRONICLES",
      titlePre: "K GROUP",
      titleHighlight: "Gallery",
      subtitle: "A photographic journey across our poultry sanctuary, netpot greenhouses, and headquarters.",
      all: "All",
      poultry: "Poultry",
      nursery: "Nursery",
      farm: "Farm",
      eggs: "Eggs",
      corporate: "Corporate",
    },
    testimonials: {
      eyebrow: "TRUSTED PARTNERSHIPS",
      titlePre: "What Our",
      titleHighlight: "Partners Say",
      subtitle: "Hear firsthand from farmers, wholesale clients, and long-standing collaborators.",
    },
    timeline: {
      eyebrow: "STRATEGIC MILESTONES",
      titlePre: "Evolution Timeline of",
      titleHighlight: "K GROUP",
      subtitle: "A progressive roadmap from botanical nurseries to rural poultry sanctuaries and global investments.",
    },
    vision: {
      eyebrow: "OUR COMMITMENT",
      title: "A Sustainable Tomorrow Rooted in Agricultural Integrity",
      text: "Our vision is to become one of India's most trusted business groups by delivering quality, sustainability, innovation, and customer satisfaction.",
      actionBtn: "Explore Our Businesses",
    },
    contact: {
      eyebrow: "GET IN TOUCH",
      titlePre: "Contact",
      titleHighlight: "K GROUP",
      subtitle: "Reach our estate headquarters for bulk poultry orders, nursery consultation, or farm visits.",
      addressLabel: "Sanctuary Address",
      phoneLabel: "Phone & WhatsApp",
      emailLabel: "Official Email",
      hoursLabel: "Operating Hours",
      formTitle: "Send an Inquiry",
      formSubtitle: "Our team will respond promptly or connect with you directly via WhatsApp.",
      namePlaceholder: "Your Full Name",
      phonePlaceholder: "Mobile Number",
      subjectPlaceholder: "Inquiry Division (Poultry / Nursery / Partnership)",
      messagePlaceholder: "Write your message or order requirements here...",
      submitBtn: "Send via WhatsApp",
      mapTitle: "Find Gavran Poultry Farms & K Group Nursery",
    },
    footer: {
      tagline: "Growing Nature. Building Trust.",
      description: "Premier corporate group leading in sustainable agriculture, pure native Gavran poultry farming, and climate-controlled flora cultivation in Pune, Maharashtra.",
      quickLinks: "Quick Navigation",
      businesses: "Our Divisions",
      contactInfo: "Headquarters",
      rights: "All Rights Reserved.",
      designedFor: "Kanchan Patil Group Official Web Platform",
    },
    map: {
      eyebrow: "GEOGRAPHIC REACH & HEADQUARTERS",
      title: "Our Global Presence & Agro-Sanctuary",
      subtitle: "Explore our strategic location from world view down to our Uruli Kanchan Agro-Sanctuary in Pune.",
      dragHint: "Drag / swipe to explore the illuminated exhibit",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      reset: "Reset View",
      autoTour: "Auto Tour",
    },
    loading: {
      crafting: "Crafting Excellence",
      skip: "Skip Intro",
    },
    dedicated: {
      back: "Back to K Group Corporate",
      placeOrder: "Place Direct Inquiry / Order",
      highlightsPre: "Division",
      highlightsPost: "Highlights",
      offeringsEyebrow: "Specialized Offerings",
      offeringsTitle: "Services & Products",
      galleryPre: "Division",
      galleryPost: "Gallery",
      whyPartner: "Why Partner With",
      inquirySentTitle: "Order Inquiry Sent",
      inquirySentDesc: "Thank you. The division manager will reach out to you shortly.",
      inquireFor: "Inquire for",
      inquireDesc: "Direct order inquiry or bulk pricing request.",
      fullName: "Full Name",
      phone: "Phone Number",
      requirement: "Quantity / Requirement",
      submitOrder: "Submit Order Request",
    }
  },
  mr: {
    nav: {
      brand: "कांचन पाटील ग्रुप",
      tagline: "निसर्गाची समृद्धी. विश्वासाची परंपरा.",
      home: "मुख्यपृष्ठ",
      presence: "उपस्थिती",
      about: "आमच्याबद्दल",
      businesses: "व्यवसाय",
      founder: "संस्थापक",
      gallery: "गॅलरी",
      contact: "संपर्क",
      aiConcierge: "एआय सहाय्यक",
      contactUs: "संपर्क साधा",
      poultryName: "गावरान पोल्ट्री फार्म्स",
      poultryDesc: "अस्सल गावरान कोंबडी व सेंद्रिय अंडी",
      nurseryName: "के ग्रुप नर्सरी",
      nurseryDesc: "घरगुती, बाह्य व लँडस्केप रोपवाटिका",
      langSwitchLabel: "भाषा",
    },
    hero: {
      welcome: "स्वागत आहे",
      brand: "कांचन पाटील ग्रुप",
      tagline: "निसर्गाची समृद्धी. विश्वासाची परंपरा.",
      description: "शाश्वत शेती, अस्सल गावरान कुक्कुटपालन आणि समृद्ध रोपवाटिका यामध्ये अग्रेसर असलेला नामांकित समूह.",
      exploreBusinesses: "व्यवसाय पहा",
      contactUs: "संपर्क साधा",
      locateFarm: "पुण्यातील फार्मचे स्थान",
      badge: "अस्सल गावरान पोल्ट्री व हायटेक रोपवाटिका",
    },
    about: {
      eyebrow: "आमचा प्रवास व तत्त्वज्ञान",
      titlePre: "माहिती",
      titleHighlight: "कांचन पाटील ग्रुपबद्दल",
      p1: "कांचन पाटील ग्रुप हा पारंपरिक कृषी वारसा आणि आधुनिक तंत्रज्ञान यांच्या संगमावर उभा असलेला अग्रगण्य समूह आहे. उरुळी कांचन, पुणे येथील सुपीक भूमीत आम्ही शाश्वत ग्रामीण उद्योजकतेला चालना देत आहोत.",
      p2: "नैसर्गिक वातावरणातील अस्सल गावरान पक्षांपासून ते उच्च दर्जाच्या शोभिवंत व सावली देणाऱ्या वनस्पतींपर्यंत, आमचे कामकाज जैव-सुरक्षा, सेंद्रिय पोषण आणि पारदर्शकतेवर आधारित आहे.",
      badge1: "१००% नैसर्गिक व सेंद्रिय",
      badge2: "जैव-सुरक्षित परिसर",
      badge3: "आधुनिक कृषी तंत्रज्ञान",
      missionTitle: "आमचे ध्येय",
      missionText: "रसायनमुक्त गावरान कुक्कुटपालन, समृद्ध वनस्पती आणि नैतिक व्यवसाय मूल्यांद्वारे शेतीचे आधुनिकीकरण करणे.",
      visionTitle: "आमचा दृष्टिकोन",
      visionText: "शाश्वत शेती, सेंद्रिय शुद्धता आणि ग्राहकांच्या विश्वासाचे राष्ट्रीय पातळीवर अग्रगण्य प्रतीक बनणे.",
    },
    businesses: {
      eyebrow: "समूहाचे व्यावसायिक क्षेत्र",
      titlePre: "कांचन पाटील ग्रुप अंतर्गत",
      titleHighlight: "व्यवसाय",
      subtitle: "महाराष्ट्रात गुणवत्ता, शाश्वतता आणि उत्कृष्ट कृषी सेवेची उज्ज्वल परंपरा.",
      learnMore: "अधिक माहिती",
      exploreDivision: "विस्तृत माहिती पहा",
      viewAll: "वैशिष्ट्ये पहा",
      highlightsTitle: "महत्त्वाची वैशिष्ट्ये",
    },
    why: {
      eyebrow: "के ग्रुपचे वैशिष्ट्य",
      titlePre: "कांचन पाटील ग्रुपची",
      titleHighlight: "निवड का करावी?",
      subtitle: "प्रामाणिकतेची मुळे, आधुनिक तंत्रज्ञानाची जोड.",
    },
    founder: {
      eyebrow: "नेतृत्व आणि दृष्टिकोन",
      titlePre: "भेटा आमचे",
      titleHighlight: "संस्थापक",
      quoteLabel: "दूरदर्शी विचार",
      bioTitle: "संस्थापकांचा परिचय",
      connectWhatsapp: "व्हॉट्सॲपवर संपर्क करा",
    },
    stats: {
      eyebrow: "महत्त्वाची आकडेवारी",
      title: "प्रगतीची मोजदाद",
      subtitle: "कृषी व रोपवाटिका क्षेत्रातील आमची विश्वासार्ह कामगिरी.",
    },
    gallery: {
      eyebrow: "छायाचित्रे",
      titlePre: "के ग्रुप",
      titleHighlight: "गॅलरी",
      subtitle: "आमचे पोल्ट्री फार्म, नेटपॉट ग्रीनहाऊस आणि मुख्यालयाचा छायाचित्र संग्रह.",
      all: "सर्व",
      poultry: "पोल्ट्री",
      nursery: "रोपवाटिका",
      farm: "शेती",
      eggs: "अंडी",
      corporate: "मुख्यालय",
    },
    testimonials: {
      eyebrow: "विश्वासार्ह सहकार्य",
      titlePre: "ग्राहकांचे",
      titleHighlight: "अभिप्राय",
      subtitle: "शेतकरी, व्यापारी आणि ग्राहकांचे प्रत्यक्ष अनुभव.",
    },
    timeline: {
      eyebrow: "महत्त्वाचे टप्पे",
      titlePre: "के ग्रुपचा",
      titleHighlight: "विकास प्रवास",
      subtitle: "रोपवाटिकेपासून गावरान पोल्ट्री आणि जागतिक विस्तारापर्यंतचा यशस्वी प्रवास.",
    },
    vision: {
      eyebrow: "आमचा संकल्प",
      title: "शाश्वत शेतीतून समृद्ध भविष्याची निर्मिती",
      text: "गुणवत्ता, शाश्वतता, नावीन्यता आणि ग्राहकांचे समाधान याद्वारे भारतातील सर्वाधिक विश्वासार्ह व्यावसायिक समूह बनणे हे आमचे ध्येय आहे.",
      actionBtn: "आमचे व्यवसाय पहा",
    },
    contact: {
      eyebrow: "संपर्क साधा",
      titlePre: "के ग्रुपशी",
      titleHighlight: "संपर्क",
      subtitle: "पोल्ट्रीच्या मोठ्या ऑर्डर्स, रोपवाटिका मार्गदर्शन किंवा फार्म भेटीसाठी संपर्क साधा.",
      addressLabel: "फार्मचा पत्ता",
      phoneLabel: "फोन व व्हॉट्सॲप",
      emailLabel: "अधिकृत ईमेल",
      hoursLabel: "कामाची वेळ",
      formTitle: "चौकशी संदेश पाठवा",
      formSubtitle: "आमची टीम लवकरच आपल्याशी संपर्क करेल किंवा थेट व्हॉट्सॲपवर उत्तर देईल.",
      namePlaceholder: "आपले पूर्ण नाव",
      phonePlaceholder: "मोबाईल नंबर",
      subjectPlaceholder: "विषय (पोल्ट्री / नर्सरी / भागीदारी)",
      messagePlaceholder: "आपला संदेश किंवा ऑर्डरची माहिती येथे लिहा...",
      submitBtn: "व्हॉट्सॲपवर पाठवा",
      mapTitle: "गावरान पोल्ट्री फार्म्स व के ग्रुप नर्सरीचे स्थान",
    },
    footer: {
      tagline: "निसर्गाची समृद्धी. विश्वासाची परंपरा.",
      description: "शाश्वत कृषी, अस्सल गावरान कुक्कुटपालन आणि नियंत्रित हवामानातील रोपवाटिका यामध्ये पुण्यातील अग्रेसर समूह.",
      quickLinks: "महत्त्वाचे दुवे",
      businesses: "आमचे व्यवसाय",
      contactInfo: "मुख्यालय",
      rights: "सर्व हक्क राखीव.",
      designedFor: "कांचन पाटील ग्रुप अधिकृत संकेतस्थळ",
    },
    map: {
      eyebrow: "धोरणात्मक विस्तार व मुख्यालय",
      title: "आमची जागतिक उपस्थिती व कृषी केंद्र",
      subtitle: "जागतिक नकाशापासून ते उरुळी कांचन, पुणे येथील आमच्या कृषी केंद्रापर्यंतचे अवलोकन करा.",
      dragHint: "प्रदर्शनी फिरवण्यासाठी ड्रॅग करा",
      zoomIn: "झूम इन",
      zoomOut: "झूम आउट",
      reset: "मूळ स्थान",
      autoTour: "ऑटो टूर",
    },
    loading: {
      crafting: "उत्कृष्टतेची निर्मिती",
      skip: "थेट जा",
    },
    dedicated: {
      back: "के ग्रुप मुख्य पृष्ठावर परत जा",
      placeOrder: "थेट ऑर्डर / चौकशी करा",
      highlightsPre: "विभागाची",
      highlightsPost: "महत्त्वाची वैशिष्ट्ये",
      offeringsEyebrow: "खास उत्पादने व सेवा",
      offeringsTitle: "सेवा आणि उत्पादने",
      galleryPre: "विभागाचे",
      galleryPost: "छायाचित्र दालन",
      whyPartner: "भागीदारी का करावी?",
      inquirySentTitle: "ऑर्डर चौकशी यशस्वीरीत्या पाठवली",
      inquirySentDesc: "धन्यवाद. संबंधित विभाग प्रमुख लवकरच आपल्याशी संपर्क साधतील.",
      inquireFor: "चौकशी करा -",
      inquireDesc: "घाऊक दर किंवा थेट ऑर्डरसाठी फॉर्म भरा.",
      fullName: "पूर्ण नाव",
      phone: "मोबाईल नंबर",
      requirement: "ऑर्डरचे स्वरूप / नगसंख्या",
      submitOrder: "ऑर्डर विनंती पाठवा",
    }
  }
};

export function getContent(lang: Language) {
  if (lang === 'mr') {
    const businesses: Business[] = [
      {
        id: "gavran-poultry",
        name: "गावरान पोल्ट्री फार्म्स",
        tagline: "अस्सल गावरान कोंबडी व निरोगी शेती",
        slug: "gavran-poultry-farms",
        image: poultryImg,
        description: "गावरान पोल्ट्री फार्म्स हे १००% नैसर्गिक, मोकळ्या कुरणातील गावरान पक्षी स्वच्छ व सुरक्षित वातावरणात संगोपन करण्यासाठी समर्पित आहे. पारंपरिक पद्धती व आधुनिक आरोग्य देखरेखीचा मेळ घालून आम्ही रसायनमुक्त गावरान चिकन व ताजी अंडी पुरवतो.",
        highlights: [
          "ताजी अस्सल गावरान कोंबडी",
          "मोकळ्या कुरणातील नैसर्गिक संगोपन",
          "नैसर्गिक खाद्य व आयुर्वेदिक निगा",
          "सर्वोच्च गुणवत्ता व चव",
          "सेंद्रिय गावरान अंडी व पिल्ले"
        ],
        features: [
          "१००% अँटिबायोटिक व हॉर्मोन-मुक्त गावरान पक्षी",
          "विशाल मोकळी चरण्याची कुरणे",
          "कडक जैव-सुरक्षा व पशुवैद्यकीय देखरेख",
          "व्यापारी व ग्राहकांसाठी थेट दैनंदिन पुरवठा",
          "नैसर्गिक धान्य व शुद्ध खनिज पाणी संगोपन"
        ],
        services: [
          {
            title: "मोकळ्या कुरणातील गावरान कोंबडी",
            description: "उत्कृष्ट चव, पोत आणि पोषक मूल्यांसाठी हिरव्या कुरणात वाढवलेले अस्सल गावरान पक्षी.",
            iconName: "Bird"
          },
          {
            title: "सेंद्रिय गावरान अंडी",
            description: "नैसर्गिक धान्य खाणाऱ्या गावरान कोंबड्यांची रोज गोळा केलेली पौष्टिक अंडी.",
            iconName: "Egg"
          },
          {
            title: "पिल्ले व पोल्ट्री पुरवठा",
            description: "लसीकरण प्रमाणित एक दिवसाची गावरान पिल्ले आणि पैदासीचे दर्जेदार पक्षी.",
            iconName: "Feather"
          },
          {
            title: "कुक्कुटपालन मार्गदर्शन",
            description: "शाश्वत शेड उभारणी, सेंद्रिय पोषण आणि रोग व्यवस्थापनावर तज्ज्ञ मार्गदर्शन.",
            iconName: "ShieldCheck"
          }
        ],
        benefits: [
          "उच्च प्रथिने व कमी कोलेस्ट्रॉल असलेले आरोग्यदायी मांस",
          "पक्ष्यांसाठी नैसर्गिक व तणावमुक्त राहणीमान",
          "फार्म ते टेबल थेट ताजेपणा व स्वच्छता",
          "पारदर्शक व रास्त दरात थेट घाऊक पुरवठा"
        ],
        gallery: [
          { url: poultryImg, caption: "मोकळी चरण्याची कुरणे", category: "Poultry" }
        ]
      },
      {
        id: "kgroup-nursery",
        name: "के ग्रुप नर्सरी",
        tagline: "घरगुती, बाह्य, शोभिवंत झाडे व लँडस्केप वास्तुकला",
        slug: "k-group-nursery",
        image: nurseryImg,
        description: "के ग्रुप नर्सरी ही एक अग्रगण्य रोपवाटिका असून प्रीमियम नेट पॉट्स, मनमोहक शोभिवंत झाडे, व्यावसायिक लँडस्केपिंग आणि हरित नावीन्यतेमध्ये तज्ज्ञ आहे - प्रत्येक रोपासह उत्कृष्टतेची वाढ.",
        highlights: [
          "हवा शुद्ध करणारी इनडोअर झाडे",
          "मनमोहक आउटडोअर व सावलीची झाडे",
          "सुगंधी व रंगीबेरंगी फुलांची रोपे",
          "व्यावसायिक लँडस्केपिंग व घाऊक पुरवठा",
          "टेरेस गार्डन व ग्रीन वॉल उभारणी"
        ],
        features: [
          "गुणवत्ता यशस्वीरीत्या वितरित, विश्वास यशस्वीरीत्या संपादन.",
          "उत्कृष्टतेची डिलिव्हरी, निसर्गाची सर्वोत्तम भेट.",
          "प्रीमियम ६-इंच बायकलर टिकोमा – रंग आणि सौंदर्याचा संगम.",
          "आमच्या नर्सरीतून आपल्या प्रोजेक्टसाठी – १,००,०००+ जिवंत नेटपॉट रोपे वितरित.",
          "सुरक्षित एक्सप्रेस वाहतूक व जागेवर लागवड सुविधा"
        ],
        services: [
          {
            title: "इनडोअर व शोभिवंत झाडे",
            description: "प्रीमियम अँथुरियम, पेट्रा, यलो व बायकलर टिकोमा आणि लक्झरी लँडस्केपसाठी रोपे.",
            iconName: "Flower2"
          },
          {
            title: "आउटडोअर व फळझाडे",
            description: "कठीण हवामानाला तोंड देणारी फळझाडे, शोभिवंत झुडपे आणि हंगामी फुलांची रोपे.",
            iconName: "Trees"
          },
          {
            title: "लँडस्केप आर्किटेक्चर",
            description: "संपूर्ण लँडस्केप डिझाईन, लॉन उभारणी आणि स्वयंचलित ठिबक सिंचन व्यवस्था.",
            iconName: "Compass"
          },
          {
            title: "घाऊक नर्सरी पुरवठा",
            description: "बिल्डर्स, रिसॉर्ट्स, उद्याने आणि रिटेल नर्सरींसाठी मोठ्या प्रमाणावर पुरवठा.",
            iconName: "Truck"
          }
        ],
        benefits: [
          "नियंत्रित हवामानात वाढवलेली सशक्त व निरोगी रोपे",
          "लक्झरी घरे व कार्यालयांसाठी वैयक्तिक लँडस्केप डिझाइन",
          "लागवडीनंतर संपूर्ण काळजी मार्गदर्शन व सेंद्रिय खते",
          "सुरक्षित वाहतूक व जागेवर रोपण सहाय्यासह डिलिव्हरी"
        ],
        gallery: [
          { url: nurseryImg, caption: "भव्य क्लायमेट-कंट्रोल शेडनेट हाऊस", category: "Nursery" }
        ]
      }
    ];

    const founder: FounderInfo = {
      name: "अनुज गणेश कांचन",
      title: "संस्थापक",
      subtitles: [
        "संगणक व कृत्रिम बुद्धिमत्ता अभियंता",
        "उद्योजक",
        "दूरदर्शी नेतृत्व"
      ],
      quote: "विश्वास, नावीन्यता आणि शाश्वततेच्या बळावर समृद्ध व्यवसायांची उभारणी.",
      bio: "अनुज गणेश कांचन हे अत्याधुनिक अभियांत्रिकी अचूकता आणि शाश्वत शेतीची आवड यांचा सुरेख मेळ घालत आहेत. संगणक व एआय अभियंता ते दूरदर्शी उद्योजक अशा प्रवासात त्यांनी कांचन पाटील ग्रुपची स्थापना केली असून, आधुनिक तंत्रज्ञान, सेंद्रिय तत्त्वे आणि उच्च दर्जाच्या आधारे पारंपरिक शेती व रोपवाटिका क्षेत्रात क्रांती घडवत आहेत.",
      image: founderImg,
      socials: {
        linkedin: "https://www.linkedin.com/in/anuj-ganesh-kanchan-167b4a290",
        instagram: "https://instagram.com/anuj_kanchan",
        facebook: "https://facebook.com/kgroupofficial",
        github: "https://github.com/anujkanchan",
        whatsapp: "https://wa.me/917517004343"
      }
    };

    const features: FeatureCard[] = [
      {
        id: "quality",
        title: "प्रीमियम गुणवत्ता",
        description: "प्रत्येक पक्षी, अंडी आणि रोपाची काटेकोर तपासणी करून उच्च दर्जाची खात्री दिली जाते.",
        icon: "Award"
      },
      {
        id: "farming",
        title: "नैसर्गिक शेती",
        description: "१००% रसायनमुक्त शेती, सेंद्रिय खाद्य आणि नैसर्गिक परिसंस्थेला सर्वोच्च प्राधान्य.",
        icon: "Sprout"
      },
      {
        id: "satisfaction",
        title: "ग्राहकांचे समाधान",
        description: "पारदर्शकता, खात्रीशीर पुरवठा आणि तत्पर ग्राहक सेवेची पक्की हमी.",
        icon: "HeartHandshake"
      },
      {
        id: "sustainability",
        title: "शाश्वत कृषी",
        description: "पर्यावरणपूरक शेती पद्धती, जलसंधारण आणि भावी पिढीसाठी हरित तंत्रज्ञान.",
        icon: "Leaf"
      }
    ];

    const timeline: TimelineEvent[] = [
      {
        year: "२०२४",
        title: "के ग्रुप नर्सरीची स्थापना",
        subtitle: "वनस्पती उत्कृष्टतेची सुरुवात",
        description: "प्रीमियम इनडोअर, आउटडोअर झाडे आणि लँडस्केपिंगसाठी फ्लॅगशिप नर्सरीची यशस्वी सुरुवात.",
        icon: "Sprout"
      },
      {
        year: "२०२५",
        title: "गावरान पोल्ट्री फार्म्सची स्थापना",
        subtitle: "मोकळ्या कुरणातील गावरान कुक्कुटपालन",
        description: "मोकळ्या चराई कुरणांसह उच्च दर्जाच्या अस्सल गावरान पोल्ट्री शेतीमध्ये पदार्पण.",
        icon: "Hen"
      },
      {
        year: "भविष्य",
        title: "रिअल इस्टेट व जमीन गुंतवणूक",
        subtitle: "धोरणात्मक जमीन संपादन व विकास",
        description: "कृषी जमीन गुंतवणूक, शाश्वत रिअल इस्टेट विकास आणि जागतिक भागीदारींचा विस्तार.",
        icon: "Building2"
      }
    ];

    const stats: StatItem[] = [
      { id: "businesses", label: "अग्रगण्य व्यवसाय", value: 2, suffix: "+", icon: "Building2" },
      { id: "customers", label: "समाधानी ग्राहक", value: 199, suffix: "+", icon: "Users" },
      { id: "plants", label: "निरोगी नेटपॉट रोपे विक्री", value: 99, suffix: "k+", icon: "Flower" },
      { id: "poultry", label: "गावरान - अंडी, कोंबड्या, कोंबडे", value: 5, suffix: "k+", icon: "Hen" },
      { id: "daily-eggs", label: "दैनिक उत्पादन, अस्सल गावरान अंडी", value: 1000, suffix: "+", icon: "Egg" }
    ];

    const hero = {
      welcome: "स्वागत आहे",
      brand: "कांचन पाटील ग्रुप",
      tagline: "निसर्गाची समृद्धी. विश्वासाची परंपरा.",
      description: "शाश्वत शेती, अस्सल गावरान कुक्कुटपालन आणि समृद्ध रोपवाटिका यामध्ये अग्रेसर असलेला नामांकित समूह.",
      heroImage: heroDroneImg,
    };

    const testimonialsMr: Testimonial[] = [
      {
        id: "test-1",
        name: "श्री. सुरज जाधव",
        role: "ग्राहक",
        business: "के ग्रुप गावरान पोल्ट्री फार्म",
        comment: "श्री. अनुज गणेश कांचन यांनी अत्यंत काळजीपूर्वक आणि व्यावसायिक पद्धतीने भव्य गावरान पोल्ट्री फार्म विकसित केला आहे. गावरान कोंबड्या आणि कोंबडे अत्यंत निरोगी, चपळ आणि अस्सल जातीचे आहेत. पक्ष्यांची उच्च गुणवत्ता, पारदर्शक पद्धती आणि उत्तम ग्राहक सेवेमुळे के ग्रुप ही गावरान पोल्ट्रीसाठी सर्वोत्तम निवड आहे.",
        rating: 5,
        avatar: surajJadhavImg
      },
      {
        id: "test-2",
        name: "श्री. अमर जाधव",
        role: "ग्राहक",
        business: "के ग्रुप गावरान पोल्ट्री फार्म",
        comment: "श्री. अनुज गणेश कांचन यांनी उच्च दर्जाची अस्सल गावरान अंडी उपलब्ध करून आमचा विश्वास संपादन केला आहे. प्रत्येक अंडे ताजे, नैसर्गिकरीत्या उत्पादित आणि चव व पोषणाने परिपूर्ण असते. नैतिक शेती आणि दर्जेदार उत्पादनांची त्यांची वचनबद्धता कौतुकास्पद आहे.",
        rating: 5,
        avatar: amarJadhavImg
      },
      {
        id: "test-3",
        name: "श्री. गणेश कांचन",
        role: "सह-संस्थापक",
        business: "के ग्रुप गावरान पोल्ट्री फार्म व के ग्रुप नर्सरी",
        comment: "एक वडील म्हणून, माझा मुलगा अनुज गणेश कांचन याने के ग्रुप नर्सरीच्या माध्यमातून जे यश मिळवले आहे त्याचा मला सार्थ अभिमान आहे. त्याचे परिश्रम आणि गुणवत्तेवरील निष्ठा प्रत्येक टिकोमा रोपात, मग ते नेट पॉट्स असो किंवा ६ इंची कुंडी, स्पष्टपणे दिसते. निरोगी आणि सुंदर रोपांसाठी ही देशातील एक अग्रगण्य नर्सरी बनेल यात शंका नाही.",
        rating: 5,
        avatar: ganeshKanchanImg
      }
    ];

    return {
      HERO_DATA: hero,
      BUSINESSES_DATA: businesses,
      FOUNDER_DATA: founder,
      FEATURES_DATA: features,
      TIMELINE_DATA: timeline,
      STATS_DATA: stats,
      TESTIMONIALS_DATA: testimonialsMr,
      VISION_TEXT: "गुणवत्ता, शाश्वतता, नावीन्यता आणि ग्राहकांचे समाधान याद्वारे भारतातील सर्वाधिक विश्वासार्ह व्यावसायिक समूह बनणे हे आमचे ध्येय आहे."
    };
  }

  // English (Default)
  const heroEn = {
    welcome: "WELCOME TO",
    brand: "KANCHAN PATIL GROUP",
    tagline: "Growing Nature. Building Trust.",
    description: "A premier diversified corporate group pioneering sustainable agriculture, high-yield eco poultry farming, and lush nursery plant cultivation.",
    heroImage: heroDroneImg,
  };

  const founderEn: FounderInfo = {
    name: "Anuj Ganesh Kanchan",
    title: "Founder",
    subtitles: [
      "Computer Science & Artificial Intelligence Engineer",
      "Entrepreneur",
      "Visionary Leader"
    ],
    quote: "Building businesses that grow with trust, innovation, and sustainability.",
    bio: "Anuj Ganesh Kanchan combines cutting-edge engineering precision with deep-rooted passion for sustainable agriculture and natural living. As a Computer Science & AI Engineer turned forward-thinking entrepreneur, he established Kanchan Patil Group to revolutionize traditional farming and nursery systems with modern technology, organic principles, and uncompromised quality standards.",
    image: founderImg,
    socials: {
      linkedin: "https://www.linkedin.com/in/anuj-ganesh-kanchan-167b4a290",
      instagram: "https://instagram.com/anuj_kanchan",
      facebook: "https://facebook.com/kgroupofficial",
      github: "https://github.com/anujkanchan",
      whatsapp: "https://wa.me/917517004343"
    }
  };

  const businessesEn: Business[] = [
    {
      id: "gavran-poultry",
      name: "Gavran Poultry Farms",
      tagline: "Fresh Country Chicken & Healthy Farming",
      slug: "gavran-poultry-farms",
      image: poultryImg,
      description: "Gavran Poultry Farms is dedicated to raising 100% natural, free-range country birds in hygienic, stress-free environments. We blend traditional free-roaming poultry care with modern biometric health oversight to produce chemical-free, nutrient-rich country chicken and fresh eggs.",
      highlights: [
        "Fresh Country Chicken",
        "Healthy Free-Range Farming",
        "Natural Feed & Herbal Care",
        "Premium Uncompromised Quality",
        "Organic Farm Eggs & Chicks"
      ],
      features: [
        "100% Antibiotic & Hormone-Free Country Birds",
        "Spacious Open-Air Grazing Grounds",
        "Strict Bio-Security & Veterinary Oversight",
        "Fresh Daily Direct Supply to Wholesalers & Consumers",
        "100% Organic Grain & Pure Mineral Water Care Routine"
      ],
      services: [
        {
          title: "Free-Range Country Chicken",
          description: "Pure-bred Gavran poultry raised in lush green pastures for rich taste, superior texture, and maximum nutrition.",
          iconName: "Bird"
        },
        {
          title: "Organic Farm Eggs",
          description: "Naturally laid farm-fresh eggs harvested daily from free-roaming, grain-fed country hens.",
          iconName: "Egg"
        },
        {
          title: "Chicks & Poultry Supply",
          description: "High-grade day-old country chicks and vaccination-certified breeding pairs for regional farms.",
          iconName: "Feather"
        },
        {
          title: "Poultry Farming Advisory",
          description: "Expert guidance for farmers on sustainable housing, organic nutrition, and disease management.",
          iconName: "ShieldCheck"
        }
      ],
      benefits: [
        "Superior protein & low cholesterol country chicken",
        "Ethical, cruelty-free, and natural living conditions for birds",
        "Traceable farm-to-table hygiene and freshness",
        "Direct bulk supply at transparent fair pricing"
      ],
      gallery: [
        { url: poultryImg, caption: "Open-Air Grazing Grounds", category: "Poultry" }
      ]
    },
    {
      id: "kgroup-nursery",
      name: "K Group of Nursery",
      tagline: "Indoor, Outdoor, Flower Plants & Landscape Architecture",
      slug: "k-group-nursery",
      image: nurseryImg,
      description: "K Group of Nursery is a leading horticultural enterprise specializing in premium Net Pots, vibrant ornamental plants, professional landscaping solutions, and sustainable green innovations - growing excellence with every plant.",
      highlights: [
        "Exotic Indoor Air-Purifying Plants",
        "Vibrant Outdoor & Shade Trees",
        "Aromatic Flower Varieties",
        "Commercial Landscaping & Wholesale Supply",
        "Custom Rooftop & Green Wall Setup"
      ],
      features: [
        "Quality Successfully Delivered, Trust Successfully Earned.",
        "Delivering Excellence. Sharing Nature's Best.",
        "Premium 6-Inch Bicolour Tecoma – A Perfect Blend of Colour and Elegance.",
        "From Our Nursery to Your Project – 100,000+ Live Net Pot Plants Delivered.",
        "Safe Express Transport & On-Site Planting Setup"
      ],
      services: [
        {
          title: "Indoor & Tropical Plants",
          description: "Curating Premium Anthuriums, Petra Plants, Yellow & Bicolour Tecoma, and High-Quality Ornamental Plants for Luxury Landscapes, Corporate Environments, and Modern Green Spaces.",
          iconName: "Flower2"
        },
        {
          title: "Outdoor & Flowering Flora",
          description: "Hardy fruit trees, ornamental shrubs, and seasonal bloomers built to thrive in outdoor environments.",
          iconName: "Trees"
        },
        {
          title: "Landscape Architecture",
          description: "Full-service landscape conceptualization, hardscaping, lawn setup, and automated drip irrigation.",
          iconName: "Compass"
        },
        {
          title: "Wholesale Nursery Supply",
          description: "Bulk orders for commercial builders, resorts, government parks, and retail garden centers.",
          iconName: "Truck"
        }
      ],
      benefits: [
        "Healthy, deeply-rooted plants nurtured in climate-controlled nurseries",
        "Custom landscape design tailormade for luxury residences & offices",
        "Complete post-planting care guidance and organic plant nutrition",
        "Bulk delivery with white-glove transport and setup assistance"
      ],
      gallery: [
        { url: nurseryImg, caption: "Grand Climate - Controlled Black Shed net House", category: "Nursery" }
      ]
    }
  ];

  const featuresEn: FeatureCard[] = [
    {
      id: "quality",
      title: "Premium Quality",
      description: "Every bird, egg, plant, and tree undergoes rigorous quality audits to ensure gold-standard excellence.",
      icon: "Award"
    },
    {
      id: "farming",
      title: "Natural Farming",
      description: "100% chemical-free cultivation, organic feeds, and natural ecosystems prioritizing planetary health.",
      icon: "Sprout"
    },
    {
      id: "satisfaction",
      title: "Customer Satisfaction",
      description: "Deep-rooted commitment to transparency, reliable supply, and white-glove client support.",
      icon: "HeartHandshake"
    },
    {
      id: "sustainability",
      title: "Sustainable Agriculture",
      description: "Pioneering eco-friendly farming practices, water conservation, and green technology for future generations.",
      icon: "Leaf"
    }
  ];

  const timelineEn: TimelineEvent[] = [
    {
      year: "2024",
      title: "K Group of Nursery Established",
      subtitle: "Inception of Botanical Excellence",
      description: "Established our flagship nursery dedicated to premium indoor plants, outdoor ornamentals, and commercial landscaping projects.",
      icon: "Sprout"
    },
    {
      year: "2025",
      title: "Gavran Poultry Farms Founded",
      subtitle: "Pioneering Free-Range Eco Poultry",
      description: "Expanded into high-quality country poultry farming with open pasture grazing and chemical-free bird nutrition.",
      icon: "Hen"
    },
    {
      year: "Future",
      title: "Real Estate & Land Investments",
      subtitle: "Strategic Land Banking & Development",
      description: "Venturing into strategic land acquisitions, prime agricultural land investments, and sustainable real estate development.",
      icon: "Building2"
    }
  ];

  const statsEn: StatItem[] = [
    { id: "businesses", label: "Premier Businesses", value: 2, suffix: "+", icon: "Building2" },
    { id: "customers", label: "Satisfied Customers", value: 199, suffix: "+", icon: "Users" },
    { id: "plants", label: "Healthy Netpot Live Plants Sold", value: 99, suffix: "k+", icon: "Flower" },
    { id: "poultry", label: "Gavran - Healthy Eggs, Hens, Male Rooster", value: 5, suffix: "k+", icon: "Hen" },
    { id: "daily-eggs", label: "Daily Production, Pure Gavran Eggs", value: 1000, suffix: "+", icon: "Egg" }
  ];

  const testimonialsEn: Testimonial[] = [
    {
      id: "test-1",
      name: "Mr. Suraj Jadhav",
      role: "Client",
      business: "K Group of Gavran Poultry Farm",
      comment: "Mr. Anuj Ganesh Kanchan has built an outstanding Gavran Poultry Farm with exceptional care and professionalism. The Gavran hens and roosters are healthy, active, and true to their native breed. The quality of the birds, transparent farming practices, and excellent customer service make K Group the perfect choice for anyone looking for premium native poultry.",
      rating: 5,
      avatar: surajJadhavImg
    },
    {
      id: "test-2",
      name: "Mr. Amar Jadhav",
      role: "Client",
      business: "K Group of Gavran Poultry Farm",
      comment: "Mr. Anuj Ganesh Kanchan has earned our trust by delivering truly pure Gavran eggs of the highest quality. Every egg is fresh, naturally produced, and rich in taste and nutrition. His dedication to ethical farming and maintaining premium standards is reflected in every product. K Group is undoubtedly one of the best Gavran poultry farms.",
      rating: 5,
      avatar: amarJadhavImg
    },
    {
      id: "test-3",
      name: "Mr. Ganesh Kanchan",
      role: "Co-Founder",
      business: "K Group of Gavran Poultry Farm & K Group Nursery",
      comment: "As a father, I am truly proud of what my son, Mr. Anuj Ganesh Kanchan, has achieved through K Group Nursery. His dedication, hard work, and commitment to quality are reflected in every Tecoma plant, whether in net pots or 6-inch pots. The plants are healthy, well-maintained, and grown with exceptional care. I wish him continued success in building one of the finest premium nurseries in the country.",
      rating: 5,
      avatar: ganeshKanchanImg
    }
  ];

  return {
    HERO_DATA: heroEn,
    BUSINESSES_DATA: businessesEn,
    FOUNDER_DATA: founderEn,
    FEATURES_DATA: featuresEn,
    TIMELINE_DATA: timelineEn,
    STATS_DATA: statsEn,
    TESTIMONIALS_DATA: testimonialsEn,
    VISION_TEXT: "Our vision is to become one of India's most trusted business groups by delivering quality, sustainability, innovation, and customer satisfaction."
  };
}
