import { getRSVPFromUrl } from './config.js';

// Render RSVP content into the page. Accepts the loaded config and the
// container where events are rendered (used if we need to append a section).
function renderRSVP(config) {
    const party = getRSVPFromUrl();
    let rsvpContainer = ''
    
    if (party != '') {
        if (!config['rsvps'].hasOwnProperty(party)) {return}

        const contacts = config['rsvps'][party]
        let rsvpList = ''

        // Create and append sections for each event in the preset
        contacts.forEach(contact => {

            const phone = contact.phone || '';
            const phoneDisplay = contact.phone_display || '';
            const safeHref = phone ? `https://wa.me/${phone}` : '';
            const phoneLink = phone ? `<a href="${safeHref}" target="_blank">${phoneDisplay}</a>` : '';

            rsvpList += `
                <li><strong>${contact.name}</strong>${phoneLink ? ': ' + phoneLink : ''}</li>
            `
        });

        rsvpContainer += `
            <section id="rsvp" class="panel rsvp">
                <div class="container">
                    <div class="panel-grid">
                        <article>
                            <h3 class="event-title">RSVP</h3>
                            <ul class="rsvp-list">
                                ${rsvpList}
                            </ul>
                        </article>
                    </div>
                </div>
            </section>
        `
    }

    rsvpContainer += `
        <section id="ending-message" class="panel">
            <div class="container">
                <div class="panel-grid">
                <h2>We hope you'll join us on this special day.</h2>
                </div>
            </div>
            <img src="img/bottom-strip.png" alt="bottom strip" class="bottom-strip"/>
        </section>
    `;

    document.getElementById('walima').insertAdjacentHTML('afterend', rsvpContainer);
}

export { renderRSVP };
