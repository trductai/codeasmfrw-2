import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { IProduct } from '../../interface/product'
import { useNavigate, useParams } from 'react-router-dom'

const ProductEdit = () => {
  const {register,handleSubmit,reset, formState:{errors}} = useForm<IProduct>()
  const params = useParams()
  const query = useQuery<IProduct>({
    queryKey:['book',params.id],
    queryFn:async()=>{
      try {
          const {data:product} = await axios.get(`http://localhost:3000/book/${params.id}`)
          reset(product)
          return product
        } catch (error) {
        
      }
    }
  })
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: async (data:IProduct)=>{
        try {
            const {data:product} = await axios.put(`http://localhost:3000/book/${params.id}`,data)
            return product
          } catch (error) {
          console.log(error);
          
        }
    },
    onSuccess: (data)=>{    
        alert("Cập nhật thành công")
        navigate("/dashboard/product-list")
    }
  })
  const onSubmit = (productData:IProduct)=>{
    mutation.mutate(productData)
    // console.log(productData);
    
  }
  if (query.isLoading){
    return <>Đang tải</>
  }
  return (
    <div className='w-full max-w-xl mx-auto p-4'>
      <h1 className="text-2xl font-semibold text-center mb-6">Cập nhật sản phẩm</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
       <div>
       <input type='text' placeholder="Nhập tên sản phẩm"
            className="border-2 border-gray-300 rounded-lg p-2" 
            {...register("name",{
                required: "Không được bỏ trống tên sản phẩm"
        })}/>
        <div className="text-danger">{errors.name?.message}</div>
       </div>

       <div>
       <input type='text' 
        placeholder="Nhập đường dẫn ảnh sản phẩm"
        className="border-2 border-gray-300 rounded-lg p-2"
         {...register("image",
         {
            required: "Không được bỏ trống ảnh sản phẩm"
    })}/>
            <div className="text-danger">{errors.image?.message}</div>

        </div>

       <div>
       <input type='number'
         placeholder="Nhập giá sản phẩm"
         className="border-2 border-gray-300 rounded-lg p-2"  {...register("price",
         {
            required: "Không được bỏ trống giá sản phẩm",
            min:{
                value: 1000,
                message: "Giá Sản Phẩm Tối Thiểu 1000"
            }
    })}/>
                <div className="text-danger">{errors.price?.message}</div>

       </div>
       <div>
       <input type='number' 
        placeholder="Số sao sản phẩm"
        className="border-2 border-gray-300 rounded-lg p-2"
         {...register("rating",
         {
            required: "Không được bỏ trống",
            min:{
                value:0,
                message: "Số Sao tối thiểu là 0"
            },
            max:{
                value:5,
                message:"Số Sao tối đa là 5"
            }
    })}/>
            <div className="text-danger">{errors.rating?.message}</div>
        </div>
        <button className="w-full py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">Cập nhật</button>
      </form>
    </div>
  )
}

export default ProductEdit