document.getElementById("reservationForm").addEventListener("submit", function(event) {
    const tenKhachHang = document.getElementById("name").value.trim();
    const soBan = Number(document.getElementById("so_ban").value);
    const tenHopLe = /^[A-Za-z\s]{2,}$/;
    if (!tenHopLe.test(tenKhachHang)) {
        event.preventDefault(); 
        alert("Vui lòng nhập tên hợp lệ (ít nhất 2 ký tự và không chứa số hoặc ký tự đặc biệt)!");
        return;
    }
    
    if (isNaN(soBan) || soBan < 1 || soBan > 30) {
        event.preventDefault();
        alert("Vui lòng nhập số bàn là số hợp lệ! ");
        return;
    }
    alert(`Xin chào, ${tenKhachHang}!`);
});