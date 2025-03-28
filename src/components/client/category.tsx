import { HeartOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaStar, FaRegHeart, FaRegEye } from 'react-icons/fa';

const Category = () => {
  interface IProduct {
    id: number;
    name: string;
    image: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
    isNew?: boolean;
    discount?: number;
  }

  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/book'); // API lấy sản phẩm từ server
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
                <FaRegHeart />
              </button>
              <button className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
                <FaRegEye />
              </button>
              <button className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
              <HeartOutlined />                
              </button>
            </div>

            {/* Product Image */}
            <div className="h-56 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain group-hover:opacity-75"  // Dùng object-contain để vừa khung mà không bị cắt xén
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h4>

              {/* Price */}
              <div className="flex items-center gap-2 text-lg mb-2">
                <span className="text-red-500 font-semibold">${product.price}</span>
                {product.oldPrice && (
                  <span className="line-through text-gray-400">${product.oldPrice}</span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
                {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                  <FaStar key={i} />
                ))}
                <span className="text-gray-500 ml-2">({product.reviews})</span>
              </div>

              {/* Add To Cart button */}
              <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 text-center">
        <button className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700">
          Load More
        </button>
      </div>
    </div>
  );
};

export default Category;
