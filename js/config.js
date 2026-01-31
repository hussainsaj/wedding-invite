// Function to get base URL from script path
function getBaseUrl() {
    const scriptTag = document.querySelector('script[src$="main.js"]');
    if (scriptTag) {
        // Get the path up to the last directory (remove /js/main.js)
        return scriptTag.src.replace(/\/js\/main\.js$/, '');
    }
    return window.location.pathname.replace(/\/[^\/]*$/, '');
}

// Function to load configuration
async function loadConfig() {
    try {
        const baseUrl = getBaseUrl();
        const response = await fetch(`${baseUrl}/config.json`);
        const data = await response.json();
        return {
            presets: data.presets,
            events: data.events,
            rsvps: data.rsvps || {}
        };
    } catch (error) {
        console.error('Error loading configuration:', error);
        return null;
    }
}

// Function to get events from URL
function getEventsFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Fallback to legacy `preset` param or default
    if (urlParams.get('events')) {
        return urlParams.get('events').split(',')
    } else {
        return ['baraat','walima']
    }
}

// Function to get the party (bride/groom) from URL
function getRSVPFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('rsvp') || '';
}

export { loadConfig, getEventsFromUrl, getRSVPFromUrl };