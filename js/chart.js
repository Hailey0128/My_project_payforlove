// 年龄分布图表 - 条形图
function initAgeChart() {
    const chartDom = document.getElementById('age-chart');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);
    
    // 从data.js获取数据
    const ageData = window.gameData?.sample?.age || [];
    const ageRanges = ageData.map(item => item.range).reverse();
    const agePercents = ageData.map(item => item.percent).reverse();
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                shadowStyle: {color: '#b7a9ff23'}
            },
            formatter: function(params) {
                const ageGroup = params[0].name;
                const percent = params[0].value;
                const descriptions = {
                    '18-22岁': '在校学生居多，符号消费的先锋力量。',
                    '23-25岁': '情感代偿需求初显，消费更为理性。',
                    '26-29岁': '消费动机强烈，追求情感效率。',
                    '30-34岁': '成熟女性，消费稳定，注重符号的长期价值。',
                    '35岁及以上': '高净值玩家，消费力强，偏好深度沉浸。'
                };
                return `${ageGroup} : ${percent}%<br/>${descriptions[ageGroup] || ''}`;
            },
            backgroundColor: '#fffffff3',
            borderColor: '#f5f3ffc5',
            borderWidth: 1,
            textStyle: {
                color: '#343146ff'
            },
            confine: true
        },
        grid: {
            left: '10%',
            right: '10%',
            top: '10%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            name: '占比 (%)',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                color: '#1a1a2e',
                fontSize: 13
            },
            axisLine: {
                lineStyle: {
                    color: '#000000ff'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#1a1a2e',
                fontSize: 12,
                formatter: '{value}%'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ageRanges,
            axisLine: {
                lineStyle: {
                    color: '#ccccccff',
                    width: 1
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#1a1a2e',
                fontSize: 12,
                padding: [0, 10, 0, 0]
            }
        },
        series: [{
            name: '年龄分布',
            type: 'bar',
            data: agePercents,
            barWidth: '50%',
            z: 1,
            itemStyle: {
                borderRadius: [0, 12, 12, 0],
                color: function(params) {
                    // 根据不同年龄阶段使用不同深浅的粉色
                    const colors = ['#3e2d8a','#5e4ca8','#7c6bc0','#9b8ad9','#c5baf8ff'];
                    return colors[params.dataIndex];
                }
            },
            label: {
                show: true,
                position: 'right',
                formatter: '{c}%',
                fontSize: 12,
                color: '#1a1a2e',
                fontWeight: 'bold'
            },
            emphasis: {
                itemStyle: {
                    color: function(params) {
                        // 悬停时使用更深色的粉色
                        const hoverColors = ['#3e2d8a','#5e4ca8','#7c6bc0','#9b8ad9','#c5baf8ff'];
                        return hoverColors[params.dataIndex];
                    }
                },
                label: {
                    color: '#1a1a2e',
                    fontSize: 13
                }
            }
        }]
    };
    
    myChart.setOption(option);
    
    // 响应式处理
    window.addEventListener('resize', function() {
        myChart.resize();
    });
    
    // 添加点击交互
    myChart.on('click', function(params) {
        if (params.componentType === 'series') {
            const ageGroups = ['18-22岁', '23-25岁', '26-29岁', '30-34岁', '35岁及以上'];
            const descriptions = {
                '18-22岁': '在校学生居多，符号消费的先锋力量。',
                '23-25岁': '情感代偿需求初显，消费更为理性。',
                '26-29岁': '消费动机强烈，追求情感效率。',
                '30-34岁': '成熟女性，消费稳定，注重符号的长期价值。',
                '35岁及以上': '高净值玩家，消费力强，偏好深度沉浸。'
            };
            const clickedAge = ageGroups[4 - params.dataIndex];
            showTooltip(params.event.offsetX, params.event.offsetY, `${clickedAge}<br/>${descriptions[clickedAge]}`);
        }
    });
}
// 身份分布图表 - 环形饼图
function initIdentityChart() {
    const chartDom = document.getElementById('identity-chart');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);
    
    // 从data.js获取身份数据
    const identityData = window.gameData?.sample?.identity || [];
    const chartData = identityData.map(item => ({
        name: item.type,
        value: item.percent
    }));
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                const descriptions = {
                    '在校学生': '消费能力一般，最活跃。',
                    '职场新人(1-3年)': '初入职场，消费能力逐渐提升。',
                    '资深职场人(3年以上)': '经济基础扎实，消费稳定，注重情绪价值。',
                    '个体商户/自由职业者': '时间自由，消费决策更加灵活。'
                };
                return `${params.name} : ${params.percent}%<br/>${descriptions[params.name] || ''}`;
            },
            position: 'top',
            confine: true
        },
        legend: {
            top: '5%',
            left: 'center',
            textStyle: {
                color: '#1a1a2e',
                fontSize: 12
            }
        },
        series: [
            {
                name: '身份分布',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '60%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#1a1a2e'
                    }
                },
                labelLine: {
                    show: false
                },
                data: chartData,
                color: ['#B8A9FF', '#9B8AD9', '#7C6BC0', '#5E4CA8', '#3E2D8A']
            }
        ]
    };
    
    myChart.setOption(option);
    
    // 响应式处理
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 浮动提示框函数
function showTooltip(x, y, content) {
    const existingTooltip = document.getElementById('custom-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    // 创建提示框元素
    const tooltip = document.createElement('div');
    tooltip.id = 'custom-tooltip';
    tooltip.innerHTML = content;
    tooltip.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid #B8A9FF;
        border-radius: 8px;
        padding: 10px;
        color: #E3E3FC;
        font-size: 12px;
        z-index: 100;
        max-width: 180px;
        pointer-events: none;
        transform: translate(-50%, -120%);
    `;
    
    // 添加到body
    document.body.appendChild(tooltip);
    
    // 点击其他地方关闭提示框
    setTimeout(() => {
        document.addEventListener('click', function closeTooltip() {
            const tooltip = document.getElementById('custom-tooltip');
            if (tooltip) {
                tooltip.remove();
                document.removeEventListener('click', closeTooltip);
            }
        }, { once: true });
    }, 100);
}

// 消费金额与游戏时长关联热力图
function initHeatmapChart() {
    const chartDom = document.getElementById('amount-chart');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);
    
    // 根据屏幕尺寸调整配置
    const isMobile = window.innerWidth < 768;
    
    // 游戏时长数据（从上往下，游戏时长更长）
    const playDurations = ['开服玩家','1年以上','6-12个月','3-6个月','不足3个月'];
    
    // 消费金额区间
    const amountRanges = ['100元以下','100-499元','500-999元','1000-4999元','5000-9999元','10000元及以上'];
    
    // 交叉表数据矩阵（根据新的坐标轴顺序调整）
    const dataMatrix = [
        [6, 1, 4, 9, 1, 6],         // 开服玩家
        [2, 12, 22, 16, 10, 2],   // 1年以上
        [11, 31, 29, 8, 2, 2],     // 6-12个月
        [0, 20, 17, 8, 2, 0],     // 3-6个月
        [5, 12, 3, 2, 0, 0]      // 不足3个月
    ];
    
    // 转换为ECharts热力图数据格式
    const heatmapData = [];
    for (let i = 0; i < playDurations.length; i++) {
        for (let j = 0; j < amountRanges.length; j++) {
            heatmapData.push([j, i, dataMatrix[i][j]]);
        }
    }
    
    const option = {
        backgroundColor: 'transparent',
        title: {
            text: '玩家消费金额与游戏时长',
            left: 'center',
            top: '5%',
            textStyle: {
                color: '#1a1a2e',
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            position: 'top',
            formatter: function(params) {
                const playDuration = playDurations[params.value[1]];
                const amountRange = amountRanges[params.value[0]];
                const count = params.value[2];
                let description = '';
                
                // 根据不同的游戏时长和消费金额提供描述
                if (playDuration.includes('年') || playDuration.includes('月')) {
                    if (amountRange.includes('10000') || amountRange.includes('5000')) {
                        description = '资深核心玩家，深度情感投入，消费能力强';
                    } else if (amountRange.includes('500') || amountRange.includes('1000')) {
                        description = '稳定活跃玩家，有一定经济基础，持续投入';
                    } else {
                        description = '轻度或新玩家，尝试性消费';
                    }
                } else if (playDuration === '开服玩家') {
                    description = '早期核心用户，忠诚度高，消费意愿强';
                }
                
                return `${playDuration} × ${amountRange}<br/>人数: ${count}<br/>${description}`;
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#B8A9FF',
            borderWidth: 1,
            textStyle: {
                color: '#E3E3FC',
                fontSize: isMobile ? 10 : 12
            },
            confine: true
        },
        grid: {
            height: isMobile ? '55%' : '60%',
            top: isMobile ? '20%' : '15%',
            left: isMobile ? '15%' : '10%',
            right: isMobile ? '15%' : '10%',
            bottom: isMobile ? '20%' : '15%'
        },
        xAxis: {
            type: 'category',
            data: amountRanges,
            splitArea: {
                show: true
            },
            axisLine: {
                lineStyle: {
                    color: '#1a1a2e'
                }
            },
            axisLabel: {
                color: '#1a1a2e',
                fontSize: isMobile ? 9 : 11,
                rotate: isMobile ? 45 : 30
            }
        },
        yAxis: {
            type: 'category',
            data: playDurations,
            splitArea: {
                show: true
            },
            axisLine: {
                lineStyle: {
                    color: '#1a1a2e'
                }
            },
            axisLabel: {
                color: '#1a1a2e',
                fontSize: isMobile ? 9 : 11
            }
        },
        visualMap: {
            min: 0,
            max: 35,
            calculable: true,
            orient: isMobile ? 'vertical' : 'horizontal',
            left: 'auto',
            right: 3,
            top: isMobile ? 'center' : 'auto',
            bottom: isMobile ? 'auto' : '3%',
            textStyle: {
                color: '#1a1a2e',
                fontSize: 10,
                align: 'right'
            },
            inRange: {
                color: ['#B8A9FF', '#9B8AD9', '#7C6BC0', '#5E4CA8', '#3E2D8A']
            },
            show: true
        },
        toolbox: {
            show: !isMobile,
            feature: {
                saveAsImage: {
                    title: '保存图片',
                    iconStyle: {
                        color: '#1a1a2e'
                    }
                },
                dataZoom: {
                    title: {
                        zoom: '区域缩放',
                        back: '恢复缩放'
                    },
                    iconStyle: {
                        color: '#1a1a2e'
                    }
                },
                brush: {
                    type: ['rect', 'polygon', 'clear'],
                    iconStyle: {
                        color: '#1a1a2e'
                    }
                }
            },
            iconStyle: {
                color: '#1a1a2e'
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100,
                zoomOnMouseWheel: true,
                moveOnMouseMove: true
            },
            {
                show: !isMobile,
                start: 0,
                end: 100,
                height: 20,
                bottom: 30,
                borderColor: 'transparent',
                fillerColor: 'rgba(255, 255, 255, 0.3)',
                handleIcon: 'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#1a1a2e',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                },
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: isMobile ? 9 : 11
                }
            }
        ],
        brush: {
            show: !isMobile,
            toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            xAxisIndex: 0,
            yAxisIndex: 0
        },
        series: [{
            name: '人数',
            type: 'heatmap',
            data: heatmapData,
            label: {
                show: !isMobile,
                color: '#FFFFFF',
                fontSize: isMobile ? 8 : 10,
                fontWeight: 'bold'
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                label: {
                    show: true,
                    fontSize: isMobile ? 10 : 12
                }
            },
            progressive: 1000,
            progressiveThreshold: 1000
        }]
    };
    
    myChart.setOption(option);
    
    // 响应式处理
    window.addEventListener('resize', function() {
        myChart.resize();
    });
    
    // 添加点击交互
    myChart.on('click', function(params) {
        if (params.componentType === 'series') {
            const playDuration = playDurations[params.value[1]];
            const amountRange = amountRanges[params.value[0]];
            const count = params.value[2];

            showTooltip(params.event.offsetX, params.event.offsetY, `${playDuration} × ${amountRange}<br/>人数: ${count}`);
        }
    });
}

// 游戏内消费偏好权重分析图表
function initInGamePreferenceChart() {
    const chartDom = document.getElementById('in-game-chart');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);
    
    // 从data.js获取游戏内消费偏好权重数据
    const inGameData = window.gameData?.sample?.inGamePurchaseWeights || [];
    const data = inGameData.map(item => ({
        name: item.type,
        value: item.weight
    }));
    
    const option = {
        backgroundColor: 'transparent',
        title: {
            text: '游戏内消费偏好权重分析',
            left: 'center',
            top: '3%',
            textStyle: {
                color: '#1a1a2e',
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                const descriptions = {
                    '限定卡池': '情感符号的核心载体',
                    '资源礼包': '理性消费的中介工具',
                    '月卡特权': '理性消费的中介工具',
                    '外观皮肤': '审美符号的补充消费'
                };
                const name = params[0].name;
                const value = params[0].value;
                const desc = descriptions[name] || '';
                return name + ': ' + value + (desc ? '<br/><span style="font-size:11px;color:#B8A9FF;">' + desc + '</span>' : '');
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#B8A9FF',
            borderWidth: 1,
            textStyle: {
                color: '#FFFFFF',
                fontSize: 11
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            top: '20%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.map(item => item.name),
            axisLabel: {
                color: '#1a1a2e',
                fontSize: 11,
                rotate: 0
            },
            axisLine: {
                lineStyle: {
                    color: '#1a1a2e'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '权重值',
            nameLocation: 'middle',
            nameGap: 30,
            min: 0,
            max: 3,
            axisLabel: {
                color: '#1a1a2e',
                fontSize: 10
            },
            axisLine: {
                lineStyle: {
                    color: '#1a1a2e'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        },
        series: [{
            name: '权重值',
            type: 'bar',
            data: data.map((item, index) => ({
                value: item.value,
                itemStyle: {
                    color: index === 0 ? '#f7c1f0ff ' : '#6c72d7'
                }
            })),
            barWidth: '60%',
            label: {
                show: true,
                position: 'top',
                color: '#1a1a2e',
                fontSize: 11,
                fontWeight: 'bold'
            }
        }]
    };
    
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}
// 游戏外消费偏好展示图表
function initOutGamePreferenceChart() {
    const chartDom = document.getElementById('out-game-chart');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);
    
    // 从data.js获取游戏外消费偏好数据
    const outGameData = window.gameData?.sample?.externalPurchases || [];
    const data = outGameData.map(item => ({
        name: item.type,
        value: item.count
    }));
    
    const option = {
        backgroundColor: 'transparent',
        title: {
            text: '游戏外消费偏好展示',
            left: 'center',
            top: '3%',
            textStyle: {
                color: '#1a1a2e',
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                const descriptions = {
                    '官方周边': '虚拟情感的实体化',
                    '联名产品': '虚拟情感的实体化',
                    '同人周边/手工制品': '意义再生产的社群实践',
                    'COS委托等衍生服务': '社交化的情感体验',
                    '线下活动门票': '社交化的情感体验'
                };
                const name = params[0].name;
                const value = params[0].value;
                const desc = descriptions[name] || '';
                return name + ': ' + value + '人'  + (desc ? '<br/><span style="font-size:11px;color:#B8A9FF;">' + desc + '</span>' : '');
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#B8A9FF',
            borderWidth: 1,
            textStyle: {
                color: '#FFFFFF',
                fontSize: 11
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            top: '20%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.map(item => item.name),
            axisLabel: {
                color: '#1a1a2e',
                fontSize: 10,
                rotate: 30
            },
            axisLine: {
                lineStyle: {
                    color: '#1a1a2e'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '频数',
            nameLocation: 'middle',
            nameGap: 40,
            axisLabel: {
                color: '#1a1a2e',
                fontSize: 11,
            },
            axisLine: {
                lineStyle: {
                    color: '#1a1a2e'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        },
        series: [{
            name: '频数',
            type: 'bar',
            data: data.map(item => ({
                value: item.value,
                itemStyle: {
                    color: '#40A9FF'
                }
            })),
            barWidth: '60%',
            label: {
                show: true,
                position: 'top',
                color: '#1a1a2e',
                fontSize: 11,
                fontWeight: 'bold'
            }
        }]
    };
    
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 消费动因关系图表
function initMotivationChart() {
    const chartDom = document.getElementById('motivation-chart');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);
    
    // 从data.js获取消费动因数据
    const motivations = window.gameData?.motivations || {};
    const data = [
        { name: motivations.emotional?.name || '情感性动因', value: motivations.emotional?.overall?.mean || 0 },
        { name: motivations.social?.name || '社会性动因', value: motivations.social?.overall?.mean || 0 },
        { name: motivations.gameplay?.name || '游戏性动因', value: motivations.gameplay?.overall?.mean || 0 }
    ];
    
    const option = {
        backgroundColor: 'transparent',
        title: {
            text: '消费动因重要性',
            left: 'center',
            top: '5%',
            textStyle: {
                color: '#1a1a2e',
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                const descriptions = {
                    '情感性动因': '通过付费将虚拟角色人格化，获得现实中稀缺的稳定情感反馈，具体表现为理想伴侣投射、独特情感联结、改善情绪等',
                    '社会性动因': '社群氛围形成隐性的消费引导，具体表现为社群分享种草、身份称号标识、社群压力等',
                    '游戏性动因': '游戏内机制设计（限时、限定、保底、图鉴）将情感符号商品化，制造紧迫感，具体表现为稀缺焦虑、追求全图鉴、提升游戏效率等'
                };
                const name = params[0].name;
                const value = params[0].value;
                const desc = descriptions[name] || '';
                return name + ': ' + value.toFixed(1) + '分' + (desc ? '<br/><span style="font-size:12px;color:#B8A9FF;">' + desc + '</span>' : '');
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#B8A9FF',
            borderWidth: 1,
            textStyle: {
                color: '#FFFFFF',
                fontSize: 12
            },
            confine: true,
            extraCssText: 'max-width: 280px; white-space: normal;',
            position: function (pos, params, dom, rect, size) {
                var obj = { top: 10 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10;
                return obj;
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            top: '20%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.map(item => item.name),
            axisLabel: {
                color: '#1a1a2e',
                fontSize: 12,
                rotate: 0
            },
            axisLine: {
                lineStyle: {
                    color: '#1a1a2e'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '平均评分',
            nameLocation: 'middle',
            nameGap: 40,
            min: 0,
            max: 5,
            axisLabel: {
                color: '#1a1a2e',
                fontSize: 12,
                formatter: '{value}分'
            },
            axisLine: {
                lineStyle: {
                    color: '#1a1a2e'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.35)'
                }
            }
        },
        series: [{
            name: '平均评分',
            type: 'bar',
            data: data.map((item, index) => ({
                value: item.value,
                itemStyle: {
                    color: ['#d21511', '#fc7c0e', '#ffd900'][index]
                }
            })),
            barWidth: '45%',
            label: {
                show: true,
                position: 'top',
                color: '#1a1a2e',
                fontSize: 12,
                fontWeight: 'bold',
                formatter: function(params) {
                    return params.value.toFixed(1);
                }
            },
            itemStyle: {
                borderRadius: [10, 10, 0, 0]
            }
        },
        {
            name: '图标',
            type: 'scatter',
            data: data.map((item, index) => [index, item.value / 2]),
            symbolSize: 25,
            symbol: function(val, params) {
                const icons = ['./assets/icon/爱心.svg', './assets/icon/人群.svg', './assets/icon/游戏机.svg'];
                return 'image://' + icons[params.dataIndex];
            },
            itemStyle: {
                opacity: 0.8
            },
            label: {
                show: false
            }
        }]
    };
    
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}


document.addEventListener('DOMContentLoaded', function() {
    initAgeChart();
    initIdentityChart();
    initHeatmapChart();
    initInGamePreferenceChart();
    initOutGamePreferenceChart();
    initMotivationChart();
    // 其他图表初始化...
});