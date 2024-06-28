document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.parentElement;
            const id = section.getAttribute('data-id');
            const name = section.getAttribute('data-name');
            const price = parseFloat(section.getAttribute('data-price'));
            const stock = parseInt(section.getAttribute('data-stock'));

            if (stock > 0) {
                addToCart(id, name, price);
                updateStock(section, stock - 1);
            } else {
                alert('Desculpe, este item está fora de estoque!');
            }
        });
    });

    clearCartButton.addEventListener('click', () => {
        cart = [];
        localStorage.removeItem('cart');
        renderCart();
    });

    function addToCart(id, name, price) {
        const item = cart.find(item => item.id === id);

        if (item) {
            item.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function updateStock(section, newStock) {
        const stockElement = section.querySelector('.stock');
        stockElement.textContent = newStock;

        if (newStock === 0) {
            const addToCartButton = section.querySelector('.add-to-cart');
            addToCartButton.disabled = true;
            addToCartButton.textContent = 'Esgotado';
            addToCartButton.classList.add('out-of-stock');
        }
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}`;
            cartItems.appendChild(li);

            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
    }

    // Renderizar carrinho ao carregar a página
    renderCart();
});
