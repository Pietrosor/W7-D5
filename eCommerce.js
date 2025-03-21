const endPoint = "https://striveschool-api.herokuapp.com/api/product/"
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2FjODM4MzRiZjAwMTUwMDA3M2EiLCJpYXQiOjE3NDI1NTcxOTUsImV4cCI6MTc0Mzc2Njc5NX0.TmDJVmr1vtOhSR0yA-myKN2WONTj44gCAz4p3B6dZnI"

class Product {
  constructor(name, description, brand, imageURL, price, id = null) {
    this.name = name
    this.description = description
    this.brand = brand
    this.imageURL = imageURL
    this.price = price
    this.id = id
  }

  mostraDettagli() {
    return `${this.name}: ${this.description} - $${this.price}`
  }

  createCard() {
    return `
      <div class="col">
        <div class="card">
          <img src="${this.imageURL}" class="card-img-top" alt="${this.name}">
          <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">${this.description}</p>
            <p class="card-text"><strong>$${this.price}</strong></p>
            <button class="btn btn-primary edit-btn" data-id="${this._id}">Edit</button>
            <button class="btn btn-danger delete-btn" data-id="${this._id}">Delete</button>
          </div>
        </div>
      </div>
    `
  }
}

const loadProducts1 = () => {
  fetch(endPoint, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((products) => {
      const container = document.querySelector(".row")
      products.forEach((productData) => {
        const product = new Product(
          productData.name,
          productData.description,
          productData.brand,
          productData.imageURL,
          productData.price
        )
        container.innerHTML += product.createCard()
      })
    })
    .catch((error) => console.error("Error fetching products:", error))
}

const addNewProduct = () => {
  const newProduct = new Product(
    "New Product",
    "This is a new product",
    "Brand New",
    "https://th.bing.com/th/id/OIP.TXVLUVnkjJg7jPAMDtKGHQHaEK?w=294&h=180&c=7&r=0&o=5&pid=1.7",
    45.0
  )

  const container = document.querySelector(".row")
  container.innerHTML += newProduct.createCard()
}

loadProducts1()

document
  .querySelector("#addProductBtn")
  .addEventListener("click", addNewProduct)

//   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2FjODM4MzRiZjAwMTUwMDA3M2EiLCJpYXQiOjE3NDI1NTcxOTUsImV4cCI6MTc0Mzc2Njc5NX0.TmDJVmr1vtOhSR0yA-myKN2WONTj44gCAz4p3B6dZnI"
