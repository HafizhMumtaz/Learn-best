// Define levels with prerequisites and content
const levels = [
    { id: 1, name: "Basics", description: "Learn the fundamentals.", prerequisites: [], xp: 10, content: level1Content },
    { id: 2, name: "Intermediate A", description: "Build on basics.", prerequisites: [1], xp: 20, content: level2Content },
    { id: 3, name: "Intermediate B", description: "Another path.", prerequisites: [1], xp: 20, content: level3Content },
    { id: 4, name: "Advanced", description: "Master complex skills.", prerequisites: [2], xp: 30, content: level4Content },
    { id: 5, name: "Expert", description: "Become an expert.", prerequisites: [3, 4], xp: 50, content: level5Content }
];

// XP thresholds
const xpLevels = [0, 50, 100, 200, 400];

let currentUser = null;
let userData = {};
let currentLevel = null;

// Level content functions (each returns an array of question objects)
function level1Content() {
    return [
        {
            question: "What is 'Hello' in Indonesian? (Sundanese: 'Halo' is similar)",
            options: ["Selamat pagi", "Halo", "Terima kasih", "Sampai jumpa"],
            correct: 1,
            funFact: "Fun fact: 'Halo' is used in both Indonesian and Sundanese for greetings, influenced by English!"
        },
        {
            question: "What is 2 + 3? (Basic math: addition)",
            options: ["4", "5", "6", "7"],
            correct: 1,
            funFact: "Fun fact: Addition is the foundation of all math, used in counting objects like fruits in Indonesia!"
        },
        {
            question: "What is 'Thank you' in Sundanese? (Indonesian: 'Terima kasih')",
            options: ["Hatur nuhun", "Sampurasun", "Wilujeng", "Sugeng"],
            correct: 0,
            funFact: "Fun fact: 'Hatur nuhun' literally means 'with all my heart' in Sundanese, showing deep gratitude!"
        }
    ];
}

function level2Content() {
    return [
        {
            question: "Translate 'How are you?' to Indonesian. (Sundanese: 'Kumaha damang?')",
            options: ["Apa kabar?", "Siapa nama kamu?", "Dimana rumahmu?", "Berapa umurmu?"],
            correct: 0,
            funFact: "Fun fact: 'Apa kabar?' is a common polite greeting in Indonesia, often answered with 'Baik' (good)!"
        },
        {
            question: "What part of a plant absorbs water? (Biology: plant structure)",
            options: ["Leaves", "Roots", "Stem", "Flowers"],
            correct: 1,
            funFact: "Fun fact: Roots can grow up to 3 meters deep in some plants, like the banyan trees in Indonesia!"
        },
        {
            question: "What is 'Good morning' in Sundanese? (Indonesian: 'Selamat pagi')",
            options: ["Wilujeng enjing", "Sugeng siang", "Raharja peuting", "Dalem maya"],
            correct: 0,
            funFact: "Fun fact: Sundanese greetings often reflect nature, like 'enjing' meaning morning light!"
        }
    ];
}

function level3Content() {
    return [
        {
            question: "Complete the sentence: 'Saya suka makan ____.' (I like to eat ____.) Indonesian",
            options: ["nasi", "mobil", "buku", "rumah"],
            correct: 0,
            funFact: "Fun fact: Rice ('nasi') is a staple in Indonesia, consumed in over 70% of meals!"
        },
        {
            question: "Solve: 2x + 3 = 7. What is x? (Math: algebra)",
            options: ["1", "2", "3", "4"],
            correct: 1,
            funFact: "Fun fact: Algebra originated from ancient civilizations, including contributions from Indian mathematicians!"
        },
        {
            question: "What is 'My name is' in Sundanese? (Indonesian: 'Nama saya')",
            options: ["Abdi", "Kuring", "Urang", "Nami"],
            correct: 1,
            funFact: "Fun fact: 'Kuring' is informal Sundanese for 'I', used among friends in West Java!"
        }
    ];
}

