import { getPresetFromUrl } from './config.js';
import { renderRSVP } from './rsvp.js';

// Function to create event section HTML
function createEventSection(eventId, content) {
    return `
        <section id="${eventId}" class="panel">
            <div class="container">
                <div class="panel-grid">
                    <article>
                        <h3 class="event-title">${content.title}</h3>
                        <p class="event-datetime"><strong>Date:</strong> ${content.date} at ${content.time}</p>
                        <p class="event-address"><strong>Venue:</strong> <a href="${content.address_url}">${content.venue}</a></p>
                        <p class="event-address"><strong>Location:</strong> <a href="${content.address_url}">${content.address}</a></p>
                    </article>
                </div>
            </div>
        </section>
    `;
}

// Function to update content based on configuration
async function updateContent(config) {
    if (!config) return;

    const presetName = getPresetFromUrl();
    const preset = config.presets[presetName] || config.presets.default;

    // Get the events container
    const eventsContainer = document.getElementById('containers');
    if (!eventsContainer) return;

    // Create and append sections for each event in the preset
    preset.events.forEach(eventId => {
        const content = config.events[eventId];
        if (content) {
            const eventHtml = createEventSection(eventId, content);
            eventsContainer.insertAdjacentHTML('beforeend', eventHtml);
        }
    });

    // Render RSVP content (moved to its own module)
    renderRSVP(config, eventsContainer);
}

export { updateContent };