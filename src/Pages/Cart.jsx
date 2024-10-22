import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const storeCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storeCart);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);
  const total = subtotal;
  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-8">Shopping Cart</h2>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-6 mb-6 border-b pb-4">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-500">Color: <span style={{ backgroundColor: item.color }} className="w-3 h-3 inline-block rounded-full"></span></p>
                  <div className="flex items-center mt-2">
                    <label htmlFor="amount" className="mr-2">Amount:</label>
                    <select value={item.amount} onChange={(e) => { const updatedAmount = Number(e.target.value); const updatedCart = [...cartItems]; updatedCart[index].amount = updatedAmount; setCartItems(updatedCart); localStorage.setItem('cart', JSON.stringify(updatedCart)); }} className="border p-2 rounded"  >
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => removeItem(index)} className="text-blue-500 ml-4">remove</button>
                  </div>
                </div>
                <p className="text-xl font-semibold">${(item.price * item.amount).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>Order Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button onClick={(e) => { e.preventDefault(), navigate("/login") }} className="bg-blue-500 text-white w-full mt-6 py-2 rounded-lg"> PLEASE LOGIN </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
