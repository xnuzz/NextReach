// Advanced Multi-Language Translator with Dropdown
const translations = {
    en: {
        // Language Names
        lang_name: "English",
        
        // Navigation
        nav_home: "Home",
        nav_services: "Services",
        nav_pricing: "Pricing",
        nav_about: "About",
        nav_ai_assistant: "AI Assistant",
        nav_book_call: "Book Call",
        nav_login: "Login",
        nav_get_started: "Get Started",
        nav_signup: "Sign Up",
        nav_logout: "Logout",
        nav_profile: "Profile",
        
        // Pricing Page
        pricing_badge: "Packages & Services",
        pricing_hero_title: "Website Development & Marketing Services",
        pricing_hero_subtitle: "Professional digital solutions tailored to your business needs and goals.",
        
        // Website Development Section
        website_title: "Website Development",
        website_subtitle: "We create modern, fast and responsive websites tailored to the needs and goals of your business.",
        
        starter_package: "Starter Package",
        starter_price_euro: "~€199",
        starter_features: [
            "1-page Landing Page",
            "Mobile version",
            "Modern, clean design"
        ],
        
        basic_package: "Basic Website",
        basic_subtitle: "Suitable for small businesses",
        basic_price_euro: "~€350",
        basic_features: [
            "Up to 3 pages",
            "Mobile version",
            "Modern, clean design"
        ],
        
        business_package: "Business Website",
        business_subtitle: "For growing brands and companies",
        business_price_euro: "~€690",
        business_features: [
            "Up to 5 pages",
            "SEO optimization",
            "Social media integration",
            "Contact form",
            "Additional functionality – by agreement"
        ],
        
        premium_package: "Premium Website + Support",
        premium_subtitle: "For established businesses",
        premium_price_euro: "~€870",
        premium_features: [
            "Up to 7 pages",
            "SEO optimization",
            "1 month support",
            "Content analysis and optimization",
            "Personalized functionality – by agreement"
        ],
        premium_note: "+ additional services by agreement",
        
        // Social Media Marketing
        marketing_title: "Organic Marketing (Social Media)",
        marketing_subtitle: "We create effective content that attracts customers and builds trust in your brand.",
        
        budget_plan: "Budget Package",
        budget_price_euro: "~€230/month",
        budget_features: [
            "2 videos weekly",
            "2 posts weekly",
            "Video editing",
            "Publishing on all social networks"
        ],
        
        standard_plan: "Standard Package",
        standard_subtitle: "Most Popular",
        standard_price_euro: "~€332/month",
        standard_features: [
            "3 videos weekly",
            "3 posts weekly",
            "Video editing",
            "Publishing on all social networks",
            "Copywriting"
        ],
        
        premium_plan: "Premium Package",
        premium_plan_price_euro: "~€536/month",
        premium_plan_features: [
            "4 videos weekly",
            "4 posts weekly",
            "Video editing",
            "Publishing on all social networks",
            "Personalized strategy",
            "Monthly report and optimization"
        ],
        
        discount_title: "Special Offer!",
        prepay_discount: "10% discount for 3-month prepayment",
        
        // Additional Services
        addons_title: "Additional Services",
        addon_fb_ads: "Facebook Ads",
        addon_fb_ads_price: "250–450лв / ~€128–230/month",
        addon_ai_videos: "AI Video Generation",
        addon_ai_videos_price: "100лв / ~€51",
        addon_report: "Detailed Report & Growth Strategy",
        addon_report_price: "60лв / ~€31",
        addon_reels: "Reels with Subtitles",
        addon_reels_price: "12лв / ~€6/video",
        
        // CTA
        cta_button: "Get Started",
        cta_book: "Book Free Consultation",
        cta_ready_title: "Ready to Get Started?",
        cta_ready_subtitle: "Book a free consultation and let's discuss your project!",
        
        // Footer
        footer_rights: "All rights reserved.",
        footer_about: "About Us",
        footer_contact: "Contact",
        footer_services: "Services",
        footer_pricing: "Pricing",
        footer_company: "Company",
        footer_quick_links: "Quick Links",
        footer_description: "Empowering businesses with complete digital solutions.",
        footer_book_call: "Book a Call",
        
        // Homepage Hero
        hero_badge: "Trusted by 50+ Growing Businesses Worldwide",
        hero_title: "Your Complete Digital Partner for",
        hero_title_gradient: "Unstoppable Growth",
        hero_subtitle: "Get a professional website, powerful social media presence, and cinematic video content—all expertly crafted and launch-ready in 2-6 weeks. No hidden fees, zero interest payment plans, and our risk-free guarantee.",
        hero_feature_1: "Launch in 2-6 Weeks",
        hero_feature_2: "0% Interest Payments",
        hero_feature_3: "Risk-Share Guarantee",
        hero_cta_primary: "Book Your Free Strategy Call",
        hero_cta_secondary: "View Pricing & Packages",
        hero_limited: "Limited Availability:",
        hero_slots: "Only 3 project slots available this month",
        
        // Stats Section
        stats_businesses: "Businesses Transformed",
        stats_satisfaction: "Client Satisfaction",
        stats_delivery: "Week Delivery Time",
        stats_guarantee: "Money-Back Guarantee",
        
        // Services Preview Section
        services_preview_badge: "What We Do",
        services_preview_title: "Everything You Need to Succeed Online",
        services_preview_subtitle: "From websites to social media to video content—we handle it all so you can focus on growing your business.",
        service_websites_title: "Professional Websites",
        service_websites_desc: "Custom-built, mobile-responsive websites that convert visitors into customers.",
        service_websites_price: "From $697",
        service_social_title: "Social Media Mastery",
        service_social_desc: "Fully branded profiles across all platforms, seamlessly integrated with your website.",
        service_social_price: "Included",
        service_video_title: "Engaging Video Content",
        service_video_desc: "Professional promotional videos that capture attention and drive action.",
        service_video_price: "From $1,497",
        
        // Testimonials Section
        testimonials_badge: "Client Success Stories",
        testimonials_title: "Trusted by Growing Businesses",
        testimonials_subtitle: "See why businesses choose NextReach for their digital transformation.",
        testimonial_1_text: "Our new website looks incredible and actually generates leads. We've seen a 340% increase in consultation bookings in just 8 weeks.",
        testimonial_1_name: "David Martinez",
        testimonial_1_title: "Law Firm Owner, Sofia",
        testimonial_2_text: "Professional service from start to finish. The social media integration has brought us customers we never could have reached before.",
        testimonial_2_name: "Elena Petrova",
        testimonial_2_title: "Boutique Owner, Plovdiv",
        testimonial_3_text: "They delivered exactly what they promised, on time and on budget. Our online bookings have doubled since launch.",
        testimonial_3_name: "Stefan Ivanov",
        testimonial_3_title: "Fitness Studio, Varna",
        start_project: "Start Your Project",
        explore_services: "Explore All Services",
        
        // Services Page
        services_page_badge: "Our Services",
        services_page_title: "Everything You Need to Dominate Online",
        services_page_subtitle: "From professional websites to social media mastery and engaging video content—we handle the tech so you can focus on growing your business.",
        view_packages: "View Packages",
        book_consultation: "Book Consultation",
        
        services_offer_title: "Complete Digital Solutions",
        services_offer_subtitle: "Everything you need to dominate your market online. We handle the tech, you focus on growing your business.",
        
        service_web_design_title: "Professional Website Design",
        service_web_design_desc: "Custom-built, mobile-responsive websites that convert visitors into customers. From simple landing pages to complex e-commerce platforms.",
        service_web_feature_1: "Mobile-responsive design",
        service_web_feature_2: "SEO optimization",
        service_web_feature_3: "Fast loading speeds",
        service_web_feature_4: "Secure hosting included",
        
        service_social_integration_title: "Social Media Integration",
        service_social_integration_desc: "Fully branded social media profiles across all major platforms, linked seamlessly to your website for maximum reach.",
        service_social_feature_1: "Profile setup & branding",
        service_social_feature_2: "Content strategy",
        service_social_feature_3: "Cross-platform integration",
        service_social_feature_4: "Analytics tracking",
        
        service_video_content_title: "Professional Video Content",
        service_video_content_desc: "Engaging promo videos that tell your story and capture attention. Perfect for social media, websites, and advertising.",
        service_video_feature_1: "Professional editing",
        service_video_feature_2: "Stock footage included",
        service_video_feature_3: "Custom animations",
        service_video_feature_4: "Multiple formats",
        
        service_ai_features_title: "AI-Powered Features",
        service_ai_features_desc: "Smart chatbots, automated responses, and AI assistants that work 24/7 to capture leads and answer customer questions.",
        service_ai_feature_1: "24/7 customer support",
        service_ai_feature_2: "Lead qualification",
        service_ai_feature_3: "Automated booking",
        service_ai_feature_4: "Smart responses",
        
        service_marketing_seo_title: "Marketing & SEO",
        service_marketing_seo_desc: "Get found online with our comprehensive SEO strategies, Google Ads setup, and marketing automation tools.",
        service_marketing_feature_1: "Keyword optimization",
        service_marketing_feature_2: "Google Ads setup",
        service_marketing_feature_3: "Email marketing",
        service_marketing_feature_4: "Analytics & reporting",
        
        service_ongoing_support_title: "Ongoing Support",
        service_ongoing_support_desc: "We don't disappear after launch. Get dedicated support, maintenance, updates, and strategic consultations included.",
        service_support_feature_1: "Priority support",
        service_support_feature_2: "Regular updates",
        service_support_feature_3: "Security monitoring",
        service_support_feature_4: "Strategy sessions",
        
        // About Page
        about_page_badge: "About NextReach",
        about_page_title: "Your Digital Transformation Partner",
        about_page_subtitle: "We're on a mission to empower every business with a complete, professional digital presence—without the complexity or high costs.",
        about_story_badge: "Our Story",
        about_story_title: "Built by Entrepreneurs, for Entrepreneurs",
        about_story_p1: "NextReach was born from a simple vision: every business deserves a professional digital presence that actually works. We recognized that traditional agencies were too expensive, too slow, and too complicated for most businesses.",
        about_story_p2: "Today, we're pioneering a new approach—combining cutting-edge technology with human expertise to deliver complete digital solutions in record time. From websites to social media to video content, all delivered in 2-6 weeks with transparent pricing and flexible payment plans.",
        see_packages: "See Our Packages",
        book_call: "Book a Call",
        about_team_title: "Fast-Growing Team",
        about_team_desc: "From 3 founders to a dedicated team of experts in design, development, marketing, and video production.",
        about_projects: "Projects Done",
        about_satisfaction: "Satisfaction Rate",
        about_mission_badge: "Our Mission & Values",
        about_mission_title: "What Drives Us Forward",
        about_mission_subtitle: "Our core principles guide everything we do.",
        about_value_1_title: "Client-First Always",
        about_value_1_desc: "Your success is our success. We're not satisfied until you're thrilled with the results.",
        about_value_2_title: "Innovation & Excellence",
        about_value_2_desc: "We stay ahead of trends to deliver cutting-edge solutions that drive real results.",
        about_value_3_title: "Transparency & Trust",
        about_value_3_desc: "Clear pricing, honest timelines, and open communication every step of the way.",
        about_value_4_title: "Speed & Quality",
        about_value_4_desc: "Fast delivery without compromising on quality. We move quickly because your time matters.",
        about_value_5_title: "Partnership Mindset",
        about_value_5_desc: "We're not just a vendor—we're your long-term partner in growth and success.",
        about_value_6_title: "Proven Results",
        about_value_6_desc: "Data-driven strategies backed by real success stories from businesses like yours.",
        about_why_badge: "Why Choose NextReach",
        about_why_title: "The NextReach Advantage",
        about_why_subtitle: "What sets us apart from traditional marketing agencies and freelancers.",
        
        // Booking Page
        booking_page_title: "Book Your Free Strategy Call",
        booking_page_subtitle: "Let's discuss your digital goals and create a custom plan for your business.",
        booking_trust_1: "Response Time",
        booking_trust_2: "Satisfaction Rate",
        booking_trust_3: "Active Projects",
        booking_form_title: "Schedule Your Call",
        booking_form_subtitle: "Pick a time that works best for you. We'll discuss your goals and show you exactly how we can help.",
        booking_what_title: "What to Expect",
        booking_what_subtitle: "Here's what we'll cover in our call:",
        booking_expect_1: "Your Business Goals",
        booking_expect_1_desc: "We'll learn about your vision and objectives.",
        booking_expect_2: "Current Challenges",
        booking_expect_2_desc: "Identify what's holding you back online.",
        booking_expect_3: "Custom Strategy",
        booking_expect_3_desc: "Get a personalized roadmap for success.",
        booking_expect_4: "Transparent Pricing",
        booking_expect_4_desc: "Clear costs with flexible payment options.",
        no_obligation: "No obligation, no pressure—just real solutions.",
        
        // Support Page
        support_page_title: "We're Here to Help",
        support_page_subtitle: "Get answers to your questions or reach out directly for personalized support.",
        support_contact_title: "Contact Us Directly",
        support_contact_subtitle: "Prefer to reach out? We're here for you.",
        support_email: "Email Us",
        support_response: "24-hour response time",
        support_faq_title: "Frequently Asked Questions",
        support_faq_subtitle: "Quick answers to common questions.",
        
        // AI Assistant Page
        ai_page_title: "Your AI-Powered Business Assistant",
        ai_page_subtitle: "Get instant answers to your questions about our services, pricing, and how we can help your business grow.",
        ai_chat_title: "Chat with Our AI Assistant",
        ai_chat_subtitle: "Ask anything about our services, pricing, or process. Get instant, accurate answers 24/7.",
        
        // Homepage Features
        features_title: "Why Choose NextReach?",
        features_subtitle: "Everything you need to dominate your digital presence",
        feature_complete: "Complete Package",
        feature_complete_desc: "Website, social media, and video content - all in one place",
        feature_fast: "Fast Delivery",
        feature_fast_desc: "Launch your complete digital presence in 2-6 weeks",
        feature_support: "Ongoing Support",
        feature_support_desc: "We're with you every step of the way",
        
        // CTA Section
        cta_badge: "LIMITED TIME OFFER",
        cta_title: "Ready to Transform Your Business?",
        cta_subtitle: "Join 50+ successful businesses that have launched their complete digital presence with NextReach. Get started in 2-6 weeks with 0% interest payment plans.",
        cta_satisfaction: "100% Satisfaction",
        cta_satisfaction_sub: "Money-Back Guarantee",
        cta_delivery: "2-6 Week Delivery",
        cta_delivery_sub: "Launch Fast",
        cta_interest: "0% Interest",
        cta_interest_sub: "Payment Plans",
        cta_pricing: "View Pricing & Get Started",
        cta_strategy: "Book Free Strategy Call",
        cta_disclaimer: "No credit card required • Cancel anytime • Risk-free guarantee",
        
        // Services
        services_title: "Our Services",
        services_subtitle: "Complete digital solutions for your business",
        service_web_dev: "Website Development",
        service_web_desc: "Modern, responsive websites that convert visitors into customers",
        service_social: "Social Media Management",
        service_social_desc: "Professional content creation and management across all platforms",
        service_video: "Video Content Creation",
        service_video_desc: "High-quality videos that engage and convert your audience",
        service_seo: "SEO Optimization",
        service_seo_desc: "Get found on Google and drive organic traffic to your website",
        
        // About
        about_title: "About NextReach",
        about_subtitle: "Your Partner in Digital Success",
        about_description: "We help businesses transform their digital presence with professional websites, social media management, and video content.",
        about_mission: "Our Mission",
        about_mission_desc: "To empower businesses of all sizes with affordable, professional digital solutions.",
        
        // Common
        learn_more: "Learn More",
        contact_us: "Contact Us",
        get_quote: "Get a Quote",
        view_portfolio: "View Portfolio",
        read_more: "Read More",
        book_now: "Book Now",
        send_message: "Send Message",
        submit: "Submit",
        close: "Close",
        back: "Back",
        next: "Next",
        previous: "Previous",
        loading: "Loading...",
        success: "Success!",
        error: "Error",
        please_wait: "Please wait..."
    },
    bg: {
        // Language Names
        lang_name: "Български",
        
        // Navigation
        nav_home: "Начало",
        nav_services: "Услуги",
        nav_pricing: "Цени",
        nav_about: "За нас",
        nav_ai_assistant: "AI Асистент",
        nav_book_call: "Запази час",
        nav_login: "Вход",
        nav_get_started: "Започни",
        nav_signup: "Регистрация",
        nav_logout: "Изход",
        nav_profile: "Профил",
        
        // Pricing Page
        pricing_badge: "Пакети и услуги",
        pricing_hero_title: "Изработка на уебсайтове и маркетинг услуги",
        pricing_hero_subtitle: "Професионални дигитални решения, съобразени с нуждите и целите на вашия бизнес.",
        
        // Website Development Section
        website_title: "Изработка на уебсайтове",
        website_subtitle: "Създаваме модерни, бързи и адаптивни уебсайтове, съобразени с нуждите и целите на вашия бизнес.",
        
        starter_package: "Стартов пакет",
        starter_price_euro: "~199 €",
        starter_features: [
            '1 страница "Landing Page"',
            "Мобилна версия",
            "Модерен, изчистен дизайн"
        ],
        
        basic_package: "Базов уебсайт",
        basic_subtitle: "Подходящ за малки бизнеси",
        basic_price_euro: "~350 €",
        basic_features: [
            "До 3 страници",
            "Мобилна версия",
            "Модерен, изчистен дизайн"
        ],
        
        business_package: "Бизнес уебсайт",
        business_subtitle: "За растящи марки и компании",
        business_price_euro: "~690 €",
        business_features: [
            "До 5 страници",
            "SEO оптимизация",
            "Интеграция със социални мрежи",
            "Контактна форма",
            "Допълнителна функционалност – по договаряне"
        ],
        
        premium_package: "Премиум уебсайт + поддръжка",
        premium_subtitle: "За установени бизнеси",
        premium_price_euro: "~870 €",
        premium_features: [
            "До 7 страници",
            "SEO оптимизация",
            "1 месец поддръжка",
            "Анализ и оптимизация на съдържанието",
            "Персонализирана функционалност – по договаряне"
        ],
        premium_note: "+ допълнителни услуги по договаряне",
        
        // Social Media Marketing
        marketing_title: "Органичен маркетинг (социални мрежи)",
        marketing_subtitle: "Създаваме ефективно съдържание, което привлича клиенти и изгражда доверие към вашия бранд.",
        
        budget_plan: "Бюджетен пакет",
        budget_price_euro: "~230 €/месец",
        budget_features: [
            "2 видео седмично",
            "2 поста седмично",
            "Видео обработка",
            "Публикуване във всички социални мрежи"
        ],
        
        standard_plan: "Стандартен пакет",
        standard_subtitle: "Най-избиран",
        standard_price_euro: "~332 €/месец",
        standard_features: [
            "3 видеа седмично",
            "3 поста седмично",
            "Видео обработка",
            "Публикуване във всички социални мрежи",
            "Копирайтинг"
        ],
        
        premium_plan: "Премиум пакет",
        premium_plan_price_euro: "~536 €/месец",
        premium_plan_features: [
            "4 видеа седмично",
            "4 поста седмично",
            "Видео обработка",
            "Публикуване във всички социални мрежи",
            "Персонализирана стратегия",
            "Месечен отчет и оптимизация"
        ],
        
        discount_title: "Специална оферта!",
        prepay_discount: "При предплащане за 3 месеца: 10% отстъпка",
        
        // Additional Services
        addons_title: "Допълнителни услуги",
        addon_fb_ads: "Facebook реклами",
        addon_fb_ads_price: "250–450лв / ~128–230 €/месец",
        addon_ai_videos: "Генериране на видеа с изкуствен интелект",
        addon_ai_videos_price: "100лв / ~51 €",
        addon_report: "Подробен отчет и стратегия за растеж",
        addon_report_price: "60лв / ~31 €",
        addon_reels: "Reels със субтитри",
        addon_reels_price: "12лв / ~6 €/видео",
        
        // CTA
        cta_button: "Започни",
        cta_book: "Запази безплатна консултация",
        cta_ready_title: "Готови ли сте да започнете?",
        cta_ready_subtitle: "Запазете безплатна консултация и нека обсъдим вашия проект!",
        
        // Footer
        footer_rights: "Всички права запазени.",
        footer_about: "За нас",
        footer_contact: "Контакт",
        footer_services: "Услуги",
        footer_pricing: "Цени",
        footer_company: "Компания",
        footer_quick_links: "Бързи връзки",
        footer_description: "Даваме възможност на бизнеса с пълни дигитални решения.",
        footer_book_call: "Запази час",
        
        // Homepage Hero
        hero_badge: "Доверени от 50+ растящи бизнеси по света",
        hero_title: "Вашият пълен дигитален партньор за",
        hero_title_gradient: "Непрекъснат растеж",
        hero_subtitle: "Получете професионален уебсайт, мощно присъствие в социалните мрежи и кинематографско видео съдържание - всичко експертно изработено и готово за стартиране за 2-6 седмици. Без скрити такси, нулева лихва на вноски и наша гаранция без риск.",
        hero_feature_1: "Стартиране за 2-6 седмици",
        hero_feature_2: "0% лихва на вноски",
        hero_feature_3: "Гаранция за споделяне на риска",
        hero_cta_primary: "Запази безплатна стратегическа консултация",
        hero_cta_secondary: "Виж цени и пакети",
        hero_limited: "Ограничена наличност:",
        hero_slots: "Само 3 свободни места за проекти този месец",
        
        // Stats Section
        stats_businesses: "Трансформирани бизнеси",
        stats_satisfaction: "Удовлетвореност на клиенти",
        stats_delivery: "Време за доставка (седмици)",
        stats_guarantee: "Гаранция за връщане на пари",
        
        // Services Preview Section
        services_preview_badge: "Какво правим",
        services_preview_title: "Всичко необходимо за успех онлайн",
        services_preview_subtitle: "От уебсайтове до социални мрежи до видео съдържание - ние се справяме с всичко, за да можете да се фокусирате върху растежа на бизнеса си.",
        service_websites_title: "Професионални уебсайтове",
        service_websites_desc: "Персонализирани, мобилно адаптивни уебсайтове, които превръщат посетителите в клиенти.",
        service_websites_price: "От $697",
        service_social_title: "Майсторство в социалните мрежи",
        service_social_desc: "Пълно брандирани профили във всички платформи, безпроблемно интегрирани с вашия уебсайт.",
        service_social_price: "Включено",
        service_video_title: "Ангажиращо видео съдържание",
        service_video_desc: "Професионални промоционални видеоклипове, които привличат вниманието и стимулират действията.",
        service_video_price: "От $1,497",
        
        // Testimonials Section
        testimonials_badge: "Истории на успешни клиенти",
        testimonials_title: "Доверени от растящи бизнеси",
        testimonials_subtitle: "Вижте защо бизнесите избират NextReach за своята дигитална трансформация.",
        testimonial_1_text: "Нашият нов уебсайт изглежда невероятно и наистина генерира запитвания. Видяхме 340% увеличение на резервациите за консултации само за 8 седмици.",
        testimonial_1_name: "Давид Мартинес",
        testimonial_1_title: "Собственик на адвокатска кантора, София",
        testimonial_2_text: "Професионална услуга от начало до край. Интеграцията със социалните мрежи ни донесе клиенти, до които никога не бихме могли да достигнем преди.",
        testimonial_2_name: "Елена Петрова",
        testimonial_2_title: "Собственик на бутик, Пловдив",
        testimonial_3_text: "Доставиха точно това, което обещаха, навреме и в рамките на бюджета. Онлайн резервациите ни се удвоиха след стартирането.",
        testimonial_3_name: "Стефан Иванов",
        testimonial_3_title: "Фитнес студио, Варна",
        start_project: "Стартирайте проекта си",
        explore_services: "Разгледайте всички услуги",
        
        // Services Page
        services_page_badge: "Нашите услуги",
        services_page_title: "Всичко необходимо за доминиране онлайн",
        services_page_subtitle: "От професионални уебсайтове до майсторство в социалните мрежи и ангажиращо видео съдържание - ние се грижим за технологиите, за да можете да се фокусирате върху растежа на бизнеса си.",
        view_packages: "Виж пакети",
        book_consultation: "Запази консултация",
        
        services_offer_title: "Пълни дигитални решения",
        services_offer_subtitle: "Всичко необходимо за доминиране на вашия пазар онлайн. Ние се грижим за технологиите, вие се фокусирайте върху растежа на бизнеса си.",
        
        service_web_design_title: "Професионален дизайн на уебсайтове",
        service_web_design_desc: "Персонализирани, мобилно адаптивни уебсайтове, които превръщат посетителите в клиенти. От прости целеви страници до сложни е-търговски платформи.",
        service_web_feature_1: "Мобилно адаптивен дизайн",
        service_web_feature_2: "SEO оптимизация",
        service_web_feature_3: "Бързо зареждане",
        service_web_feature_4: "Включен сигурен хостинг",
        
        service_social_integration_title: "Интеграция със социални мрежи",
        service_social_integration_desc: "Пълно брандирани профили в социалните мрежи по всички основни платформи, свързани безпроблемно с вашия уебсайт за максимален обхват.",
        service_social_feature_1: "Настройка на профил и брандиране",
        service_social_feature_2: "Стратегия за съдържание",
        service_social_feature_3: "Междуплатформена интеграция",
        service_social_feature_4: "Проследяване на аналитика",
        
        service_video_content_title: "Професионално видео съдържание",
        service_video_content_desc: "Ангажиращи промо видеоклипове, които разказват вашата история и привличат вниманието. Перфектни за социални мрежи, уебсайтове и реклама.",
        service_video_feature_1: "Професионален монтаж",
        service_video_feature_2: "Включени стокови кадри",
        service_video_feature_3: "Персонализирани анимации",
        service_video_feature_4: "Множество формати",
        
        service_ai_features_title: "Функции, захранвани от AI",
        service_ai_features_desc: "Интелигентни чатботове, автоматизирани отговори и AI асистенти, които работят 24/7, за да улавят потенциални клиенти и да отговарят на въпросите на клиентите.",
        service_ai_feature_1: "24/7 клиентска поддръжка",
        service_ai_feature_2: "Квалификация на потенциални клиенти",
        service_ai_feature_3: "Автоматизирано резервиране",
        service_ai_feature_4: "Интелигентни отговори",
        
        service_marketing_seo_title: "Маркетинг и SEO",
        service_marketing_seo_desc: "Бъдете открити онлайн с нашите изчерпателни SEO стратегии, настройка на Google Ads и инструменти за маркетингова автоматизация.",
        service_marketing_feature_1: "Оптимизация на ключови думи",
        service_marketing_feature_2: "Настройка на Google Ads",
        service_marketing_feature_3: "Email маркетинг",
        service_marketing_feature_4: "Аналитика и отчетност",
        
        service_ongoing_support_title: "Текуща поддръжка",
        service_ongoing_support_desc: "Ние не изчезваме след стартирането. Получете приоритетна поддръжка, поддръжка, актуализации и стратегически консултации.",
        service_support_feature_1: "Приоритетна поддръжка",
        service_support_feature_2: "Редовни актуализации",
        service_support_feature_3: "Наблюдение на сигурността",
        service_support_feature_4: "Стратегически сесии",
        
        // About Page
        about_page_badge: "За NextReach",
        about_page_title: "Вашият партньор за дигитална трансформация",
        about_page_subtitle: "Нашата мисия е да предоставим на всеки бизнес пълно, професионално дигитално присъствие - без сложност или високи разходи.",
        about_story_badge: "Нашата история",
        about_story_title: "Създадени от предприемачи, за предприемачи",
        about_story_p1: "NextReach се роди от една проста визия: всеки бизнес заслужава професионално дигитално присъствие, което наистина работи. Разбрахме, че традиционните агенции са твърде скъпи, твърде бавни и твърде сложни за повечето бизнеси.",
        about_story_p2: "Днес прокарваме нов подход - комбинираме най-новите технологии с човешка експертиза, за да доставим пълни дигитални решения в рекордно време. От уебсайтове до социални мрежи до видео съдържание, всичко доставено за 2-6 седмици с прозрачни цени и гъвкави планове за плащане.",
        see_packages: "Вижте нашите пакети",
        book_call: "Запазете час",
        about_team_title: "Бързо растящ екип",
        about_team_desc: "От 3 основатели до отдаден екип от експерти в дизайн, разработка, маркетинг и видео продукция.",
        about_projects: "Завършени проекти",
        about_satisfaction: "Степен на удовлетвореност",
        about_mission_badge: "Нашата мисия и ценности",
        about_mission_title: "Какво ни движи напред",
        about_mission_subtitle: "Нашите основни принципи ръководят всичко, което правим.",
        about_value_1_title: "Клиентът винаги първи",
        about_value_1_desc: "Вашият успех е нашият успех. Не сме удовлетворени, докато не сте възхитени от резултатите.",
        about_value_2_title: "Иновации и върхови постижения",
        about_value_2_desc: "Следваме най-новите тенденции, за да предоставим авангардни решения, които носят реални резултати.",
        about_value_3_title: "Прозрачност и доверие",
        about_value_3_desc: "Ясни цени, честни срокове и открита комуникация на всяка стъпка.",
        about_value_4_title: "Скорост и качество",
        about_value_4_desc: "Бърза доставка без компромис с качеството. Движим се бързо, защото вашето време е важно.",
        about_value_5_title: "Партньорско мислене",
        about_value_5_desc: "Не сме просто доставчик - ние сме вашият дългосрочен партньор за растеж и успех.",
        about_value_6_title: "Доказани резултати",
        about_value_6_desc: "Стратегии, базирани на данни, подкрепени от реални истории за успех от бизнеси като вашия.",
        about_why_badge: "Защо да изберете NextReach",
        about_why_title: "Предимството на NextReach",
        about_why_subtitle: "Какво ни отличава от традиционните маркетингови агенции и фрийлансерите.",
        
        // Booking Page
        booking_page_title: "Запазете вашата безплатна стратегическа консултация",
        booking_page_subtitle: "Нека обсъдим вашите дигитални цели и създадем персонализиран план за вашия бизнес.",
        booking_trust_1: "Време за отговор",
        booking_trust_2: "Степен на удовлетвореност",
        booking_trust_3: "Активни проекти",
        booking_form_title: "Насрочете вашия разговор",
        booking_form_subtitle: "Изберете време, което ви подхожда най-добре. Ще обсъдим вашите цели и ще ви покажем точно как можем да помогнем.",
        booking_what_title: "Какво да очаквате",
        booking_what_subtitle: "Ето какво ще обхванем в нашия разговор:",
        booking_expect_1: "Вашите бизнес цели",
        booking_expect_1_desc: "Ще научим за вашата визия и цели.",
        booking_expect_2: "Текущи предизвикателства",
        booking_expect_2_desc: "Идентифицираме какво ви задържа онлайн.",
        booking_expect_3: "Персонализирана стратегия",
        booking_expect_3_desc: "Получете персонализирана пътна карта за успех.",
        booking_expect_4: "Прозрачни цени",
        booking_expect_4_desc: "Ясни разходи с гъвкави опции за плащане.",
        no_obligation: "Без задължения, без натиск - само реални решения.",
        
        // Support Page
        support_page_title: "Тук сме, за да помогнем",
        support_page_subtitle: "Получете отговори на вашите въпроси или се свържете директно за персонализирана поддръжка.",
        support_contact_title: "Свържете се с нас директно",
        support_contact_subtitle: "Предпочитате да се свържете? Тук сме за вас.",
        support_email: "Изпратете ни имейл",
        support_response: "24-часово време за отговор",
        support_faq_title: "Често задавани въпроси",
        support_faq_subtitle: "Бързи отговори на чести въпроси.",
        
        // AI Assistant Page
        ai_page_title: "Вашият AI-захранван бизнес асистент",
        ai_page_subtitle: "Получете незабавни отговори на вашите въпроси за нашите услуги, цени и как можем да помогнем на вашия бизнес да расте.",
        ai_chat_title: "Чат с нашия AI асистент",
        ai_chat_subtitle: "Попитайте каквото и да е за нашите услуги, цени или процес. Получете незабавни, точни отговори 24/7.",
        
        // Homepage Features
        features_title: "Защо да изберете NextReach?",
        features_subtitle: "Всичко необходимо за доминиране на вашето дигитално присъствие",
        feature_complete: "Пълен пакет",
        feature_complete_desc: "Уебсайт, социални мрежи и видео съдържание - всичко на едно място",
        feature_fast: "Бърза доставка",
        feature_fast_desc: "Стартирайте пълното си дигитално присъствие за 2-6 седмици",
        feature_support: "Текуща поддръжка",
        feature_support_desc: "Ние сме с вас на всяка стъпка",
        
        // CTA Section
        cta_badge: "ОГРАНИЧЕНА ОФЕРТА",
        cta_title: "Готови ли сте да трансформирате бизнеса си?",
        cta_subtitle: "Присъединете се към 50+ успешни бизнеса, които са стартирали пълното си дигитално присъствие с NextReach. Започнете за 2-6 седмици с 0% лихва на вноски.",
        cta_satisfaction: "100% удовлетворение",
        cta_satisfaction_sub: "Гаранция за връщане на пари",
        cta_delivery: "Доставка за 2-6 седмици",
        cta_delivery_sub: "Бърз старт",
        cta_interest: "0% лихва",
        cta_interest_sub: "План за плащане",
        cta_pricing: "Виж цените и започни",
        cta_strategy: "Запази безплатна стратегическа среща",
        cta_disclaimer: "Не се изисква кредитна карта • Откажете по всяко време • Гаранция без риск",
        
        // Services
        services_title: "Нашите услуги",
        services_subtitle: "Пълни дигитални решения за вашия бизнес",
        service_web_dev: "Изработка на уебсайтове",
        service_web_desc: "Модерни, адаптивни уебсайтове, които превръщат посетителите в клиенти",
        service_social: "Управление на социални мрежи",
        service_social_desc: "Професионално създаване и управление на съдържание във всички платформи",
        service_video: "Създаване на видео съдържание",
        service_video_desc: "Висококачествени видеа, които ангажират и конвертират вашата аудитория",
        service_seo: "SEO оптимизация",
        service_seo_desc: "Бъдете намерени в Google и привлечете органичен трафик към уебсайта си",
        
        // About
        about_title: "За NextReach",
        about_subtitle: "Вашият партньор в дигиталния успех",
        about_description: "Ние помагаме на бизнеса да трансформира дигиталното си присъствие с професионални уебсайтове, управление на социални мрежи и видео съдържание.",
        about_mission: "Нашата мисия",
        about_mission_desc: "Да дадем възможност на бизнеси от всякакъв размер с достъпни, професионални дигитални решения.",
        
        // Common
        learn_more: "Научи повече",
        contact_us: "Свържи се с нас",
        get_quote: "Поискай оферта",
        view_portfolio: "Виж портфолио",
        read_more: "Прочети повече",
        book_now: "Запази сега",
        send_message: "Изпрати съобщение",
        submit: "Изпрати",
        close: "Затвори",
        back: "Назад",
        next: "Напред",
        previous: "Предишен",
        loading: "Зареждане...",
        success: "Успешно!",
        error: "Грешка",
        please_wait: "Моля изчакайте..."
    },
    es: {
        // Language Names
        lang_name: "Español",
        
        // Navigation
        nav_home: "Inicio",
        nav_services: "Servicios",
        nav_pricing: "Precios",
        nav_about: "Acerca de",
        nav_ai_assistant: "Asistente IA",
        nav_book_call: "Reservar Llamada",
        nav_login: "Iniciar Sesión",
        nav_get_started: "Comenzar",
        
        // Pricing Page
        pricing_badge: "Paquetes y Servicios",
        pricing_hero_title: "Desarrollo Web y Servicios de Marketing",
        pricing_hero_subtitle: "Soluciones digitales profesionales adaptadas a las necesidades y objetivos de su negocio.",
        
        website_title: "Desarrollo de Sitios Web",
        website_subtitle: "Creamos sitios web modernos, rápidos y responsivos adaptados a las necesidades y objetivos de su negocio.",
        
        starter_package: "Paquete Inicial",
        basic_package: "Sitio Web Básico",
        basic_subtitle: "Adecuado para pequeñas empresas",
        business_package: "Sitio Web de Negocios",
        business_subtitle: "Para marcas y empresas en crecimiento",
        premium_package: "Sitio Web Premium + Soporte",
        premium_subtitle: "Para negocios establecidos",
        
        marketing_title: "Marketing Orgánico (Redes Sociales)",
        marketing_subtitle: "Creamos contenido efectivo que atrae clientes y genera confianza en su marca.",
        
        budget_plan: "Paquete Económico",
        standard_plan: "Paquete Estándar",
        standard_subtitle: "Más Popular",
        premium_plan: "Paquete Premium",
        
        discount_title: "¡Oferta Especial!",
        prepay_discount: "10% de descuento por prepago de 3 meses",
        
        addons_title: "Servicios Adicionales",
        addon_fb_ads: "Anuncios de Facebook",
        addon_ai_videos: "Generación de Videos con IA",
        addon_report: "Informe Detallado y Estrategia de Crecimiento",
        addon_reels: "Reels con Subtítulos",
        
        cta_button: "Comenzar",
        cta_book: "Reservar Consulta Gratuita",
        cta_ready_title: "¿Listo para Comenzar?",
        cta_ready_subtitle: "¡Reserve una consulta gratuita y hablemos de su proyecto!",
        
        footer_rights: "Todos los derechos reservados.",
        footer_about: "Acerca de",
        footer_contact: "Contacto",
        footer_services: "Servicios",
        footer_pricing: "Precios",
        footer_company: "Empresa",
        footer_quick_links: "Enlaces rápidos",
        footer_description: "Empoderando negocios con soluciones digitales completas.",
        footer_book_call: "Reservar llamada",
        
        hero_badge: "Confiado por más de 50 negocios en crecimiento en todo el mundo",
        hero_title: "Su socio digital completo para",
        hero_title_gradient: "Crecimiento imparable",
        hero_subtitle: "Obtenga un sitio web profesional, presencia poderosa en redes sociales y contenido de video cinematográfico, todo diseñado por expertos y listo para lanzar en 2-6 semanas. Sin tarifas ocultas, planes de pago con 0% de interés y nuestra garantía sin riesgos.",
        hero_feature_1: "Lanzamiento en 2-6 semanas",
        hero_feature_2: "0% de interés en pagos",
        hero_feature_3: "Garantía de riesgo compartido",
        hero_cta_primary: "Reserve su consulta estratégica gratuita",
        hero_cta_secondary: "Ver precios y paquetes",
        hero_limited: "Disponibilidad limitada:",
        hero_slots: "Solo 3 espacios disponibles para proyectos este mes",
        
        // Stats Section
        stats_businesses: "Negocios transformados",
        stats_satisfaction: "Satisfacción del cliente",
        stats_delivery: "Tiempo de entrega (semanas)",
        stats_guarantee: "Garantía de devolución de dinero",
        
        // Services Preview Section
        services_preview_badge: "Lo que hacemos",
        services_preview_title: "Todo lo que necesitas para triunfar en línea",
        services_preview_subtitle: "Desde sitios web hasta redes sociales y contenido de video: manejamos todo para que puedas concentrarte en hacer crecer tu negocio.",
        service_websites_title: "Sitios web profesionales",
        service_websites_desc: "Sitios web personalizados y responsivos que convierten visitantes en clientes.",
        service_websites_price: "Desde $697",
        service_social_title: "Maestría en redes sociales",
        service_social_desc: "Perfiles completamente branded en todas las plataformas, integrados perfectamente con tu sitio web.",
        service_social_price: "Incluido",
        service_video_title: "Contenido de video atractivo",
        service_video_desc: "Videos promocionales profesionales que capturan la atención e impulsan la acción.",
        service_video_price: "Desde $1,497",
        
        // Testimonials Section
        testimonials_badge: "Historias de éxito de clientes",
        testimonials_title: "Confiado por negocios en crecimiento",
        testimonials_subtitle: "Vea por qué las empresas eligen NextReach para su transformación digital.",
        testimonial_1_text: "Nuestro nuevo sitio web se ve increíble y realmente genera clientes potenciales. Hemos visto un aumento del 340% en las reservas de consultas en solo 8 semanas.",
        testimonial_1_name: "David Martinez",
        testimonial_1_title: "Propietario de bufete de abogados, Sofía",
        testimonial_2_text: "Servicio profesional de principio a fin. La integración de redes sociales nos ha traído clientes que nunca podríamos haber alcanzado antes.",
        testimonial_2_name: "Elena Petrova",
        testimonial_2_title: "Propietaria de boutique, Plovdiv",
        testimonial_3_text: "Entregaron exactamente lo que prometieron, a tiempo y dentro del presupuesto. Nuestras reservas en línea se han duplicado desde el lanzamiento.",
        testimonial_3_name: "Stefan Ivanov",
        testimonial_3_title: "Estudio de fitness, Varna",
        start_project: "Inicie su proyecto",
        explore_services: "Explorar todos los servicios",
        
        // Services Page
        services_page_badge: "Nuestros servicios",
        services_page_title: "Todo lo que necesitas para dominar en línea",
        services_page_subtitle: "Desde sitios web profesionales hasta maestría en redes sociales y contenido de video atractivo: manejamos la tecnología para que puedas concentrarte en hacer crecer tu negocio.",
        view_packages: "Ver paquetes",
        book_consultation: "Reservar consulta",
        services_offer_title: "Soluciones digitales completas",
        services_offer_subtitle: "Todo lo que necesitas para dominar tu mercado en línea. Nosotros nos encargamos de la tecnología, tú concéntrate en hacer crecer tu negocio.",
        service_web_design_title: "Diseño de sitios web profesional",
        service_web_design_desc: "Sitios web personalizados y responsivos que convierten visitantes en clientes. Desde páginas de destino simples hasta plataformas de comercio electrónico complejas.",
        service_web_feature_1: "Diseño responsivo para móviles",
        service_web_feature_2: "Optimización SEO",
        service_web_feature_3: "Velocidades de carga rápidas",
        service_web_feature_4: "Hosting seguro incluido",
        service_social_integration_title: "Integración de redes sociales",
        service_social_integration_desc: "Perfiles de redes sociales completamente branded en todas las plataformas principales, vinculados perfectamente a tu sitio web para máximo alcance.",
        service_social_feature_1: "Configuración de perfil y branding",
        service_social_feature_2: "Estrategia de contenido",
        service_social_feature_3: "Integración multiplataforma",
        service_social_feature_4: "Seguimiento de analíticas",
        service_video_content_title: "Contenido de video profesional",
        service_video_content_desc: "Videos promocionales atractivos que cuentan tu historia y capturan la atención. Perfectos para redes sociales, sitios web y publicidad.",
        service_video_feature_1: "Edición profesional",
        service_video_feature_2: "Metraje de stock incluido",
        service_video_feature_3: "Animaciones personalizadas",
        service_video_feature_4: "Múltiples formatos",
        service_ai_features_title: "Características impulsadas por IA",
        service_ai_features_desc: "Chatbots inteligentes, respuestas automatizadas y asistentes de IA que trabajan 24/7 para capturar clientes potenciales y responder preguntas de clientes.",
        service_ai_feature_1: "Soporte al cliente 24/7",
        service_ai_feature_2: "Calificación de leads",
        service_ai_feature_3: "Reserva automatizada",
        service_ai_feature_4: "Respuestas inteligentes",
        service_marketing_seo_title: "Marketing y SEO",
        service_marketing_seo_desc: "Sé encontrado en línea con nuestras estrategias SEO integrales, configuración de Google Ads y herramientas de automatización de marketing.",
        service_marketing_feature_1: "Optimización de palabras clave",
        service_marketing_feature_2: "Configuración de Google Ads",
        service_marketing_feature_3: "Marketing por correo electrónico",
        service_marketing_feature_4: "Analítica e informes",
        service_ongoing_support_title: "Soporte continuo",
        service_ongoing_support_desc: "No desaparecemos después del lanzamiento. Obtén soporte dedicado, mantenimiento, actualizaciones y consultas estratégicas incluidas.",
        service_support_feature_1: "Soporte prioritario",
        service_support_feature_2: "Actualizaciones regulares",
        service_support_feature_3: "Monitoreo de seguridad",
        service_support_feature_4: "Sesiones estratégicas",
        
        // About Page
        about_page_badge: "Acerca de NextReach",
        about_page_title: "Su socio de transformación digital",
        about_page_subtitle: "Estamos en una misión para empoderar a cada negocio con una presencia digital completa y profesional, sin la complejidad o los altos costos.",
        about_story_badge: "Nuestra historia",
        about_story_title: "Construido por emprendedores, para emprendedores",
        about_story_p1: "NextReach nació de una visión simple: cada negocio merece una presencia digital profesional que realmente funcione. Reconocimos que las agencias tradicionales eran demasiado caras, demasiado lentas y demasiado complicadas para la mayoría de los negocios.",
        about_story_p2: "Hoy, estamos siendo pioneros en un nuevo enfoque: combinando tecnología de vanguardia con experiencia humana para entregar soluciones digitales completas en tiempo récord. Desde sitios web hasta redes sociales y contenido de video, todo entregado en 2-6 semanas con precios transparentes y planes de pago flexibles.",
        see_packages: "Ver nuestros paquetes",
        book_call: "Reservar llamada",
        about_team_title: "Equipo en rápido crecimiento",
        about_team_desc: "De 3 fundadores a un equipo dedicado de expertos en diseño, desarrollo, marketing y producción de video.",
        about_projects: "Proyectos completados",
        about_satisfaction: "Tasa de satisfacción",
        about_mission_badge: "Nuestra misión y valores",
        about_mission_title: "Lo que nos impulsa hacia adelante",
        about_mission_subtitle: "Nuestros principios fundamentales guían todo lo que hacemos.",
        about_value_1_title: "Cliente primero siempre",
        about_value_1_desc: "Tu éxito es nuestro éxito. No estamos satisfechos hasta que estés encantado con los resultados.",
        about_value_2_title: "Innovación y excelencia",
        about_value_2_desc: "Nos mantenemos a la vanguardia de las tendencias para ofrecer soluciones de vanguardia que generen resultados reales.",
        about_value_3_title: "Transparencia y confianza",
        about_value_3_desc: "Precios claros, plazos honestos y comunicación abierta en cada paso del camino.",
        about_value_4_title: "Velocidad y calidad",
        about_value_4_desc: "Entrega rápida sin comprometer la calidad. Nos movemos rápido porque tu tiempo importa.",
        about_value_5_title: "Mentalidad de asociación",
        about_value_5_desc: "No somos solo un proveedor, somos su socio a largo plazo en crecimiento y éxito.",
        about_value_6_title: "Resultados probados",
        about_value_6_desc: "Estrategias basadas en datos respaldadas por historias de éxito reales de negocios como el tuyo.",
        about_why_badge: "Por qué elegir NextReach",
        about_why_title: "La ventaja de NextReach",
        about_why_subtitle: "Lo que nos diferencia de las agencias de marketing tradicionales y los freelancers.",
        
        // Booking Page
        booking_page_title: "Reserve su consulta estratégica gratuita",
        booking_page_subtitle: "Hablemos de sus objetivos digitales y creemos un plan personalizado para su negocio.",
        booking_trust_1: "Tiempo de respuesta",
        booking_trust_2: "Tasa de satisfacción",
        booking_trust_3: "Proyectos activos",
        booking_form_title: "Programe su llamada",
        booking_form_subtitle: "Elija un horario que le funcione mejor. Discutiremos sus objetivos y le mostraremos exactamente cómo podemos ayudar.",
        booking_what_title: "Qué esperar",
        booking_what_subtitle: "Esto es lo que cubriremos en nuestra llamada:",
        booking_expect_1: "Sus objetivos empresariales",
        booking_expect_1_desc: "Aprenderemos sobre su visión y objetivos.",
        booking_expect_2: "Desafíos actuales",
        booking_expect_2_desc: "Identificar qué te está frenando en línea.",
        booking_expect_3: "Estrategia personalizada",
        booking_expect_3_desc: "Obtenga una hoja de ruta personalizada para el éxito.",
        booking_expect_4: "Precios transparentes",
        booking_expect_4_desc: "Costos claros con opciones de pago flexibles.",
        no_obligation: "Sin obligación, sin presión, solo soluciones reales.",
        
        // Support Page
        support_page_title: "Estamos aquí para ayudar",
        support_page_subtitle: "Obtenga respuestas a sus preguntas o comuníquese directamente para obtener soporte personalizado.",
        support_contact_title: "Contáctenos directamente",
        support_contact_subtitle: "¿Prefieres comunicarte? Estamos aquí para ti.",
        support_email: "Envíanos un correo electrónico",
        support_response: "Tiempo de respuesta de 24 horas",
        support_faq_title: "Preguntas frecuentes",
        support_faq_subtitle: "Respuestas rápidas a preguntas comunes.",
        
        // AI Assistant Page
        ai_page_title: "Su asistente empresarial impulsado por IA",
        ai_page_subtitle: "Obtenga respuestas instantáneas a sus preguntas sobre nuestros servicios, precios y cómo podemos ayudar a su negocio a crecer.",
        ai_chat_title: "Chatea con nuestro asistente de IA",
        ai_chat_subtitle: "Pregúnte cualquier cosa sobre nuestros servicios, precios o proceso. Obtenga respuestas instantáneas y precisas 24/7.",
        
        features_title: "¿Por qué elegir NextReach?",
        features_subtitle: "Todo lo que necesitas para dominar tu presencia digital",
        feature_complete: "Paquete completo",
        feature_complete_desc: "Sitio web, redes sociales y contenido de video, todo en un solo lugar",
        feature_fast: "Entrega rápida",
        feature_fast_desc: "Lanza tu presencia digital completa en 2-6 semanas",
        feature_support: "Soporte continuo",
        feature_support_desc: "Estamos contigo en cada paso del camino",
        
        cta_badge: "OFERTA POR TIEMPO LIMITADO",
        cta_title: "¿Listo para transformar su negocio?",
        cta_subtitle: "Únase a más de 50 negocios exitosos que han lanzado su presencia digital completa con NextReach. Comience en 2-6 semanas con planes de pago al 0% de interés.",
        cta_satisfaction: "100% satisfacción",
        cta_satisfaction_sub: "Garantía de devolución",
        cta_delivery: "Entrega en 2-6 semanas",
        cta_delivery_sub: "Lanzamiento rápido",
        cta_interest: "0% de interés",
        cta_interest_sub: "Planes de pago",
        cta_pricing: "Ver precios y comenzar",
        cta_strategy: "Reservar llamada estratégica gratuita",
        cta_disclaimer: "No se requiere tarjeta de crédito • Cancele en cualquier momento • Garantía sin riesgo",
        
        services_title: "Nuestros servicios",
        services_subtitle: "Soluciones digitales completas para su negocio",
        service_web_dev: "Desarrollo web",
        service_web_desc: "Sitios web modernos y responsivos que convierten visitantes en clientes",
        service_social: "Gestión de redes sociales",
        service_social_desc: "Creación y gestión profesional de contenido en todas las plataformas",
        service_video: "Creación de contenido de video",
        service_video_desc: "Videos de alta calidad que enganchan y convierten a su audiencia",
        service_seo: "Optimización SEO",
        service_seo_desc: "Sea encontrado en Google y atraiga tráfico orgánico a su sitio web",
        
        about_title: "Acerca de NextReach",
        about_subtitle: "Su socio en el éxito digital",
        about_description: "Ayudamos a las empresas a transformar su presencia digital con sitios web profesionales, gestión de redes sociales y contenido de video.",
        about_mission: "Nuestra misión",
        about_mission_desc: "Empoderar a empresas de todos los tamaños con soluciones digitales profesionales y asequibles.",
        
        learn_more: "Saber más",
        contact_us: "Contáctenos",
        get_quote: "Obtener cotización",
        view_portfolio: "Ver portafolio",
        read_more: "Leer más",
        book_now: "Reservar ahora",
        send_message: "Enviar mensaje",
        submit: "Enviar",
        close: "Cerrar",
        back: "Atrás",
        next: "Siguiente",
        previous: "Anterior",
        loading: "Cargando...",
        success: "¡Éxito!",
        error: "Error",
        please_wait: "Por favor espere..."
    },
    de: {
        // Language Names
        lang_name: "Deutsch",
        
        // Navigation
        nav_home: "Startseite",
        nav_services: "Dienstleistungen",
        nav_pricing: "Preise",
        nav_about: "Über uns",
        nav_ai_assistant: "KI-Assistent",
        nav_book_call: "Termin buchen",
        nav_login: "Anmelden",
        nav_get_started: "Loslegen",
        
        // Pricing Page
        pricing_badge: "Pakete & Dienstleistungen",
        pricing_hero_title: "Webentwicklung & Marketing-Dienstleistungen",
        pricing_hero_subtitle: "Professionelle digitale Lösungen, die auf Ihre Geschäftsbedürfnisse zugeschnitten sind.",
        
        website_title: "Webentwicklung",
        website_subtitle: "Wir erstellen moderne, schnelle und responsive Websites, die auf die Bedürfnisse Ihres Unternehmens zugeschnitten sind.",
        
        starter_package: "Starter-Paket",
        basic_package: "Basis-Website",
        basic_subtitle: "Geeignet für kleine Unternehmen",
        business_package: "Business-Website",
        business_subtitle: "Für wachsende Marken und Unternehmen",
        premium_package: "Premium-Website + Support",
        premium_subtitle: "Für etablierte Unternehmen",
        
        marketing_title: "Organisches Marketing (Social Media)",
        marketing_subtitle: "Wir erstellen effektive Inhalte, die Kunden anziehen und Vertrauen in Ihre Marke aufbauen.",
        
        budget_plan: "Budget-Paket",
        standard_plan: "Standard-Paket",
        standard_subtitle: "Am Beliebtesten",
        premium_plan: "Premium-Paket",
        
        discount_title: "Sonderangebot!",
        prepay_discount: "10% Rabatt bei 3-Monats-Vorauszahlung",
        
        addons_title: "Zusätzliche Dienstleistungen",
        addon_fb_ads: "Facebook-Anzeigen",
        addon_ai_videos: "KI-Videogenerierung",
        addon_report: "Detaillierter Bericht & Wachstumsstrategie",
        addon_reels: "Reels mit Untertiteln",
        
        cta_button: "Loslegen",
        cta_book: "Kostenlose Beratung buchen",
        cta_ready_title: "Bereit zu starten?",
        cta_ready_subtitle: "Buchen Sie eine kostenlose Beratung und lassen Sie uns über Ihr Projekt sprechen!",
        
        footer_rights: "Alle Rechte vorbehalten.",
        footer_about: "Über uns",
        footer_contact: "Kontakt",
        footer_services: "Dienstleistungen",
        footer_pricing: "Preise",
        footer_company: "Unternehmen",
        footer_quick_links: "Schnelllinks",
        footer_description: "Unternehmen mit vollständigen digitalen Lösungen stärken.",
        footer_book_call: "Termin buchen",
        
        hero_badge: "Vertraut von über 50 wachsenden Unternehmen weltweit",
        hero_title: "Ihr kompletter digitaler Partner für",
        hero_title_gradient: "Unaufhaltsames Wachstum",
        hero_subtitle: "Erhalten Sie eine professionelle Website, starke Social-Media-Präsenz und kinoreife Videoinhalte – alles fachkundig erstellt und startbereit in 2-6 Wochen. Keine versteckten Gebühren, 0% Zinsen auf Ratenzahlung und unsere risikofreie Garantie.",
        hero_feature_1: "Start in 2-6 Wochen",
        hero_feature_2: "0% Zinsen auf Zahlungen",
        hero_feature_3: "Risikoteilungsgarantie",
        hero_cta_primary: "Buchen Sie Ihr kostenloses Strategiegespräch",
        hero_cta_secondary: "Preise und Pakete ansehen",
        hero_limited: "Begrenzte Verfügbarkeit:",
        hero_slots: "Nur noch 3 Projektplätze verfügbar in diesem Monat",
        
        // Stats Section
        stats_businesses: "Transformierte Unternehmen",
        stats_satisfaction: "Kundenzufriedenheit",
        stats_delivery: "Lieferzeit (Wochen)",
        stats_guarantee: "Geld-zurück-Garantie",
        
        // Services Preview Section
        services_preview_badge: "Was wir tun",
        services_preview_title: "Alles, was Sie für Online-Erfolg brauchen",
        services_preview_subtitle: "Von Websites über soziale Medien bis hin zu Videoinhalten – wir kümmern uns um alles, damit Sie sich auf das Wachstum Ihres Unternehmens konzentrieren können.",
        service_websites_title: "Professionelle Websites",
        service_websites_desc: "Maßgeschneiderte, mobilfreundliche Websites, die Besucher in Kunden verwandeln.",
        service_websites_price: "Ab $697",
        service_social_title: "Social-Media-Expertise",
        service_social_desc: "Vollständig gebrandete Profile auf allen Plattformen, nahtlos integriert mit Ihrer Website.",
        service_social_price: "Inklusive",
        service_video_title: "Ansprechende Videoinhalte",
        service_video_desc: "Professionelle Werbevideos, die Aufmerksamkeit erregen und zum Handeln anregen.",
        service_video_price: "Ab $1,497",
        
        // Testimonials Section
        testimonials_badge: "Erfolgsgeschichten von Kunden",
        testimonials_title: "Vertraut von wachsenden Unternehmen",
        testimonials_subtitle: "Sehen Sie, warum Unternehmen NextReach für ihre digitale Transformation wählen.",
        testimonial_1_text: "Unsere neue Website sieht unglaublich aus und generiert tatsächlich Leads. Wir haben in nur 8 Wochen einen Anstieg der Beratungsbuchungen um 340% gesehen.",
        testimonial_1_name: "David Martinez",
        testimonial_1_title: "Inhaber einer Anwaltskanzlei, Sofia",
        testimonial_2_text: "Professioneller Service von Anfang bis Ende. Die Social-Media-Integration hat uns Kunden gebracht, die wir vorher nie hätten erreichen können.",
        testimonial_2_name: "Elena Petrova",
        testimonial_2_title: "Boutique-Inhaberin, Plovdiv",
        testimonial_3_text: "Sie haben genau das geliefert, was sie versprochen haben, pünktlich und im Budget. Unsere Online-Buchungen haben sich seit dem Start verdoppelt.",
        testimonial_3_name: "Stefan Ivanov",
        testimonial_3_title: "Fitnessstudio, Varna",
        start_project: "Starten Sie Ihr Projekt",
        explore_services: "Alle Dienste erkunden",
        
        // Services Page
        services_page_badge: "Unsere Dienstleistungen",
        services_page_title: "Alles, was Sie brauchen, um online zu dominieren",
        services_page_subtitle: "Von professionellen Websites über Social-Media-Expertise bis hin zu ansprechenden Videoinhalten – wir kümmern uns um die Technik, damit Sie sich auf das Wachstum Ihres Unternehmens konzentrieren können.",
        view_packages: "Pakete ansehen",
        book_consultation: "Beratung buchen",
        services_offer_title: "Vollständige digitale Lösungen",
        services_offer_subtitle: "Alles, was Sie brauchen, um Ihren Markt online zu dominieren. Wir kümmern uns um die Technik, Sie konzentrieren sich auf das Wachstum Ihres Unternehmens.",
        service_web_design_title: "Professionelles Website-Design",
        service_web_design_desc: "Maßgeschneiderte, mobilfreundliche Websites, die Besucher in Kunden verwandeln. Von einfachen Landing Pages bis zu komplexen E-Commerce-Plattformen.",
        service_web_feature_1: "Mobilfreundliches Design",
        service_web_feature_2: "SEO-Optimierung",
        service_web_feature_3: "Schnelle Ladegeschwindigkeiten",
        service_web_feature_4: "Sicheres Hosting inklusive",
        service_social_integration_title: "Social-Media-Integration",
        service_social_integration_desc: "Vollständig gebrandete Social-Media-Profile auf allen wichtigen Plattformen, nahtlos mit Ihrer Website verbunden für maximale Reichweite.",
        service_social_feature_1: "Profil-Setup & Branding",
        service_social_feature_2: "Content-Strategie",
        service_social_feature_3: "Plattformübergreifende Integration",
        service_social_feature_4: "Analytics-Tracking",
        service_video_content_title: "Professioneller Videoinhalt",
        service_video_content_desc: "Ansprechende Promo-Videos, die Ihre Geschichte erzählen und Aufmerksamkeit erregen. Perfekt für soziale Medien, Websites und Werbung.",
        service_video_feature_1: "Professionelle Bearbeitung",
        service_video_feature_2: "Stock-Material inklusive",
        service_video_feature_3: "Benutzerdefinierte Animationen",
        service_video_feature_4: "Mehrere Formate",
        service_ai_features_title: "KI-gestützte Funktionen",
        service_ai_features_desc: "Intelligente Chatbots, automatisierte Antworten und KI-Assistenten, die rund um die Uhr arbeiten, um Leads zu erfassen und Kundenfragen zu beantworten.",
        service_ai_feature_1: "24/7 Kundensupport",
        service_ai_feature_2: "Lead-Qualifizierung",
        service_ai_feature_3: "Automatisierte Buchung",
        service_ai_feature_4: "Intelligente Antworten",
        service_marketing_seo_title: "Marketing & SEO",
        service_marketing_seo_desc: "Werden Sie online gefunden mit unseren umfassenden SEO-Strategien, Google Ads-Setup und Marketing-Automatisierungstools.",
        service_marketing_feature_1: "Keyword-Optimierung",
        service_marketing_feature_2: "Google Ads-Einrichtung",
        service_marketing_feature_3: "E-Mail-Marketing",
        service_marketing_feature_4: "Analytics & Reporting",
        service_ongoing_support_title: "Laufende Unterstützung",
        service_ongoing_support_desc: "Wir verschwinden nicht nach dem Start. Erhalten Sie dedizierten Support, Wartung, Updates und strategische Beratungen inklusive.",
        service_support_feature_1: "Priority-Support",
        service_support_feature_2: "Regelmäßige Updates",
        service_support_feature_3: "Sicherheitsüberwachung",
        service_support_feature_4: "Strategie-Sitzungen",
        
        // About Page
        about_page_badge: "Über NextReach",
        about_page_title: "Ihr Partner für digitale Transformation",
        about_page_subtitle: "Unsere Mission ist es, jedem Unternehmen eine vollständige, professionelle digitale Präsenz zu ermöglichen – ohne Komplexität oder hohe Kosten.",
        about_story_badge: "Unsere Geschichte",
        about_story_title: "Von Unternehmern für Unternehmer gebaut",
        about_story_p1: "NextReach wurde aus einer einfachen Vision geboren: Jedes Unternehmen verdient eine professionelle digitale Präsenz, die wirklich funktioniert. Wir erkannten, dass traditionelle Agenturen zu teuer, zu langsam und zu kompliziert für die meisten Unternehmen waren.",
        about_story_p2: "Heute gehen wir einen neuen Weg – wir kombinieren modernste Technologie mit menschlicher Expertise, um vollständige digitale Lösungen in Rekordzeit zu liefern. Von Websites über soziale Medien bis hin zu Videoinhalten, alles in 2-6 Wochen mit transparenten Preisen und flexiblen Zahlungsplänen geliefert.",
        see_packages: "Unsere Pakete ansehen",
        book_call: "Anruf buchen",
        about_team_title: "Schnell wachsendes Team",
        about_team_desc: "Von 3 Gründern zu einem engagierten Team von Experten in Design, Entwicklung, Marketing und Videoproduktion.",
        about_projects: "Abgeschlossene Projekte",
        about_satisfaction: "Zufriedenheitsrate",
        about_mission_badge: "Unsere Mission und Werte",
        about_mission_title: "Was uns antreibt",
        about_mission_subtitle: "Unsere Grundprinzipien leiten alles, was wir tun.",
        about_value_1_title: "Kunde immer zuerst",
        about_value_1_desc: "Ihr Erfolg ist unser Erfolg. Wir sind nicht zufrieden, bis Sie begeistert sind von den Ergebnissen.",
        about_value_2_title: "Innovation und Exzellenz",
        about_value_2_desc: "Wir bleiben immer auf dem neuesten Stand der Trends, um innovative Lösungen zu liefern, die echte Ergebnisse erzielen.",
        about_value_3_title: "Transparenz und Vertrauen",
        about_value_3_desc: "Klare Preise, ehrliche Zeitpläne und offene Kommunikation bei jedem Schritt.",
        about_value_4_title: "Geschwindigkeit und Qualität",
        about_value_4_desc: "Schnelle Lieferung ohne Kompromisse bei der Qualität. Wir arbeiten schnell, weil Ihre Zeit zählt.",
        about_value_5_title: "Partnerschaftsmentalität",
        about_value_5_desc: "Wir sind nicht nur ein Anbieter – wir sind Ihr langfristiger Partner für Wachstum und Erfolg.",
        about_value_6_title: "Bewiesene Ergebnisse",
        about_value_6_desc: "Datengesteuerte Strategien, unterstützt durch echte Erfolgsgeschichten von Unternehmen wie Ihrem.",
        about_why_badge: "Warum NextReach wählen",
        about_why_title: "Der NextReach-Vorteil",
        about_why_subtitle: "Was uns von traditionellen Marketingagenturen und Freelancern unterscheidet.",
        
        // Booking Page
        booking_page_title: "Buchen Sie Ihr kostenloses Strategiegespräch",
        booking_page_subtitle: "Lassen Sie uns über Ihre digitalen Ziele sprechen und einen maßgeschneiderten Plan für Ihr Unternehmen erstellen.",
        booking_trust_1: "Antwortzeit",
        booking_trust_2: "Zufriedenheitsrate",
        booking_trust_3: "Aktive Projekte",
        booking_form_title: "Planen Sie Ihren Anruf",
        booking_form_subtitle: "Wählen Sie eine Zeit, die für Sie am besten funktioniert. Wir besprechen Ihre Ziele und zeigen Ihnen genau, wie wir helfen können.",
        booking_what_title: "Was Sie erwarten können",
        booking_what_subtitle: "Das werden wir in unserem Gespräch behandeln:",
        booking_expect_1: "Ihre Geschäftsziele",
        booking_expect_1_desc: "Wir lernen Ihre Vision und Ziele kennen.",
        booking_expect_2: "Aktuelle Herausforderungen",
        booking_expect_2_desc: "Identifizieren Sie, was Sie online zurükhält.",
        booking_expect_3: "Maßgeschneiderte Strategie",
        booking_expect_3_desc: "Erhalten Sie eine personalisierte Roadmap zum Erfolg.",
        booking_expect_4: "Transparente Preise",
        booking_expect_4_desc: "Klare Kosten mit flexiblen Zahlungsoptionen.",
        no_obligation: "Keine Verpflichtung, kein Druck – nur echte Lösungen.",
        
        // Support Page
        support_page_title: "Wir sind hier, um zu helfen",
        support_page_subtitle: "Erhalten Sie Antworten auf Ihre Fragen oder kontaktieren Sie uns direkt für personalisierten Support.",
        support_contact_title: "Kontaktieren Sie uns direkt",
        support_contact_subtitle: "Möchten Sie sich lieber melden? Wir sind für Sie da.",
        support_email: "Senden Sie uns eine E-Mail",
        support_response: "24-Stunden-Antwortzeit",
        support_faq_title: "Häufig gestellte Fragen",
        support_faq_subtitle: "Schnelle Antworten auf häufige Fragen.",
        
        // AI Assistant Page
        ai_page_title: "Ihr KI-gesteuerter Geschäftsassistent",
        ai_page_subtitle: "Erhalten Sie sofortige Antworten auf Ihre Fragen zu unseren Dienstleistungen, Preisen und wie wir Ihrem Unternehmen beim Wachstum helfen können.",
        ai_chat_title: "Chatten Sie mit unserem KI-Assistenten",
        ai_chat_subtitle: "Fragen Sie alles über unsere Dienstleistungen, Preise oder Prozesse. Erhalten Sie sofortige, präzise Antworten rund um die Uhr.",
        
        features_title: "Warum NextReach wählen?",
        features_subtitle: "Alles, was Sie brauchen, um Ihre digitale Präsenz zu dominieren",
        feature_complete: "Komplettpaket",
        feature_complete_desc: "Website, soziale Medien und Videoinhalte - alles an einem Ort",
        feature_fast: "Schnelle Lieferung",
        feature_fast_desc: "Starten Sie Ihre vollständige digitale Präsenz in 2-6 Wochen",
        feature_support: "Laufende Unterstützung",
        feature_support_desc: "Wir sind bei jedem Schritt an Ihrer Seite",
        
        cta_badge: "ZEITLICH BEGRENZTES ANGEBOT",
        cta_title: "Bereit, Ihr Geschäft zu transformieren?",
        cta_subtitle: "Schließen Sie sich über 50 erfolgreichen Unternehmen an, die ihre vollständige digitale Präsenz mit NextReach gestartet haben. Beginnen Sie in 2-6 Wochen mit 0% Zinsen.",
        cta_satisfaction: "100% Zufriedenheit",
        cta_satisfaction_sub: "Geld-zurück-Garantie",
        cta_delivery: "2-6 Wochen Lieferung",
        cta_delivery_sub: "Schneller Start",
        cta_interest: "0% Zinsen",
        cta_interest_sub: "Zahlungspläne",
        cta_pricing: "Preise ansehen und beginnen",
        cta_strategy: "Kostenloses Strategiegespräch buchen",
        cta_disclaimer: "Keine Kreditkarte erforderlich • Jederzeit kündbar • Risikofreie Garantie",
        
        services_title: "Unsere Dienstleistungen",
        services_subtitle: "Vollständige digitale Lösungen für Ihr Unternehmen",
        service_web_dev: "Webentwicklung",
        service_web_desc: "Moderne, responsive Websites, die Besucher in Kunden verwandeln",
        service_social: "Social-Media-Management",
        service_social_desc: "Professionelle Inhaltserstellung und -verwaltung auf allen Plattformen",
        service_video: "Videoinhaltserstellung",
        service_video_desc: "Hochwertige Videos, die Ihr Publikum ansprechen und konvertieren",
        service_seo: "SEO-Optimierung",
        service_seo_desc: "Werden Sie auf Google gefunden und ziehen Sie organischen Traffic auf Ihre Website",
        
        about_title: "Über NextReach",
        about_subtitle: "Ihr Partner für digitalen Erfolg",
        about_description: "Wir helfen Unternehmen, ihre digitale Präsenz mit professionellen Websites, Social-Media-Management und Videoinhalten zu transformieren.",
        about_mission: "Unsere Mission",
        about_mission_desc: "Unternehmen jeder Größe mit erschwinglichen, professionellen digitalen Lösungen zu stärken.",
        
        learn_more: "Mehr erfahren",
        contact_us: "Kontaktieren Sie uns",
        get_quote: "Angebot erhalten",
        view_portfolio: "Portfolio ansehen",
        read_more: "Mehr lesen",
        book_now: "Jetzt buchen",
        send_message: "Nachricht senden",
        submit: "Absenden",
        close: "Schließen",
        back: "Zurück",
        next: "Weiter",
        previous: "Vorherige",
        loading: "Wird geladen...",
        success: "Erfolg!",
        error: "Fehler",
        please_wait: "Bitte warten..."
    },
    fr: {
        // Language Names
        lang_name: "Français",
        
        // Navigation
        nav_home: "Accueil",
        nav_services: "Services",
        nav_pricing: "Tarifs",
        nav_about: "À propos",
        nav_ai_assistant: "Assistant IA",
        nav_book_call: "Réserver un appel",
        nav_login: "Connexion",
        nav_get_started: "Commencer",
        
        // Pricing Page
        pricing_badge: "Forfaits et Services",
        pricing_hero_title: "Développement Web et Services Marketing",
        pricing_hero_subtitle: "Solutions numériques professionnelles adaptées aux besoins et objectifs de votre entreprise.",
        
        website_title: "Développement de Sites Web",
        website_subtitle: "Nous créons des sites web modernes, rapides et réactifs adaptés aux besoins de votre entreprise.",
        
        starter_package: "Forfait Démarrage",
        basic_package: "Site Web Basique",
        basic_subtitle: "Convient aux petites entreprises",
        business_package: "Site Web Business",
        business_subtitle: "Pour les marques et entreprises en croissance",
        premium_package: "Site Web Premium + Support",
        premium_subtitle: "Pour les entreprises établies",
        
        marketing_title: "Marketing Organique (Médias Sociaux)",
        marketing_subtitle: "Nous créons du contenu efficace qui attire les clients et renforce la confiance en votre marque.",
        
        budget_plan: "Forfait Budget",
        standard_plan: "Forfait Standard",
        standard_subtitle: "Le Plus Populaire",
        premium_plan: "Forfait Premium",
        
        discount_title: "Offre Spéciale!",
        prepay_discount: "10% de réduction pour un prépaiement de 3 mois",
        
        addons_title: "Services Supplémentaires",
        addon_fb_ads: "Publicités Facebook",
        addon_ai_videos: "Génération de Vidéos par IA",
        addon_report: "Rapport Détaillé et Stratégie de Croissance",
        addon_reels: "Reels avec Sous-titres",
        
        cta_button: "Commencer",
        cta_book: "Réserver une Consultation Gratuite",
        cta_ready_title: "Prêt à Commencer?",
        cta_ready_subtitle: "Réservez une consultation gratuite et discutons de votre projet!",
        
        footer_rights: "Tous droits réservés.",
        footer_about: "À propos",
        footer_contact: "Contact",
        footer_services: "Services",
        footer_pricing: "Tarifs",
        footer_company: "Entreprise",
        footer_quick_links: "Liens rapides",
        footer_description: "Donner aux entreprises des solutions numériques complètes.",
        footer_book_call: "Réserver un appel",
        
        hero_badge: "Approuvé par plus de 50 entreprises en croissance dans le monde",
        hero_title: "Votre partenaire numérique complet pour",
        hero_title_gradient: "Croissance imparable",
        hero_subtitle: "Obtenez un site web professionnel, une présence puissante sur les réseaux sociaux et du contenu vidéo cinématographique - le tout créé par des experts et prêt à être lancé en 2-6 semaines. Aucun frais caché, plans de paiement à 0% d'intérêt et notre garantie sans risque.",
        hero_feature_1: "Lancement en 2-6 semaines",
        hero_feature_2: "0% d'intérêt sur les paiements",
        hero_feature_3: "Garantie de partage des risques",
        hero_cta_primary: "Réservez votre consultation stratégique gratuite",
        hero_cta_secondary: "Voir les tarifs et forfaits",
        hero_limited: "Disponibilité limitée:",
        hero_slots: "Seulement 3 places disponibles pour les projets ce mois-ci",
        
        // Stats Section
        stats_businesses: "Entreprises transformées",
        stats_satisfaction: "Satisfaction client",
        stats_delivery: "Délai de livraison (semaines)",
        stats_guarantee: "Garantie de remboursement",
        
        // Services Preview Section
        services_preview_badge: "Ce que nous faisons",
        services_preview_title: "Tout ce dont vous avez besoin pour réussir en ligne",
        services_preview_subtitle: "Des sites web aux médias sociaux en passant par le contenu vidéo - nous gérons tout pour que vous puissiez vous concentrer sur la croissance de votre entreprise.",
        service_websites_title: "Sites web professionnels",
        service_websites_desc: "Sites web personnalisés et responsives qui convertissent les visiteurs en clients.",
        service_websites_price: "À partir de 697 $",
        service_social_title: "Maîtrise des médias sociaux",
        service_social_desc: "Profils entièrement brandés sur toutes les plateformes, intégrés de manière transparente avec votre site web.",
        service_social_price: "Inclus",
        service_video_title: "Contenu vidéo engageant",
        service_video_desc: "Vidéos promotionnelles professionnelles qui captent l'attention et incitent à l'action.",
        service_video_price: "À partir de 1 497 $",
        
        // Testimonials Section
        testimonials_badge: "Témoignages de réussite clients",
        testimonials_title: "Approuvé par des entreprises en croissance",
        testimonials_subtitle: "Découvrez pourquoi les entreprises choisissent NextReach pour leur transformation numérique.",
        testimonial_1_text: "Notre nouveau site web est incroyable et génère réellement des prospects. Nous avons constaté une augmentation de 340% des réservations de consultations en seulement 8 semaines.",
        testimonial_1_name: "David Martinez",
        testimonial_1_title: "Propriétaire de cabinet d'avocats, Sofia",
        testimonial_2_text: "Service professionnel du début à la fin. L'intégration des médias sociaux nous a apporté des clients que nous n'aurions jamais pu atteindre auparavant.",
        testimonial_2_name: "Elena Petrova",
        testimonial_2_title: "Propriétaire de boutique, Plovdiv",
        testimonial_3_text: "Ils ont livré exactement ce qu'ils avaient promis, à temps et dans le budget. Nos réservations en ligne ont doublé depuis le lancement.",
        testimonial_3_name: "Stefan Ivanov",
        testimonial_3_title: "Studio de fitness, Varna",
        start_project: "Démarrez votre projet",
        explore_services: "Explorer tous les services",
        
        // Services Page
        services_page_badge: "Nos services",
        services_page_title: "Tout ce dont vous avez besoin pour dominer en ligne",
        services_page_subtitle: "Des sites web professionnels à la maîtrise des médias sociaux en passant par du contenu vidéo engageant — nous nous occupons de la technologie pour que vous puissiez vous concentrer sur la croissance de votre entreprise.",
        view_packages: "Voir les forfaits",
        book_consultation: "Réserver une consultation",
        services_offer_title: "Solutions numériques complètes",
        services_offer_subtitle: "Tout ce dont vous avez besoin pour dominer votre marché en ligne. Nous nous occupons de la technologie, vous vous concentrez sur la croissance de votre entreprise.",
        service_web_design_title: "Conception de sites web professionnels",
        service_web_design_desc: "Sites web personnalisés et responsives qui convertissent les visiteurs en clients. Des pages de destination simples aux plateformes de commerce électronique complexes.",
        service_web_feature_1: "Design responsive mobile",
        service_web_feature_2: "Optimisation SEO",
        service_web_feature_3: "Vitesses de chargement rapides",
        service_web_feature_4: "Hébergement sécurisé inclus",
        service_social_integration_title: "Intégration des médias sociaux",
        service_social_integration_desc: "Profils de médias sociaux entièrement brandés sur toutes les principales plateformes, liés de manière transparente à votre site web pour une portée maximale.",
        service_social_feature_1: "Configuration de profil et branding",
        service_social_feature_2: "Stratégie de contenu",
        service_social_feature_3: "Intégration multi-plateformes",
        service_social_feature_4: "Suivi des analyses",
        service_video_content_title: "Contenu vidéo professionnel",
        service_video_content_desc: "Vidéos promotionnelles engageantes qui racontent votre histoire et captent l'attention. Parfaites pour les médias sociaux, les sites web et la publicité.",
        service_video_feature_1: "Montage professionnel",
        service_video_feature_2: "Métrages stock inclus",
        service_video_feature_3: "Animations personnalisées",
        service_video_feature_4: "Formats multiples",
        service_ai_features_title: "Fonctionnalités alimentées par l'IA",
        service_ai_features_desc: "Chatbots intelligents, réponses automatisées et assistants IA qui travaillent 24h/24 et 7j/7 pour capturer des leads et répondre aux questions des clients.",
        service_ai_feature_1: "Support client 24/7",
        service_ai_feature_2: "Qualification des leads",
        service_ai_feature_3: "Réservation automatisée",
        service_ai_feature_4: "Réponses intelligentes",
        service_marketing_seo_title: "Marketing et SEO",
        service_marketing_seo_desc: "Soyez trouvé en ligne avec nos stratégies SEO complètes, configuration Google Ads et outils d'automatisation marketing.",
        service_marketing_feature_1: "Optimisation des mots-clés",
        service_marketing_feature_2: "Configuration Google Ads",
        service_marketing_feature_3: "Marketing par e-mail",
        service_marketing_feature_4: "Analytique et rapports",
        service_ongoing_support_title: "Support continu",
        service_ongoing_support_desc: "Nous ne disparaissons pas après le lancement. Obtenez un support dédié, une maintenance, des mises à jour et des consultations stratégiques incluses.",
        service_support_feature_1: "Support prioritaire",
        service_support_feature_2: "Mises à jour régulières",
        service_support_feature_3: "Surveillance de la sécurité",
        service_support_feature_4: "Sessions stratégiques",
        
        // About Page
        about_page_badge: "À propos de NextReach",
        about_page_title: "Votre partenaire de transformation numérique",
        about_page_subtitle: "Notre mission est de donner à chaque entreprise une présence numérique complète et professionnelle, sans la complexité ou les coûts élevés.",
        about_story_badge: "Notre histoire",
        about_story_title: "Construit par des entrepreneurs, pour des entrepreneurs",
        about_story_p1: "NextReach est né d'une vision simple : chaque entreprise mérite une présence numérique professionnelle qui fonctionne vraiment. Nous avons reconnu que les agences traditionnelles étaient trop chères, trop lentes et trop compliquées pour la plupart des entreprises.",
        about_story_p2: "Aujourd'hui, nous pionnières d'une nouvelle approche — en combinant une technologie de pointe avec une expertise humaine pour fournir des solutions numériques complètes en un temps record. Des sites web aux médias sociaux en passant par le contenu vidéo, le tout livré en 2-6 semaines avec des prix transparents et des plans de paiement flexibles.",
        see_packages: "Voir nos forfaits",
        book_call: "Réserver un appel",
        about_team_title: "Équipe en croissance rapide",
        about_team_desc: "De 3 fondateurs à une équipe dédiée d'experts en design, développement, marketing et production vidéo.",
        about_projects: "Projets réalisés",
        about_satisfaction: "Taux de satisfaction",
        about_mission_badge: "Notre mission et nos valeurs",
        about_mission_title: "Ce qui nous pousse vers l'avant",
        about_mission_subtitle: "Nos principes fondamentaux guident tout ce que nous faisons.",
        about_value_1_title: "Le client d'abord toujours",
        about_value_1_desc: "Votre succès est notre succès. Nous ne sommes pas satisfaits tant que vous n'êtes pas ravi des résultats.",
        about_value_2_title: "Innovation et excellence",
        about_value_2_desc: "Nous restons à la pointe des tendances pour offrir des solutions innovantes qui génèrent de vrais résultats.",
        about_value_3_title: "Transparence et confiance",
        about_value_3_desc: "Prix clairs, délais honnêtes et communication ouverte à chaque étape.",
        about_value_4_title: "Vitesse et qualité",
        about_value_4_desc: "Livraison rapide sans compromis sur la qualité. Nous agissons vite parce que votre temps compte.",
        about_value_5_title: "Mentalité de partenariat",
        about_value_5_desc: "Nous ne sommes pas qu'un fournisseur – nous sommes votre partenaire à long terme pour la croissance et le succès.",
        about_value_6_title: "Résultats prouvés",
        about_value_6_desc: "Stratégies basées sur les données soutenues par de véritables histoires de succès d'entreprises comme la vôtre.",
        about_why_badge: "Pourquoi choisir NextReach",
        about_why_title: "L'avantage NextReach",
        about_why_subtitle: "Ce qui nous distingue des agences de marketing traditionnelles et des freelances.",
        
        // Booking Page
        booking_page_title: "Réservez votre consultation stratégique gratuite",
        booking_page_subtitle: "Discutons de vos objectifs numériques et créons un plan personnalisé pour votre entreprise.",
        booking_trust_1: "Temps de réponse",
        booking_trust_2: "Taux de satisfaction",
        booking_trust_3: "Projets actifs",
        booking_form_title: "Planifiez votre appel",
        booking_form_subtitle: "Choisissez un horaire qui vous convient le mieux. Nous discuterons de vos objectifs et vous montrerons exactement comment nous pouvons vous aider.",
        booking_what_title: "À quoi s'attendre",
        booking_what_subtitle: "Voici ce que nous aborderons lors de notre appel :",
        booking_expect_1: "Vos objectifs commerciaux",
        booking_expect_1_desc: "Nous découvrirons votre vision et vos objectifs.",
        booking_expect_2: "Défis actuels",
        booking_expect_2_desc: "Identifier ce qui vous retient en ligne.",
        booking_expect_3: "Stratégie personnalisée",
        booking_expect_3_desc: "Obtenez une feuille de route personnalisée vers le succès.",
        booking_expect_4: "Prix transparents",
        booking_expect_4_desc: "Coûts clairs avec des options de paiement flexibles.",
        no_obligation: "Aucune obligation, aucune pression – juste de vraies solutions.",
        
        // Support Page
        support_page_title: "Nous sommes là pour vous aider",
        support_page_subtitle: "Obtenez des réponses à vos questions ou contactez-nous directement pour un support personnalisé.",
        support_contact_title: "Contactez-nous directement",
        support_contact_subtitle: "Vous préférez nous contacter ? Nous sommes là pour vous.",
        support_email: "Envoyez-nous un e-mail",
        support_response: "Délai de réponse de 24 heures",
        support_faq_title: "Questions fréquemment posées",
        support_faq_subtitle: "Réponses rapides aux questions courantes.",
        
        // AI Assistant Page
        ai_page_title: "Votre assistant commercial alimenté par l'IA",
        ai_page_subtitle: "Obtenez des réponses instantanées à vos questions sur nos services, nos prix et comment nous pouvons aider votre entreprise à croître.",
        ai_chat_title: "Discutez avec notre assistant IA",
        ai_chat_subtitle: "Demandez n'importe quoi sur nos services, prix ou processus. Obtenez des réponses instantanées et précises 24h/24 et 7j/7.",
        
        features_title: "Pourquoi choisir NextReach?",
        features_subtitle: "Tout ce dont vous avez besoin pour dominer votre présence numérique",
        feature_complete: "Forfait complet",
        feature_complete_desc: "Site web, médias sociaux et contenu vidéo - tout en un seul endroit",
        feature_fast: "Livraison rapide",
        feature_fast_desc: "Lancez votre présence numérique complète en 2-6 semaines",
        feature_support: "Support continu",
        feature_support_desc: "Nous sommes avec vous à chaque étape",
        
        cta_badge: "OFFRE À DURÉE LIMITÉE",
        cta_title: "Prêt à transformer votre entreprise?",
        cta_subtitle: "Rejoignez plus de 50 entreprises prospères qui ont lancé leur présence numérique complète avec NextReach. Commencez en 2-6 semaines avec des plans de paiement à 0% d'intérêt.",
        cta_satisfaction: "100% satisfaction",
        cta_satisfaction_sub: "Garantie de remboursement",
        cta_delivery: "Livraison en 2-6 semaines",
        cta_delivery_sub: "Lancement rapide",
        cta_interest: "0% d'intérêt",
        cta_interest_sub: "Plans de paiement",
        cta_pricing: "Voir les tarifs et commencer",
        cta_strategy: "Réserver un appel stratégique gratuit",
        cta_disclaimer: "Aucune carte de crédit requise • Annulez à tout moment • Garantie sans risque",
        
        services_title: "Nos services",
        services_subtitle: "Solutions numériques complètes pour votre entreprise",
        service_web_dev: "Développement web",
        service_web_desc: "Sites web modernes et réactifs qui convertissent les visiteurs en clients",
        service_social: "Gestion des médias sociaux",
        service_social_desc: "Création et gestion professionnelle de contenu sur toutes les plateformes",
        service_video: "Création de contenu vidéo",
        service_video_desc: "Vidéos de haute qualité qui engagent et convertissent votre audience",
        service_seo: "Optimisation SEO",
        service_seo_desc: "Soyez trouvé sur Google et attirez du trafic organique vers votre site web",
        
        about_title: "À propos de NextReach",
        about_subtitle: "Votre partenaire pour le succès numérique",
        about_description: "Nous aidons les entreprises à transformer leur présence numérique avec des sites web professionnels, la gestion des médias sociaux et du contenu vidéo.",
        about_mission: "Notre mission",
        about_mission_desc: "Donner aux entreprises de toutes tailles des solutions numériques professionnelles et abordables.",
        
        learn_more: "En savoir plus",
        contact_us: "Contactez-nous",
        get_quote: "Obtenir un devis",
        view_portfolio: "Voir le portfolio",
        read_more: "Lire la suite",
        book_now: "Réserver maintenant",
        send_message: "Envoyer le message",
        submit: "Soumettre",
        close: "Fermer",
        back: "Retour",
        next: "Suivant",
        previous: "Précédent",
        loading: "Chargement...",
        success: "Succès!",
        error: "Erreur",
        please_wait: "Veuillez patienter..."
    }
};

