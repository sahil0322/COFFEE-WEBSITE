document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------- */
    /* == 1. Sticky Header     == */
    /* ------------------------- */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ------------------------- */
    /* == 2. Page Navigation   == */
    /* ------------------------- */
    const navLinks = document.querySelectorAll('.nav-page-link');
    const pages = document.querySelectorAll('.page');
    const navLinkEls = document.querySelectorAll('.nav-link');
    const mobileMenu = document.getElementById('nav-links');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href'); // e.g., "#menu"

            // Update Page Content
            pages.forEach(page => {
                if (`#${page.id}` === targetId) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });

            // Update Active Nav Link
            navLinkEls.forEach(navLink => {
                if (navLink.getAttribute('href') === targetId) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            });

            // Close mobile menu on navigation
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }

            // Scroll to top of page
            window.scrollTo(0, 0);
        });
    });

    /* ------------------------- */
    /* == 3. Mobile Menu Toggle == */
    /* ------------------------- */
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('active');
        const isOpen = mobileMenu.classList.contains('active');
        menuIconOpen.style.display = isOpen ? 'none' : 'block';
        menuIconClose.style.display = isOpen ? 'block' : 'none';
        menuToggle.setAttribute('aria-expanded', isOpen);
    };

    menuToggle.addEventListener('click', toggleMobileMenu);

    /* ------------------------- */
    /* == 4. Home: Product Carousel == */
    /* ------------------------- */
    const track = document.getElementById('carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('carousel-next');
    const prevButton = document.getElementById('carousel-prev');
    let slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    const updateSlideWidth = () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transition = 'none'; // Disable transition for resize
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out'; // Re-enable
        }, 50);
    };

    const moveToSlide = (index) => {
        track.style.transform = `translateX(-${index * slideWidth}px)`;
        currentIndex = index;
    };

    nextButton.addEventListener('click', () => {
        let nextIndex = currentIndex + 1;
        // Check if we are at the "fake" first slide (the clone)
        if (nextIndex >= slides.length - 1) {
            moveToSlide(nextIndex); // Move to the clone
            // After transition, jump back to the real first slide
            setTimeout(() => {
                track.style.transition = 'none';
                moveToSlide(0);
            }, 500);
            // Re-enable transition after the jump
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            }, 550);
        } else {
            moveToSlide(nextIndex);
        }
    });

    prevButton.addEventListener('click', () => {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            // Jump to the fake last slide (clone of first)
            track.style.transition = 'none';
            moveToSlide(slides.length - 1);
            // Then animate to the real last slide
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                moveToSlide(slides.length - 2);
            }, 50);
        } else {
            moveToSlide(prevIndex);
        }
    });

    window.addEventListener('resize', updateSlideWidth);
    updateSlideWidth(); // Initial call

    /* ------------------------- */
    /* == 5. Home: Testimonials == */
    /* ------------------------- */
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    let currentTestimonial = 0;

    const showTestimonial = (index) => {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    };

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    }, 5000); // Change slide every 5 seconds

    /* ------------------------- */
    /* == 6. Menu: Tabs        == */
    /* ------------------------- */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.target; // e.g., "#hot-coffees"

            // Update button active state
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show/hide content
            menuCategories.forEach(category => {
                if (`#${category.id}` === target) {
                    category.classList.add('active');
                } else {
                    category.classList.remove('active');
                }
            });
        });
    });

    /* ------------------------- */
    /* == 7. Menu: Item Modal  == */
    /* ------------------------- */
    const menuModal = document.getElementById('menu-item-modal');
    const menuModalClose = document.getElementById('menu-modal-close');
    const menuItems = document.querySelectorAll('.menu-item');

    const menuModalImg = document.getElementById('menu-modal-img');
    const menuModalName = document.getElementById('menu-modal-name');
    const menuModalPrice = document.getElementById('menu-modal-price');
    const menuModalDesc = document.getElementById('menu-modal-desc');
    const menuModalDietary = document.getElementById('menu-modal-dietary');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Populate modal
            menuModalImg.src = item.dataset.img;
            menuModalImg.alt = item.dataset.name;
            menuModalName.textContent = item.dataset.name;
            menuModalPrice.textContent = item.dataset.price;
            menuModalDesc.textContent = item.dataset.description;

            // Populate dietary icons
            menuModalDietary.innerHTML = '';
            if (item.dataset.dietary) {
                const dietaryTags = item.dataset.dietary.split(',');
                dietaryTags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = `dietary-icon ${tag}`;
                    span.textContent = tag.toUpperCase();
                    menuModalDietary.appendChild(span);
                });
            }

            // Show modal
            menuModal.classList.add('active');
        });
    });

    const closeMenuModal = () => menuModal.classList.remove('active');
    menuModalClose.addEventListener('click', closeMenuModal);

    /* ------------------------- */
    /* == 8. Cart System       == */
    /* ------------------------- */
    let cart = [];
    const cartIconBtn = document.getElementById('cart-icon-btn');
    const cartModal = document.getElementById('cart-modal');
    const cartModalClose = document.getElementById('cart-modal-close');
    const cartBadge = document.getElementById('cart-badge');
    
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartEmptyMsg = document.getElementById('cart-empty-msg');
    const cartTotalPrice = document.getElementById('cart-total-price');

    const openCartModal = () => cartModal.classList.add('active');
    const closeCartModal = () => cartModal.classList.remove('active');

    cartIconBtn.addEventListener('click', openCartModal);
    cartModalClose.addEventListener('click', closeCartModal);

    // Close modal on overlay click
    [menuModal, cartModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // 1. Grab the empty container we made in Step 2
    const productGrid = document.getElementById('product-grid');

    // 2. Create an async function to talk to our API
    async function loadProducts() {
        try {
            // Fetch the data from our Node.js server
            const response = await fetch('/api/products');
            const products = await response.json();
            
            // Clear the grid just in case
            productGrid.innerHTML = '';

            // Loop through the database items and build the HTML
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'shop-product-card';
                
                // Notice how we use the data variables like ${product.name}
                productCard.innerHTML = `
                    <img src="${product.img}" alt="${product.name}">
                    <div class="shop-product-content">
                        <h4>${product.name}</h4>
                        <p class="shop-product-price">$${product.price.toFixed(2)}</p>
                        <p>${product.desc}</p>
                        <button class="btn add-to-cart-btn" 
                            data-id="${product.id}" 
                            data-name="${product.name}" 
                            data-price="${product.price}">Add to Cart</button>
                    </div>
                `;
                
                productGrid.appendChild(productCard);
            });

            // 3. Attach the cart functionality to these newly created buttons
            attachCartListeners();

        } catch (error) {
            console.error("Error loading products:", error);
            if(productGrid) {
                productGrid.innerHTML = '<p>Sorry, we could not load the products at this time.</p>';
            }
        }
    }

    // 4. Our fixed cart logic, wrapped in a function
    function attachCartListeners() {
        const newAddToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        
        newAddToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.shop-product-card');
                const actualDisplayedImage = productCard.querySelector('img').src;

                const product = {
                    id: button.dataset.id,
                    name: button.dataset.name,
                    price: parseFloat(button.dataset.price),
                    img: actualDisplayedImage, 
                };

                cart.push(product);
                updateCart();
            });
        });
    }

    // 5. Run the fetch function as soon as the script loads
    if(productGrid) {
        loadProducts();
    }

    function updateCart() {
        // Update Badge
        if (cart.length > 0) {
            cartBadge.textContent = cart.length;
            cartBadge.classList.add('active');
        } else {
            cartBadge.classList.remove('active');
        }

        // Update Modal
        if (cart.length === 0) {
            cartEmptyMsg.style.display = 'block';
            cartItemsContainer.innerHTML = ''; // Clear items
            cartItemsContainer.appendChild(cartEmptyMsg);
        } else {
            cartEmptyMsg.style.display = 'none';
            cartItemsContainer.innerHTML = ''; // Clear before render
            let total = 0;

            cart.forEach(item => {
                total += item.price;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                        <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);
            });

            cartTotalPrice.textContent = `$${total.toFixed(2)}`;
        }
    }

    
    /* ------------------------- */
    /* == Stripe Checkout Logic  == */
    /* ------------------------- */
    const checkoutBtn = document.querySelector('.cart-modal-footer .btn');
    
    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', async () => {
            // Don't checkout if the cart is empty
            if(cart.length === 0) {
                alert("Your cart is empty! Add some Aura Beans first.");
                return;
            }

            // Change button text so the user knows it's loading
            checkoutBtn.textContent = 'Processing...';

            try {
                // Send the cart data to our Node.js server
                const response = await fetch('/create-checkout-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cart: cart })
                });

                const session = await response.json();

                // If Stripe gave us a URL, redirect the user to the payment page!
                if(session.url) {
                    window.location.href = session.url;
                } else {
                    alert("Something went wrong with checkout.");
                    checkoutBtn.textContent = 'Proceed to Checkout';
                }
            } catch (error) {
                console.error("Checkout Error:", error);
                checkoutBtn.textContent = 'Proceed to Checkout';
            }
        });
    }

    /* ------------------------- */
    /* == 9. Contact Form      == */
    /* ------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formContent = document.getElementById('form-content');
    const formSuccess = document.getElementById('form-success');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Reset errors
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            messageError.style.display = 'none';
            nameInput.style.borderColor = 'var(--border-color)';
            emailInput.style.borderColor = 'var(--border-color)';
            messageInput.style.borderColor = 'var(--border-color)';

            // Validate Name
            if (nameInput.value.trim() === '') {
                nameError.style.display = 'block';
                nameInput.style.borderColor = 'red';
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailError.style.display = 'block';
                emailInput.style.borderColor = 'red';
                isValid = false;
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                messageError.style.display = 'block';
                messageInput.style.borderColor = 'red';
                isValid = false;
            }

            if (isValid) {
                // On success:
                formContent.style.display = 'none';
                formSuccess.style.display = 'block';
            }
        });
    }

});