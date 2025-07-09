// Media Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Video loading optimization
    const videos = document.querySelectorAll('.video-item iframe');
    
    // Lazy loading for videos
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                    iframe.removeAttribute('data-src');
                }
                videoObserver.unobserve(iframe);
            }
        });
    });

    videos.forEach(video => {
        videoObserver.observe(video);
    });

    // Activity items animation
    const activityItems = document.querySelectorAll('.activity-item');
    
    const activityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    activityItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        activityObserver.observe(item);
    });

    // Video hover effects
    document.querySelectorAll('.video-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Statistics counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (target === 25 ? '+' : '');
        }, 20);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent.replace('+', '');
                animateCounter(target, parseInt(value));
                statsObserver.unobserve(target);
            }
        });
    });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Responsive video handling
    function handleVideoResize() {
        const videos = document.querySelectorAll('.video-item iframe');
        videos.forEach(video => {
            const container = video.parentElement;
            const containerWidth = container.offsetWidth;
            video.style.width = containerWidth + 'px';
            video.style.height = (containerWidth * 0.5625) + 'px'; // 16:9 aspect ratio
        });
    }

    window.addEventListener('resize', handleVideoResize);
    handleVideoResize(); // Initial call

    // Error handling for failed video loads
    videos.forEach(video => {
        video.addEventListener('error', function() {
            const container = this.parentElement;
            const errorDiv = document.createElement('div');
            errorDiv.className = 'video-error';
            errorDiv.innerHTML = '<p>Video temporarily unavailable</p>';
            errorDiv.style.cssText = `
                background: #f8f9fa;
                border: 2px dashed #dee2e6;
                height: 225px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
            `;
            container.replaceChild(errorDiv, this);
        });
    });

    // Print functionality
    window.addEventListener('beforeprint', function() {
        // Hide videos during print to avoid issues
        videos.forEach(video => {
            video.style.display = 'none';
        });
    });

    window.addEventListener('afterprint', function() {
        // Show videos after print
        videos.forEach(video => {
            video.style.display = 'block';
        });
    });
});

// Export functionality for future use
window.MediaDashboard = {
    init: function() {
        console.log('Media Dashboard initialized');
    },
    
    refreshVideos: function() {
        // Refresh video embeds if needed
        const videos = document.querySelectorAll('.video-item iframe');
        videos.forEach(video => {
            const src = video.src;
            video.src = '';
            video.src = src;
        });
    }
};
