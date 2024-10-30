const cart1 = document.querySelectorAll(".menu-item i")
document.addEventListener('DOMContentLoaded', function() {
    let iconCart = document.querySelector('.icon-cart');
    let close = document.querySelector('.cartTab .close');
    let body = document.querySelector('body');

    iconCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    })
    close.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    }); 
});

cart1.forEach(function(button,index){
    button.addEventListener('click',function(event){
        let cartItem = event.target;
        let product = cartItem.parentElement;
        let productImg = product.querySelector("img").src;
        let productName = product.querySelector("h3").innerText;
        let productPrice = product.querySelector("span").innerText;
        addtocart(productImg,productName,productPrice)
        updateCartIcon()
    })
})
function addtocart(productImg,productName,productPrice){
    
    let cartItem = document.querySelectorAll("table tr")
    for (let i = 0; i < cartItem.length; i++) {
        let productT = cartItem[i].querySelector(".name"); 
        let quantityValue = cartItem[i].querySelector(".quantity-value");

        if (productT && productT.innerHTML === productName) {  
            quantityValue.innerText = parseInt(quantityValue.innerText) + 1;
            cartotal(); 
            return;
        }
    }

    let addtr = document.createElement("tr");
    let trcontent = `
    <tr>
        <td style="display: flex; align-items: center;">
            <img " src="${productImg}" alt="">
            <p class="name">${productName}</p>
        </td>
        <td>
            <p><span>${productPrice}</span></p>
        </td>
        <td>
            <button class="quantity-decrease" >-</button>
            <span class="quantity-value">1</span>
            <button class="quantity-increase" >+</button>
        </td>
        <td >
            <i class="fa-solid fa-x" id="class-dele"></i>
        </td>
    </tr>`
    addtr.innerHTML = trcontent
    let carttable = document.querySelector("table")
    carttable.append(addtr)
    cartotal()
    inputchange()
    deleteCarṭ()
    updateCartIcon() 

}

function cartotal() {
    let cartItem = document.querySelectorAll("table tr");
    let totalC = 0;
    for (let i = 0; i < cartItem.length; i++) {
        let quantityValue = parseInt(cartItem[i].querySelector(".quantity-value").innerText);
        let productPrice = parseFloat(cartItem[i].querySelector("span").innerText);
        
        let totalA = quantityValue * productPrice * 1000;
        totalC += totalA;
    }
    let cartTotalA = document.querySelector(".price-total span");
    cartTotalA.innerHTML = totalC.toLocaleString('de-DE');
}

function deleteCarṭ(){
    let cartItem = document.querySelectorAll("table tr")
    for(let i=0;i<cartItem.length;i++){
        let productT = document.querySelectorAll("#class-dele")
        productT[i].addEventListener("click",function(event){
            let cartDelete = event.target
            let cartitemP = cartDelete.parentElement.parentElement
            cartitemP.remove()
            cartotal()
            console.log(cartitemP)
        })
        
    }
}
function inputchange(){
    let cartItem = document.querySelectorAll("table tr")
    for(let i=0;i<cartItem.length;i++){
        let quantityIncrease = cartItem[i].querySelector(".quantity-increase");
        let quantityDecrease = cartItem[i].querySelector(".quantity-decrease");
        let quantityValue = cartItem[i].querySelector(".quantity-value");

        quantityIncrease.addEventListener("click", function() {
            quantityValue.innerText = parseInt(quantityValue.innerText) + 1;
            cartotal();
            updateCartIcon();
        });

        quantityDecrease.addEventListener("click", function() {
            if (parseInt(quantityValue.innerText) > 1) {
                quantityValue.innerText = parseInt(quantityValue.innerText) - 1;
                cartotal();
                updateCartIcon();
            }
        });
    }
}
function updateCartIcon() {
    let cartItem = document.querySelectorAll("table tr");
    let totalQuantity = 0
    for (let i = 0; i < cartItem.length; i++) {
        let quantityValue = parseInt(cartItem[i].querySelector(".quantity-value").innerText);
        totalQuantity += quantityValue; 
    }
    let cartIcon = document.querySelector(".icon-cart span");
    cartIcon.innerText = totalQuantity;
}


const checkOutButton = document.querySelector('.check');
checkOutButton.addEventListener('click', function() {
    alert('Đặt hàng thành công!');
});


document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchinput");
    const searchButton = document.getElementById("searchfood");
    const menuItems = document.querySelectorAll(".menu-item");

    function removeDiacritics(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function removeDiacriticsAndSpecialChars(str) {
        return str
            .normalize("NFD") // Loại bỏ các ký tự dấu
            .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
            .replace(/[^\w\s]/gi, "") // Xóa các ký tự đặc biệt (chỉ giữ chữ và số)
            .toLowerCase(); // Chuyển về chữ thường
    }

    // Hàm tìm kiếm món ăn
    function searchProduct() {
        const query = removeDiacriticsAndSpecialChars(searchInput.value);
        let hasResults = false;

        // Duyệt qua các phần tử menu-item và so sánh với từ khóa tìm kiếm
        menuItems.forEach(item => {
            const name = removeDiacriticsAndSpecialChars(item.getAttribute("data-name"));
            if (name.includes(query)) {
                item.style.display = "block"; // Hiển thị kết quả phù hợp
                hasResults = true;
            } else {
                item.style.display = "none"; // Ẩn các kết quả không phù hợp
            }
        });

        // Hiển thị hoặc ẩn nút quay lại dựa trên kết quả tìm kiếm
        backButton.style.display = hasResults ? "block" : "none";
    }

    // Hàm hiển thị lại tất cả các món ăn
    function showAllItems() {
        menuItems.forEach(item => {
            item.style.display = "block"; // Hiển thị tất cả các món
        });
        backButton.style.display = "none"; // Ẩn nút quay lại
        searchInput.value = ""; // Xóa từ khóa tìm kiếm
    }

    // Sự kiện nhấn nút tìm kiếm
    searchButton.addEventListener("click", function() {
        searchProduct();
    });

    // Sự kiện nhấn Enter trong ô tìm kiếm
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            searchProduct();
        }
    });

    // Sự kiện nhấn nút quay lại
    backButton.addEventListener("click", function() {
        showAllItems();
    });
});