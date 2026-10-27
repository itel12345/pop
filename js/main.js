/* ==========================================================
   Horizon Hotels - hotel switching prototype
   1. Hotel content   2. Helpers   3. Rendering
   4. Switching       5. Interactions   6. Start-up
   ========================================================== */

/* ---------- 1. Hotel content ----------
   Edit copy, rooms and photos here. Photo values are Unsplash IDs. */
const HOTELS = {
    a: {
        name: 'Horizon Gulshan',
        kind: 'Luxury Urban',
        short: 'Gulshan',
        location: 'Gulshan, Dhaka',
        heroImage: '1542314831-068cd1dbfeeb',
        bannerImage: '1566073771259-6a8506099945',
        guestImage: '1494790108377-be9c29b29330',
        headline: 'Experience Luxury in Gulshan',
        lead: 'Elegant accommodations, rooftop and fine dining, and personalised service in the heart of the city\u2019s most prestigious district.',
        aboutTitle: 'Your Trusted Luxury Hotel Destination',
        aboutText: 'Located in the heart of Gulshan, thoughtfully designed suites, a rooftop dining terrace and an intimate fine-dining room.',
        stats: [
            ['54+', 'Luxury rooms'],
            ['15+', 'Years of hospitality'],
            ['2+', 'Signature restaurants'],
            ['98%', 'Guest satisfaction']
        ],
        gallery: [
            ['1582719508461-905c673771fd', 'Suite lounge'],
            ['1578683010236-d716f9a3f461', 'Executive room'],
            ['1514933651103-005eec06c04b', 'Rooftop dining']
        ],
        roomsText: 'Discover spacious accommodations designed to deliver comfort, relaxation and productivity during your stay.',
        roomTypes: ['Suite', 'Deluxe', 'Executive'],
        // [image, name, type, bed, feature, size, price]
        rooms: [
            ['1590490360182-c33d57733427', 'Canary Royal Suite', 'Suite', '1 King Bed', 'Panoramic bathroom', '850 sq ft', 'BDT 15,500'],
            ['1618773928121-c32242e63f39', 'Executive Suite', 'Executive', 'King Bed', 'Work desk', '620 sq ft', 'BDT 13,500'],
            ['1512918728675-ed5a9ecdebfd', 'Premier Deluxe', 'Deluxe', 'King Bed', 'City view', '480 sq ft', 'BDT 9,500']
        ],
        bannerTitle: 'Discover Luxury With Horizon',
        bannerText: 'Rooftop evenings, fine dining and suites above the skyline.',
        reviewsTitle: 'The Trust of Our Guests, The Pride of Us',
        reviewsText: 'Stories of dreams turned into addresses, where every home reflects comfort, elegance and lasting value.',
        quote: 'From the moment we arrived, everything was excellent. The rooms were elegant, the staff was attentive, and the overall experience was exceptional.',
        guestNote: 'Trusted by business and leisure travelers for exceptional comfort, personalised service, and memorable stays.',
        navLabels: ['Dining', 'Wellness & Spa'],
        services: ['Luxury Accommodation', 'Rooftop Restaurant', 'Fine Dining', 'Conference Hall', 'Airport Assistance'],
        address: ['Plot 48, Road #92/A', 'Gulshan-1, Dhaka 1212'],
        phone: '+880 2 5555 0148'
    },

    b: {
        name: 'Horizon Sands Resort',
        kind: 'Resort & Wellness',
        short: 'Sands',
        location: 'Cox\u2019s Bazar',
        heroImage: '1520250497591-112f2f40a3f4',
        bannerImage: '1551882547-ff40c63fe5fa',
        guestImage: '1438761681033-6461ffad8d80',
        headline: 'Rest Deeply by the Sea',
        lead: 'Beachfront villas, a full-service spa and unhurried days shaped around sleep, movement and good food.',
        aboutTitle: 'A Resort Built for Slowing Down',
        aboutText: 'Low-rise villas between palms and shoreline, a spa with eight treatment rooms and daily rituals from sunrise yoga to evening sound baths.',
        stats: [
            ['86', 'Villas & suites'],
            ['12+', 'Years of resort living'],
            ['40+', 'Spa & wellness rituals'],
            ['97%', 'Guest satisfaction']
        ],
        gallery: [
            ['1540555700478-4be289fbecef', 'Spa pavilion'],
            ['1544161515-4ab6ce6db874', 'Massage ritual'],
            ['1571896349842-33c89424de2d', 'Resort pool']
        ],
        roomsText: 'Villas and suites that open to the garden or the water, each with space to unwind and a private terrace.',
        roomTypes: ['Villa', 'Suite', 'Family'],
        rooms: [
            ['1445019980597-93fa8acb246c', 'Beachfront Villa', 'Villa', '1 King Bed', 'Private plunge pool', '1,100 sq ft', 'USD 340'],
            ['1564501049412-61c2a3083791', 'Garden Suite', 'Suite', 'King Bed', 'Garden terrace', '640 sq ft', 'USD 210'],
            ['1517840901100-8179e982acb7', 'Family Pool Villa', 'Family', '2 Queen Beds', 'Shared pool', '900 sq ft', 'USD 290']
        ],
        bannerTitle: 'Restore Yourself at Horizon Sands',
        bannerText: 'Seven nights of spa rituals, ocean breakfasts and no schedule.',
        reviewsTitle: 'Guests Who Left Rested',
        reviewsText: 'Honest words from guests who came for a weekend and stayed for the quiet.',
        quote: 'The spa was the calmest I have ever felt. Morning yoga, a villa by the water, and a team that never rushed us. We are already planning our return.',
        guestNote: 'Loved by couples, families and solo travelers for its spa rituals, ocean views and effortless pace.',
        navLabels: ['Dining', 'Spa & Wellness'],
        services: ['Beach Villas', 'Spa & Wellness', 'Yoga & Retreats', 'Seaside Dining', 'Airport Transfers'],
        address: ['Marine Drive, Kalatali', 'Cox\u2019s Bazar 4700'],
        phone: '+880 341 5555 0112'
    }
};

