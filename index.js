const form = document.getElementById('myForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const selling=document.getElementById('selling').value;
    const product=document.getElementById('product').value;
    const category=document.getElementById('category').value;
    const obj={
        selling,
        product,
        category
    }
    axios.post('https://crudcrud.com/api/b6ba49a692ea4021902affc4669ac079/cart',obj)
    .then(response=>{
        displayData();
        form.reset();
    })
    .catch(error=>{
        console.log(error)
    })
});


function displayData(){
    axios.get('https://crudcrud.com/api/b6ba49a692ea4021902affc4669ac079/cart')
    .then(response=>{
        const electronic_ul=document.getElementById('electronic_items');
        const food_ul=document.getElementById('food_items');
        const skincare_ul=document.getElementById('skincare_items');
        electronic_ul.innerHTML='<h2>Electronic Items</h2>';
        food_ul.innerHTML='<h2>Food Items</h2>';
        skincare_ul.innerHTML='<h2>Skincare Items</h2>';
        const data=response.data;
        if(data!=null){
            
            for(let i=0;i<data.length;i++){
                const listItem=document.createElement('li');
                listItem.textContent=`Selling Price : ${data[i].selling} , Product Name : ${data[i].product} , Category : ${data[i].category} `;
                if(data[i].category=="electronic"){
                    electronic_ul.appendChild(listItem);
                }
                else if(data[i].category=="food"){
                    food_ul.appendChild(listItem);
                }
                else{
                    skincare_ul.appendChild(listItem)
                }
                let deleteButton=document.createElement('button');
                deleteButton.textContent='Delete';
                deleteButton.addEventListener('click',function(){
                     deleteData(data[i]._id);
                });
                listItem.appendChild(deleteButton);
            }
        }
    })
}

function deleteData(id){
    axios.delete(`https://crudcrud.com/api/b6ba49a692ea4021902affc4669ac079/cart/${id}`)
    .then(response=>{
        displayData();
    })
}
displayData();