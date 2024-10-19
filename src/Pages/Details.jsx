import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { http } from '../axios';

function Details() {
  const [product, setProduct] = useState({});
  const [color, setColor] = useState('');
  const [amount, setAmount] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    http.get(`products/${id}`)
      .then(response => {
        if (response.status === 200) {
          setProduct(response.data.data);
          setColor(response.data.data.attributes.colors[0]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);
  const addToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.attributes.title,
      price: product.attributes.price,
      image: product.attributes.image,
      color,
      amount
    };
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    alert('Added to cart!');
  };

  return (
    <div className="p-8 flex gap-8">
      {
        product.id && (
          <>
            <img src={product.attributes.image} width={400} alt={product.attributes.title} />
            <div className="details">
              <h2 className="text-3xl font-semibold">{product.attributes.title}</h2>
              <h3 className="text-xl text-gray-500">${product.attributes.price}</h3>
              <p className="text-gray-500 mb-4">{product.attributes.description}</p>
              <div className="mb-4">
                <h4>Colors</h4>
                <div className="flex gap-2">
                  {product.attributes.colors.map((colorProduct) => (
                    <span key={colorProduct}  style={{  backgroundColor: colorProduct,  border: color === colorProduct ? '2px solid black' : 'none', }} className="block w-6 h-6 rounded-full cursor-pointer" onClick={() => setColor(colorProduct)}></span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h4>Amount</h4>
                <select value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="border p-2 rounded" >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={addToCart} className="bg-blue-500 text-white px-4 py-2 rounded"> ADD TO BAG </button>
            </div>
          </>
        )
      }
    </div>
  );
}

export default Details;
