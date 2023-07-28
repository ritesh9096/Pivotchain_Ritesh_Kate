document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  const updateForm = document.getElementById("updateForm");
  const updateProductForm = document.getElementById("updateProductForm");

  const deleteProduct = (productId) => {
    const productElement = document.querySelector(
      `[data-product-id="${productId}"]`
    );
    if (productElement) {
      productElement.remove();
      window.alert("Product Deleted Successfully");
    } else {
      console.error("Error deleting product: Product element not found.");
    }
  };

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productIndex;
      deleteProduct(productId);
    });
  });
});
