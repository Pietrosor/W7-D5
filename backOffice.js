const endPoint = "https://striveschool-api.herokuapp.com/api/product/"
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2FjODM4MzRiZjAwMTUwMDA3M2EiLCJpYXQiOjE3NDI1NTcxOTUsImV4cCI6MTc0Mzc2Njc5NX0.TmDJVmr1vtOhSR0yA-myKN2WONTj44gCAz4p3B6dZnI"

const createProduct = (productData) => {
  return fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(productData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Product created:", data)
      loadProducts()
    })
    .catch((error) => console.error("Error creating product:", error))
}

const updateProduct = (productId, productData) => {
  return fetch(`${endPoint}${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(productData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Product updated:", data)
      loadProducts()
    })
    .catch((error) => console.error("Error updating product:", error))
}

document
  .querySelector("#productFormElement")
  .addEventListener("submit", (e) => {
    e.preventDefault()

    const productName = document.getElementById("productName").value
    const productDescription =
      document.getElementById("productDescription").value
    const productBrand = document.getElementById("productBrand").value
    const productImageURL = document.getElementById("productImageURL").value
    const productPrice = parseFloat(
      document.getElementById("productPrice").value
    )

    const productData = {
      name: productName,
      description: productDescription,
      brand: productBrand,
      imageUrl: productImageURL,
      price: productPrice,
    }

    const productId = document.getElementById("productId").value

    if (productId) {
      updateProduct(productId, productData)
    } else {
      createProduct(productData)
    }
  })

document.querySelector("#resetFormBtn").addEventListener("click", () => {
  document.getElementById("productFormElement").reset()
})

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
                <button class="btn btn-primary" onclick="editProduct('${productData._id}')">Edit</button>
              </div>
            </div>
          `
        container.innerHTML += productCard
      })
    })
    .catch((error) => console.error("Error loading products:", error))
}

const editProduct = (productId) => {
  fetch(`${endPoint}${productId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((productData) => {
      document.getElementById("productId").value = productData._id
      document.getElementById("productName").value = productData.name
      document.getElementById("productDescription").value =
        productData.description
      document.getElementById("productBrand").value = productData.brand
      document.getElementById("productImageURL").value = productData.imageUrl
      document.getElementById("productPrice").value = productData.price
    })
    .catch((error) => console.error("Error loading product:", error))
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts()
})
