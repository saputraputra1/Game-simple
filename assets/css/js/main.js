// Firebase Configuration (Shared across all games)
const firebaseConfig = {
    apiKey: "AIzaSyCixqJ_eDJ0vscvsI_Z1Th10FEfKi0hdx8",
    authDomain: "online--suit.firebaseapp.com",
    databaseURL: "https://online--suit-default-rtdb.firebaseio.com",
    projectId: "online--suit",
    storageBucket: "online--suit.firebasestorage.app",
    messagingSenderId: "463840835705",
    appId: "1:463840835705:web:f490fd49851c0afb8dfca8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Shared Player Data
let playerData = {
    username: '',
    avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    gameStats: {
        tictactoe: { wins: 0, losses: 0 },
        goldminer: { highScore: 0 },
        suitsgame: { wins: 0, losses: 0 }
    }
};

// Save player data to session storage
function savePlayerData() {
    sessionStorage.setItem('playerData', JSON.stringify(playerData));
}

// Load player data from session storage
function loadPlayerData() {
    const savedData = sessionStorage.getItem('playerData');
    if (savedData) {
        playerData = JSON.parse(savedData);
    }
}

// Shared UI Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerData();
    
    // Set up event listeners for game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const gameName = this.querySelector('h2').textContent.toLowerCase();
            trackGameSelection(gameName);
        });
    });
});

// Track game selection (analytics)
function trackGameSelection(gameName) {
    console.log(`Game selected: ${gameName}`);
    // Here you could send data to Firebase Analytics if needed
}

// Navigation function
function navigateTo(page) {
    window.location.href = `${page}.html`;
}

// Back to main menu function
function backToMainMenu() {
    savePlayerData();
    window.location.href = 'index.html';
}
