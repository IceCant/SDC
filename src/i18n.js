export const supportedLanguages = ["en", "km", "zh"];

export const translations = {
  en: {
    language: { label: "Language", english: "EN", khmer: "ខ្មែរ" },
    nav: { home: "Home", products: "Products", events: "Events", promotions: "Promotion", education: "Education", contact: "Contact" },
    action: { requestQuote: "Request a quote", exploreProducts: "Explore products", exploreLessons: "Explore all lessons", viewProduct: "View product", backToProducts: "Back to products", talkToSdc: "Talk to SDC", clearFilters: "Clear filters", showAllProducts: "Show all products", watchLesson: "Watch lesson", viewArchive: "View the complete archive" },
    status: { "Quote required": "Quote required", "In stock": "In stock", "Pre-order": "Pre-order" },
    products: { eyebrow: "Complete source catalog", title: "Products for every part of the stay.", summary: "Browse SDC’s original hospitality catalog with the real product photography from the source website. Pricing and final specifications are confirmed by quotation.", search: "Search by product name", allCollections: "All collections", allProducts: "All products", photography: "Original SDC product photography", noResults: "No matching products", noResultsText: "Try another search or choose a different collection." },
    custom: { eyebrow: "Brand customisation", title: "Your identity, carried through every detail.", summary: "Explore branded hospitality work produced for hotels, resorts and organisations in SDC’s original portfolio.", cta: "Add your mark to the guest experience." },
    coverage: { eyebrow: "Cambodia network", title: "Hospitality support across Cambodia.", summary: "See the destinations and provinces represented in SDC’s hospitality supply network.", cta: "Ask about delivery to your destination." },
    events: { eyebrow: "Industry archive", title: "Events, training and community.", summary: "A complete view of SDC exhibitions, product launches, competitions, partnerships and housekeeping training—now restored with each event’s original photography.", featured: "Featured", supporting: "Connecting hospitality suppliers, operators and industry partners across Cambodia." },
    education: { eyebrow: "SDC education", title: "Practical skills for stronger hospitality.", summary: "Real lessons from SDC’s original video library—now easier to browse, learn from and share with your team.", featured: "Featured lesson", learn: "Learn with SDC", library: "Video library", chooseTopic: "Choose a topic.", topics: { All: "All", Housekeeping: "Housekeeping", Products: "Products", Factory: "Factory", Business: "Business", Events: "Events" } },
    home: { eyebrow: "Cambodia’s hospitality supply partner", summary: "From refined linens to branded guest amenities, everything your property needs to create a stay worth remembering.", catalogEyebrow: "Source catalog rebuilt", catalogTitle: "Everything for every stay.", catalogText: "Browse real SDC product photography across guest-room essentials, linens, amenities and hotel equipment." },
  },
  km: {
    language: { label: "ភាសា", english: "EN", khmer: "ខ្មែរ" },
    nav: { home: "ទំព័រដើម", products: "ផលិតផល", events: "ព្រឹត្តិការណ៍", promotions: "ប្រូម៉ូសិន", education: "ចំណេះដឹង", contact: "ទំនាក់ទំនង" },
    action: { requestQuote: "ស្នើសុំតម្លៃ", exploreProducts: "មើលផលិតផល", exploreLessons: "មើលមេរៀនទាំងអស់", viewProduct: "មើលផលិតផល", backToProducts: "ត្រឡប់ទៅផលិតផល", talkToSdc: "ទាក់ទង SDC", clearFilters: "លុបការជ្រើសរើស", showAllProducts: "បង្ហាញផលិតផលទាំងអស់", watchLesson: "មើលវីដេអូ", viewArchive: "មើលព្រឹត្តិការណ៍ទាំងអស់" },
    status: { "Quote required": "ស្នើសុំតម្លៃ", "In stock": "មានក្នុងស្តុក", "Pre-order": "បញ្ជាទិញមុន" },
    products: { eyebrow: "បញ្ជីផលិតផល", title: "ផលិតផលសម្រាប់គ្រប់ផ្នែកនៃសណ្ឋាគារ។", summary: "ស្វែងរកផលិតផលបដិសណ្ឋារកិច្ចរបស់ SDC ជាមួយរូបភាពផលិតផលពិតពីគេហទំព័រដើម។ តម្លៃ និងព័ត៌មានលម្អិតចុងក្រោយ សូមស្នើសុំតាមរយៈការដកស្រង់តម្លៃ។", search: "ស្វែងរកតាមឈ្មោះផលិតផល", allCollections: "គ្រប់ក្រុមផលិតផល", allProducts: "ផលិតផលទាំងអស់", photography: "រូបភាពផលិតផល SDC ដើម", noResults: "មិនមានផលិតផលត្រូវគ្នា", noResultsText: "សូមសាកល្បងពាក្យស្វែងរក ឬក្រុមផលិតផលផ្សេងទៀត។" },
    custom: { eyebrow: "រចនាឡូហ្គោតាមតម្រូវការ", title: "អត្តសញ្ញាណរបស់អ្នក ក្នុងគ្រប់លម្អិត។", summary: "ស្វែងយល់ពីស្នាដៃបដិសណ្ឋារកិច្ចដែលមានឡូហ្គោ សម្រាប់សណ្ឋាគារ រីសត និងស្ថាប័ននានា ក្នុងបញ្ជីស្នាដៃដើមរបស់ SDC។", cta: "បន្ថែមស្លាកសញ្ញារបស់អ្នកទៅលើបទពិសោធន៍ភ្ញៀវ។" },
    coverage: { eyebrow: "បណ្តាញនៅកម្ពុជា", title: "គាំទ្របដិសណ្ឋារកិច្ចទូទាំងកម្ពុជា។", summary: "ស្វែងយល់ពីគោលដៅ និងខេត្តដែលស្ថិតក្នុងបណ្តាញផ្គត់ផ្គង់បដិសណ្ឋារកិច្ចរបស់ SDC។", cta: "សួរអំពីការដឹកជញ្ជូនទៅកាន់គោលដៅរបស់អ្នក។" },
    events: { eyebrow: "បណ្ណសារព្រឹត្តិការណ៍", title: "ព្រឹត្តិការណ៍ ការបណ្តុះបណ្តាល និងសហគមន៍។", summary: "ទិដ្ឋភាពពេញលេញនៃពិព័រណ៍ ការបើកដំណើរការផលិតផល ការប្រកួតប្រជែង ភាពជាដៃគូ និងការបណ្តុះបណ្តាលរបស់ SDC។", featured: "ព្រឹត្តិការណ៍សំខាន់", supporting: "ភ្ជាប់អ្នកផ្គត់ផ្គង់ ប្រតិបត្តិករ និងដៃគូក្នុងវិស័យបដិសណ្ឋារកិច្ចទូទាំងកម្ពុជា។" },
    education: { eyebrow: "ចំណេះដឹងពី SDC", title: "ជំនាញអនុវត្តសម្រាប់បដិសណ្ឋារកិច្ចកាន់តែប្រសើរ។", summary: "មេរៀនពិតពីបណ្ណាល័យវីដេអូ SDC ដែលងាយស្រួលស្វែងរក រៀន និងចែករំលែកជាមួយក្រុមការងារ។", featured: "មេរៀនពិសេស", learn: "រៀនជាមួយ SDC", library: "បណ្ណាល័យវីដេអូ", chooseTopic: "ជ្រើសរើសប្រធានបទ។", topics: { All: "ទាំងអស់", Housekeeping: "សេវាបន្ទប់", Products: "ផលិតផល", Factory: "រោងចក្រ", Business: "អាជីវកម្ម", Events: "ព្រឹត្តិការណ៍" } },
    home: { eyebrow: "ដៃគូផ្គត់ផ្គង់បដិសណ្ឋារកិច្ចនៅកម្ពុជា", summary: "ចាប់ពីក្រណាត់គ្រែដ៏ល្អប្រណិត រហូតដល់សម្ភារៈភ្ញៀវមានឡូហ្គោ—អ្វីគ្រប់យ៉ាងសម្រាប់បង្កើតបទពិសោធន៍ស្នាក់នៅដែលគួរឱ្យចងចាំ។", catalogEyebrow: "បញ្ជីផលិតផល SDC", catalogTitle: "គ្រប់យ៉ាងសម្រាប់គ្រប់ការស្នាក់នៅ។", catalogText: "មើលរូបភាពផលិតផល SDC ពិត សម្រាប់សម្ភារៈបន្ទប់ ភួយកម្រាល សម្ភារៈបន្ទប់ទឹក និងឧបករណ៍សណ្ឋាគារ។" },
  },
  zh: {
    language: { label: "语言", english: "EN", khmer: "ខ្មែរ", chinese: "中文" },
    nav: { home: "首页", products: "产品", events: "活动", promotions: "优惠", education: "知识中心", contact: "联系我们" },
    action: { requestQuote: "获取报价", exploreProducts: "浏览产品", exploreLessons: "浏览全部课程", viewProduct: "查看产品", backToProducts: "返回产品", talkToSdc: "联系 SDC", clearFilters: "清除筛选", showAllProducts: "显示全部产品", watchLesson: "观看课程", viewArchive: "查看全部活动" },
    status: { "Quote required": "获取报价", "In stock": "现货", "Pre-order": "预订" },
    products: { eyebrow: "完整产品目录", title: "满足酒店每个空间的需求。", summary: "浏览 SDC 原始酒店用品目录及真实产品图片。价格和最终规格请通过报价确认。", search: "按产品名称搜索", allCollections: "全部系列", allProducts: "全部产品", photography: "SDC 原始产品图片", noResults: "没有匹配的产品", noResultsText: "请尝试其他搜索词或产品系列。" },
    custom: { eyebrow: "品牌定制", title: "将您的品牌融入每一个细节。", summary: "探索 SDC 原始案例中，为酒店、度假村和机构制作的品牌酒店用品。", cta: "让每一次宾客体验都留下您的印记。" },
    coverage: { eyebrow: "柬埔寨服务网络", title: "覆盖柬埔寨各地的酒店支持。", summary: "了解 SDC 酒店用品供应网络覆盖的目的地和省份。", cta: "咨询送达您所在目的地的服务。" },
    events: { eyebrow: "行业活动档案", title: "活动、培训与社区。", summary: "完整了解 SDC 的展览、产品发布、竞赛、合作与客房服务培训。", featured: "精选活动", supporting: "连接柬埔寨酒店行业的供应商、运营者和合作伙伴。" },
    education: { eyebrow: "SDC 知识中心", title: "实用技能，成就更好的酒店服务。", summary: "来自 SDC 原始视频资料库的真实课程，方便您与团队学习和分享。", featured: "精选课程", learn: "与 SDC 一起学习", library: "视频资料库", chooseTopic: "选择主题。", topics: { All: "全部", Housekeeping: "客房服务", Products: "产品", Factory: "工厂", Business: "商业", Events: "活动" } },
    home: { eyebrow: "柬埔寨酒店用品合作伙伴", summary: "从精致床品到品牌宾客用品，为您的酒店打造难忘住宿体验所需的一切。", catalogEyebrow: "SDC 产品目录", catalogTitle: "为每一次入住准备的一切。", catalogText: "浏览真实 SDC 产品图片，包括客房用品、布草、卫浴用品与酒店设备。" },
  },
};

export function getInitialLanguage() {
  const storedLanguage = (() => {
    try {
      return window.localStorage.getItem("sdc-language");
    } catch {
      return null;
    }
  })();
  if (supportedLanguages.includes(storedLanguage)) return storedLanguage;
  const browserLanguage = navigator.language.toLowerCase();
  if (browserLanguage.startsWith("km")) return "km";
  if (browserLanguage.startsWith("zh")) return "zh";
  return "en";
}