const DEMO_MESSAGE = 'Demo only \u2014 no reservation is made.';


/* ---------- 2. Helpers ---------- */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const gate = $('#gate');
const main = $('#main');
const curtain = $('#cur');
const switchButton = $('#sw');
const popup = $('#pop');

let currentHotel = null;   // 'a', 'b', or null while the gateway is showing
let isTransitioning = false;

// Unsplash photo URL from an ID
function photoUrl(id, width = 1200) {
    return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;
}

// Image block; if a photo fails to load it is removed and the charcoal background shows
function imageBlock(id, alt, width) {
    return `
        <div class="img">
            <img src="${photoUrl(id, width)}" alt="${alt}" loading="lazy" onerror="this.remove()">
        </div>`;
}

function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('on');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('on'), 2800);
}


/* ---------- 3. Rendering ---------- */
function renderSwitchMenu(activeKey) {
    const hotelOptions = ['a', 'b'].map((key) => `
        <button role="menuitem" data-go="${key}">
            <span class="th img">${imageBlock(HOTELS[key].heroImage, '', 120)}</span>
            <span>${HOTELS[key].name}<small>${HOTELS[key].kind}</small></span>
            ${key === activeKey ? '<span class="cur">Current</span>' : ''}
        </button>`).join('');

    popup.innerHTML = `
        ${hotelOptions}
        <hr>
        <button role="menuitem" data-go="gate">
            <span class="th" style="display:grid;place-items:center;background:var(--sand)">\u25A6</span>
            <span>All hotels<small>Back to the gateway</small></span>
        </button>`;
}

function renderHero(hotel) {
    return `
        <div class="wrap hero">
            <div class="hcard img">
                ${imageBlock(hotel.heroImage, hotel.name, 1600)}
                <div class="hc">
                    <h1>${hotel.headline}</h1>
                    <p>${hotel.lead}</p>
                    <div class="row">
                        <button class="btn" data-demo>Book Your Stay</button>
                        <a class="btn ghost" href="#rooms">Explore Rooms</a>
                    </div>
                    <div class="stars"><span>\u2605\u2605\u2605\u2605\u2605</span> Rated 5 stars by thousands of visitors</div>
                </div>
                <div class="trust">
                    Trusted by 10,000+ people who have stayed with Horizon. What about you?
                    <div><i></i><i></i><i></i><i></i></div>
                </div>
            </div>

            <form class="bar">
                <label>Check In <input type="date" aria-label="Check in"></label>
                <label>Check Out <input type="date" aria-label="Check out"></label>
                <label>Rooms
                    <select aria-label="Rooms">
                        <option>1 Room</option><option>2 Rooms</option><option>3 Rooms</option>
                    </select>
                </label>
                <label>Guests
                    <select aria-label="Guests">
                        <option>2 Adults</option><option>1 Adult</option>
                        <option>2 Adults, 1 Child</option><option>4 Adults</option>
                    </select>
                </label>
                <button class="btn" type="submit">Book Now</button>
            </form>
        </div>`;
}

