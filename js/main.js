/* =============================================================
   Mehdi Ebrahimzadeh — portfolio behaviour
   Vanilla JS, no dependencies. Loaded with `defer`.
   ============================================================= */
(function () {
    'use strict';

    var root = document.documentElement;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var cfg = (typeof portfolioConfig !== 'undefined') ? portfolioConfig : {};

    var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
    var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

    /* ---------- Theme ---------- */
    (function theme() {
        var btn = $('#theme-toggle');
        if (!btn) return;

        function label() {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
        }

        label();
        btn.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
            label();
        });
    })();

    /* ---------- Mobile menu ---------- */
    (function menu() {
        var burger = $('#burger');
        var links = $('#nav-links');
        if (!burger || !links) return;

        function setOpen(open) {
            document.body.classList.toggle('menu-open', open);
            burger.setAttribute('aria-expanded', String(open));
            burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        }

        burger.addEventListener('click', function () {
            setOpen(!document.body.classList.contains('menu-open'));
        });

        links.addEventListener('click', function (e) {
            if (e.target.closest('a')) setOpen(false);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setOpen(false);
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 860) setOpen(false);
        });
    })();

    /* ---------- Scroll: progress bar, sticky nav, back-to-top, scroll spy ---------- */
    (function scroll() {
        var bar = $('#progress span');
        var nav = $('#nav');
        var toTop = $('#to-top');
        var navLinks = $$('.nav__link');
        var sections = navLinks
            .map(function (a) { return document.querySelector(a.getAttribute('href')); })
            .filter(Boolean);
        var ticking = false;

        function update() {
            var y = window.scrollY || window.pageYOffset;
            var max = document.documentElement.scrollHeight - window.innerHeight;

            if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
            if (nav) nav.classList.toggle('is-stuck', y > 8);
            if (toTop) toTop.classList.toggle('is-shown', y > window.innerHeight * 0.8);

            // Scroll spy — the section whose top has passed the nav line.
            var current = null;
            for (var i = 0; i < sections.length; i++) {
                if (sections[i].getBoundingClientRect().top <= 140) current = sections[i].id;
            }
            // Snap to the last link once the page bottom is reached.
            if (max - y < 4 && sections.length) current = sections[sections.length - 1].id;

            navLinks.forEach(function (a) {
                a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
            });

            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
        }, { passive: true });
        window.addEventListener('resize', update);
        update();
    })();

    /* ---------- Reveal on scroll (staggered per section) ---------- */
    (function reveal() {
        var items = $$('.reveal');
        if (!items.length) return;

        if (reduceMotion || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-in'); });
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var group = $$('.reveal', el.closest('section') || document);
                var index = group.indexOf(el);
                el.style.setProperty('--d', Math.min(index, 5) * 70 + 'ms');
                el.classList.add('is-in');
                io.unobserve(el);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        items.forEach(function (el) { io.observe(el); });
    })();

    /* ---------- Typing line in the hero ---------- */
    (function typing() {
        var el = $('#typed');
        if (!el) return;

        var roles = (cfg.hero && cfg.hero.roles) || [
            'Performance Engineer @ SOTI',
            'AI & developer tooling',
            'Backend & distributed systems',
            'Co-Founder @ Eyval · Velocity'
        ];

        if (reduceMotion) { el.textContent = roles[0]; return; }

        var i = 0, char = 0, deleting = false;

        function tick() {
            var word = roles[i % roles.length];
            char += deleting ? -1 : 1;
            el.textContent = word.slice(0, char);

            var delay = deleting ? 34 : 68;
            if (!deleting && char === word.length) { deleting = true; delay = 1900; }
            else if (deleting && char === 0) { deleting = false; i++; delay = 320; }

            setTimeout(tick, delay);
        }
        setTimeout(tick, 550);
    })();

    /* ---------- Count-up metrics ---------- */
    (function counters() {
        var nums = $$('[data-count]');
        if (!nums.length) return;

        function run(el) {
            var target = parseFloat(el.getAttribute('data-count'));
            var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

            if (reduceMotion) { el.textContent = target.toFixed(decimals); return; }

            var start = performance.now();
            var duration = 1400;

            function frame(now) {
                var p = Math.min((now - start) / duration, 1);
                var eased = 1 - Math.pow(1 - p, 3);
                el.textContent = (target * eased).toFixed(decimals);
                if (p < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        }

        if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                run(entry.target);
                io.unobserve(entry.target);
            });
        }, { threshold: 0.5 });

        nums.forEach(function (el) { io.observe(el); });
    })();

    /* ---------- Contact form → opens the visitor's mail client ---------- */
    (function contact() {
        var form = $('#contact-form');
        if (!form) return;

        var status = $('#form-status');
        var to = (cfg.contact && cfg.contact.email) || 'mehdi.ebr.work@gmail.com';

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var fields = $$('input, textarea', form);
            var missing = false;

            fields.forEach(function (f) {
                var invalid = !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
                f.classList.toggle('is-invalid', invalid);
                if (invalid && !missing) { missing = true; f.focus(); }
            });

            if (missing) {
                status.textContent = 'Please fill in every field with a valid email address.';
                status.className = 'form__status is-error';
                return;
            }

            // `form.name` resolves to the form's own attribute, so go through .elements.
            var val = function (n) { return form.elements[n].value.trim(); };
            var body = val('message') + '\n\n—\n' + val('name') + '\n' + val('email');

            status.textContent = 'Opening your mail app…';
            status.className = 'form__status is-ok';

            window.location.href = 'mailto:' + to +
                '?subject=' + encodeURIComponent(val('subject')) +
                '&body=' + encodeURIComponent(body);
        });

        $$('input, textarea', form).forEach(function (f) {
            f.addEventListener('input', function () { f.classList.remove('is-invalid'); });
        });
    })();

    /* ---------- Footer year ---------- */
    (function year() {
        var el = $('#year');
        if (el) el.textContent = new Date().getFullYear();
    })();
})();
