
const CART_KEY = 'shopping_cart';

// Load cart from localStorage
function loadCart() {
  const cartJSON = localStorage.getItem(CART_KEY);
  return cartJSON ? JSON.parse(cartJSON) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add item to cart
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
  showNotification(`${item.name} đã được thêm vào giỏ hàng!`, 'success');
  renderCart();
  updateCartCounter();
}

// Remove item completely from cart
function removeFromCart(id) {
  let cart = loadCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  showNotification('Sản phẩm đã được xóa khỏi giỏ hàng!', 'info');
  renderCart();
  updateCartCounter();
}

// Increase quantity of item
function increaseQuantity(id) {
  const cart = loadCart();
  const index = cart.findIndex(item => item.id === id);

  if (index !== -1) {
    cart[index].quantity += 1;
    saveCart(cart);
    renderCart();
    updateCartCounter();
  }
}

// Decrease quantity of item
function decreaseQuantity(id) {
  const cart = loadCart();
  const index = cart.findIndex(item => item.id === id);

  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      // If quantity becomes 0, remove the item
      cart.splice(index, 1);
    }
    saveCart(cart);
    renderCart();
    updateCartCounter();
  }
}

// Calculate total price
function calculateTotal() {
  const cart = loadCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart counter in UI
function updateCartCounter() {
  const cart = loadCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCounter = document.querySelector('.cart-counter');
  if (cartCounter) {
    cartCounter.textContent = totalItems;
    cartCounter.style.display = totalItems > 0 ? 'inline' : 'none';
  }
}

// Show notification
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
  `;

  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

// Render cart UI
function renderCart() {
  const cart = loadCart();
  const cartContainer = document.getElementById('cart');
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="text-center py-4">
        <i class="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
        <p class="text-muted">Giỏ hàng của bạn đang trống</p>
        <a href="index.html" class="btn btn-warning">Tiếp tục mua sắm</a>
      </div>
    `;
    return;
  }

  let html = '<div class="cart-items">';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
      <div class="cart-item border-bottom py-3">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="d-flex align-items-center">
              <img src="${item.image || 'https://via.placeholder.com/60'}" alt="${item.name}" class="cart-item-image me-3" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
              <div>
                <h6 class="mb-0 text-warning">${item.name}</h6>
                <small class="text-muted">${item.price.toLocaleString('vi-VN')} VNĐ / sản phẩm</small>
              </div>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="quantity-controls d-flex align-items-center justify-content-center">
              <button class="btn btn-sm btn-outline-warning" onclick="decreaseQuantity('${item.id}')" ${item.quantity <= 1 ? 'title="Xóa sản phẩm"' : ''}>
                <i class="fas ${item.quantity <= 1 ? 'fa-trash' : 'fa-minus'}"></i>
              </button>
              <span class="mx-3 fw-bold text-warning">${item.quantity}</span>
              <button class="btn btn-sm btn-outline-warning" onclick="increaseQuantity('${item.id}')">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          
          <div class="col-md-2 text-center">
            <div class="fw-bold text-warning">${itemTotal.toLocaleString('vi-VN')} VNĐ</div>
          </div>
          
          <div class="col-md-1 text-center">
            <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.id}')" title="Xóa sản phẩm">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>
    
    <div class="cart-summary mt-4 p-3 bg-secondary rounded">
      <div class="row">
        <div class="col-md-8">
          <div class="d-flex gap-2">
            <button class="btn btn-outline-warning" onclick="clearCart()" onclick="return confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm?')">
              <i class="fas fa-trash me-2"></i>Xóa tất cả
            </button>
            <a href="index.html" class="btn btn-outline-info">
              <i class="fas fa-arrow-left me-2"></i>Tiếp tục mua sắm
            </a>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="text-end">
            <div class="mb-2">
              <span class="text-muted">Tạm tính: </span>
              <span class="fw-bold text-warning">${total.toLocaleString('vi-VN')} VNĐ</span>
            </div>
            <div class="mb-3">
              <span class="text-muted">Phí vận chuyển: </span>
              <span class="text-success">Miễn phí</span>
            </div>
            <div class="mb-3 border-top pt-2">
              <span class="h5 text-warning">Tổng cộng: ${total.toLocaleString('vi-VN')} VNĐ</span>
            </div>
            <button class="btn btn-warning btn-lg w-100" onclick="checkout()">
              <i class="fas fa-credit-card me-2"></i>Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  cartContainer.innerHTML = html;
}

// Clear entire cart
function clearCart() {
  if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
    localStorage.removeItem(CART_KEY);
    showNotification('Giỏ hàng đã được xóa!', 'info');
    renderCart();
    updateCartCounter();
  }
}

// Checkout function
function checkout() {
  const cart = loadCart();

  if (cart.length === 0) {
    showNotification('Giỏ hàng của bạn đang trống!', 'error');
    return;
  }

  const total = calculateTotal();

  // Create order summary
  let orderSummary = 'Đơn hàng của bạn:\n\n';
  cart.forEach(item => {
    orderSummary += `${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ\n`;
  });
  orderSummary += `\nTổng cộng: ${total.toLocaleString('vi-VN')} VNĐ`;

  if (confirm(`${orderSummary}\n\nBạn có muốn tiến hành thanh toán không?`)) {
    // Simulate order processing
    showNotification('Đang xử lý đơn hàng...', 'info');

    setTimeout(() => {
      // Generate order ID
      const orderId = 'ORDER' + Date.now();

      // Save order to localStorage (optional)
      const order = {
        id: orderId,
        items: cart,
        total: total,
        date: new Date().toLocaleString('vi-VN'),
        status: 'Đã đặt hàng'
      };

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart
      localStorage.removeItem(CART_KEY);
      renderCart();
      updateCartCounter();

      showNotification(
        `Đặt hàng thành công! Mã đơn hàng: ${orderId}. Cảm ơn bạn đã mua sắm!`,
        'success'
      );

      // Optional: redirect to order confirmation page
      // setTimeout(() => {
      //   window.location.href = 'order-confirmation.html?orderId=' + orderId;
      // }, 2000);

    }, 1500);
  }
}

// Get cart item count
function getCartItemCount() {
  const cart = loadCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Get cart total
function getCartTotal() {
  return calculateTotal();
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateCartCounter();
});
