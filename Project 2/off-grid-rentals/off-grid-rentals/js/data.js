/**
 * data.js — Mock Cabin Data
 * Used by index.html, cabins.html, and dashboard.html
 * to render cabin cards dynamically.
 */

const CABINS_DATA = [
  {
    id: 1,
    name: 'Pine Ridge Cabin',
    region: 'Pacific Northwest',
    location: 'Willamette National Forest, OR',
    price: 189,
    guests: 4,
    bedrooms: 2,
    rating: 4.97,
    reviews: 83,
    badge: 'Guest Favorite',
    image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=700&q=80',
    amenities: ['Solar Power', 'Hot Tub', 'Fire Pit', 'Stargazing Deck'],
    tags: ['Pacific Northwest', 'Rocky Mountains']
  },
  {
    id: 2,
    name: 'Lakeside Hollow',
    region: 'Northern Lakes',
    location: 'Boundary Waters, MN',
    price: 165,
    guests: 2,
    bedrooms: 1,
    rating: 4.95,
    reviews: 61,
    badge: 'New Listing',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=700&q=80',
    amenities: ['Solar Power', 'Kayaks Included', 'Loon-watching Deck'],
    tags: ['Northern Lakes']
  },
  {
    id: 3,
    name: 'Ridge Top Studio',
    region: 'Appalachians',
    location: 'Pisgah National Forest, NC',
    price: 145,
    guests: 2,
    bedrooms: 1,
    rating: 4.92,
    reviews: 44,
    badge: null,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=80',
    amenities: ['Solar Power', 'Writing Desk', 'Hammock', 'Outdoor Shower'],
    tags: ['Appalachians']
  },
  {
    id: 4,
    name: 'Desert Sage Cabin',
    region: 'Rocky Mountains',
    location: 'San Juan Mountains, CO',
    price: 215,
    guests: 6,
    bedrooms: 3,
    rating: 4.98,
    reviews: 102,
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=700&q=80',
    amenities: ['Solar Power', 'Hot Tub', 'Fire Pit', 'Mountain Views'],
    tags: ['Rocky Mountains']
  },
  {
    id: 5,
    name: 'Boreal Treehouse',
    region: 'Northern Lakes',
    location: 'Superior National Forest, MN',
    price: 255,
    guests: 2,
    bedrooms: 1,
    rating: 5.0,
    reviews: 27,
    badge: 'Rare Find',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80',
    amenities: ['Solar Power', 'Canopy Access', 'Stargazing', 'Hammocks'],
    tags: ['Northern Lakes']
  },
  {
    id: 6,
    name: 'Coastal Driftwood',
    region: 'Pacific Northwest',
    location: 'Olympic Peninsula, WA',
    price: 199,
    guests: 4,
    bedrooms: 2,
    rating: 4.93,
    reviews: 56,
    badge: null,
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=700&q=80',
    amenities: ['Solar Power', 'Ocean Views', 'Tide Pool Access', 'Sea Kayaks'],
    tags: ['Pacific Northwest']
  }
];

/**
 * Build a cabin card HTML string from a cabin data object.
 * @param {Object} cabin
 * @param {boolean} compact - For smaller cards (e.g. index hero)
 * @returns {string} HTML
 */
function buildCabinCard(cabin, compact = false) {
  const badge = cabin.badge
    ? `<span class="cabin-card__badge">${cabin.badge}</span>`
    : '';

  return `
    <article class="cabin-card group" role="listitem" aria-label="${cabin.name}">
      <div class="cabin-card__image-wrap relative">
        <div class="cabin-card__image" style="background-image:url('${cabin.image}')"></div>
        ${badge}
        <button class="cabin-card__save" aria-label="Save ${cabin.name} to wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>
      <div class="p-5">
        <div class="flex items-start justify-between mb-1">
          <h3 class="font-display font-bold text-lg text-stone-100 leading-tight">${cabin.name}</h3>
          <span class="flex items-center gap-1 text-sm text-stone-300 shrink-0 ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            ${cabin.rating}
          </span>
        </div>
        <p class="text-stone-500 text-sm mb-3">${cabin.location}</p>
        <p class="text-stone-400 text-xs mb-4">${cabin.guests} guests · ${cabin.bedrooms} bed${cabin.bedrooms > 1 ? 's' : ''}</p>
        <div class="flex items-center justify-between">
          <p class="text-stone-100 font-semibold"><span class="text-lg">$${cabin.price}</span><span class="text-stone-500 text-sm font-normal"> / night</span></p>
          <a href="cabin-detail.html" class="px-4 py-2 bg-stone-800 text-stone-300 hover:bg-amber-500 hover:text-stone-950 rounded-xl text-xs font-semibold transition">
            View Cabin
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Render cabin cards into the grid element.
 * Called on page load and after filtering.
 */
function renderCabins() {
  const grid = document.getElementById('cabins-grid');
  if (!grid) return;

  grid.innerHTML = CABINS_DATA.map(c => buildCabinCard(c)).join('');

  // Wire save button toggle
  grid.querySelectorAll('.cabin-card__save').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('saved');
      const svg = btn.querySelector('svg');
      if (btn.classList.contains('saved')) {
        svg.setAttribute('fill', '#F59E0B');
        svg.setAttribute('stroke', '#F59E0B');
      } else {
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
      }
    });
  });
}

/**
 * Render saved/favorite cabin cards (dashboard).
 */
function renderFavorites() {
  const grid = document.getElementById('favorites-grid');
  if (!grid) return;
  // Show 2 saved cabins as sample
  const saved = CABINS_DATA.filter(c => [1, 5].includes(c.id));
  grid.innerHTML = saved.map(c => buildCabinCard(c)).join('');
}
