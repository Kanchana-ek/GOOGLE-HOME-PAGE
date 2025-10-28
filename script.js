function performSearch(query, isLucky = false) {
    if (!query.trim()) return; 
    const baseUrl = 'https://www.google.com/search';
    const params = new URLSearchParams({ q: query });
    if (isLucky) {
        params.set('btnI', '');
    }
    window.location.href = `${baseUrl}?${params.toString()}`;
}


document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button:first-child');
    const googleSearchBtn = document.querySelector('.buttons button:first-child'); 
    const luckyBtn = document.querySelector('.buttons button:last-child'); 
    const voiceBtn = document.querySelector('.search-bar button:nth-child(3)');
    const cameraBtn = document.querySelector('.search-bar button:last-child'); 
    const gridIcon = document.querySelector('.fa-grid'); 

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }

    if (googleSearchBtn) {
        googleSearchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }

    if (luckyBtn) {
        luckyBtn.addEventListener('click', function() {
            performSearch(searchInput.value, true);
        });
    }

    if (voiceBtn) {
        voiceBtn.addEventListener('click', function() {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                recognition.lang = 'en-US'; 
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                recognition.start();
                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript;
                    searchInput.value = transcript;
                    performSearch(transcript);
                };
                recognition.onerror = function(event) {
                    console.error('Speech recognition error:', event.error);
                    alert('Voice search not available or failed. Please try again.');
                };
            } else {
                alert('Voice search is not supported in this browser.');
            }
        });
    }

    if (cameraBtn) {
        cameraBtn.addEventListener('click', function() {
            window.open('https://www.google.com/imghp', '_blank');
        });
    }

    if (gridIcon) {
        gridIcon.addEventListener('click', function() {
            alert('Google Apps menu would open here! (This is a demo.)');
          
        });
    }
    searchInput.focus();
});
