class BackgroundAnimation {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Array<{
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        opacity: number;
    }> = [];
    private mouseX: number = 0;
    private mouseY: number = 0;
    private currentColor: string = '#E1E1E1';
    private readonly PARTICLE_COUNT = 50;
    private isActive: boolean = true;
    private rafId: number | null = null;

    constructor() {
        this.setupCanvas();
        this.createParticles();
        this.addEventListeners();
        this.animate();
        this.initScrollTrigger();
    }

    private setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d')!;

        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100vh';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';

        this.updateCanvasSize();
        document.body.appendChild(this.canvas);
    }

    private updateCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private createParticles() {
        this.particles = [];
        for (let i = 0; i < this.PARTICLE_COUNT; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 0.2 - 0.1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    private addEventListeners() {
        window.addEventListener('resize', () => {
            this.updateCanvasSize();
            this.createParticles();
        })

        window.addEventListener('mouseleave', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        })

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.isActive = false;
                if (this.rafId) cancelAnimationFrame(this.rafId);
            } else {
                this.isActive = true;
                this.animate();
            }
        })
    }

    private animete = () => {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.currentColor;

        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                particle.x -= (dx * 0.01);
                particle.y -= (dy * 0.01);
            }

            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.x > this.canvas.height) particle.speedY *= -1;

            this.ctx.beginPath();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        })

        this.rafId = requestAnimationFrame(this.animate);
    }

    private initScrollTrigger() {
        gsap.registerPlugin(ScrollTrigger);

        const sections = document.querySelectorAll('.section');

        sections.forEach((section, index) => {
            const nextSection = sections[index + 1];

            ScrollTrigger.create({
                trigger: section,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => this.updateBackground(section, nextSection),
                onEnterBack: () => this.updateBackground(section, nextSection)
            })
        })
    }
}