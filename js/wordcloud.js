// 词云图 - 玩家心声-基于问卷开放题和访谈文本提取的高频词
const wordcloudData = [
    { name: '周边', value: 48, category: '中性' },
    { name: '喜欢', value: 46, category: '正向' },
    { name: '氪金', value: 32, category: '中性' },
    { name: '抽卡', value: 32, category: '中性' },
    { name: '现实', value: 30, category: '中性' },
    { name: '爱', value: 30, category: '正向' },
    { name: '开心', value: 25, category: '正向' },
    { name: '角色', value: 25, category: '中性' },
    { name: '分享', value: 23, category: '正向' },
    { name: '亲密', value: 21, category: '正向' },
    { name: '情绪价值', value: 18, category: '正向' },
    { name: '变好', value: 17, category: '正向' },
    { name: '好看', value: 17, category: '正向' },
    { name: '金钱', value: 15, category: '中性' },
    { name: '社区', value: 15, category: '中性' },
    { name: '男朋友', value: 13, category: '正向' },
    { name: '压力', value: 12, category: '负向' },
    { name: '后悔', value: 11, category: '负向' },
    { name: '体验感', value: 10, category: '正向' },
    { name: '剧情', value: 10, category: '正向' },
    { name: '社交', value: 8, category: '中性' },
    { name: '焦虑', value: 7, category: '负向' },
    { name: '圈子', value: 7, category: '中性' },
    { name: '恋爱', value: 5, category: '正向' },
    { name: '认同', value: 5, category: '正向' },
    { name: '完美', value: 5, category: '正向' },
    { name: '强迫症', value: 4, category: '负向' },
    { name: '情感', value: 4, category: '正向' },
    { name: '享受', value: 4, category: '正向' },
    { name: '需求', value: 4, category: '中性' },
    { name: '满足', value: 4, category: '正向' },
    { name: '交流', value: 3, category: '中性' },
    { name: '陪伴', value: 3, category: '正向' },
    { name: '投入', value: 3, category: '中性' },
    { name: '心态', value: 3, category: '中性' },
    { name: '娱乐', value: 3, category: '正向' },
    { name: '真心', value: 3, category: '正向' },
    { name: '值得', value: 3, category: '正向' },
    { name: '收集', value: 3, category: '中性' },
    { name: '实用', value: 2, category: '中性' },
    { name: '幸福', value: 2, category: '正向' },
    { name: '勇敢', value: 1, category: '正向' },
    { name: '优秀', value: 1, category: '正向' },
    { name: '有趣', value: 1, category: '正向' },
    { name: '自大', value: 1, category: '负向' },
    { name: '尊重', value: 1, category: '正向' }
];

