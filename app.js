
// index.html

document.getElementById('reviewForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const productName = document.getElementById('productName').value;
  const reviewText = document.getElementById('reviewText').value;

  if (productName && reviewText) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    if (!reviews[productName]) {
      reviews[productName] = [];
    }
    reviews[productName].push(reviewText);
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }

  document.getElementById('productName').value = '';
  document.getElementById('reviewText').value = '';
});

// reviews.html

document.addEventListener('DOMContentLoaded', function() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
  const productList = document.getElementById('productList');
  for (const product in reviews) {
    const listItem = document.createElement('li');
    listItem.textContent = product;
    listItem.addEventListener('click', function() {
      const reviewList = document.getElementById('reviewList');
      reviewList.innerHTML = '';
      reviews[product].forEach(function(review, index) {
        const reviewItem = document.createElement('div');
        reviewItem.textContent = review;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', function() {
          reviews[product].splice(index, 1);
          localStorage.setItem('reviews', JSON.stringify(reviews));
          this.parentNode.remove();
        });
        reviewItem.appendChild(deleteButton);
        reviewList.appendChild(reviewItem);
      });
    });
    productList.appendChild(listItem);
  }
});
