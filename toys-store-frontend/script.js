document.addEventListener("DOMContentLoaded", () => {
    fetchToys();
});

async function fetchToys() {
    try {
        const response = await fetch("https://toys-store.onrender.com/api/toys");
        const toys = await response.json();

        const toyList = document.getElementById("toy-list");
        toyList.innerHTML = ""; // Xóa nội dung cũ

        toys.forEach(toy => {
            const toyCard = document.createElement("div");
            toyCard.classList.add("col-md-4");

            toyCard.innerHTML = `
                <div class="card mb-3">
                    <img src="${toy.image || 'https://via.placeholder.com/200'}" class="card-img-top" alt="${toy.name}">
                    <div class="card-body">
                        <h5 class="card-title">${toy.name}</h5>
                        <p class="card-text">Giá: $${toy.price}</p>
                        <p class="card-text">Số lượng: ${toy.stock}</p>
                    </div>
                </div>
            `;
            toyList.appendChild(toyCard);
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách đồ chơi:", error);
    }
}
