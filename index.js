const form = document.getElementById('myForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const selling = document.getElementById('selling').value;
    const product = document.getElementById('product').value;
    const category = document.getElementById('category').value;
    const obj = {
        selling,
        product,
        category
    };

    try {
        await axios.post('https://crudcrud.com/api/39806a12c8b74f41a1db972aded9aecb/cart', obj);
        await displayData();
        form.reset();
    } catch (error) {
        console.log(error);
    }
});

async function displayData() {
    try {
        const response = await axios.get('https://crudcrud.com/api/39806a12c8b74f41a1db972aded9aecb/cart');
        const electronic_ul = document.getElementById('electronic_items');
        const food_ul = document.getElementById('food_items');
        const skincare_ul = document.getElementById('skincare_items');
        electronic_ul.innerHTML = '<h2>Electronic Items</h2>';
        food_ul.innerHTML = '<h2>Food Items</h2>';
        skincare_ul.innerHTML = '<h2>Skincare Items</h2>';
        const data = response.data;

        if (data != null) {
            for (let i = 0; i < data.length; i++) {
                const listItem = document.createElement('li');
                listItem.textContent = `Selling Price: ${data[i].selling}, Product Name: ${data[i].product}, Category: ${data[i].category}`;

                if (data[i].category == "electronic") {
                    electronic_ul.appendChild(listItem);
                } else if (data[i].category == "food") {
                    food_ul.appendChild(listItem);
                } else {
                    skincare_ul.appendChild(listItem);
                }

                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', async function () {
                    await deleteData(data[i]._id);
                });

                listItem.appendChild(deleteButton);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteData(id) {
    try {
        await axios.delete(`https://crudcrud.com/api/39806a12c8b74f41a1db972aded9aecb/cart/${id}`);
        await displayData();
    } catch (error) {
        console.log(error);
    }
}

displayData();
