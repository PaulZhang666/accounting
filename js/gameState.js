// 游戏状态管理
class GameState {
    constructor() {
        this.storageKey = 'accounting_game_progress';
        this.loadProgress();
    }

    // 加载进度
    loadProgress() {
        const saved = localStorage.getItem(this.storageKey);
        this.progress = saved ? JSON.parse(saved) : {
            completedLevels: [],
            currentLevel: 1,
            totalScore: 0
        };
    }

    // 保存进度
    saveProgress() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
    }

    // 完成关卡
    completeLevel(levelId, score = 0) {
        if (!this.progress.completedLevels.includes(levelId)) {
            this.progress.completedLevels.push(levelId);
        }
        this.progress.currentLevel = Math.max(this.progress.currentLevel, levelId + 1);
        this.progress.totalScore += score;
        this.saveProgress();
    }

    // 检查关卡是否解锁
    isLevelUnlocked(levelId) {
        return levelId <= this.progress.currentLevel;
    }

    // 检查关卡是否完成
    isLevelCompleted(levelId) {
        return this.progress.completedLevels.includes(levelId);
    }

    // 获取当前关卡
    getCurrentLevel() {
        return this.progress.currentLevel;
    }

    // 重置进度
    resetProgress() {
        localStorage.removeItem(this.storageKey);
        this.loadProgress();
    }
}

// 全局游戏状态实例
const gameState = new GameState();
