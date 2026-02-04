import { getRSVPFromUrl } from './config.js';

// Render RSVP content into the page. Accepts the loaded config and the
// container where events are rendered (used if we need to append a section).
async function renderRSVP(config) {
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

            <div class="bottom-strip-container">
                <img src="img/bottom-strip-long.png" alt="bottom strip" class="bottom-strip"/>
            </div>
            
        </section>
    `;

    document.getElementsByClassName('events')[document.getElementsByClassName('events').length - 1].insertAdjacentHTML('afterend', rsvpContainer);

    const panelsCount = document.getElementsByClassName('panel').length

    if (panelsCount % 2 === 1) {
        document.getElementById('ending-message').style.background = 'linear-gradient(180deg, #faddc8 87%, #af5050 94%)'
    }

    let cssVar = window.getComputedStyle(document.body)

    function parseSeconds(str) {
        if (typeof str !== 'string') return NaN;

        const match = str.match(/^(\d+(?:\.\d+)?)\s*s$/i);
        if (!match) return NaN;

        return Math.round(parseFloat(match[1]) * 1000);
    }

    let transistionDuration = parseSeconds(cssVar.getPropertyValue('--transistion-duration'))
    
    await new Promise(r => setTimeout(r, transistionDuration + 1000));

    document.body.style.backgroundColor = cssVar.getPropertyValue('--bg');

}

export { renderRSVP };