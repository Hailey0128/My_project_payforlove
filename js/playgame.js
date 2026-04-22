// 抽卡模拟器 - 抽卡游戏
function initGachaSimulator() {
    const gameBtn = document.getElementById('game-btn');
    const cardDisplay = document.getElementById('card-display');
    const gameRemaining = document.getElementById('game-remaining');
    const gameTimer = document.getElementById('game-timer');
    if (!gameBtn || !cardDisplay || !gameRemaining || !gameTimer) return;
    
    // 抽卡状态管理
    let remainingDraws = 10; // 总抽卡次数限制
    let timerSeconds = 50; // 倒计时秒数
    let consecutiveNonFiveStar = 0; // 连续未出五星卡次数（保底机制）
    let timerInterval;
    
    // 卡片配置
    const cardTypes = [
        {
            name: '五星卡',
            level: 5,
            starColor: '#ffea00ff',
            probability: 0.05 // 5%基础概率
        },
        {
            name: '四星卡',
            level: 4,
            starColor: '#000000ff', 
            probability: 0.20 // 20%概率
        },
        {
            name: '三星卡',
            level: 3,
            starColor: '#000000ff', 
            probability: 0.75 // 75%概率
        }
    ];
    
    // 角色配置
    const characters = [
        {
            name: '沈星回',
            icon: './assets/icon/星辰花.svg',
            backgroundColor: '#8E75B6',
            borderColor: '#6F5DA7'
        },
        {
            name: '黎深',
            icon: './assets/icon/雪花.svg',
            backgroundColor: '#43AEFC',
            borderColor: '#75C4FE'
        },
        {
            name: '祁煜',
            icon: './assets/icon/鱼.svg',
            backgroundColor: '#f34585',
            borderColor: '#f977a0'
        },
        {
            name: '秦彻',
            icon: './assets/icon/羽毛.svg',
            backgroundColor: '#FF253D',
            borderColor: '#D8000C'
        },
        {
            name: '夏以昼',
            icon: './assets/icon/苹果.svg',
            backgroundColor: '#ff8000',
            borderColor: '#ffb007'
        }
    ];
    
    // 获取随机角色
    function getRandomCharacter() {
        return characters[Math.floor(Math.random() * characters.length)];
    }
    
    // 生成随机卡片（带保底机制）
    function generateRandomCard() {
        // 保底机制：每50抽必出五星卡
        if (consecutiveNonFiveStar >= 49) {
            const character = getRandomCharacter();
            consecutiveNonFiveStar = 0; // 重置保底计数
            return {
                ...cardTypes[0],
                character: character.name,
                characterIcon: character.icon,
                backgroundColor: character.backgroundColor,
                borderColor: character.borderColor
            };
        }
        
        const random = Math.random();
        let cumulativeProbability = 0;
        
        for (const cardType of cardTypes) {
            cumulativeProbability += cardType.probability;
            if (random< cumulativeProbability) {
                const character = getRandomCharacter();
                const result = {
                    ...cardType,
                    character: character.name,
                    characterIcon: character.icon,
                    backgroundColor: character.backgroundColor,
                    borderColor: character.borderColor
                };
                
                // 更新保底计数
                if (cardType.level === 5) {
                    consecutiveNonFiveStar = 0; // 出五星卡，重置计数
                } else {
                    consecutiveNonFiveStar++; // 未出五星卡，增加计数
                }
                
                return result;
            }
        }
        
        // 默认返回三星卡
        const character = getRandomCharacter();
        consecutiveNonFiveStar++; // 未出五星卡，增加计数
        return {
            ...cardTypes[2],
            character: character.name,
            characterIcon: character.icon,
            backgroundColor: character.backgroundColor,
            borderColor: character.borderColor
        };
    }
    
    // 创建卡片元素
    function createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.className = `game-card card-${card.level}`;
        
        // 使用角色专属背景色
        cardElement.style.background = `linear-gradient(135deg, ${card.backgroundColor}20, ${card.backgroundColor}40)`;
        cardElement.style.border = `2px solid ${card.borderColor}`;
        
        // 创建星星容器
        const starsContainer = document.createElement('div');
        starsContainer.className = 'card-stars';
        
        // 添加星星
        for (let i = 0; i< card.level; i++) {
            const star = document.createElement('div');
            star.className = 'card-star';
            star.style.color = card.starColor;
            star.innerHTML = '★';
            starsContainer.appendChild(star);
        }
        
        // 创建角色图标
        const characterIcon = document.createElement('img');
        characterIcon.className = 'card-icon';
        characterIcon.src = card.characterIcon;
        characterIcon.alt = card.character;
        
        // 创建卡片内容
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        
        const rarityBadge = document.createElement('div');
        rarityBadge.className = 'card-rarity';
        rarityBadge.textContent = card.rarity;
        
        const characterName = document.createElement('div');
        characterName.className = 'card-character';
        characterName.textContent = card.character;
        
        cardContent.appendChild(rarityBadge);
        cardContent.appendChild(characterName);
        // cardContent.appendChild(cardName);
        
        cardElement.appendChild(starsContainer);
        cardElement.appendChild(characterIcon);
        cardElement.appendChild(cardContent);
        
        return cardElement;
    }
    
    // 更新倒计时显示
    function updateTimerDisplay() {
        gameTimer.textContent = timerSeconds;
        
        // 如果倒计时结束，禁用按钮
        if (timerSeconds<= 0) {
            gameBtn.disabled = true;
            gameBtn.classList.add('game-disabled');
            gameBtn.textContent = '时间已结束'; 
            clearInterval(timerInterval);
        }
    }
    
    // 开始倒计时
    function startTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        timerInterval = setInterval(() =>{
            timerSeconds--;
            updateTimerDisplay();
        }, 1000);
    }
    
    // 抽卡动画
    function animateGacha() {
        // 清空之前的卡片
        cardDisplay.innerHTML = '';
        cardDisplay.classList.add('game-active');
        
        // 禁用按钮
        gameBtn.disabled = true;
        gameBtn.classList.add('game-disabled');
        
        // 模拟抽卡过程
        const cardCount = 5; // 一次抽5张卡
        let cardsGenerated = 0;
        let rareCardFound = false;
        
        // 创建抽卡动画
        const generateCardWithDelay = () => {
            if (cardsGenerated >= cardCount) {
                // 抽卡完成
                cardDisplay.classList.remove('game-active');
                
                // 更新剩余抽卡次数
                remainingDraws--;
                gameRemaining.textContent = remainingDraws;
                
                // 如果次数用完，禁用按钮
                if (remainingDraws<= 0) {
                    gameBtn.disabled = true;
                    gameBtn.classList.add('game-disabled');
                    gameBtn.innerHTML = '<span class="btn-text">次数已用完</span><img src="./assets/icon/星星.svg" alt="星星" class="btn-icon">';
                } else {
                    gameBtn.disabled = false;
                    gameBtn.classList.remove('game-disabled');
                }
                
                return;
            }
            
            // 生成随机卡片
            const card = generateRandomCard();
            
            // 如果是稀有卡，标记并添加特效
            if (card.level >= 5 && !rareCardFound) {
                rareCardFound = true;
                
                // 震动效果（如果支持）
                if (navigator.vibrate) {
                    navigator.vibrate([200, 100, 200]);
                }
            }
            
            // 创建卡片元素
            const cardElement = createCardElement(card);
            
            // 添加到显示区域
            cardDisplay.appendChild(cardElement);
            
            // 添加入场动画
            setTimeout(() => {
                cardElement.classList.add('card-enter');
                
                // 如果是稀有卡，添加额外特效
                if (card.level >= 5) {
                    cardElement.classList.add('card-rare');
                }
            }, 100);
            
            cardsGenerated++;
            
            // 继续生成下一张卡片
            setTimeout(generateCardWithDelay, 300);
        };
        
        // 开始抽卡
        setTimeout(generateCardWithDelay, 500);
    }
    
    // 添加点击事件
    gameBtn.addEventListener('click', function() {
        // 检查剩余次数
        if (remainingDraws<= 0) {
            return;
        }
        
        // 按钮点击动画
        this.style.transform = 'scale(0.95)';
        setTimeout(() => { this.style.transform = 'scale(1)'; }, 150);
        
        // 启动倒计时（只在第一次点击时启动）
        if (!timerInterval) {
            startTimer();
        }
        
        // 开始抽卡动画
        animateGacha();
    });
    
    // 初始化时添加一些提示卡片
    const initCard = createCardElement({
        name: '点击抽卡',
        level: 3,
        starColor: '#000000ff',
        rarity: '点击',
        character: '开始体验',
        characterIcon: './assets/icon/星星.svg', 
        backgroundColor: '#6A1B9A',
        borderColor: '#7B1FA2'
    });
    cardDisplay.appendChild(initCard);
}

// 页面加载完成后初始化抽卡模拟器
document.addEventListener('DOMContentLoaded', function() {
    initGachaSimulator();
});