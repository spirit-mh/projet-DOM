// Fonction qui met à jour le prix total du panier
function updateTotal() {
    const products = document.querySelectorAll(".card-body .card"); // 🔍 On récupère tous les produits
    let total = 0;
    products.forEach((product) => {
        const price = parseFloat(product.querySelector(".unit-price").textContent); // 💰 Prix unitaire
        const quantity = parseInt(product.querySelector(".quantity").textContent);   // 🔢 Quantité actuelle
        total += price * quantity; // 🧮 On ajoute au total (prix * quantité)
    });
    document.querySelector(".total").textContent = total + " $"; // 🖊️ On met à jour l'affichage total
}

//  On attend que la page soit complètement chargée avant d'attacher les événements
window.addEventListener("DOMContentLoaded", () => {
    // ➕ Bouton + : augmente la quantité
    document.querySelectorAll(".fa-plus-circle").forEach((btn) => {
        btn.addEventListener("click", () => {
            const quantitySpan = btn.nextElementSibling; // 👈 le <span> à droite du bouton +
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
            updateTotal(); // 🔁 Met à jour le total
        });
    });

    // ➖ Bouton - : diminue la quantité (jamais en dessous de 0)
    document.querySelectorAll(".fa-minus-circle").forEach((btn) => {
        btn.addEventListener("click", () => {
            const quantitySpan = btn.previousElementSibling; // 👈 le <span> à gauche du bouton -
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 0) {
                quantity--;
                quantitySpan.textContent = quantity;
                updateTotal();
            }
        });
    });

    //  Cœur : toggle like (change de couleur avec une classe)
    document.querySelectorAll(".fa-heart").forEach((heart) => {
        heart.addEventListener("click", () => {
            heart.classList.toggle("text-danger"); // ✅ Ajoute/enlève la classe Bootstrap rouge
        });
    });

    // 🗑️ Corbeille : supprime le produit du DOM
    document.querySelectorAll(".fa-trash-alt").forEach((trash) => {
        trash.addEventListener("click", () => {
            const productCard = trash.closest(".card-body"); // ⬆️ remonte jusqu'au conteneur du produit
            productCard.remove(); // ❌ supprime le produit
            updateTotal(); // 🔁 on recalcule le total
        });
    });
});