function renderAbout(hotel) {
    const stats = hotel.stats.map(([value, label]) =>
        `<div class="st"><b>${value}</b><span>${label}</span></div>`).join('');
    const gallery = hotel.gallery.map(([id, alt]) => imageBlock(id, alt, 800)).join('');

    return `
        <section id="about">
            <div class="wrap">
                <div class="sh"><h2>${hotel.aboutTitle}</h2><p>${hotel.aboutText}</p></div>
                <div class="about">
                    <div class="stats">${stats}</div>
                    <div class="mos">${gallery}</div>
                </div>
            </div>
        </section>`;
}

function renderRooms(hotel) {
    const chips = ['All Rooms', ...hotel.roomTypes].map((type, index) =>
        `<button class="chip" data-f="${index ? type : ''}" aria-pressed="${index === 0}">${type}</button>`).join('');

    const cards = hotel.rooms.map(([image, name, type, bed, feature, size, price]) => `
        <article class="rc" data-t="${type}">
            <div class="img">
                <span class="tag">${type}</span>
                <img src="${photoUrl(image, 700)}" alt="${name}" loading="lazy" onerror="this.remove()">
            </div>
            <div class="in">
                <h3>${name}</h3>
                <p class="meta"><span>${bed}</span><span>${feature}</span><span>${size}</span></p>
                <div class="pr">
                    <span><b>${price}</b> <small>/ night</small></span>
                    <button class="btn" data-demo>Book Now</button>
                </div>
            </div>
        </article>`).join('');

    return `
        <section id="rooms" style="padding-top:24px">
            <div class="wrap">
                <div class="sh"><h2>Elegant Rooms and Suites You\u2019ll Love</h2><p>${hotel.roomsText}</p></div>
                <div class="chips">${chips}</div>
                <div class="rooms">${cards}</div>
            </div>
        </section>`;
}

function renderBanner(hotel) {
    return `
        <section id="offers" style="padding-top:24px">
            <div class="wrap">
                <div class="ban img">
                    ${imageBlock(hotel.bannerImage, hotel.name, 1600)}
                    <div>
                        <h2>${hotel.bannerTitle}</h2>
                        <p>${hotel.bannerText}</p>
                        <button class="btn" data-demo>Book Your Stay</button>
                    </div>
                </div>
            </div>
        </section>`;
}

function renderReviews(hotel) {
    return `
        <section id="dining">
            <div class="wrap">
                <div class="sh"><h2>${hotel.reviewsTitle}</h2><p>${hotel.reviewsText}</p></div>
                <div class="tst">
                    <div class="pic">${imageBlock(hotel.guestImage, 'Guest portrait', 800)}<em>4.9\u2605</em></div>
                    <div>
                        <p class="rated"><span>\u2605\u2605\u2605\u2605\u2605</span> RATED 4.9/5 BY 1200+ HAPPY CLIENTS</p>
                        <blockquote>\u201C${hotel.quote}\u201D</blockquote>
                        <p>${hotel.guestNote}</p>
                    </div>
                </div>
            </div>
        </section>`;
}

function renderFooter(hotel) {
    const services = hotel.services.map((item) => `<a href="#offers">${item}</a>`).join('');

    return `
        <footer id="contact">
            <div class="wrap">
                <div class="fg">
                    <div>
                        <a class="logo" href="#top"><i></i>HORIZON</a>
                        <p style="margin-top:10px;max-width:240px">${hotel.location} \u2014 ${hotel.kind.toLowerCase()} hospitality by Horizon Hotels.</p>
                        <p class="em">Email Address</p>
                    </div>
                    <div>
                        <h4>Explore</h4>
                        <a href="#top">Home</a>
                        <a href="#about">About</a>
                        <a href="#rooms">Rooms &amp; Suites</a>
                        <a href="#dining">${hotel.navLabels[0]}</a>
                    </div>
                    <div><h4>Services</h4>${services}</div>
                    <div>
                        <h4>Quick Links</h4>
                        <a href="#about">Gallery</a>
                        <a href="#offers">Offers</a>
                        <a href="#contact">Contact</a>
                        <a href="#" data-demo>Reservation</a>
                    </div>
                    <div>
                        <h4>Contacts</h4>
                        <p>${hotel.address[0]}<br>${hotel.address[1]}</p>
                        <p>${hotel.phone}</p>
                    </div>
                </div>
                <div class="copy">
                    <span>\u00A9 2026 Horizon Hotels. Prototype for demonstration.</span>
                    <a href="#" data-go="gate">All hotels</a>
                </div>
            </div>
        </footer>`;
}

