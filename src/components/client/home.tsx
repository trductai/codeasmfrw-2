import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Product } from "../types/Product";
import { HomeIcon, PlusCircleIcon, ArrowRightOnRectangleIcon as LoginIcon, UserPlusIcon as UserAddIcon } from "@heroicons/react/24/outline";
import { FaMobileAlt, FaLaptop, FaCamera, FaGamepad, FaHeadphones, FaClock, FaCheckCircle, FaTruck, FaSearch, FaRegUser, FaShoppingCart, FaApple } from 'react-icons/fa';
import { FaStar, FaRegHeart, FaRegEye } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { TypeCart } from "../../interface/cart";

function Homepage() {
  const { id } = useParams<{ id: string }>(); // Đảm bảo khai báo kiểu đúng cho id

  const navigate=useNavigate();
  interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
  }
  interface IProduct {
    id: number;
    name: string;
    image: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
    isNew?: boolean; // Thêm thuộc tính isNew để đánh dấu sản phẩm mới
  }

    const [products, setProducts] = useState<Product[]>([]);
    const [books, setBooks] = useState<IProduct[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(''); // State cho từ khóa tìm kiếm
    const [currentPage, setCurrentPage] = useState<number>(1); // Trang hiện tại
    const [productsPerPage] = useState<number>(6); // Số sản phẩm mỗi trang
    const {cartstate,dispatch} = useContext(cartContext)
    const [bestSellingProducts, setBestSellingProducts] = useState<any[]>([]);
  const [otherProducts, setOtherProducts] = useState<any[]>([]);
    useEffect(()=>{
      (async()=>{
          try {
              const token = localStorage.getItem("token")
              const config = {
                  headers: {'Authorization':`Bearer ${token}`}
              }
              const {data} = await axios.get(`http://localhost:3000/carts`,config)
              dispatch({type:TypeCart.updateCart,payload:data.data.Items})
          } catch (error) {
              
          }
      })()
  },[])
    interface CategoryItem {
      name: string;
      icon: JSX.Element;
      isActive?: boolean;
    }
    
    const categories: CategoryItem[] = [
      { name: 'Phones', icon: <FaMobileAlt /> },
      { name: 'Computers', icon: <FaLaptop /> },
      { name: 'SmartWatch', icon: <FaClock /> },
      { name: 'Camera', icon: <FaCamera /> },
      { name: 'HeadPhones', icon: <FaHeadphones /> },
      { name: 'Gaming', icon: <FaGamepad /> },
    ];
    
    // Lấy danh sách sản phẩm từ API
    // const getList = async () => {
    //     try {
    //         const { data } = await axios.get('http://localhost:3000/products');
    //         setProducts(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // const getProducts = async () => {
    //   try {
    //     const { data } = await axios.get("http://localhost:3000/book");  // API lấy dữ liệu từ database 'book'
    //     setBooks(data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // Hàm xóa sản phẩm
   
    const getProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/book");
        const bestSellers = data.filter((product: any) => product.bestSelling === true);
        const others = data.filter((product: any) => product.bestSelling !== true);
        
        setBestSellingProducts(bestSellers); // Sản phẩm best selling
        setOtherProducts(others); // Sản phẩm còn lại
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      getProducts(); // Load sản phẩm khi trang được tải
    }, []);
    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Tìm kiếm theo tên sản phẩm
    );

    // Tính toán chỉ số sản phẩm cần hiển thị trên trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Chuyển đến trang tiếp theo
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Chuyển đến trang trước
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

   
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
    
    return (
        <div>
            
            <div>
      {/* Top Bar */}
     

      {/* Header */}
      

      {/* Category Section */}
      
      <div className="flex w-full h-[400px] bg-white">
      {/* Sidebar - Categories */}
      <aside className="w-[250px] border-r p-4">
        <ul className="space-y-4 text-sm text-gray-900">
          <li className="hover:font-semibold cursor-pointer">Woman’s Fashion ▸</li>
          <li className="hover:font-semibold cursor-pointer">Men’s Fashion ▸</li>
          <li className="hover:font-semibold cursor-pointer">Electronics</li>
          <li className="hover:font-semibold cursor-pointer">Home & Lifestyle</li>
          <li className="hover:font-semibold cursor-pointer">Medicine</li>
          <li className="hover:font-semibold cursor-pointer">Sports & Outdoor</li>
          <li className="hover:font-semibold cursor-pointer">Baby’s & Toys</li>
          <li className="hover:font-semibold cursor-pointer">Groceries & Pets</li>
          <li className="hover:font-semibold cursor-pointer">Health & Beauty</li>
        </ul>
      </aside>
      {/* Banner */}
      <div className="w-full h-[400px] bg-black relative overflow-hidden">
      <div className="relative bg-black text-white flex items-center justify-between h-96 px-6">
      {/* Content (Text) */}
      <div className="z-10 w-1/2">
        {/* Apple Logo + iPhone 14 Series */}
        <div className="flex items-center text-xl font-semibold">
          <FaApple className="text-white mr-2 w-6 h-6" />
          iPhone 14 Series
        </div>

        {/* "Up to 10% off Voucher" - Highlighted */}
        <div className="text-4xl font-bold mt-4 text-white">
          Up to 10% off Voucher
        </div>

        {/* Shop Now Button */}
        <div className="mt-6 " >
        <a href="#" className="relative group text-black">
        <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform "></span>

<button className="text-white hover:text-black transition duration-300 ">
  Shop Now
  <span className="ml-2">→</span>
</button>
        </a>
       
        </div>
      </div>

      {/* Image (iPhone 14) */}
      <div className="w-1/2">
        <img
          src="/public/img/iPhone-14-Pro-and-iPhone-14-Pro-Max-are-here-taking-the-Pro-to-the-Max.jpg" // Thay thế bằng URL hình ảnh thực tế của iPhone 14 Series
          alt="iPhone 14 Series"
          className="w-full h-full object-cover transform scale-105" // Phóng to ảnh một chút
        />
      </div>

      {/* Dots (Carousel Indicators) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <span className="w-3 h-3 rounded-full bg-gray-400"></span>
        <span className="w-3 h-3 rounded-full bg-gray-400"></span>
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
      </div>
    </div>
</div>

    </div>


    <div className="px-10 py-10 bg-white">
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-red-500 font-semibold flex items-center gap-2 mb-1">
            <span className="w-3 h-6 bg-red-500 rounded-sm"></span> Categories
          </h2>
          <h3 className="text-2xl font-bold">Browse By Category</h3>
        </div>

        {/* Arrows (fake buttons for now) */}
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-gray-100 text-xl hover:bg-gray-200">
            ←
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 text-xl hover:bg-gray-200">
            →
          </button>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center p-6 rounded-md border text-center cursor-pointer transition-all 
  ${cat.isActive 
    ? 'bg-red-500 text-white border-red-500' 
    : 'hover:bg-red-500 hover:text-white hover:border-red-500'}
`}
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <span className="text-sm font-medium">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
    </div>
    <div className="border-t mt-10"></div>
    
    <div className="px-10 py-10 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-red-500 font-semibold flex items-center gap-2 mb-1">
            <span className="w-3 h-6 bg-red-500 rounded-sm"></span> This Month
          </h2>
          <h3 className="text-2xl font-bold">Best Selling Products</h3>
        </div>
        <a href="/category">
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md">
          View All
        </button>
        </a>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {bestSellingProducts.map((product, idx) => (
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
             
              <button onClick={()=>navigate(`/detail/${product.id}`)}>
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full object-contain"
              />
              </button>
            </div>

            {/* Product info */}
            <h4 className="text-sm font-medium">{product.name}</h4>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-red-500 font-semibold">${product.price}</span>
              {product.oldPrice && (
                <span className="line-through text-gray-400">${product.oldPrice}</span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                <FaStar key={i} />
                
              ))}
              <span className="text-gray-500 ml-2">({product.reviews})</span>
            </div>
            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                Add to Cart
              </button>
          </div>
          
        ))}
      </div>
    </div>

    <div className="relative w-full h-[500px] md:h-[550px] bg-gradient-to-r from-black to-gray-900 text-white flex items-center px-6 md:px-16">
      {/* Phần bên trái (Chữ + Đếm ngược) */}
      <div className="w-1/2 space-y-4">
        <p className="text-green-400 text-lg font-semibold">Categories</p>
        <h1 className="text-5xl font-bold leading-tight">
          Enhance Your <br /> Music Experience
        </h1>

        {/* Đồng hồ đếm ngược */}
        <div className="flex gap-4 mt-6">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center justify-center bg-white text-black w-20 h-20 rounded-full">
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            </div>
          ))}
        </div>

        {/* Nút mua hàng */}
        <button className="bg-green-400 text-black font-bold py-3 px-8 mt-6 rounded-lg text-lg shadow-lg hover:bg-green-300 transition">
          Buy Now!
        </button>
      </div>

      {/* Phần bên phải (Ảnh loa) */}
      <div className="w-1/2 flex justify-end">
        <img src="/public/img/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png" alt="Speaker" className="w-[450px] md:w-[500px] object-contain" />
      </div>
    </div>
{/* phần sau */}
<div>
<div className="px-10 py-10 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-red-500 font-semibold flex items-center gap-2 mb-1">
            <span className="w-3 h-6 bg-red-500 rounded-sm"></span> Our Products
          </h2>
          <h3 className="text-2xl font-bold">Explore Our Products</h3>
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
{otherProducts.map((book, idx) => (
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
      <button
        onClick={() => navigate(`/detail/${book.id}`)}  // Điều hướng khi click vào ảnh
        className="flex items-center justify-center"  // Đảm bảo nút chứa ảnh sẽ căn giữa
      >
        <img
          src={book.image}
          alt={book.name}
          className="max-h-full object-contain rounded-lg"  // Đảm bảo hình ảnh co giãn tốt và có góc bo tròn
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
            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                Add to Cart
              </button>
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

    <div className="bg-white py-8">
      {/* Featured Section */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between mb-8">
          <div>
          <h2 className="text-red-500 font-semibold flex items-center gap-2 mb-1">
            <span className="w-3 h-6 bg-red-500 rounded-sm"></span> Featured
          </h2>
          <h3 className="text-2xl font-bold">New Arrival</h3>
        </div>
          <div className="flex gap-2">
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Product 1 - PlayStation 5 */}
          <div className="relative rounded-lg overflow-hidden bg-gray-800 text-white">
            <img
              src="/public/img/ps5.png" // Thay thế bằng URL hình ảnh thực tế
              alt="PlayStation 5"
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center p-4">
              <h4 className="text-lg font-semibold">PlayStation 5</h4>
              <p className="text-sm mt-2">Black and White version of the PS5 coming out on sale.</p>
              <button className="text-red-500 border-2 border-red-500 px-6 py-2 mt-4 rounded-md hover:bg-red-500 hover:text-white transition duration-300">
                Shop Now
              </button>
            </div>
          </div>

          {/* Product 2 - Women's Collections */}
          <div className="relative rounded-lg overflow-hidden bg-gray-800 text-white">
            <img
              src="/public/img/nu1.png" // Thay thế bằng URL hình ảnh thực tế
              alt="Women's Collections"
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center p-4">
              <h4 className="text-lg font-semibold">Women's Collections</h4>
              <p className="text-sm mt-2">Featured woman collections that give you another vibe.</p>
              <button className="text-red-500 border-2 border-red-500 px-6 py-2 mt-4 rounded-md hover:bg-red-500 hover:text-white transition duration-300">
                Shop Now
              </button>
            </div>
          </div>

          {/* Product 3 - Speakers */}
          <div className="relative rounded-lg overflow-hidden bg-gray-800 text-white">
            <img
              src="/public/img/lockhongkhi.png" // Thay thế bằng URL hình ảnh thực tế
              alt="Speakers"
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center p-4">
              <h4 className="text-lg font-semibold">Speakers</h4>
              <p className="text-sm mt-2">Amazon wireless speakers.</p>
              <button className="text-red-500 border-2 border-red-500 px-6 py-2 mt-4 rounded-md hover:bg-red-500 hover:text-white transition duration-300">
                Shop Now
              </button>
            </div>
          </div>

          {/* Product 4 - Perfume */}
          <div className="relative rounded-lg overflow-hidden bg-gray-800 text-white">
            <img
              src="/public/img/gucci.png" // Thay thế bằng URL hình ảnh thực tế
              alt="Perfume"
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center p-4">
              <h4 className="text-lg font-semibold">Perfume</h4>
              <p className="text-sm mt-2">GUCCI INTENSE OUD EDP.</p>
              <button className="text-red-500 border-2 border-red-500 px-6 py-2 mt-4 rounded-md hover:bg-red-500 hover:text-white transition duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Section */}
      <div className="container mx-auto px-4 mt-16">
        <div className="flex justify-between items-center gap-12">
          {/* Free and Fast Delivery */}
          <div className="flex items-center gap-4">
            <div className="bg-red-500 p-4 rounded-full">
              <FaTruck className="text-white w-8 h-8" />
            </div>
            <div>
              <h4 className="font-semibold">FREE AND FAST DELIVERY</h4>
              <p className="text-sm">Free delivery for all orders over $140</p>
            </div>
          </div>

          {/* 24/7 Customer Service */}
          <div className="flex items-center gap-4">
            <div className="bg-red-500 p-4 rounded-full">
              <FaHeadphones className="text-white w-8 h-8" />
            </div>
            <div>
              <h4 className="font-semibold">24/7 CUSTOMER SERVICE</h4>
              <p className="text-sm">Friendly 24/7 customer support</p>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="flex items-center gap-4">
            <div className="bg-red-500 p-4 rounded-full">
              <FaCheckCircle className="text-white w-8 h-8" />
            </div>
            <div>
              <h4 className="font-semibold">MONEY BACK GUARANTEE</h4>
              <p className="text-sm">We return money within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* footer */}
   
        </div>
    );
}

export default Homepage;