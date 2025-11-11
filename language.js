// 語言切換系統
const translations = {
    zh: {
        'back-home': '← 返回主頁',
        'home-title': '📊 交易策略圖表集合',
        'switch-lang': 'English',
        'current-lang': '中文'
    },
    en: {
        'back-home': '← Back to Home',
        'home-title': '📊 Trading Strategy Diagram Collection',
        'switch-lang': '中文',
        'current-lang': 'English'
    }
};

// 初始化語言
function initLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'zh';
    setLanguage(savedLang);
}

// 設置語言
function setLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;
    
    // 更新所有帶有 data-i18n 屬性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // 更新語言切換按鈕
    const langButton = document.getElementById('lang-switch');
    if (langButton) {
        const nextLang = lang === 'zh' ? 'en' : 'zh';
        langButton.textContent = translations[lang]['switch-lang'];
        langButton.setAttribute('data-next-lang', nextLang);
    }
}

// 切換語言
function toggleLanguage() {
    const currentLang = localStorage.getItem('preferredLanguage') || 'zh';
    const nextLang = currentLang === 'zh' ? 'en' : 'zh';
    setLanguage(nextLang);
    
    // 重新載入頁面以應用語言變更（如果需要）
    // window.location.reload();
}

// 頁面載入時初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}

