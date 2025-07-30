# Hướng Dẫn Sử Dụng Giỏ Hàng - Retro Gaming Store

## Các Chức Năng Đã Hoàn Thiện

### 1. **Thêm Sản Phẩm Vào Giỏ Hàng**

- Nhấn nút "Thêm vào giỏ" trên bất kỳ sản phẩm nào
- Sản phẩm sẽ được thêm vào localStorage
- Hiển thị thông báo xác nhận
- Cập nhật số lượng sản phẩm trên icon giỏ hàng

### 2. **Xem Giỏ Hàng**

- Truy cập `cart.html` hoặc nhấn vào icon giỏ hàng
- Hiển thị danh sách tất cả sản phẩm đã thêm
- Thông tin chi tiết: hình ảnh, tên, giá, số lượng

### 3. **Quản Lý Số Lượng**

- **Tăng số lượng**: Nhấn nút "+"
- **Giảm số lượng**: Nhấn nút "-"
- **Xóa sản phẩm**: Nhấn nút "-" khi số lượng = 1 hoặc nút "X"

### 4. **Tính Toán Tổng Tiền**

- Tự động tính tổng tiền cho từng sản phẩm
- Hiển thị tổng tiền toàn bộ giỏ hàng
- Cập nhật real-time khi thay đổi số lượng

### 5. **Thanh Toán**

- Nhấn nút "Thanh toán"
- Hiển thị tóm tắt đơn hàng
- Xác nhận thanh toán
- Tạo mã đơn hàng
- Lưu lịch sử đơn hàng
- Xóa giỏ hàng sau khi thanh toán thành công

### 6. **Các Tính Năng Khác**

- **Xóa tất cả**: Xóa toàn bộ sản phẩm trong giỏ hàng
- **Tiếp tục mua sắm**: Quay lại trang sản phẩm
- **Thông báo**: Hiển thị thông báo cho mọi hành động
- **Lưu trữ bền vững**: Dữ liệu được lưu trong localStorage
- **Responsive**: Tương thích với mọi thiết bị

## Cách Test Các Chức Năng

### Test 1: Thêm Sản Phẩm

1. Mở `index.html`
2. Nhấn "Thêm vào giỏ" cho PC Gaming
3. Kiểm tra số đếm trên icon giỏ hàng

### Test 2: Quản Lý Giỏ Hàng

1. Mở `mouse.html`
2. Thêm vài sản phẩm chuột khác nhau
3. Mở `cart.html`
4. Test tăng/giảm số lượng
5. Test xóa sản phẩm

### Test 3: Thanh Toán

1. Thêm nhiều sản phẩm vào giỏ
2. Mở `cart.html`
3. Nhấn "Thanh toán"
4. Xác nhận đơn hàng
5. Kiểm tra giỏ hàng đã được xóa

### Test 4: Persistence

1. Thêm sản phẩm vào giỏ
2. Đóng browser
3. Mở lại và kiểm tra giỏ hàng vẫn còn

## Cấu Trúc Files

```
📁 project/
├── 📄 index.html          # Trang chủ
├── 📄 cart.html           # Trang giỏ hàng chuyên dụng
├── 📄 mouse.html          # Trang danh sách chuột
├── 📄 keyboard.html       # Trang danh sách bàn phím
├── 📄 viperv3.html        # Chi tiết sản phẩm Razer Viper V3
├── 📄 modelo.html         # Chi tiết sản phẩm Glorious Model O
├── 📄 cart.js             # Logic xử lý giỏ hàng
├── 📄 index.css           # CSS chính + CSS giỏ hàng
└── 📄 README.md           # File hướng dẫn này
```

## API Functions (cart.js)

### Chức năng chính:

- `addToCart(item)` - Thêm sản phẩm
- `removeFromCart(id)` - Xóa sản phẩm
- `increaseQuantity(id)` - Tăng số lượng
- `decreaseQuantity(id)` - Giảm số lượng
- `clearCart()` - Xóa tất cả
- `checkout()` - Thanh toán
- `renderCart()` - Hiển thị giỏ hàng
- `calculateTotal()` - Tính tổng tiền

### Utility functions:

- `loadCart()` - Tải dữ liệu từ localStorage
- `saveCart(cart)` - Lưu dữ liệu
- `updateCartCounter()` - Cập nhật số đếm
- `showNotification(message, type)` - Hiển thị thông báo

## Lưu Ý Kỹ Thuật

1. **localStorage**: Dữ liệu giỏ hàng được lưu với key `'shopping_cart'`
2. **Order History**: Lịch sử đơn hàng được lưu với key `'orders'`
3. **Responsive**: Sử dụng Bootstrap 5.3.3
4. **Icons**: FontAwesome 6.0.0
5. **Notifications**: Tự động ẩn sau 3 giây

## Browser Support

- Chrome, Firefox, Safari, Edge (modern versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