function level4Content() {
    return [
        {
            question: "Translate: 'Where is the market?' to Indonesian. (Sundanese: 'Dimana pasar?')",
            options: ["Dimana pasar?", "Berapa harga?", "Apa ini?", "Siapa dia?"],
            correct: 0,
            funFact: "Fun fact: Indonesian markets ('pasar') are vibrant hubs for culture and trade in Southeast Asia!"
        },
        {
            question: "What is the area of a square with side 4? (Math: geometry)",
            options: ["8", "12", "16", "20"],
            correct: 2,
            funFact: "Fun fact: Geometry helps design traditional Indonesian batik patterns with precise shapes!"
        },
        {
            question: "What is 'Please' in Sundanese? (Indonesian: 'Tolong' or 'Silakan')",
            options: ["Punten", "Hatur nuhun", "Kumaha", "Wilujeng"],
            correct: 0,
            funFact: "Fun fact: 'Punten' shows politeness, a key value in Sundanese culture!"
        },
        {
            question: "What do leaves do in photosynthesis? (Biology: plant function)",
            options: ["Absorb sunlight", "Store water", "Grow roots", "Produce seeds"],
            correct: 0,
            funFact: "Fun fact: Photosynthesis produces oxygen—Indonesia's rainforests are vital for global air quality!"
        }
    ];
}

function level5Content() {
    return [
        {
            question: "Translate a full sentence: 'I am going to school by bus.' to Indonesian.",
            options: ["Saya pergi ke sekolah dengan bis.", "Saya makan nasi.", "Saya suka musik.", "Saya tidur malam."],
            correct: 0,
            funFact: "Fun fact: Indonesia has over 17,000 islands, making transportation diverse and educational!"
        },
        {
            question: "Solve: ∫(2x) dx from 0 to 2. (Math: calculus)",
            options: ["2", "4", "6", "8"],
            correct: 1,
            funFact: "Fun fact: Calculus was developed by Newton and Leibniz, revolutionizing physics and engineering!"
        },
        {
            question: "What is DNA's role in cells? (Biology: genetics)",
            options: ["Energy storage", "Genetic code carrier", "Waste removal", "Cell structure"],
            correct: 1,
            funFact: "Fun fact: DNA sequencing has revealed Indonesia's biodiversity, including unique species like the Komodo dragon!"
        },
        {
            question: "What is 'I love you' in Sundanese? (Indonesian: 'Aku cinta kamu')",
            options: ["Abdi bogoh ka anjeun", "Kuring resep ka maneh", "Urang cinta", "Dalem bogoh"],
            correct: 0,
            funFact: "Fun fact: Sundanese expressions often use poetic words, reflecting the region's artistic heritage!"
        },
        {
            question: "Calculate the volume of a sphere with radius 3. (Math: 3D geometry, use π≈3.14)",
            options: ["28.26", "113.04", "84.78", "56.52"],
            correct: 1,
            funFact: "Fun fact: Spheres appear in nature, like Earth, and in Indonesian crafts like woven balls!"
        }
    ];
}

// Load user data
function loadUserData() {
    const data = localStorage.getItem('skillTreeUsers');
    if (data) {
        userData = JSON.parse(data);
    }
}

// Save user data
function saveUserData() {
    localStorage.setItem('skillTreeUsers', JSON.stringify(userData));
}

// Initialize user progress
function initUserProgress(username) {
    if (!userData[username]) {
        userData[username] = {
            completedLevels: [],
            xp: 0,
            notes: ''
        };
    }
    currentUser = username;
    updateUI();
    renderSkillTree();
    loadNotes();
}

// Update UI
function updateUI() {
    if (currentUser) {
        document.getElementById('username-display').textContent = `Welcome, ${currentUser}!`;
        document.getElementById('logout-btn').style.display = 'inline';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('level-content').style.display = 'none';
        updateXP();
    } else {
        document.getElementById('username-display').textContent = '';
        document.getElementById('logout-btn').style.display = 'none';
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('level-content').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    }
}

// Handle auth
function handleAuth(isSignup) {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const message = document.getElementById('login-message');
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!username || !password) {
        message.textContent = 'Please fill in all fields.';
        return;
    }
    
    if (isSignup) {
        if (userData[username]) {
            message.textContent = 'Username already exists.';
            return;
        }
        userData[username] = { password, completedLevels: [], xp: 0, notes: '' };
        message.textContent = 'Account created! Please log in.';
    } else {
        if (!userData[username] || userData[username].password !== password) {
            message.textContent = 'Invalid username or password.';
            return;
        }
        initUserProgress(username);
        localStorage.setItem('autoLoginUser', username);

        if (rememberMe) {
        localStorage.setItem('autoLoginUser', username);
    } else {
        localStorage.removeItem('autoLoginUser');
    }

    message.textContent = '';
    saveUserData();
}
}


    

   



    


// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('autoLoginUser');;
    updateUI();
}

// Check if level unlocked
function isLevelUnlocked(level) {
    return level.prerequisites.every(prereq => userData[currentUser].completedLevels.includes(prereq));
}

// Render skill tree
function renderSkillTree() {
    const container = document.getElementById('levels-container');
    container.innerHTML = '';
    levels.forEach(level => {
        const div = document.createElement('div');
        const completed = userData[currentUser].completedLevels.includes(level.id);
        const unlocked = isLevelUnlocked(level) || completed;
        div.className = `level ${completed ? 'completed' : unlocked ? '' : 'locked'}`;
        div.innerHTML = `<h3>${level.name}</h3><p>${level.description}</p><p>XP: ${level.xp}</p>`;
        if (unlocked && !completed) {
            div.addEventListener('click', () => {
                currentLevel = level;
                showLevelContent(level);
            });
        }
        container.appendChild(div);
    });
}

// Show level content
function showLevelContent(level) {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('level-content').style.display = 'block';
    document.getElementById('level-title').textContent = level.name;
    
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    
    const questions = level.content();
    let questionIndex = 0;
    
    function renderQuestion() {
        if (questionIndex >= questions.length) {
            // Level completed
            // Avoid duplicate entries if level already recorded
            if (!userData[currentUser].completedLevels.includes(level.id)) {
                userData[currentUser].completedLevels.push(level.id);
            }
            userData[currentUser].xp += level.xp;
            saveUserData();
            updateXP();
            alert(`Level completed! Earned ${level.xp} XP.`);
            // Re-render the skill tree so newly unlocked levels become clickable
            renderSkillTree();
            updateUI();
            return;
        }
        
        const q = questions[questionIndex];
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `<h3>${q.question}</h3>`;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quiz-options';
        
        q.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.textContent = option;
            btn.addEventListener('click', () => {
                // Disable all buttons
                optionsDiv.querySelectorAll('button').forEach(b => b.disabled = true);
                
                if (index === q.correct) {
                    btn.classList.add('correct');
                    // Show fun fact
                    const factDiv = document.createElement('div');
                    factDiv.className = 'fun-fact';
                    factDiv.textContent = q.funFact;
                    factDiv.style.display = 'block';
                    questionDiv.appendChild(factDiv);
                    
                    // Move to next question after a short delay
                    setTimeout(() => {
                        questionIndex++;
                        renderQuestion();
                    }, 3000); // 3 seconds to read fun fact
                } else {
                    btn.classList.add('incorrect');
                    // Allow retry or show correct answer
                    alert('Incorrect! Try again.');
                    optionsDiv.querySelectorAll('button').forEach(b => b.disabled = false);
                }
            });
            optionsDiv.appendChild(btn);
        });
        
        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    }
    
    renderQuestion();
}

// Update XP display and bar
function updateXP() {
    const xp = userData[currentUser].xp;
    document.getElementById('total-xp').textContent = xp;
    const currentLevelIndex = xpLevels.findIndex(threshold => xp < threshold) - 1;
    const nextThreshold = xpLevels[currentLevelIndex + 1] || xpLevels[xpLevels.length - 1];
    const prevThreshold = xpLevels[currentLevelIndex];
    const progress = ((xp - prevThreshold) / (nextThreshold - prevThreshold)) * 100;
    document.getElementById('xp-fill').style.width = `${progress}%`;
    document.getElementById('next-level').textContent = currentLevelIndex + 2; // Next level number
}

// Handle notes
function loadNotes() {
    document.getElementById('notes-textarea').value = userData[currentUser].notes || '';
}

function saveNotes() {
    userData[currentUser].notes = document.getElementById('notes-textarea').value;
    saveUserData();
    alert('Notes saved!');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();

    const autoUser = localStorage.getItem('autoLoginUser');
    if (autoUser && userData[autoUser]) {
        currentUser = autoUser;
        initUserProgress(autoUser);
    }

    updateUI();
    
    document.getElementById('login-btn').addEventListener('click', () => handleAuth(false));
    document.getElementById('signup-btn').addEventListener('click', () => handleAuth(true));
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('save-notes').addEventListener('click', saveNotes);
    document.getElementById('back-to-tree').addEventListener('click', () => {
        document.getElementById('level-content').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    });
});

