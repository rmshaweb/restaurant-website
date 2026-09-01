
// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen =
            navLinks.classList.contains("active");

        menuToggle.textContent =
            isOpen ? "✕" : "☰";

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );
    });
}


// =========================
// CLOSE MOBILE MENU
// =========================

const navigationLinks =
    document.querySelectorAll(".nav-links a");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuToggle) {

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

});


// =========================
// MENU FILTER
// =========================

const categoryButtons =
    document.querySelectorAll(".category-btn");

const menuCards =
    document.querySelectorAll(".menu-card");

categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        categoryButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedCategory =
            button.textContent.trim().toUpperCase();

        menuCards.forEach((card) => {

            const categoryElement =
                card.querySelector("small");

            if (!categoryElement) return;

            const category =
                categoryElement.textContent
                    .trim()
                    .toUpperCase();

            if (
                selectedCategory === "ALL" ||
                category === selectedCategory ||
                (
                    selectedCategory === "STARTERS" &&
                    category === "STARTER"
                )
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// =========================
// ORDER CART
// =========================

let cart = [];

const addToCartButtons =
    document.querySelectorAll(".add-to-cart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutBtn =
    document.getElementById("checkoutBtn");


// =========================
// ADD TO CART
// =========================

addToCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);


        // Check if item already exists

        const existingItem =
            cart.find((item) => item.name === name);


        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }


        updateCart();


        // Small confirmation

        button.textContent = "Added ✓";

        setTimeout(() => {

            button.textContent = "Add to Order";

        }, 1000);

    });

});


// =========================
// UPDATE CART
// =========================

function updateCart() {

    if (!cartItems || !cartTotal) return;


    cartItems.innerHTML = "";


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your order is empty.
            </p>
        `;

        cartTotal.textContent = "$0";

        return;
    }


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${item.name}
                </strong>

                <span>
                    $${item.price} × ${item.quantity}
                </span>

            </div>


            <div class="cart-item-actions">

                <button
                    type="button"
                    class="quantity-btn"
                    onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    type="button"
                    class="quantity-btn"
                    onclick="changeQuantity(${index}, 1)">
                    +
                </button>

                <button
                    type="button"
                    class="remove-btn"
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        `$${total}`;
}


// =========================
// CHANGE QUANTITY
// =========================

function changeQuantity(index, change) {

    if (!cart[index]) return;


    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();
}


// =========================
// REMOVE ITEM
// =========================

function removeItem(index) {

    if (!cart[index]) return;


    cart.splice(index, 1);


    updateCart();
}


// =========================
// RESERVATION FORM
// =========================

const reservationForm =
    document.getElementById("reservationForm");

const formMessage =
    document.getElementById("formMessage");

const dateInput =
    document.getElementById("date");


// =========================
// RESTAURANT WHATSAPP
// =========================

// Replace this with the real restaurant WhatsApp number.

const restaurantWhatsApp =
    "923001234567";


// =========================
// PREVENT PAST DATES
// =========================

if (dateInput) {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(today.getDate())
            .padStart(2, "0");

    dateInput.min =
        `${year}-${month}-${day}`;
}


// =========================
// RESERVATION SUBMIT
// =========================

if (reservationForm) {

    reservationForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            // Get values

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();

            const date =
                document
                    .getElementById("date")
                    .value;

            const time =
                document
                    .getElementById("time")
                    .value;

            const guests =
                document
                    .getElementById("guests")
                    .value;

            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            // =========================
            // VALIDATION
            // =========================

            if (
                !name ||
                !email ||
                !phone ||
                !date ||
                !time ||
                !guests
            ) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please fill in all required fields.";

                    formMessage.style.color =
                        "#b45309";
                }

                return;
            }


            // =========================
            // WHATSAPP RESERVATION
            // =========================

            const whatsappMessage =

`Hello Oak & Olive! 👋

I would like to request a table reservation.

Name: ${name}
Email: ${email}
Phone: ${phone}
Date: ${date}
Time: ${time}
Guests: ${guests}
Special Request: ${message || "None"}

Thank you!`;


            const whatsappURL =
                `https://wa.me/${restaurantWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;


            window.open(
                whatsappURL,
                "_blank"
            );


            // =========================
            // SUCCESS MESSAGE
            // =========================

            if (formMessage) {

                formMessage.textContent =
                    "Your reservation details are ready to send on WhatsApp.";

                formMessage.style.color =
                    "#6b7280";
            }


            // Clear form

            reservationForm.reset();


            // Keep today's date as minimum

            if (dateInput) {

                const today = new Date();

                const year =
                    today.getFullYear();

                const month =
                    String(today.getMonth() + 1)
                        .padStart(2, "0");

                const day =
                    String(today.getDate())
                        .padStart(2, "0");

                dateInput.min =
                    `${year}-${month}-${day}`;
            }

        }
    );

}


// =========================
// WHATSAPP ORDER CHECKOUT
// =========================

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        () => {

            // Check empty cart

            if (cart.length === 0) {

                alert(
                    "Please add at least one item to your order."
                );

                return;
            }


            // Create WhatsApp message

            let message =
                "Hello Oak & Olive! 👋\n\n";

            message +=
                "I would like to place an order:\n\n";


            let total = 0;


            cart.forEach((item) => {

                const itemTotal =
                    item.price * item.quantity;

                total += itemTotal;


                message +=
                    `• ${item.name} × ${item.quantity} — $${itemTotal}\n`;

            });


            message +=
                `\nTotal: $${total}`;

            message +=
                "\n\nPlease confirm my order. Thank you!";


            // WhatsApp URL

            const whatsappURL =
                `https://wa.me/${restaurantWhatsApp}?text=${encodeURIComponent(message)}`;


            // Open WhatsApp

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


// =========================
// INITIAL CART
// =========================

updateCart();