class LanguageTranslator {
    constructor() {
        this.currentLang = localStorage.getItem('nextreach_language') || 'bg';
        this.availableLanguages = {
            'en': { name: 'English', flag: '🇬🇧' },
            'bg': { name: 'Български', flag: '🇧🇬' },
            'es': { name: 'Español', flag: '🇪🇸' },
            'de': { name: 'Deutsch', flag: '🇩🇪' },
            'fr': { name: 'Français', flag: '🇫🇷' }
        };
        this.init();
    }

    init() {
        this.createLanguageDropdown();
        this.applyLanguage(this.currentLang);
        this.addAnimations();
    }

    createLanguageDropdown() {
        // Check if already exists
        if (document.getElementById('lang-dropdown-container')) return;

        // Create container
        const container = document.createElement('div');
        container.id = 'lang-dropdown-container';
        container.className = 'language-dropdown-container';

        // Create dropdown HTML
        const currentLang = this.availableLanguages[this.currentLang];
        container.innerHTML = `
            <button class="language-dropdown-btn" id="lang-dropdown-btn">
                <span class="lang-flag">${currentLang.flag}</span>
                <span class="lang-name">${currentLang.name}</span>
                <i class="fas fa-chevron-down lang-arrow"></i>
            </button>
            <div class="language-dropdown-menu" id="lang-dropdown-menu">
                ${Object.entries(this.availableLanguages).map(([code, lang]) => `
                    <button class="language-option ${code === this.currentLang ? 'active' : ''}" data-lang="${code}">
                        <span class="lang-flag">${lang.flag}</span>
                        <span class="lang-name">${lang.name}</span>
                        ${code === this.currentLang ? '<i class="fas fa-check"></i>' : ''}
                    </button>
                `).join('')}
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .language-dropdown-container {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                z-index: 99999;
            }

            .language-dropdown-btn {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.875rem 1.25rem;
                background: linear-gradient(135deg, #1e3a8a, #3b82f6);
                border: none;
                border-radius: 50px;
                color: white;
                font-size: 0.9375rem;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-family: 'Inter', sans-serif;
            }

            .language-dropdown-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 30px rgba(59, 130, 246, 0.6);
            }

            .language-dropdown-btn .lang-flag {
                font-size: 1.5rem;
                line-height: 1;
            }

            .language-dropdown-btn .lang-arrow {
                font-size: 0.75rem;
                transition: transform 0.3s ease;
            }

            .language-dropdown-btn.active .lang-arrow {
                transform: rotate(180deg);
            }

            .language-dropdown-menu {
                position: absolute;
                bottom: 100%;
                right: 0;
                margin-bottom: 0.75rem;
                background: white;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                padding: 0.5rem;
                min-width: 200px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px) scale(0.95);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .language-dropdown-menu.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
            }

            .language-option {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                width: 100%;
                padding: 0.75rem 1rem;
                background: transparent;
                border: none;
                border-radius: 12px;
                color: #0f172a;
                font-size: 0.9375rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: left;
                font-family: 'Inter', sans-serif;
                position: relative;
            }

            .language-option:hover {
                background: linear-gradient(135deg, #eff6ff, #dbeafe);
                color: #1e3a8a;
            }

            .language-option.active {
                background: linear-gradient(135deg, #1e3a8a, #3b82f6);
                color: white;
            }

            .language-option .lang-flag {
                font-size: 1.5rem;
                line-height: 1;
            }

            .language-option .fa-check {
                margin-left: auto;
                font-size: 0.875rem;
            }

            @media (max-width: 768px) {
                .language-dropdown-container {
                    bottom: 1.5rem;
                    right: 1.5rem;
                }

                .language-dropdown-btn {
                    padding: 0.75rem 1rem;
                }

                .language-dropdown-btn .lang-name {
                    display: none;
                }
            }

            /* Translation animation */
            @keyframes translateFade {
                0% { opacity: 0; transform: translateY(10px); }
                100% { opacity: 1; transform: translateY(0); }
            }

            .translating {
                animation: translateFade 0.3s ease;
            }
        `;
        document.head.appendChild(style);

        // Add to body
        document.body.appendChild(container);

        // Add event listeners
        const dropdownBtn = document.getElementById('lang-dropdown-btn');
        const dropdownMenu = document.getElementById('lang-dropdown-menu');

        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
            dropdownBtn.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                dropdownMenu.classList.remove('show');
                dropdownBtn.classList.remove('active');
            }
        });

        // Language options
        const options = dropdownMenu.querySelectorAll('.language-option');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.currentTarget.getAttribute('data-lang');
                this.changeLanguage(lang);
                dropdownMenu.classList.remove('show');
                dropdownBtn.classList.remove('active');
            });
        });
    }

    changeLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        localStorage.setItem('nextreach_language', lang);
        
        // Update button
        const btn = document.getElementById('lang-dropdown-btn');
        const currentLang = this.availableLanguages[lang];
        btn.querySelector('.lang-flag').textContent = currentLang.flag;
        btn.querySelector('.lang-name').textContent = currentLang.name;

        // Update active state in menu
        const options = document.querySelectorAll('.language-option');
        options.forEach(option => {
            const optionLang = option.getAttribute('data-lang');
            option.classList.toggle('active', optionLang === lang);
            
            // Update checkmark
            const existingCheck = option.querySelector('.fa-check');
            if (optionLang === lang && !existingCheck) {
                option.innerHTML += '<i class="fas fa-check"></i>';
            } else if (optionLang !== lang && existingCheck) {
                existingCheck.remove();
            }
        });

        // Apply translation with animation
        this.applyLanguage(lang);
    }

    applyLanguage(lang) {
        const t = translations[lang];
        if (!t) return;

        // Add translating class to body for animation
        document.body.classList.add('translating');

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (t[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = t[key];
                } else {
                    element.textContent = t[key];
                }
            }
        });

        // Update lists with data-i18n-list attribute
        document.querySelectorAll('[data-i18n-list]').forEach(element => {
            const key = element.getAttribute('data-i18n-list');
            if (t[key] && Array.isArray(t[key])) {
                const items = element.querySelectorAll('li');
                t[key].forEach((text, index) => {
                    if (items[index]) {
                        const icon = items[index].querySelector('i');
                        const iconHTML = icon ? icon.outerHTML + ' ' : '';
                        items[index].innerHTML = iconHTML + '<span>' + text + '</span>';
                    }
                });
            }
        });

        // Remove translating class after animation
        setTimeout(() => {
            document.body.classList.remove('translating');
        }, 300);
    }

    addAnimations() {
        // Add smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
}

// Initialize translator when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.languageTranslator = new LanguageTranslator();
    });
} else {
    window.languageTranslator = new LanguageTranslator();
}
