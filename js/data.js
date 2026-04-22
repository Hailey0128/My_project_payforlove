const data = {
    // 样本概况
    sample: {
        total: 250,
        age: [
            { range: "18-22岁", count: 101, percent: 40.4 },
            { range: "23-25岁", count: 67, percent: 26.8 },
            { range: "26-29岁", count: 54, percent: 21.6 },
            { range: "30-34岁", count: 20, percent: 8.0 },
            { range: "35岁及以上", count: 8, percent: 3.2 }
        ],
        identity: [
            { type: "在校学生", count: 119, percent: 47.6 },
            { type: "职场新人(1-3年)", count: 32, percent: 12.8 },
            { type: "资深职场人(3年以上)", count: 76, percent: 30.4 },
            { type: "个体商户/自由职业者", count: 23, percent: 9.2}
        ],
        consumptionAmount: [
            { range: "100元以下", count: 25, percent: 10.0 },
            { range: "100-499元", count: 76, percent: 30.4 },
            { range: "500-999元", count: 75, percent: 30.0 },
            { range: "1000-4999元", count: 43, percent: 17.2 },
            { range: "5000-9999元", count: 21, percent: 8.4 },
            { range: "10000元及以上", count: 10, percent: 4.0 }
        ],
        playDuration: [
            { label: "开服玩家", count: 26, percent: 10.4 },
            { label: "1年以上", count: 64, percent: 25.6 },
            { label: "6-12个月", count: 83, percent: 33.2 },
            { label: "3-6个月", count: 55, percent: 22.0 },
            { label: "不足3个月", count: 22, percent: 8.8 }
        ],
        consumptionPatterns: [
            { label: "爆发式", count: 48, percent: 19.2 },
            { label: "规划式", count: 65, percent: 26.0 },
            { label: "全图鉴式", count: 9, percent: 3.6 },
            { label: "随缘式", count: 128, percent: 51.2 }
        ],
        inGamePurchaseWeights: [
            { type: "限定卡池", weight: 2.556, description: "权重值反映相对偏好强度" },
            { type: "资源礼包", weight: 2.328 },
            { type: "月卡特权", weight: 2.264 },
            { type: "外观皮肤", weight: 1.456 }
        ],
        externalPurchases: [
            { type: "官方周边", count: 108 },
            { type: "联名产品", count: 106 },
            { type: "同人周边/手工制品", count: 105 },
            { type: "COS委托等衍生服务", count: 104 },
            { type: "线下活动门票", count: 87 },
            { type: "不会购买这类产品", count: 5 },
            { type: "其他", count: 1 }
        ],
    },

    // 三种消费动因的整体描述统计
    motivations: {
        emotional: {
            name: "情感性动因",
            overall: { mean: 4.016, sd: 0.624, variance: 0.390, n: 250, min: 1.80, max: 5.00 },
            items: [
                { text: "我愿意为他付费，是因为他给我的感觉很像是我现实中渴望的理想伴侣。", mean: 4.48, sd: 0.689, factorLoading: 0.643 },
                { text: "当抽到或拥有某张限定卡时，我会产生一种“被他偏爱”或“只有我明白他”的独特情感联结。", mean: 3.88, sd: 0.926, factorLoading: 0.758 },
                { text: "在现实中感到孤独、压力大或情绪低落时，我更倾向于通过购买角色相关物品获得短暂慰藉。", mean: 3.93, sd: 0.998, factorLoading: 0.636 },
                { text: "获得喜欢的角色卡/周边后，我的心情明显改善，甚至能缓解现实焦虑。", mean: 3.86, sd: 0.877, factorLoading: 0.612 },
                { text: "如果某个角色的卡面长期无法获取，我会持续感到遗憾，而非单纯错过抽卡机会。", mean: 4.10, sd: 1.048, factorLoading: 0.802 }
            ]
        },
        social: {
            name: "社会性动因",
            overall: { mean: 2.948, sd: 0.917, variance: 0.841, n: 250, min: 1.40, max: 4.60 },
            items: [
                { text: "在社交平台分享我的抽卡记录或周边收藏，能让我感受到同好们的认可和归属感。", mean: 3.00, sd: 1.142, factorLoading: 0.798 },
                { text: "看到其他玩家分享限定卡面或周边时，有时会激起“我也想有”的消费欲望。", mean: 3.69, sd: 1.104, factorLoading: 0.689 },
                { text: "为了能更好地融入玩家圈子（如加入核心群、参与超话互动），我愿意投入一定的金钱，获得当期热门限定卡或周边。", mean: 2.88, sd: 1.257, factorLoading: 0.794 },
                { text: "如果付费能获得一些能体现“资深身份”的奖励（如高阶称号、稀有头像框、特定名片），我会更有动力买单。", mean: 3.04, sd: 1.415, factorLoading: 0.790 },
                { text: "我其实不太在意别人是否知道我买了什么，消费纯属个人喜好。（反向题）", mean: 2.12, sd: 1.091, factorLoading: 0.728 }
            ]
        },
        gameplay: {
            name: "游戏性动因",
            overall: { mean: 3.766, sd: 0.771, variance: 0.594, n: 250, min: 1.00, max: 5.00 },
            items: [
                { text: "我会因为“怕剧情看漏”或“怕拿不到限定”的后果，而产生一种必须消费的紧迫感。", mean: 3.92, sd: 1.051, factorLoading: 0.637 },
                { text: "即使那张卡属性一般，但为了“全图鉴”（集齐所有卡）带来的心理满足感，我也会去付费。", mean: 3.55, sd: 1.130, factorLoading: 0.673 },
                { text: "游戏里的“保底机制”、“限时开启”等设计，会极大地刺激我的消费冲动。", mean: 3.80, sd: 1.106, factorLoading: 0.719 },
                { text: "只要是“绝版”或“限定”的东西，哪怕我暂时用不上，我也会因为担心以后拿不到而买单。", mean: 3.70, sd: 0.953, factorLoading: 0.692 },
                { text: "为了更流畅地完成游戏任务或提升战斗效率（如增加体力、快速通关），我会选择付费购买相关道具或服务。", mean: 3.86, sd: 1.258, factorLoading: 0.767 }
            ]
        }
    },
    // 年龄差异 ANOVA 及 组均值
    ageDifferences: {
        emotional: {
            F: 14.091, p: 0.000, df1: 4, df2: 245,
            groupMeans: [
                { group: "18-22岁", mean: 3.6966, sd: 0.7157, n: 102 },
                { group: "23-25岁", mean: 4.2649, sd: 0.4227, n: 67 },
                { group: "26-29岁", mean: 4.2245, sd: 0.4642, n: 53 },
                { group: "30-34岁", mean: 4.2700, sd: 0.3314, n: 20 },
                { group: "35岁及以上", mean: 3.9875, sd: 0.5515, n: 8 }
            ],
            posthoc: "18-22岁显著低于23-25岁、26-29岁、30-34岁 (LSD & Tamhane, p<0.001)"
        },
        social: {
            F: 3.956, p: 0.004, df1: 4, df2: 245,
            groupMeans: [
                { group: "18-22岁", mean: 2.7137, sd: 0.8366, n: 102 },
                { group: "23-25岁", mean: 2.9821, sd: 0.9925, n: 67 },
                { group: "26-29岁", mean: 3.1245, sd: 0.8702, n: 53 },
                { group: "30-34岁", mean: 3.4000, sd: 0.9426, n: 20 },
                { group: "35岁及以上", mean: 3.3500, sd: 0.8264, n: 8 }
            ],
            posthoc: "18-22岁显著低于26-29岁、30-34岁 (LSD, p<0.01)"
        },
        gameplay: {
            F: 20.127, p: 0.000, df1: 4, df2: 245,
            groupMeans: [
                { group: "18-22岁", mean: 3.3098, sd: 0.8889, n: 102 },
                { group: "23-25岁", mean: 4.0776, sd: 0.4898, n: 67 },
                { group: "26-29岁", mean: 4.0943, sd: 0.4955, n: 53 },
                { group: "30-34岁", mean: 4.1600, sd: 0.3152, n: 20 },
                { group: "35岁及以上", mean: 3.8000, sd: 0.3703, n: 8 }
            ],
            posthoc: "18-22岁显著低于其他所有年龄组 (LSD & Tamhane, p<0.05); 35岁及以上显著低于23-25/26-29/30-34"
        }
    },
    // 身份差异 ANOVA 及 组均值
    identityDifferences: {
        emotional: {
            F: 10.327, p: 0.000, df1: 4, df2: 245,
            groupMeans: [
                { group: "在校学生", mean: 3.7824, sd: 0.7162, n: 119 },
                { group: "职场新人（1-3年）", mean: 4.0609, sd: 0.4612, n: 32 },
                { group: "资深职场人（3年以上）", mean: 4.2829, sd: 0.4294, n: 76 },
                { group: "个体商户/创业", mean: 4.4227, sd: 0.2714, n: 11 },
                { group: "自由职业者", mean: 4.1500, sd: 0.3587, n: 12 }
            ],
            posthoc: "在校学生显著低于职场新人、资深职场人、个体商户、自由职业者 (p<0.05)"
        },
        social: {
            F: 6.150, p: 0.000, df1: 4, df2: 245,
            groupMeans: [
                { group: "在校学生", mean: 2.7395, sd: 0.8622, n: 119 },
                { group: "职场新人（1-3年）", mean: 2.7563, sd: 0.8028, n: 32 },
                { group: "资深职场人（3年以上）", mean: 3.1658, sd: 0.9423, n: 76 },
                { group: "个体商户/创业", mean: 3.4909, sd: 0.9523, n: 11 },
                { group: "自由职业者", mean: 3.6500, sd: 0.7960, n: 12 }
            ],
            posthoc: "在校学生、职场新人显著低于资深职场人、个体商户、自由职业者 (p<0.05)"
        },
        gameplay: {
            F: 14.909, p: 0.000, df1: 4, df2: 245,
            groupMeans: [
                { group: "在校学生", mean: 3.4218, sd: 0.8810, n: 119 },
                { group: "职场新人（1-3年）", mean: 3.8562, sd: 0.5477, n: 32 },
                { group: "资深职场人（3年以上）", mean: 4.1579, sd: 0.4434, n: 76 },
                { group: "个体商户/创业", mean: 4.1273, sd: 0.4921, n: 11 },
                { group: "自由职业者", mean: 4.1167, sd: 0.2758, n: 12 }
            ],
            posthoc: "在校学生显著低于其他所有身份群体 (p<0.01)"
        }
    },

    // ==================== 消费控制力（Q26） ====================
    consumptionControl: [
        { option: "相对理性：偶尔会为了心仪内容小额“上头”，但总体可控。", count: 156, percent: 62.4 },
        { option: "容易冲动：经常在活动刺激下超出预算，随后感到压力。", count: 57, percent: 22.8 },
        { option: "非常克制：完全在计划内，从不冲动。", count: 27, percent: 10.8 },
        { option: "随心所欲：不太关注支出金额，只为当下的满足感买单。", count: 10, percent: 4.0 }
    ],

    // ==================== 情感投入对现实亲密关系的影响（Q27） ====================
    emotionalImpactOnRelationships: [
        { option: "显著影响，提高了我的择偶标准或对理想情感的认知。", count: 100, percent: 40.0 },
        { option: "有一定影响，让我更清楚自己想要什么样的陪伴，但也知道现实与虚拟的区别。", count: 99, percent: 39.6 },
        { option: "影响较小，仅仅是娱乐，不会把游戏中的标准带入现实。", count: 43, percent: 17.2 },
        { option: "完全没有影响。", count: 8, percent: 3.2 }
    ],

    // ==================== 单选题3：消费后悔/经济焦虑频率（Q29） ====================
    regretAnxietyFrequency: [
        { option: "经常出现：消费后常伴随经济压力或自我怀疑感。", count: 122, percent: 48.8 },
        { option: "偶尔出现：冷静下来后，会觉得某些支出其实没必要。", count: 79, percent: 31.6 },
        { option: "极少出现：只有在抽卡运气极差时会短暂郁闷。", count: 40, percent: 16.0 },
        { option: "从未有过：我觉得每一分钱花得都很值。", count: 9, percent: 3.6 }
    ],

    // 数据来源说明
    meta: {
        description: "基于250份有效问卷，运用SPSS进行描述统计、方差分析、相关与回归分析，所有数据均来自网络问卷调查。",
        collectionDate: "2026年2月至3月",
        validity: "各量表信度良好（α>0.7），KMO>0.7，巴特利特球形检验显著，结构效度达标。"
    }
};

// 导出供前端使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = data;
} else {
    window.gameData = data;
}