

(() => {
  const postsContainer = document.getElementById('posts-container');
  const newPostForm = document.getElementById('new-post-form');

  const STORAGE_KEY = 'forumPosts';
  const USER_KEY = 'forumCurrentUser';
  const PLACEHOLDER = 'blank-profile-picture-973460_1280.png'; // put your custom placeholder image in same folder

  // Utility: escape text to prevent HTML injection
  function escapeHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Load / Save
  let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  let currentUsername = localStorage.getItem(USER_KEY) || '';

  function savePosts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }

  function setCurrentUser(username) {
    currentUsername = username || '';
    if (currentUsername) localStorage.setItem(USER_KEY, currentUsername);
    else localStorage.removeItem(USER_KEY);
  }

  // Helper: returns true if current user is admin
  function isAdmin() {
    return String(currentUsername).toLowerCase() === 'admin';
  }

  // Render posts
  function renderPosts() {
    postsContainer.innerHTML = '';

    const sortedPosts = [...posts].sort((a, b) => {
  return (b.pinned === true) - (a.pinned === true);
});

    posts.forEach((post, index) => {
      const postAuthor = escapeHTML(post.username || 'Anonymous');
      const postTitle = escapeHTML(post.title || '(no title)');
      const postContent = escapeHTML(post.content || '');
      const profilePic = post.profilePic ? escapeHTML(post.profilePic) : PLACEHOLDER;
      const owner = (post.username || '') === currentUsername;
      const canDelete = isAdmin() || owner;

      // build replies markup
      const repliesHtml = (post.replies || []).map(reply => {
        const rUser = escapeHTML(reply.username || 'Anonymous');
        const rContent = escapeHTML(reply.content || '');
        const rPic = reply.profilePic ? escapeHTML(reply.profilePic) : PLACEHOLDER;
        return `
          <div class="reply">
            <img src="${rPic}" alt="Profile" class="profile-pic" onerror="this.src='${PLACEHOLDER}'">
            <strong>${rUser}:</strong>
            <span class="reply-text">${rContent}</span>
          </div>
        `;
      }).join('');

      // main post element
      const postElement = document.createElement('div');
      postElement.className = 'post';
      postElement.dataset.index = index;
      postElement.innerHTML = `
        <h3>${postTitle}</h3>
        <p class="post-meta">
          <img src="${profilePic}" alt="Profile" class="profile-pic" onerror="this.src='${PLACEHOLDER}'">
          <strong>${postAuthor}</strong> said:
        </p>
        <p class="post-content">${postContent}</p>
        ${canDelete ? `<button class="delete-btn" data-index="${index}">Delete</button>` : ''}
        ${isAdmin() ? `<button class="pin-btn" data-index="${index}">${post.pinned ? 'Unpin' : 'Pin'}</button>` : ''}
        <div class="replies">${repliesHtml}</div>
        <form class="reply-form" data-post-index="${index}">
          <input type="text" class="reply-name" placeholder="Your Name" required value="${escapeHTML(currentUsername)}">
          <input type="url" class="reply-pic" placeholder="Profile Picture URL (optional)">
          <textarea class="reply-content" placeholder="Reply..." required></textarea>
          <button type="submit">Reply</button>
        </form>
      `;
      postsContainer.appendChild(postElement);
    });
  }

  // New post submit
  newPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameInput = newPostForm.querySelector('#username');
    const picInput = newPostForm.querySelector('#profile-pic');
    const titleInput = newPostForm.querySelector('#title');
    const contentInput = newPostForm.querySelector('#content');

    const username = (usernameInput.value || '').trim();
    const profilePic = (picInput.value || '').trim();
    const title = (titleInput.value || '').trim();
    const content = (contentInput.value || '').trim();

    if (!username || !title || !content) return;

    // persist current user
    setCurrentUser(username);

    posts.push({
      username,
      profilePic: profilePic || '',
      title,
      content,
      replies: []
    });

    savePosts();
    renderPosts();
    newPostForm.reset();
    // set the username field to current user for convenience
    usernameInput.value = currentUsername;
  });

  // Delegated reply submit & delete button
  postsContainer.addEventListener('submit', (e) => {
    const form = e.target.closest('.reply-form');
    if (!form) return;
    e.preventDefault();

    const postIndex = Number(form.dataset.postIndex);
    const nameInput = form.querySelector('.reply-name');
    const picInput = form.querySelector('.reply-pic');
    const contentInput = form.querySelector('.reply-content');

    const username = (nameInput.value || '').trim();
    const profilePic = (picInput.value || '').trim();
    const content = (contentInput.value || '').trim();

    if (!username || !content) return;

    setCurrentUser(username);

    const replyObj = { username, profilePic: profilePic || '', content };
    posts[postIndex].replies.push(replyObj);

    savePosts();
    renderPosts();
  });

  postsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('pin-btn')) {
    const idx = Number(e.target.dataset.index);
    posts[idx].pinned = !posts[idx].pinned;
    savePosts();
    renderPosts();
    return;
}
    
    // Delete
    if (e.target.classList.contains('delete-btn')) {
      const idx = Number(e.target.dataset.index);
      const post = posts[idx];
      if (!post) return;

      // Check permission again (owner or admin)
      if (!(isAdmin() || (post.username === currentUsername))) {
        alert('You do not have permission to delete this post.');
        return;
      }

      if (!confirm('Are you sure you want to delete this post?')) return;

      posts.splice(idx, 1);
      savePosts();
      renderPosts();
    }
  });

  // Initial populate username field if current user exists
  function initFormUsername() {
    const usernameField = document.getElementById('username');
    if (!usernameField) return;
    usernameField.value = currentUsername || '';
  }

  // Run initial render
  initFormUsername();
  renderPosts();
})();
posts.push({
  username,
  profilePic: profilePic || '',
  title,
  content,
  replies: [],
  pinned: false
});
