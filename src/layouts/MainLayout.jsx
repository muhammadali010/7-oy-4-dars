import React from 'react';
import { TiShoppingCart } from "react-icons/ti";
import { IoSunny } from "react-icons/io5";
import { Link,  useNavigate } from 'react-router-dom';

function MainLayout({ children }) {
  const navigate = useNavigate()
  return (
    <>
      <div className="bg-[#0a192f] p-4 text-white flex justify-between items-center mb-10">
        <div className="flex items-center space-x-4 justify-between mx-auto">
          <div className="bg-blue-500 p-4 px-5 rounded text-white font-bold">C</div>

          <div className="flex space-x-4 pl-[450px] pr-[450px]">
            <Link to="/" className="text-gray-400 hover:text-blue-500 cursor-pointer"> Home </Link>
            <Link to="/about" className="text-gray-400 hover:text-blue-500 cursor-pointer"> About</Link>
            <Link to="/products" className="text-gray-400 hover:text-blue-500 cursor-pointer"> Products </Link>
            <Link to="/cart" className="text-gray-400 hover:text-blue-500 cursor-pointer">Cart</Link>
          </div>

          <div className='flex items-center gap-2'>
            <IoSunny className='h-8 w-8' />
            <TiShoppingCart onClick={(e => { e.preventDefault(), navigate('/cart') })} className='h-8 w-8 cursor-pointer' />
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default MainLayout;
