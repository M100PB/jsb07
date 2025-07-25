
const CART_KEY = 'shopping_cart';

function loadCart() {
  const cartJSON = localStorage.getItem(CART_KEY);
  return cartJSON ? JSON.parse(cartJSON) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(item) {
  const cart = loadCart();

  const index = cart.findIndex(i => i.id === item.id);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }

  saveCart(cart);
  alert(`${item.name} đã được thêm vào giỏ hàng!`);
  renderCart();
}

function removeFromCart(id) {
  let cart = loadCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cart = loadCart();
  const cartContainer = document.getElementById('cart');
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Giỏ hàng trống.</p>';
    return;
  }

  let html = '<ul class="list-group">';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    html += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${item.name}</strong> x${item.quantity}<br>
          <small>${(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ</small>
        </div>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.id}')">Xóa</button>
      </li>
    `;
  });

  html += `</ul>
    <div class="mt-3">
      <strong>Tổng cộng: ${total.toLocaleString('vi-VN')} VNĐ</strong>
    </div>
  `;

  cartContainer.innerHTML = html;
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  renderCart();
}
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});
