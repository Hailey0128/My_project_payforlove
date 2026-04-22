document.addEventListener('DOMContentLoaded', function() {
    // 图表初始化占位函数
    function initCharts() {
        const chartIds = ['age-chart', 'amount-chart', 'motivation-chart', 'social-chart', 'emotion-chart', 'culture-chart', 'future-chart'];
        chartIds.forEach(id => {
            const chartDom = document.getElementById(id);
            if (chartDom) {
                const myChart = echarts.init(chartDom);
            const option = {
                    backgroundColor: 'transparent'
                };
                myChart.setOption(option);
                
                window.addEventListener('resize', () => {
                    myChart.resize();
                });
            }
        });
    }
    // 滚动监听基础功能
    function initScrollTrigger() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            gsap.utils.toArray('.screen').forEach((screen, i) => {
                gsap.from(screen.querySelector('.content'), {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: screen,
                        start: 'top 70%',
                        toggleActions: 'play none none none'
                    }
                });
            });
        }
    }
    // 初始化所有功能
    initCharts();
    initScrollTrigger();
    initScrollAnimations();

    // 第一屏点击切换功能
    function initFirstScreenNavigation() {
        const nextBtn = document.getElementById('nextScreenBtn');
        const secondScreen = document.querySelector('.screen-intro');
        const firstScreen = document.querySelector('.screen-cover');
        let isOnFirstScreen = true;
        
        // 禁用第一屏的滚动
        function disableScroll(event) {
            if (isOnFirstScreen) {
                event.preventDefault();
                return false;
            }
        }
        
        // 添加滚动事件监听
        window.addEventListener('wheel', disableScroll, { passive: false });
        window.addEventListener('touchmove', disableScroll, { passive: false });
        
        if (nextBtn && secondScreen) {
            nextBtn.addEventListener('click', function() {
                isOnFirstScreen = false;
                secondScreen.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // 滚动完成后移除滚动禁用
                setTimeout(() => {
                    window.removeEventListener('wheel', disableScroll);
                    window.removeEventListener('touchmove', disableScroll);
                }, 1000);
            });
        }
    }
    initFirstScreenNavigation();

    // 天猫图片下拉显示功能
    function initTmallImageExpand() {
        const tmallContainer = document.querySelector('.tmall-image-container');
        const tmallOverlay = document.querySelector('.tmall-image-overlay');
        const tmallImage = document.getElementById('tmallImage');
        const imageDetails = document.getElementById('tmallDetails');
        
        if (tmallContainer && tmallOverlay && tmallImage && imageDetails) {
            tmallOverlay.addEventListener('click', function() {
                tmallContainer.classList.toggle('expanded');
                imageDetails.classList.toggle('expanded');
            });
        }
    }
    initTmallImageExpand();

    // 翻牌功能实现
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
    

});

// 滚动触发动画功能
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 监听所有需要动画的元素
    document.querySelectorAll('.summary-text').forEach(el => {
        observer.observe(el);
    });

    // 监听图表容器
    document.querySelectorAll('.chart').forEach(el => {
        el.classList.add('animate');
        observer.observe(el);
    });

    // 监听女性剪影容器
    document.querySelectorAll('.silhouette-container').forEach(el => {
        observer.observe(el);
    });
}
