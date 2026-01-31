import { getEventsFromUrl } from './config.js';
import { renderRSVP } from './rsvp.js';

// Function to create event section HTML
function createEventSection(eventId, content) {
    return `
        <section id="${eventId}" class="panel events">
            <div class="container">
                <div class="panel-grid">
                    <article>
                        <h3 class="event-title">${content.title}</h3>
                        <p class="event-datetime"><strong>Date:</strong> ${content.date} | ${content.time}</p>
                        <p class="event-address"><strong>Venue:</strong> <a href="${content.address_url}" target="_blank">${content.address}</a></p>
                    </article>
                </div>
            </div>
        </section>
    `;
}

// Function to update content based on configuration
async function updateContent(config) {
    if (!config) return;
    
    const events = getEventsFromUrl();

    // Get the events container
    const eventsContainer = document.getElementById('containers');
    if (!eventsContainer) return;

    // Create and append sections for each event in the preset
    events.forEach(eventName => {
        if (config['events'].hasOwnProperty(eventName)) {
            const content = config.events[eventName];
            const eventHtml = createEventSection(eventName, content);
            eventsContainer.insertAdjacentHTML('beforeend', eventHtml);
        }
    });

    // Render RSVP content (moved to its own module)
    renderRSVP(config);
}

export { updateContent };