// Live2D兼容性修复脚本
window.addEventListener('load', function() {
    // 监听Live2D加载事件
    const originalLog = console.log;
    console.log = function(...args) {
        if (args[0] && args[0].includes('not supported mask count')) {
            console.warn('检测到遮罩兼容性问题，尝试修复...');
            attemptFix();
        }
        originalLog.apply(console, args);
    };

    function attemptFix() {
        // 延迟执行，确保Live2D完全加载
        setTimeout(() => {
            if (window.OhMyLive2D && window.OhMyLive2D.instances.length > 0) {
                const instance = window.OhMyLive2D.instances[0];

                // 尝试禁用高级渲染功能
                if (instance.model && instance.model.coreModel) {
                    try {
                        // 强制设置简化模式
                        instance.model.forceSimplifiedRendering = true;
                        console.log('已启用简化渲染模式');
                    } catch (e) {
                        console.log('简化渲染设置失败:', e);
                    }
                }
            }
        }, 2000);
    }
});