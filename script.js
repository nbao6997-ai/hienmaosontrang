// Nút cảnh báo nhỏ
document.querySelector('.btn').addEventListener('click', () => {
  alert('Cuộn xuống để xem thực đơn đặc sản Hiển Mão Sơn Trang 🍗');
});

// Xử lý form đặt bàn
const form = document.getElementById('bookingForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const people = document.getElementById('people').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const msg = document.getElementById('msg');

  if (!name || !phone || !people || !date || !time) {
    msg.style.color = 'red';
    msg.textContent = 'Vui lòng nhập đầy đủ thông tin!';
    return;
  }

  msg.style.color = 'green';
  msg.textContent = '✅ Đã gửi yêu cầu đặt bàn. Chúng tôi sẽ liên hệ xác nhận sớm!';
  form.reset();
});
// === ĐÁNH GIÁ KHÁCH HÀNG ===
const reviewForm = document.getElementById('reviewForm');
const reviewList = document.getElementById('reviewList');
const reviewMsg = document.getElementById('reviewMsg');
const REVIEW_KEY = 'hienmao_reviews';
const REVIEWED_KEY = 'hienmao_hasReviewed';

// Tải danh sách đánh giá
function loadReviews() {
  const list = JSON.parse(localStorage.getItem(REVIEW_KEY) || '[]');
  reviewList.innerHTML = list.length
    ? list.map(r => `
      <div class="review-item">
        <strong>${r.name}</strong> - 
        <span class="stars">${'⭐'.repeat(r.rating)}</span>
        <p>${r.text}</p>
      </div>`).join('')
    : "<p class='msg'>Chưa có đánh giá nào. Hãy là người đầu tiên!</p>";
}
loadReviews();

// Gửi đánh giá
reviewForm.addEventListener('submit', e => {
  e.preventDefault();
  if(localStorage.getItem(REVIEWED_KEY)){
    reviewMsg.style.color = "orange";
    reviewMsg.textContent = "Cảm ơn bạn, bạn đã gửi đánh giá rồi!";
    return;
  }

  const name = document.getElementById('reviewName').value.trim();
  const rating = document.getElementById('reviewRating').value;
  const text = document.getElementById('reviewText').value.trim();
  if(!name || !rating || !text){
    reviewMsg.style.color = "red";
    reviewMsg.textContent = "Vui lòng nhập đủ thông tin.";
    return;
  }

  const list = JSON.parse(localStorage.getItem(REVIEW_KEY) || '[]');
  list.push({ name, rating, text });
  localStorage.setItem(REVIEW_KEY, JSON.stringify(list));
  localStorage.setItem(REVIEWED_KEY, '1');
  reviewMsg.style.color = "green";
  reviewMsg.textContent = "Cảm ơn bạn đã gửi đánh giá!";
  reviewForm.reset();
  loadReviews();
});
// Hiệu ứng cuộn cho toàn bộ các section
function revealOnScroll() {
  const sections = document.querySelectorAll('.section');
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(sec => {
    const secTop = sec.getBoundingClientRect().top;
    if (secTop < triggerBottom) sec.classList.add('show');
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
for (let i = 0; i < 12; i++) {
  const leaf = document.createElement('div');
  leaf.className = 'leaf';
  leaf.style.left = Math.random() * 100 + 'vw';
  leaf.style.width = 30 + Math.random() * 20 + 'px';   // lá to nhỏ ngẫu nhiên
  leaf.style.height = leaf.style.width;
  leaf.style.animationDuration = 5 + Math.random() * 8 + 's';
  leaf.style.animationDelay = Math.random() * 5 + 's';
  leaf.style.opacity = 0.5 + Math.random() * 0.5;
  leafContainer.appendChild(leaf);
}
