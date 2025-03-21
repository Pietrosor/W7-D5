const endPoint = "https://striveschool-api.herokuapp.com/api/product/"
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2FjODM4MzRiZjAwMTUwMDA3M2EiLCJpYXQiOjE3NDI1NTcxOTUsImV4cCI6MTc0Mzc2Njc5NX0.TmDJVmr1vtOhSR0yA-myKN2WONTj44gCAz4p3B6dZnI"

const loadProducts = () => {
  fetch(endPoint, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((products) => {
      console.log("Products loaded:", products)
      const container = document.querySelector("#productsContainer")
      container.innerHTML = ""

      products.forEach((productData) => {
        const productCard = `
          <div class="card" style="width: 18rem;">
            <img src="${productData.imageUrl}" class="card-img-top" alt="${productData.name}">
            <div class="card-body">
              <h5 class="card-title">${productData.name}</h5>
              <p class="card-text">${productData.description}</p>
              <p class="card-text">Price: $${productData.price}</p>
              <a href="#" class="btn btn-primary" onclick="editProduct('${productData._id}')">Edit</a>
              <a href="#" class="btn btn-danger" onclick="deleteProduct('${productData._id}')">Delete</a>
            </div>
          </div>
        `
        container.innerHTML += productCard
      })
    })
    .catch((error) => console.error("Error loading products:", error))
}

const deleteProduct = (productId) => {
  const confirmDelete = confirm("Are you sure you want to delete this product?")
  if (confirmDelete) {
    fetch(`${endPoint}${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Product deleted successfully")
          loadProducts()
        } else {
          alert("Error deleting product")
        }
      })
      .catch((error) => console.error("Error deleting product:", error))
  }
}

document.addEventListener("DOMContentLoaded", loadProducts)
