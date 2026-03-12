// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化音乐播放器
    const audio = document.getElementById('background-music');
    
    // 解决浏览器自动播放限制 - 点击页面任意位置触发播放
    let playInitiated = false;
    document.addEventListener('click', function() {
        if (!playInitiated) {
            audio.play().catch(err => {
                console.log('请手动点击播放按钮开启音乐:', err);
            });
            playInitiated = true;
        }
    }, { once: true });

    // 音乐播放/暂停切换
    const musicControl = document.querySelector('.music-control');
    musicControl.addEventListener('click', function(e) {
        // 防止点击音频控件时触发父元素事件
        if (e.target.tagName !== 'AUDIO') {
            if (audio.paused) {
                audio.play();
                this.style.background = 'rgba(118, 75, 162, 0.95)';
            } else {
                audio.pause();
                this.style.background = 'rgba(118, 75, 162, 0.7)';
            }
        }
    });

    // 轮播图自动播放设置（唯一初始化入口）
    const carousel = new bootstrap.Carousel(document.getElementById('memoryCarousel'), {
        interval: 5000, // 5秒切换一次
        pause: 'hover', // 鼠标悬停时暂停
        wrap: true,     // 循环播放
        touch: true     // 支持触屏滑动
    });

    // 滚动时音乐控件的动画效果
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (scrollY > 300) {
            musicControl.style.transform = 'translateY(0)';
            musicControl.style.opacity = '1';
        } else {
            musicControl.style.transform = 'translateY(100px)';
            musicControl.style.opacity = '0';
        }
    });

    // 初始化音乐控件位置
    musicControl.style.transition = 'all 0.3s ease';
    musicControl.style.transform = 'translateY(100px)';
    musicControl.style.opacity = '0';
});