// Video Player System for FilipiKnow Premium
class VideoPlayer {
    constructor() {
        this.modal = document.getElementById('videoModal');
        this.video = document.getElementById('storyVideo');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close video modal
        document.querySelector('.close-video')?.addEventListener('click', () => {
            this.close();
        });

        // Close on outside click
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.close();
            }
        });

        // Play buttons (delegated)
        document.addEventListener('click', (e) => {
            const playBtn = e.target.closest('.story-play-btn, .preview-overlay .btn, #watchStories');
            if (playBtn) {
                e.preventDefault();
                let videoSrc = '';

                if (playBtn.dataset.video) {
                    videoSrc = playBtn.dataset.video;
                } else if (playBtn.closest('.featured-story')) {
                    videoSrc = 'videos/featured-story.mp4';
                } else {
                    videoSrc = 'videos/demo-story.mp4';
                }

                this.play(videoSrc);
            }
        });
    }

    play(videoSrc) {
        if (!this.modal || !this.video) return;

        // Set video source
        this.video.src = videoSrc;

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Play video after a short delay to ensure modal is visible
        setTimeout(() => {
            this.video.play().catch(e => {
                console.log('Video play failed:', e);
                auth.showNotification('Unable to play video. Please try again.', 'error');
            });
        }, 300);
    }

    close() {
        if (!this.modal || !this.video) return;

        // Pause video
        this.video.pause();
        this.video.currentTime = 0;

        // Hide modal
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    playStoryVideo(videoUrl) {
        this.play(videoUrl);
    }
}

// Initialize video player
const videoPlayer = new VideoPlayer();
window.videoPlayer = videoPlayer;