import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../interface/product";
import axios from "axios";
import { FaRegEye, FaRegHeart, FaStar } from "react-icons/fa";

function Details() {
  interface IProduct {
    id: number;
    name: string;
    image: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
    isNew?: boolean;
    type: string;
    parent: number;
    description: string;
    colors: string[];  // Đây là mảng chuỗi
    sizes: string[];   // Đây là mảng chuỗi
    size: string;
    color: string;
    images: string[]; // Thêm thuộc tính isNew để đánh dấu sản phẩm mới
  }
  const { id } = useParams();
const navigate = useNavigate();
  // Khởi tạo biến product và setProduct trong useState
  const [books, setBooks] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct | undefined>();
  const [selectedImage, setSelectedImage] = useState<string>(""); // State để lưu ảnh chính
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(0); // Khởi tạo giá trị counter với 2
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Hàm giảm số lượng
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Hàm tăng số lượng
  const increment = () => {
    setQuantity(quantity + 1);
  };
  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/book");  // API lấy dữ liệu từ database 'book'
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProducts();
}, []);
const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaStar key={i} className="text-gray-300" />);
    }
  }
  return stars;
};
const calculateTimeLeft = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);
  targetDate.setHours(targetDate.getHours() + 23);
  targetDate.setMinutes(targetDate.getMinutes() + 59);
  targetDate.setSeconds(targetDate.getSeconds() + 35);

  const difference = targetDate.getTime() - new Date().getTime();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);
  return () => clearInterval(timer);
}, []);
  const getDetail = async () => {
    try {
      const url = `http://localhost:3000/book/${id}`; // API URL to fetch product
      console.log("Requesting from URL:", url);
      const { data } = await axios.get(url);
      setProduct(data);
      setSelectedImage(data.image); // Set ảnh chính mặc định khi dữ liệu được tải
    } catch (error) {
      console.error(error);
      setError("Product not found!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found!</div>;


  return (
    <div className="container mx-auto p-6">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Product Images */}
        <div>
        <div >
        <div className="flex space-x-4">
  {/* Left: Product Thumbnail Images */}
  <div className="flex flex-col space-y-4">
  <div className="flex space-x-4">
  {/* Left: Product Thumbnail Images */}
  <div className="flex flex-col space-y-4">
    {/* Duyệt qua mảng và hiển thị 4 ảnh */}
    {product?.images?.slice(0, 4).map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`Thumbnail ${index}`}
        className="w-28 h-28 border rounded-lg cursor-pointer hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
        // onClick={() => setSelectedImage(img)} // Cập nhật ảnh chính khi click vào thumbnail
        onClick={() => setSelectedImage(img)}
      />
    ))}
  </div>
</div>

  </div>

  {/* Right: Product Main Image */}
  <div className="w-[500px] h-[500px] flex justify-center items-center">
  <img
    src={selectedImage}
    alt="Main Product"
    className="w-full h-full max-w-[600px] max-h-[600px] rounded-lg shadow-lg object-cover"
  />
</div>

</div>

</div>

</div>





        {/* Right: Product Info */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-500">
            (150 Reviews) <span className="text-green-500">| In Stock</span>
          </p>
          <p className="text-2xl font-semibold my-2">${product.price}</p> {/* Hiển thị giá sản phẩm từ API */}
          <p className="text-gray-600">{product.description}</p>

          {/* Colour Selection */}
          <div className="my-4">
      <h3 className="font-semibold">Colours:</h3>
      <div className="flex space-x-2">
        {product.colors?.map((color, index) => (
          <span
            key={index}
            className={`w-6 h-6 ${color} rounded-full border cursor-pointer transition ${
              selectedColor === color ? "border-4 border-blue-500" : "border-2"
            }`}
            onClick={() => setSelectedColor(color)} // Cập nhật màu sắc đã chọn
          />
        ))}
      </div>
    </div>

          {/* Size Selection */}
          <div className="my-4">
      <h3 className="font-semibold">Size:</h3>
      <div className="flex space-x-2">
        {product.sizes?.map((size) => (
          <button
            key={size}
            className={`border px-3 py-1 rounded transition ${
              selectedSize === size ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedSize(size)} // Cập nhật kích thước đã chọn
          >
            {size}
          </button>
        ))}
      </div>
    </div>

          {/* Quantity + Cart Button */}
          <div className="flex items-center space-x-4 my-4">
          <div className="flex border rounded overflow-hidden">
      <button
        className="px-3 py-2 bg-gray-200"
        onClick={decrement} // Gọi hàm giảm số lượng khi click vào dấu -
      >
        -
      </button>
      <span className="px-4 py-2">{quantity}</span> {/* Hiển thị giá trị counter */}
      <button
        className="px-3 py-2 bg-gray-200"
        onClick={increment} // Gọi hàm tăng số lượng khi click vào dấu +
      >
        +
      </button>
    </div>
            <button className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition">
              Buy Now
            </button>
            <button className="border px-4 py-3 rounded hover:bg-gray-100 transition">
              ❤️
            </button>
          </div>

          {/* Delivery & Returns */}
          <div className="border p-4 mt-4 rounded-lg">
            <p className="flex items-center space-x-2">
              🚚 <span>Free Delivery</span>{" "}
              <a href="#" className="text-blue-500">
                Enter your postal code
              </a>
            </p>
            <p className="flex items-center space-x-2 mt-2">
              🔄 <span>Return Delivery</span>{" "}
              <a href="#" className="text-blue-500">
                30 Days Return
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="px-10 py-10 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-red-500 font-semibold flex items-center gap-2 mb-1">
            <span className="w-3 h-6 bg-red-500 rounded-sm"></span> Our Products
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-gray-100 text-xl hover:bg-gray-200">
            ←
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 text-xl hover:bg-gray-200">
            →
          </button>
        </div>
      </div>
    </div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book, idx) => (
          <div
            key={idx}
            className="relative bg-gray-50 rounded-md p-4 flex flex-col gap-2"
          >
            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-gray-100">
                <FaRegHeart />
              </button>
              <button className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-gray-100">
                <FaRegEye />
              </button>
            </div>

            {/* Product image */}
            <div className="h-40 flex items-center justify-center">
            <button onClick={()=>navigate(`/detail/${book.id}`)}>
              <img
                src={book.image}
                alt={book.name}
                className="max-h-full object-contain"
              />
              </button>
            </div>

            {/* book info */}
            <h4 className="text-sm font-medium">{book.name}</h4>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-red-500 font-semibold">${book.price}</span>
              {book.oldPrice && (
                <span className="line-through text-gray-400">${book.oldPrice}</span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              {Array.from({ length: Math.floor(book.rating) }).map((_, i) => (
                <FaStar key={i} />
              ))}
              <span className="text-gray-500 ml-2">({book.reviews})</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
      <a href="/category">
      <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 ">
        View All Products
      </button>
      </a>
      </div>
      
    </div>
  );
}

export default Details;
