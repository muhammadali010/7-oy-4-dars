import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { http } from '../axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    http.get('products')
      .then(response => {
        if (response.status === 200) {
          setProducts(response.data.data); 
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
<div className="grid grid-cols-3 gap-8 p-8">
  {products.map((product) => (
    <div
      key={product.id}
      className="bg-[#292838] shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <Link to={`/products/${product.id}`}>
        <img
          src={product.attributes.image}
          alt={product.attributes.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            {product.attributes.title}
          </h2>
          <p className="text-lg font-semibold text-[#a7a4f7]">
            ${product.attributes.price}
          </p>
        </div>
      </Link>
    </div>
  ))}
</div>
  );
}

export default Products;
