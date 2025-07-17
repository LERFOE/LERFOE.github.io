// Riboo with Temboo - 主交互脚本

class RibooApp {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.setupCardInteractions();
        this.setupModal();
        this.setupSearch();
        this.setupTOC();
    }

    // 创建背景粒子
    createParticles() {
        const particleContainer = document.querySelector('.bg-particles');
        if (!particleContainer) return;

        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particleContainer.appendChild(particle);
        }
    }

    // 设置卡片交互
    setupCardInteractions() {
        const cards = document.querySelectorAll('.post-card');
        
        cards.forEach(card => {
            // 鼠标悬停高光效果
            card.addEventListener('mouseenter', (e) => {
                this.createCardGlow(e, card);
            });

            card.addEventListener('mouseleave', (e) => {
                this.removeCardGlow(card);
            });

            // 鼠标移动反光效果
            card.addEventListener('mousemove', (e) => {
                this.updateCardReflection(e, card);
            });

            // 点击打开模态框
            card.addEventListener('click', () => {
                const postId = card.dataset.post;
                this.openArticleModal(postId);
            });
        });
    }

    // 创建卡片发光效果
    createCardGlow(event, card) {
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.opacity = '1';
        }
    }

    // 移除卡片发光效果
    removeCardGlow(card) {
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.opacity = '0';
        }
    }

    // 更新卡片反光效果
    updateCardReflection(event, card) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${deltaY * 5}deg) 
            rotateY(${deltaX * 5}deg) 
            translateZ(10px)
        `;
    }

    // 设置模态框
    setupModal() {
        this.modal = document.getElementById('article-modal');
        this.modalContent = document.querySelector('.modal-content');
        this.modalClose = document.getElementById('modal-close');
        this.articleContent = document.getElementById('article-content');

        if (!this.modal) return;

        // 关闭按钮
        this.modalClose.addEventListener('click', () => {
            this.closeArticleModal();
        });

        // 点击背景关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeArticleModal();
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeArticleModal();
            }
        });
    }

    // 打开文章模态框
    async openArticleModal(postId) {
        try {
            // 获取文章内容
            const response = await fetch(`/posts/${postId}/index.html`);
            const html = await response.text();
            
            // 提取主要内容
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.querySelector('.post-content') || doc.body;
            
            this.articleContent.innerHTML = content.innerHTML;
            
            // 生成目录
            this.generateTOC(content);
            
            // 显示模态框
            this.modal.classList.add('active');
            
            // 添加3D翻转动画
            setTimeout(() => {
                this.modalContent.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
            }, 50);
            
            // 禁止背景滚动
            document.body.style.overflow = 'hidden';
            
        } catch (error) {
            console.error('加载文章失败:', error);
            this.articleContent.innerHTML = '<p>加载文章失败，请稍后重试。</p>';
            this.modal.classList.add('active');
        }
    }

    // 关闭文章模态框
    closeArticleModal() {
        // 添加关闭动画
        this.modalContent.style.transform = 'perspective(1000px) rotateY(90deg) scale(0.8)';
        
        setTimeout(() => {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
            this.articleContent.innerHTML = '';
        }, 300);
    }

    // 生成目录
    generateTOC(content) {
        const headings = content.querySelectorAll('h2, h3, h4');
        const tocNav = document.getElementById('toc-nav');
        
        if (!tocNav || headings.length === 0) return;

        tocNav.innerHTML = '';
        
        headings.forEach((heading, index) => {
            const link = document.createElement('a');
            link.href = `#heading-${index}`;
            link.textContent = heading.textContent;
            link.className = `toc-link toc-level-${heading.tagName.toLowerCase()}`;
            
            heading.id = `heading-${index}`;
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth' });
            });
            
            tocNav.appendChild(link);
        });
    }

    // 设置搜索功能
    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        
        if (!searchInput || !searchResults) return;

        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                this.performSearch(query, searchResults);
            }, 300);
        });

        // 点击外部关闭搜索结果
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-search')) {
                searchResults.style.display = 'none';
            }
        });
    }

    // 执行搜索
    async performSearch(query, resultsContainer) {
        try {
            // 这里应该实现实际的搜索逻辑
            // 暂时使用模拟数据
            const mockResults = [
                { title: '示例文章 1', url: '/posts/example1', excerpt: '这是示例文章的摘要...' },
                { title: '示例文章 2', url: '/posts/example2', excerpt: '这是另一篇示例文章的摘要...' }
            ];
            
            resultsContainer.innerHTML = '';
            
            mockResults.forEach(result => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `
                    <h4>${result.title}</h4>
                    <p>${result.excerpt}</p>
                `;
                
                item.addEventListener('click', () => {
                    window.location.href = result.url;
                });
                
                resultsContainer.appendChild(item);
            });
            
            resultsContainer.style.display = 'block';
            
        } catch (error) {
            console.error('搜索失败:', error);
        }
    }

    // 设置目录功能
    setupTOC() {
        const tocToggle = document.createElement('button');
        tocToggle.className = 'toc-toggle';
        tocToggle.innerHTML = '目录';
        tocToggle.style.cssText = `
            position: fixed;
            right: 2rem;
            bottom: 2rem;
            background: var(--primary-blue);
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            transition: var(--transition-normal);
        `;
        
        document.body.appendChild(tocToggle);
        
        const tocModal = document.getElementById('toc-modal');
        const tocClose = document.getElementById('toc-close');
        
        if (tocModal) {
            tocToggle.addEventListener('click', () => {
                tocModal.classList.add('active');
            });
            
            tocClose.addEventListener('click', () => {
                tocModal.classList.remove('active');
            });
        }
    }

    // 平滑滚动
    smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// 搜索功能
class SearchEngine {
    constructor() {
        this.index = new Map();
        this.init();
    }

    async init() {
        // 构建搜索索引
        await this.buildIndex();
    }

    async buildIndex() {
        // 获取所有文章
        const posts = document.querySelectorAll('.post-card');
        posts.forEach(post => {
            const title = post.querySelector('.card-title').textContent;
            const excerpt = post.querySelector('.card-excerpt').textContent;
            const tags = Array.from(post.querySelectorAll('.card-tag')).map(tag => tag.textContent);
            
            this.index.set(post.dataset.post, {
                title: title.toLowerCase(),
                excerpt: excerpt.toLowerCase(),
                tags: tags.map(t => t.toLowerCase())
            });
        });
    }

    search(query) {
        query = query.toLowerCase();
        const results = [];
        
        for (const [id, data] of this.index) {
            let score = 0;
            
            if (data.title.includes(query)) score += 3;
            if (data.excerpt.includes(query)) score += 2;
            if (data.tags.some(tag => tag.includes(query))) score += 1;
            
            if (score > 0) {
                results.push({ id, score, ...data });
            }
        }
        
        return results.sort((a, b) => b.score - a.score);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new RibooApp();
    new SearchEngine();
});

// 添加鼠标跟随反光效果
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.post-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const lightX = 50 + deltaX * 25;
            const lightY = 50 + deltaY * 25;
            
            card.style.setProperty('--light-x', `${lightX}%`);
            card.style.setProperty('--light-y', `${lightY}%`);
        }
    });
});
