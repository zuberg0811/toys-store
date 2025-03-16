const API_URL = 'https://your-backend-url.com/api/toys';

// Lấy danh sách sản phẩm
async function fetchToys() {
    const res = await fetch(API_URL);
    const toys = await res.json();
    const toyList = document.getElementById('toy-list');
    toyList.innerHTML = '';

    toys.forEach(toy => {
        toyList.innerHTML += `
            <tr>
                <td>${toy.name}</td>
                <td>${toy.price} $</td>
                <td>${toy.stock}</td>
                <td><img src="${toy.image}" width="50"></td>
                <td>
                    <button onclick="deleteToy('${toy._id}')">Xóa</button>
                </td>
            </tr>
        `;
    });
}

// Thêm sản phẩm
document.getElementById('toy-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;

    await fetch(API_URL + '/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, stock })
    });

    fetchToys();
});

// Xóa sản phẩm
async function deleteToy(id) {
    await fetch(API_URL + `/delete/${id}`, { method: 'DELETE' });
    fetchToys();
}

// Load sản phẩm khi trang mở
fetchToys();
