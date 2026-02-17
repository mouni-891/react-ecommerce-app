import { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products") // your backend endpoint
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product._id} className="product-card">
          <img src={product.img} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
