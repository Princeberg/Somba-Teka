// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKsq6sfR-CqPMJFwXrD3DJlQ3Z4E1G1-k",
  authDomain: "teka-somba-3ddca.firebaseapp.com",
  databaseURL: "https://teka-somba-3ddca-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "teka-somba-3ddca",
  storageBucket: "teka-somba-3ddca.firebasestorage.app",
  messagingSenderId: "690571843370",
  appId: "1:690571843370:web:f802c4e0f823e54ca83053",
  measurementId: "G-T3J6X0SLBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the "products" node in Firebase Realtime Database
const productsRef = ref(database, "products");

// Fetch and display products
onValue(productsRef, (snapshot) => {
  const productList = document.getElementById("productList");

  if (!productList) {
    console.error("Element with ID 'productList' not found.");
    return;
  }

  productList.innerHTML = ""; // Clear previous content

  snapshot.forEach((childSnapshot) => {
    const product = childSnapshot.val();

    // Create product card HTML
    const productCard = `
      <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
        <div class="card">
          <a href="description.html?productId=${childSnapshot.key}" title="${product.productName}">
            <img src="${product.productPicture}" alt="${product.productName}" class="card-img-top">
          </a>
          <div class="card-body">
            <h5 class="card-title">${product.productName}</h5>
            <p class="card-text">${product.categorie}</p>
            <p class="card-text"><strong>${product.price} FCFA</strong></p>
          </div>
        </div>
      </div>
    `;

    // Append product card to the list
    productList.innerHTML += productCard;
  });
}, (error) => {
  console.error("Error fetching products:", error);
});