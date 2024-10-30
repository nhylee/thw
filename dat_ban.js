document.getElementById("name").addEventListener("input",function(){
    let nameField = this.value;
    this.value = nameField.replace(/\b\w/g, function(char){
        return char.toUpperCase();
    });
});

document.getElementById("reservationForm").addEventListener("submit",function(event){
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let guests = document.getElementById("guests").value;

    if(!name || !phone ||!date||!time||!guests){
        alert("Vui long dien du thong tin.");
        return;
    }

    let phonePattern = /^0\d{9}$/;
    if(!phonePattern.test(phone)){
        alert("Vui long nhap so dien thoai hop le.");
        return;
    }

    let selectedDate = new Date(date);
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 

    if (selectedDate < currentDate) {
        alert("Không thể đặt bàn cho ngày trước ngày hôm nay.");
        return;
    }

    alert("Dat ban thanh cong!");
});