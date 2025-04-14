import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form" ;//xử lý dữ liệu trong form
import { FaRegUser, FaSearch, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
type LoginInput = {
    email : string,
    password : string,
}
function RegisterAdmin() {
    //khai báo register và handleSubmit để làm việc với form
    const nav=useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginInput>();

    //khai báo hàm onSubmitForm khi ng dùng bấm nút submit
    const onSubmitForm: SubmitHandler<LoginInput>=async(data)=>{
        try {
            //call api đăng ký tài khoản
           const res = await axios.post('http://localhost:3000/register', data);
          // Lấy accesstokken và lưu vào localStorage
          if(res.status == 200){
            localStorage.setItem('token',res.data.accessToken);
          }
           
            alert('Đăng ký thành công');
            nav("/admin/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
          <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row h-screen bg-gray-50">
          {/* Left Side - Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <img 
              src="/public/img/Side Image.png"  // Thay bằng link hình ảnh thực tế
              alt="Login Image"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
    
          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Register to Exclusive</h1>
          <p className="text-gray-600 mb-8">Enter your details below</p>
    
            <form className="space-y-6" onSubmit={handleSubmit(onSubmitForm)}>
              {/* Email or Phone Number */}
              <div>
                <input
                  type="text"
                  placeholder="Email or Phone Number"
                  className="w-full px-4 py-3 border-b border-gray-300 focus:border-gray-400 outline-none"
                  {...register('email', {
                    required: "Không được bỏ trống email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address"
                    }
                  })}
                />
                <small className="text-danger">{errors.email?.message}</small>
              </div>
    
              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border-b border-gray-300 focus:border-gray-400 outline-none"
                  {...register('password', {
                    required: "Không được bỏ trống password",
                    minLength: {
                      value: 6,
                      message: "Tối thiểu 6 ký tự"
                    }
                  })}
                />
                <small className="text-danger">{errors.password?.message}</small>
              </div>
    
              {/* Login Button */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-8 rounded hover:bg-red-600 transition duration-300"
                >
                  Register
                </button>
              </div>
            </form>
            {/* Forgot Password Link */}
            <div className="flex items-center justify-between">
              
            </div>
    
            {/* Link to Register Page */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                You have an account?{" "}
                <span
                  onClick={() => nav("/admin/login")} // Điều hướng đến trang đăng ký khi nhấn
                  className="text-red-500 hover:underline"                >
                  login here
                </span>
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
     )
}

export default RegisterAdmin