
var miktarInputs = document.querySelectorAll('.checkout-table input[type="number"]');

var sepetiGuncelleButton = document.getElementById('update-btn');

var kaldirmaButonlari = document.querySelectorAll('.pr-remove a');

var sepetiOnaylaButton = document.getElementById('aprove-btn');

miktarInputs.forEach(function(input) {
  input.addEventListener('change', function() {
    sepetiGuncelle(); 
  });
});


kaldirmaButonlari.forEach(function(button) {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    urunuKaldir(button);
    sepetiGuncelle(); 
  });
});


sepetiGuncelleButton.addEventListener('click', function() {
  sepetiGuncelle(); 
});


// Ürünü sepetten kaldırma fonksiyonu
function urunuKaldir(button) {
  var urunSatiri = button.closest('tr'); 
  urunSatiri.remove(); 
}

// Sepeti güncelleme fonksiyonu
function sepetiGuncelle() {
    var totalPrice = 0;

    // Her ürün satırını döngüye al ve toplam tutarı hesapla
    var productRows = document.querySelectorAll('.checkout-table tbody tr');

    productRows.forEach(function(row) {
      var quantityInput = row.querySelector('input[type="number"]');
      var quantity = parseInt(quantityInput.value || 0); // Güvenlik için varsayılan değer
      var priceString = row.querySelector('.product-title.font-alt').textContent.trim();
      var price = parseFloat(priceString.split(' ')[0].replace(',', '.')); // Fiyatı alma

      var rowTotal = quantity * price;
      totalPrice += rowTotal;

      // Yeni toplamı ekrana yaz
      var totalElement = row.querySelector('.product-title.font-alt');
      if (totalElement) {
        totalElement.textContent = rowTotal.toFixed(2).replace('.', ',') + ' TL';
      }
    });

    // Toplam tutarı ve sepet toplamlarını güncelle
    var cartTotalRows = document.querySelectorAll('.shop-Cart-totalbox tbody tr');

    cartTotalRows.forEach(function(row, index) {
      if (index === 2) {
        row.querySelector('td').textContent = totalPrice.toFixed(2).replace('.', ',') + ' TL'; // Toplam tutarı güncelle
      }
    });
}

$(document).ready(function() {
  $('#aprove-btn').magnificPopup({
    items: {
      src: '#confirmation-popup',
      type: 'inline'
    },
    midClick: true,
    callbacks: {
      open: function() {
        // Pop-up açıldığında yapılacak işlemler
      },
      close: function() {
        // Pop-up kapatıldığında yapılacak işlemler
      }
    }
  });

  // Tamamlandı butonuna tıklandığında
  $(document).on('click', '#confirm-cart-btn', function() {
    $.magnificPopup.close(); // Pop-up kapat
    // İşlemleri burada tamamla veya istediğin başka bir işlemi gerçekleştir
  });
});

$('.open-popup-link').magnificPopup({
  items: {
    src: '#confirmation-popup'
  },
  type: 'inline',
  DelayNode: 2000, // Pop-up açılırken geçen süre
  removalDelay: 1500, // Pop-up kapatılırken geçen süre
  callbacks: {
    beforeOpen: function() {
      this.st.mainClass = 'mfp-zoom-in'; // Açılırken kullanılacak animasyon efekti
    }
  }
});