function initWordCloudChart() {
    const chartDom = document.getElementById('wordcloud-chart');
    if (!chartDom) {
        console.error('词云图容器未找到');
        return;
    }
    
    console.log('词云图初始化开始');
    
    // 检查ECharts和词云插件是否加载
    if (typeof echarts === 'undefined') {
        console.error('ECharts未加载');
        return;
    }
    
    if (typeof echarts.registerTransform === 'undefined') {
        console.error('ECharts词云插件未加载');
        return;
    }
    
    const myChart = echarts.init(chartDom);
    console.log('ECharts实例创建成功');

    // 简化的词云配置
    const option = {
        tooltip: {
            show: true,
            formatter: '{b}: {c}'
        },
        series: [{
            type: 'wordCloud',
            shape: 'circle',
            left: 'center',
            top: 'center',
            width: '90%',
            height: '90%',
            right: null,
            bottom: null,
            sizeRange: [12, 40],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 8,
            drawOutOfBound: false,
            textStyle: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                color: function(data) {
                    // 根据情感分类应用渐变色彩方案
                    const category = data.data.category;
                    if (category === '正向') {
                        // 粉红色系渐变
                        const pinkGradients = ['#ff9a9eff', '#ff6b91ff', '#ff4b82ff', '#ff3377ff'];
                        return pinkGradients[Math.floor(Math.random() * pinkGradients.length)];
                    } else if (category === '负向') {
                        // 绿色渐变
                        const greenGradients = ['#27ea62ff', '#4ade80ff', '#6ee7b7ff', '#86efacff'];
                        return greenGradients[Math.floor(Math.random() * greenGradients.length)];
                    } else {
                        // 蓝色渐变
                        const blueGradients = ['#38caf2ff', '#2196f3ff', '#1976d2ff', '#1565c0ff'];
                        return blueGradients[Math.floor(Math.random() * blueGradients.length)];
                    }
                }
            },
            emphasis: {
                focus: 'self',
                textStyle: {
                    textShadowBlur: 10,
                    textShadowColor: '#333'
                }
            },
            data: wordcloudData.map(item => ({
                name: item.name,
                value: item.value,
                category: item.category
            }))
        }]
    };

    console.log('词云配置创建成功');
    
    // 设置选项
    myChart.setOption(option);
    console.log('词云图设置成功');

    // 初始化统计数据
    console.log('准备更新统计数据');
    updateWordcloudStats();
    
    // 点击交互：点击词汇弹出相关访谈语录
    myChart.on('click', function(params) {
        if (params.componentType === 'series' && params.data) {
            const word = params.data.name;
            const quotes = getQuoteByWord(word);
            
            // 显示模态弹窗
            const modal = document.getElementById('quote-modal');
            const wordElement = modal.querySelector('.quote-word');
            const contentElement = modal.querySelector('.quote-content');
            
            wordElement.textContent = `「${word}」`;
            
            if (quotes) {
                contentElement.textContent = quotes;
            } else {
                contentElement.textContent = `提及次数：${params.data.value}次\n\n这是玩家在问卷或访谈中频繁提到的词汇。`;
            }
            
            // 显示弹窗
            modal.style.display = 'block';
            
            // 强制添加show类，确保动画正常
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // 阻止所有可能的事件干扰（除了关闭按钮）
            function preventClose(e) {
                // 允许关闭按钮的点击事件
                if (e.target.classList.contains('quote-close')) {
                    return;
                }
                if (modal.contains(e.target)) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
            
            // 添加事件监听器，使用捕获阶段
            document.addEventListener('click', preventClose, true);
            document.addEventListener('touchstart', preventClose, true);
            document.addEventListener('touchmove', preventClose, true);
            document.addEventListener('touchend', preventClose, true);
            
            // 3秒后移除监听器，避免内存泄漏
            setTimeout(() => {
                document.removeEventListener('click', preventClose, true);
                document.removeEventListener('touchstart', preventClose, true);
                document.removeEventListener('touchmove', preventClose, true);
                document.removeEventListener('touchend', preventClose, true);
            }, 30000); // 30秒后自动移除
        }
    });
    
    // 阻止词云图区域的事件冒泡
    chartDom.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    chartDom.addEventListener('touchstart', function(e) {
        e.stopPropagation();
    });
    
    chartDom.addEventListener('touchend', function(e) {
        e.stopPropagation();
    });

    // 窗口大小变化时重新渲染
    window.addEventListener('resize', function() {
        myChart.resize();
    });
    
    // 关闭弹窗功能 - 简化版
    const modal = document.getElementById('quote-modal');
    const closeBtn = modal.querySelector('.quote-close');
    
    // 关闭按钮点击事件
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('关闭按钮点击');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
    
    closeBtn.addEventListener('touchend', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('关闭按钮触摸');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
    
    // 点击弹窗外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            console.log('弹窗外部点击');
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
    
    modal.addEventListener('touchend', function(e) {
        if (e.target === modal) {
            console.log('弹窗外部触摸');
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
    
    // 阻止弹窗内部事件冒泡
    const modalContent = modal.querySelector('.quote-modal-content');
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    modalContent.addEventListener('touchstart', function(e) {
        e.stopPropagation();
    });
    
    modalContent.addEventListener('touchend', function(e) {
        e.stopPropagation();
    });
}

// 统计不同情感类型的词语数量
function updateWordcloudStats() {
    console.log('开始统计词云数据...');
    console.log('词云数据总数:', wordcloudData.length);
    
    const positiveCount = wordcloudData.filter(item => item.category === '正向').length;
    const negativeCount = wordcloudData.filter(item => item.category === '负向').length;
    const neutralCount = wordcloudData.filter(item => item.category === '中性').length;
    
    console.log('正向词数量:', positiveCount);
    console.log('负向词数量:', negativeCount);
    console.log('中性词数量:', neutralCount);
    
    // 更新DOM显示
    const positiveElement = document.getElementById('positive-count');
    const negativeElement = document.getElementById('negative-count');
    const neutralElement = document.getElementById('neutral-count');
    
    console.log('统计元素:', positiveElement, negativeElement, neutralElement);
    
    if (positiveElement) positiveElement.textContent = positiveCount;
    if (negativeElement) negativeElement.textContent = negativeCount;
    if (neutralElement) neutralElement.textContent = neutralCount;
}

/**
 * 根据词汇返回对应的访谈语录
 */
function getQuoteByWord(word) {
    const quoteMap = {
        '周边': '“拿到周边快递的时候确实是开心的，它代表着我和这个角色的连接。”——玩家无骨鱼',
        '喜欢': '“我很喜欢这个柄图，很喜欢他的设计，很喜欢这张卡面或者这张卡的剧情，那我也会买下这个”——玩家知晚',
        '氪金': '“氪条显示总投入后，才惊觉已消费数万元，确实消磨了我对金钱的敏感度。”——玩家不识',
        '抽卡': '“我会通过氪金拿到更多资源，方便我后面的卡池有足够资源抽卡。”——玩家李九谦',
        '现实': '“不是在逃避现实，我们只是先在这个游戏中被治愈，然后再出来勇敢的面对现实。”——玩家不识',
        '爱': '“爱不是靠金钱衡量的，你的真心能贴上价格标签吗？我觉得不能。”——玩家不识',
        '开心': '“花钱买快乐没什么，有时候生活压力也很大，我觉得花钱买开心值得。”——玩家不识',
        '角色': '“我喜欢这种被角色需要的感觉，能在亲密关系中找到自我的价值。”——玩家杏绛',
        '分享': '“和朋友分享一下喜悦而已，也算是记录生活，让角色和我的生活链接更紧密。”——玩家无骨鱼',
        '亲密': '“周边代表着我和这个角色的连接，以及我和他在现实生活中关系的亲密。”——玩家无骨鱼',
        '情绪价值': '“花钱买的是情绪价值，乙游是我的情绪避难所，让我觉得我值得被爱。”——玩家不识',
        '变好': '“玩这个游戏的初衷应该是为了让你成为一个更好的自己，更爱自己一点。”——玩家知晚',
        '好看': '“卡面非常唯美，我特别喜欢，就是因为好看所以才决定要叠满的。”——玩家不识',
        '金钱': '“爱不是靠金钱衡量的，喜欢本身无法量化，也不应贴上价格标签。”——玩家不识',
        '社区': '“社区环境比较混乱，我不喜欢玩家之间吵架，这些是我觉得最看不惯的。”——玩家星璇',
        '男朋友': '“游戏已经给我提供情绪价值了，找男朋友的心思已经淡得几乎没有了。”——玩家知晚',
        '压力': '“圈子会有氪金的氛围压力，但你的底气是对角色的真心，不需要获得他人认同。”——玩家不识',
        '后悔': '“有时候会为了买而买，买回来会后悔，但是不买会更加后悔。”——玩家无骨鱼',
        '体验感': '“只要开始氪金之后，就会发现体验感这么好，早买早享受。”——玩家知晚',
        '剧情': '“剧情好不好决定我要不要再继续叠卡，看完觉得很好就可能会继续。”——玩家李九谦',
        '社交': '“大家在线下因为对人物的喜爱聚在一起聊天很开心，确实也更容易成为志同道合的朋友。”——玩家李九谦',
        '焦虑': '“如果氪金会使你的现实生活压力变大，他就会给你带来焦虑，后悔或者说一些内耗情绪吧。”——玩家不识',
        '圈子': '“圈子会有氪金氛围压力，但你喜欢的是角色，而不是圈子里的鄙视链。”——玩家不识',
        '恋爱': '“我的恋爱观可以说是先从乙游开始建立起来的。”——玩家杏绛',
        '认同': '“没必要为了别人的认同去逼自己做不想做的事，爱应该是让自己获得温暖和力量。”——玩家无骨鱼',
        '完美': '“乙游男主的人设太完美了，现实中不太可能出现这种，我不会指望现实伴侣完美无缺。”——玩家杏绛'
    };
    return quoteMap[word] || null;
}

// 页面加载完成后初始化词云图
document.addEventListener('DOMContentLoaded', function() {
    initWordCloudChart();
    
    // 延迟执行统计更新，确保DOM完全加载
    setTimeout(function() {
        updateWordcloudStats();
    }, 100);
});

// 动画控制选项（保留供未来扩展使用）
let wordCloudAnimationEnabled = true;