// Fill the page with one hotel's content and apply its theme
function renderHotel(key) {
    const hotel = HOTELS[key];

    document.body.dataset.h = key;                       // switches the CSS theme
    document.title = `${hotel.name} \u2014 Horizon Hotels`;
    $('#hn').textContent = hotel.short;
    $('#n2').textContent = hotel.navLabels[0];
    $('#n3').textContent = hotel.navLabels[1];

    renderSwitchMenu(key);

    $('#site').innerHTML = `
        <main id="top">
            ${renderHero(hotel)}
            ${renderAbout(hotel)}
            ${renderRooms(hotel)}
            ${renderBanner(hotel)}
            ${renderReviews(hotel)}
        </main>
        ${renderFooter(hotel)}`;
}


/* ---------- 4. Switching ---------- */
// Curtain wipe: cover the screen, swap content while hidden, then reveal.
function runTransition(title, subtitle, swapContent) {
    if (isTransitioning) return;
    isTransitioning = true;

    $('#ch').textContent = title;
    $('#cp').textContent = subtitle;
    curtain.className = 'in';

    setTimeout(() => {
        swapContent();
        window.scrollTo(0, 0);
        curtain.className = 'out';

        setTimeout(() => {
            curtain.className = '';
            isTransitioning = false;
        }, 650);
    }, 900);
}

function showGateway() {
    main.hidden = true;
    gate.hidden = false;
    currentHotel = null;
    history.replaceState(null, '', '#');
    $('#gate .panel').focus();
}

function showHotel(key) {
    renderHotel(key);
    currentHotel = key;
    gate.hidden = true;
    main.hidden = false;
    history.replaceState(null, '', `#${key}`);
}

// target: 'a', 'b' or 'gate'
function goTo(target) {
    closeSwitchMenu();
    setMobileMenu(false);

    if (target === 'gate') {
        if (currentHotel === null) return;
        runTransition('Horizon Hotels', 'Choose your stay', showGateway);
    } else if (target !== currentHotel) {
        runTransition(HOTELS[target].name, HOTELS[target].kind, () => showHotel(target));
    }
}


/* ---------- 5. Interactions ---------- */
function closeSwitchMenu() {
    popup.classList.remove('open');
    switchButton.setAttribute('aria-expanded', 'false');
}

switchButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = popup.classList.toggle('open');
    switchButton.setAttribute('aria-expanded', isOpen);
});

// Mobile menu (slides in from the left)
function setMobileMenu(open) {
    $('#nav').classList.toggle('open', open);
    $('#scrim').classList.toggle('open', open);
    $('#bg').setAttribute('aria-expanded', open);
}

$('#bg').addEventListener('click', () => {
    setMobileMenu(!$('#nav').classList.contains('open'));
});

$('#scrim').addEventListener('click', () => setMobileMenu(false));

// One delegated click handler covers every dynamic button
document.addEventListener('click', (event) => {
    const goButton = event.target.closest('[data-go]');
    if (goButton) {
        event.preventDefault();
        goTo(goButton.dataset.go);
        return;
    }

    if (event.target.closest('[data-demo]')) {
        event.preventDefault();
        showToast(DEMO_MESSAGE);
        return;
    }

    const chip = event.target.closest('.chip');
    if (chip) {
        $$('.chip').forEach((c) => c.setAttribute('aria-pressed', c === chip));
        $$('.rc').forEach((card) => {
            card.hidden = Boolean(chip.dataset.f) && card.dataset.t !== chip.dataset.f;
        });
        return;
    }

    if (!event.target.closest('.pop')) closeSwitchMenu();

    if (event.target.closest('#nav a')) setMobileMenu(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeSwitchMenu();
        setMobileMenu(false);
        switchButton.focus();
    }
});

// The booking bar is visual only
document.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast(DEMO_MESSAGE);
});


/* ---------- 6. Start-up ---------- */
// Gateway photos
$$('#gate .panel').forEach((panel, index) => {
    const hotel = HOTELS[index === 0 ? 'a' : 'b'];
    panel.querySelector('.img').innerHTML =
        `<img src="${photoUrl(hotel.heroImage, 1400)}" alt="" onerror="this.remove()">`;
});

// Direct links: index.html#a or index.html#b skip the gateway
const startHash = location.hash.slice(1);
if (HOTELS[startHash]) showHotel(startHash);
