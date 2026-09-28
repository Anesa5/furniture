// PRODUCT DATA - Saare products yahan hain
const allProducts = [
    // Sofas
    { id: 1, name: "Halland Velvet 3-Seat Sofa", price: 1290, cat: "sofa", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80", colors: ["#1e4a3b"] },
    { id: 2, name: "Bramley Tufted Sofa", price: 980, oldPrice: 1150, cat: "sofa", img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&q=80", sale: true, colors: ["#d4c3b3"] },
    { id: 3, name: "Ardal Leather Sofa", price: 1690, cat: "sofa", img: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500&q=80", colors: ["#8b5a2b"] },
    // Tables
    { id: 4, name: "Thornby Oak Dining Table", price: 890, cat: "table", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&q=80", colors: ["#8b5a2b"] },
    { id: 5, name: "Halden Dining Set", price: 1450, cat: "table", img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&q=80", colors: ["#5c4033"] },
    { id: 6, name: "Wrenford Round Table", price: 610, oldPrice: 720, cat: "table", img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80", sale: true, colors: ["#d4c3b3"] },
    // Chairs
    { id: 7, name: "Velvet Accent Chair", price: 320, cat: "chair", img: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80", colors: ["#1e4a3b"] },
    { id: 8, name: "Wooden Dining Chair", price: 150, cat: "chair", img: "https://images.unsplash.com/photo-1503602642458-232111445657?w=500&q=80", colors: ["#d4c3b3"] },
    // Beds
    { id: 9, name: "Selby King Bed", price: 1320, cat: "bed", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80", colors: ["#d4c3b3"] },
    { id: 10, name: "Ashcombe Oak Bed Frame", price: 860, cat: "bed", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80", colors: ["#8b5a2b"] },
    // Lighting
    { id: 11, name: "Norbury Tripod Floor Lamp", price: 215, cat: "lighting", img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80", sale: true, colors: ["#d4c3b3"] },
    { id: 12, name: "Orrell Globe Table Lamp", price: 145, oldPrice: 175, cat: "lighting", img: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=500&q=80", sale: true, colors: ["#c49b3b"] },
    // Decor
    { id: 13, name: "Woven Wall Art", price: 99, cat: "decor", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80", colors: ["#d4c3b3"] },
    { id: 14, name: "Ceramic Vase Set", price: 65, cat: "decor", img: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&q=80", colors: ["#fff"] }
];

// ====== HOME PAGE LOGIC ======
const popularGrid = document.getElementById('popularGrid');
if (popularGrid) {
    const tabs = document.querySelectorAll('.tab');
    function renderPopular(cat) {
        const filtered = allProducts.filter(p => p.cat === cat);
        popularGrid.innerHTML = filtered.map(p => `
      <div class="product-card">
        <div class="p-img">
          <img src="${p.img}" alt="${p.name}">
          ${p.sale ? '<span class="sale-badge">SALE</span>' : ''}
          <button class="quick-add">QUICK ADD</button>
        </div>
        <h4>${p.name}</h4>
        <p class="price">${p.oldPrice ? `<span class="old-price">$${p.oldPrice}.00</span>` : ''} $${p.price}.00</p>
        <div class="colors">
          ${p.colors.map(c => `<span style="background:${c}"></span>`).join('')}
        </div>
      </div>
    `).join('');
    }
    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderPopular(tab.dataset.cat);
        };
    });
    renderPopular('sofa');
}

// ====== SHOP PAGE LOGIC ======
const shopGrid = document.getElementById('shopGrid');
if (shopGrid) {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('c') || 'all';
    const productCountEl = document.getElementById('productCount');

    // Function to render shop products
    function renderShop(cat) {
        let filtered = allProducts;
        if (cat !== 'all') {
            filtered = allProducts.filter(p => p.cat === cat);
        }

        // Update product count
        if (productCountEl) {
            productCountEl.textContent = `${filtered.length} products`;
        }

        shopGrid.innerHTML = filtered.map(p => `
      <div class="product-card">
        <div class="p-img">
          <img src="${p.img}" alt="${p.name}">
          ${p.sale ? '<span class="sale-badge">SALE</span>' : ''}
          <button class="quick-add">QUICK ADD</button>
        </div>
        <h4>${p.name}</h4>
        <p class="price">${p.oldPrice ? `<span class="old-price">$${p.oldPrice}.00</span>` : ''} $${p.price}.00</p>
        <div class="colors">
          ${p.colors.map(c => `<span style="background:${c}"></span>`).join('')}
        </div>
      </div>
    `).join('');
    }

    // Initial render based on URL
    renderShop(categoryParam);

    // Handle Category Filter Checkboxes
    const categoryCheckboxes = document.querySelectorAll('.filter-dropdown input[type="checkbox"]');
    categoryCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            // Simple logic: if 'All' is checked, uncheck others. If another is checked, uncheck 'All'.
            if (cb.value === 'all' && cb.checked) {
                categoryCheckboxes.forEach(other => { if (other !== cb) other.checked = false; });
                renderShop('all');
            } else if (cb.value !== 'all' && cb.checked) {
                const allCb = document.querySelector('.filter-dropdown input[value="all"]');
                if (allCb) allCb.checked = false;
                renderShop(cb.value);
            }
        });
    });
}























// ====== PRODUCT PAGE LOGIC ======
const productMain = document.querySelector('.product-main');
if (productMain) {

    // ---- Image gallery switching ----
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach(t => {
        t.onclick = () => {
            thumbs.forEach(x => x.classList.remove('active'));
            t.classList.add('active');
            mainImage.src = t.src.replace('w=300', 'w=900');
        };
    });

    // ---- Finish selection ----
    const finishDots = document.querySelectorAll('.finish-dot');
    const finishLabel = document.getElementById('finishLabel');
    finishDots.forEach(dot => {
        dot.onclick = () => {
            finishDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            finishLabel.textContent = dot.dataset.name;
        };
    });

    // ---- Size selection ----
    const sizeBtns = document.querySelectorAll('.size-btn');
    const sizeLabel = document.getElementById('sizeLabel');
    sizeBtns.forEach(btn => {
        btn.onclick = () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            sizeLabel.textContent = btn.dataset.size;
        };
    });

    // ---- Quantity ----
    let qty = 1;
    const qtyInput = document.getElementById('qtyInput');
    document.getElementById('qtyMinus').onclick = () => {
        if (qty > 1) { qty--; qtyInput.value = qty; }
    };
    document.getElementById('qtyPlus').onclick = () => {
        qty++; qtyInput.value = qty;
    };

    // ---- Add to cart ----
    const addBtn = document.getElementById('addToCartBtn');
    addBtn.onclick = () => {
        addBtn.textContent = 'ADDED ✓';
        addBtn.style.background = '#4a7a4a';
        setTimeout(() => {
            addBtn.textContent = 'ADD TO CART';
            addBtn.style.background = '';
        }, 1500);
    };

    // ---- Accordions ----
    document.querySelectorAll('.acc-head').forEach(head => {
        head.onclick = () => {
            const item = head.parentElement;
            // close others
            document.querySelectorAll('.acc-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        };
    });
}

























// ===== MOBILE MENU TOGGLE =====
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.querySelector('.nav');

if (menuBtn && navMenu) {
    menuBtn.onclick = () => {
        navMenu.classList.toggle('active');
        // Icon change
        if (navMenu.classList.contains('active')) {
            menuBtn.classList.remove('fa-bars');
            menuBtn.classList.add('fa-times');
        } else {
            menuBtn.classList.remove('fa-times');
            menuBtn.classList.add('fa-bars');
        }
    };
}

// ===== MOBILE DROPDOWN TOGGLE =====
const dropdowns = document.querySelectorAll('.nav-item.dropdown');
dropdowns.forEach(dd => {
    const link = dd.querySelector('a');
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dd.classList.toggle('open');
        }
    });
});