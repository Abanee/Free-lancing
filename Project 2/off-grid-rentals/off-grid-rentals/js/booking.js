/**
 * booking.js — Booking Datepicker & Price Calculator
 * Uses Flatpickr for date range selection.
 *
 * Pricing model:
 *   Base rate  : $189 / night
 *   Cleaning   : $45 (flat)
 *   Service fee: 10% of nightly_total
 *   Total      : nightly + cleaning + service
 */

const PRICE_PER_NIGHT = 189;
const CLEANING_FEE = 45;
const SERVICE_FEE_RATE = 0.10;

let selectedDates = [];

const datesInput     = document.getElementById('dates-input');
const priceBreakdown = document.getElementById('price-breakdown');
const noDatesMsg     = document.getElementById('no-dates-msg');
const nightlyLabel   = document.getElementById('nightly-label');
const nightlyTotal   = document.getElementById('nightly-total');
const serviceFeeEl   = document.getElementById('service-fee');
const totalPriceEl   = document.getElementById('total-price');

/* Init Flatpickr */
if (datesInput) {
  flatpickr(datesInput, {
    mode: 'range',
    minDate: 'today',
    dateFormat: 'M j, Y',
    disableMobile: false,
    showMonths: window.innerWidth > 768 ? 2 : 1,
    onChange: (dates) => {
      selectedDates = dates;
      updatePriceCalculator(dates);
    }
  });
}

/**
 * Update the price breakdown UI based on selected date range.
 * @param {Date[]} dates
 */
function updatePriceCalculator(dates) {
  if (!priceBreakdown || !noDatesMsg) return;

  if (dates.length < 2) {
    priceBreakdown.classList.add('hidden');
    noDatesMsg.classList.remove('hidden');
    return;
  }

  const [startDate, endDate] = dates;
  const msPerDay = 1000 * 60 * 60 * 24;
  const nights = Math.round((endDate - startDate) / msPerDay);

  if (nights < 1) {
    priceBreakdown.classList.add('hidden');
    noDatesMsg.classList.remove('hidden');
    return;
  }

  const nightlyCost = PRICE_PER_NIGHT * nights;
  const serviceCost = Math.round(nightlyCost * SERVICE_FEE_RATE);
  const total = nightlyCost + CLEANING_FEE + serviceCost;

  nightlyLabel.textContent = '$' + PRICE_PER_NIGHT + ' \u00d7 ' + nights + ' night' + (nights > 1 ? 's' : '');
  nightlyTotal.textContent = '$' + nightlyCost;
  serviceFeeEl.textContent = '$' + serviceCost;
  totalPriceEl.textContent = '$' + total;

  priceBreakdown.classList.remove('hidden');
  noDatesMsg.classList.add('hidden');
}

/* Booking form submit */
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (selectedDates.length < 2) {
      if (datesInput) {
        datesInput.focus();
        datesInput.style.borderColor = '#EF4444';
        setTimeout(() => { datesInput.style.borderColor = ''; }, 2000);
      }
      return;
    }
    const guests = document.getElementById('guests-select')?.value || 2;
    const s = selectedDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const en = selectedDates[1].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    alert('Reservation requested!\n\nCabin: Pine Ridge Cabin\nDates: ' + s + ' to ' + en + '\nGuests: ' + guests + '\nTotal: ' + (totalPriceEl?.textContent || 'N/A') + '\n\n(Checkout integration pending)');
  });
}
