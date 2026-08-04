document.addEventListener('DOMContentLoaded', () => {
    // Busca os dados do seu arquivo data.json local
    fetch('https://raw.githubusercontent.com/OposPro/T0Y9/refs/heads/main/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(data => {
            renderStories(data.stories);
            renderPosts(data.posts);
        })
        .catch(error => console.error('Erro na requisição dos dados:', error));
});

// --- FUNÇÃO: RENDERIZAR STORIES ---
function renderStories(stories) {
    const storiesList = document.getElementById('stories-list');
    if (!storiesList) return;
    
    storiesList.innerHTML = '';
    stories.forEach(story => {
        const storyItem = document.createElement('div');
        storyItem.classList.add('story-item');
        
        // Define a borda do story (colorida, cinza ou sem borda se for o usuário)
        const ringClass = story.is_user ? 'user-story' : (story.has_story ? 'active-story' : '');
        
        storyItem.innerHTML = `
            <div id="${story.id}" class="story-ring ${ringClass}">
                <img src="${story.image}" alt="${story.username}">
                ${story.is_user ? '<div class="add-story-btn"><i class="fa-solid fa-plus"></i></div>' : ''}
            </div>
            <span class="story-username">${story.username}</span>
        `;
        storiesList.appendChild(storyItem);
        
    });
}

// --- FUNÇÃO: RENDERIZAR POSTS ---
function renderPosts(posts) {
    const feedContainer = document.getElementById('feed-post');
    if (!feedContainer) return;
    
    feedContainer.innerHTML = ''; 

    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.classList.add('post-card');
        postElement.style.marginBottom = '24px'; 

        postElement.innerHTML = `
            <div  class="post-header">
                <div class="post-header-left">
                    <img src="${post.author_avatar}" alt="${post.author}" class="post-avatar">
                    <div class="post-meta">
                        <div class="username-row">
                            <span>${post.author}</span>
                            ${post.verified ? '<i class="fa-solid fa-circle-check verified-icon"></i>' : ''}
                        </div>
                        <div class="audio-row">
                            <i class="fa-solid fa-music"></i>
                            <span>${post.audio}</span>
                        </div>
                    </div>
                </div>
                <div class="post-options"><i class="fa-solid fa-ellipsis-vertical"></i></div>
            </div>
            
            <div class="post-media" id="media-box-${post.id}" style="position: relative; width: 100%; aspect-ratio: 4/5;">
                <img src="${post.post_image}" alt="Post Image" style="width: 100%; height: 100%; object-fit: cover;">
                <div class="like-heart-overlay" id="heart-${post.id}"><i class="fa-solid fa-heart"></i></div>
            </div>

            <div class="post-footer" style="padding: 12px 16px; font-size: 14px;">
                <div class="post-actions-icons" style="display: flex; gap: 16px; font-size: 20px; margin-bottom: 8px;">
                    <i class="fa-regular fa-heart" style="cursor:pointer;"></i>
                    <i class="fa-regular fa-comment" style="cursor:pointer;"></i>
                    <i class="fa-regular fa-paper-plane" style="cursor:pointer;"></i>
                </div>
                <p style="font-weight: 600; margin-bottom: 6px;">${post.likes} curtidas</p>
                <p><span style="font-weight: 600; margin-right: 6px;">${post.author}</span>${post.caption}</p>
                <p style="font-size: 11px; color: #a8a8a8; margin-top: 6px;">${post.time_ago}</p>
            </div>
        `;

        feedContainer.appendChild(postElement);

        // Configura o Double Click do Coração para cada post individualmente
        const mediaBox = document.getElementById(`media-box-${post.id}`);
        const heartOverlay = document.getElementById(`heart-${post.id}`);

        if (mediaBox && heartOverlay) {
            mediaBox.addEventListener('dblclick', () => {
                heartOverlay.classList.add('animate');
                setTimeout(() => { heartOverlay.classList.remove('animate'); }, 700);
                
                
            });
        }
        let ebb = [`${post.id}`]
        let xc = `${post.id}`;
    let cot = xc.length;
    console.log(cot)
                 let tt = ebb[Math.floor(Math.random() * cot)]
                 window.location.href=`#media-box-${tt}`;
    });
    
    
                
}
