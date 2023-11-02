const baseUrl="http://localhost:3000/products"
const dataTable=document.getElementById('data-table')
async function fetchData() {
    try {
        const response=await axios.get(baseUrl)
        addTable(response.data)
    } catch (error) {
        console.log(error);
    }
   
}

function addTable(data) {
    dataTable.innerHTML=''
    data.forEach(item => {
        const row=document.createElement('tr')
        row.innerHTML=`
       
        <td>${item.name}</td>
        <td>${item.quantityPerUnit}</td>
        <td>${item.unitPrice}</td>
        <td>${item.id}</td>
            <td>
            <button onclick="editPost(${item.id})">Edit</button>
            <button onclick="deletePost(${item.id})">Delete</button>
        </td>
        `
        dataTable.appendChild(row)
    });
    
}
const createButton=document.getElementById('create-button')
async function createProduct(){
    const nameInput=document.getElementById('name').value
    const quantityInput=document.getElementById('quantityPerUnit').value
    const unitPriceInput=document.getElementById('unitPrice').value
    try {
        
        await axios.post(baseUrl,{
           
            name:nameInput,
            quantityPerUnit:quantityInput,
            unitPrice:unitPriceInput
        })
        fetchData()

    } catch (error) {
        console.log(error);
    }
}
createButton.addEventListener('click',async function () {
    await createProduct()
})


async function deletePost(postId) {
    try {
        
        await axios.delete(`${baseUrl}/${postId}`)
        fetchData()
    } catch (error) {
        console.log(error);
    }
}
let editPosdId=null

async function editPost(postId) {
    
    try {
        const response= await axios.get(`${baseUrl}/${postId}`)
       
        const post=response.data
        
        document.getElementById('name').value=post.name
   document.getElementById('quantityPerUnit').value=post.quantityPerUnit
   document.getElementById('unitPrice').value=post.unitPrice
    
    editPosdId=postId
    } catch (error) {
        console.log(error);
    }
}

const updateButton=document.getElementById('update-button')
async function updatePost() {
    const nameInput=document.getElementById('name').value
    const quantityInput=document.getElementById('quantityPerUnit').value
    const unitPriceInput=document.getElementById('unitPrice').value
    if(editPosdId){
        try {
           await axios.put(`${baseUrl}/${editPosdId}`,{
            name:nameInput,
            quantityPerUnit:quantityInput,
            unitPrice:unitPriceInput
            })
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

}

updateButton.addEventListener('click',async function () {
    await updatePost()
})
fetchData()

