/* 集馨診所：GA4 預約意願追蹤（不蒐集個資） */
(function () {
  'use strict';
  var key = 'jixin_booking_source';
  function emit(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  }
  function source() {
    try { return sessionStorage.getItem(key) || ''; } catch (e) { return ''; }
  }
  function save(path) {
    try { sessionStorage.setItem(key, path); } catch (e) {}
  }
  function clear() {
    try { sessionStorage.removeItem(key); } catch (e) {}
  }
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var url;
    try { url = new URL(href, location.href); } catch (e) { return; }
    var isBooking = url.origin === location.origin &&
      /(?:^|\/)index\.html$/.test(url.pathname) && url.hash === '#booking';
    if (isBooking || (href === '#booking' && (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')))) {
      var page = location.pathname.split('/').pop() || 'index.html';
      save(page);
      emit('booking_click', { booking_source_page: page, booking_link_location: 'navigation' });
      return;
    }
    if (link.closest('#booking') && /(?:^|\.)lin\.ee$/.test(url.hostname)) {
      var choice = link.querySelector('h3');
      var type = choice && choice.textContent.indexOf('代謝') !== -1 ? 'metabolic_assessment' : 'general_clinic';
      emit('line_booking_click', {
        booking_type: type,
        booking_source_page: source() || 'index.html',
        booking_link_location: 'homepage_booking'
      });
      clear();
    }
  }, true);
})();
