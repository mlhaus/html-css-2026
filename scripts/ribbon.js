// Red ribbon that is drawn down the page as the user scrolls.
(function () {
    const NS = "http://www.w3.org/2000/svg";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const svg = document.createElementNS(NS, "svg");
    svg.id = "scroll-ribbon";
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = `
        <defs>
            <linearGradient id="ribbon-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#7a0010" />
                <stop offset="0.5" stop-color="#e01b2f" />
                <stop offset="1" stop-color="#8f0014" />
            </linearGradient>
            <filter id="ribbon-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.3" />
            </filter>
        </defs>
        <path class="ribbon-body" />
        <path class="ribbon-shine" />`;
    // First in the DOM so it paints beneath all other page content
    document.body.prepend(svg);

    const body = svg.querySelector(".ribbon-body");
    const shine = svg.querySelector(".ribbon-shine");
    let length = 0;

    function build() {
        const w = document.documentElement.clientWidth;
        const h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        svg.setAttribute("width", w);
        svg.setAttribute("height", h);
        svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

        // Swoop left and right in segments roughly one screen tall
        const seg = Math.max(window.innerHeight * 0.9, 450);
        const margin = Math.min(60, w * 0.05);
        let d = `M ${w * 0.8} 0`;
        let y = 0;
        let i = 0;
        while (y < h) {
            const nextY = Math.min(y + seg, h);
            const side = i % 2 === 0 ? 1 : -1;
            const x = side === 1 ? margin + w * 0.1 : w - margin - w * 0.1;
            const prevX = side === 1 ? w - margin - w * 0.1 : margin + w * 0.1;
            const mid = (y + nextY) / 2;
            d += ` C ${prevX} ${mid}, ${x} ${y + (nextY - y) * 0.25}, ${(x + prevX) / 2} ${mid}`;
            d += ` S ${x} ${nextY - (nextY - y) * 0.1}, ${x} ${nextY}`;
            y = nextY;
            i++;
        }
        body.setAttribute("d", d);
        shine.setAttribute("d", d);
        length = body.getTotalLength();
        [body, shine].forEach((p) => {
            p.style.strokeDasharray = length;
        });
        update();
    }

    function update() {
        // Draw the ribbon until its tip reaches the bottom edge of the viewport
        const targetY = window.scrollY + window.innerHeight;
        let drawn = length;
        if (!reduceMotion) {
            let lo = 0;
            let hi = length;
            for (let i = 0; i < 20; i++) {
                const mid = (lo + hi) / 2;
                if (body.getPointAtLength(mid).y < targetY) lo = mid;
                else hi = mid;
            }
            drawn = hi;
        }
        const offset = length - drawn;
        body.style.strokeDashoffset = offset;
        shine.style.strokeDashoffset = offset;
    }

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                update();
                ticking = false;
            });
        }
    });
    window.addEventListener("resize", build);
    window.addEventListener("load", build);
    build();
})();
