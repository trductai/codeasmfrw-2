import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form" ;//xử lý dữ liệu trong form
import { FaRegUser, FaSearch, FaShoppingCart } from "react-icons/fa";
type LoginInput = {
    email : string,
    password : string,
}
function Login() {
    //khai báo register và handleSubmit để làm việc với form
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginInput>();

    //khai báo hàm onSubmitForm khi ng dùng bấm nút submit
    const onSubmitForm: SubmitHandler<LoginInput>=async(data)=>{
        try {
            //call api đăng ký tài khoản
           const res = await axios.post('http://localhost:3000/login', data);
          // Lấy accesstokken và lưu vào localStorage
          if(res.status == 200){
            localStorage.setItem('token',res.data.accessToken);
          }
           
            alert('Đăng nhập thành công');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            

      {/* Header */}
      
            <div className="flex items-center justify-center min-h-screen bg-blue-50">
            {/* Left Side - Image */}
            <div className="w-1/2 p-8">
                <img 
                    src="/public/img/Side Image.png" // Thay bằng link hình ảnh thực tế
                    alt="Login Image"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                />
            </div>

            {/* Right Side - Login Form */}
            <div className="w-1/2 bg-white p-10 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Log in to Exclusive</h2>
                <p className="text-center text-gray-500 mb-6">Enter your details below</p>
                
                <form className="space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
                    {/* Email or Phone Number */}
                    <div>
                        <input
                            type="text"
                            placeholder="Email or Phone Number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register(('email'),{
                              required:"Không được bỏ trống email",
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register(('password'),{
                              required:"Không được bỏ trống password",
                              minLength:{
                                value:6,
                                message: "Tối Thiểu 6 ký tự"
                              }
                            })}
                        />
                        <small className="text-danger">{errors.password?.message}</small>
                    </div>

                    {/* Login Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Log In
                        </button>
                    </div>
                </form>

                {/* Forgot Password Link */}
                <div className="text-center mt-4">
                    <a href="#" className="text-sm text-red-500 hover:text-red-600">
                        Forgot Password?
                    </a>
                </div>
            </div>
        </div>
      
        </div>
     )
}

export default Login