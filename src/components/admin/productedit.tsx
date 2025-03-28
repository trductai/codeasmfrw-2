import React from 'react'
import { IProduct } from '../../interface/product'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const ProductEdit = () => {
    const{register,handleSubmit,reset}=useForm<IProduct>()
    const params =useParams()
    const query=useQuery<IProduct>({
        queryKey:['product',params.id],
        queryFn:async()=>{
            try{
                const{data:product}= await axios.get(`http://localhost:4000/books/${params.id}`)
                reset(product)
                return product
            }catch(error){
                console.log(error)
            }
        }
    })
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn:async (data:IProduct)=>{
            try{
                const{data:product}=await axios.put(`http://localhost:4000/books/${params.id}`,data)
                return product
            }catch(error){
                console.log(error)
            }
        },
        onSuccess:(data)=>{
            alert("Cập Nhật Thành Công")
            navigate("/dashboard/product-list")
        }
    })
    const onSubmit = (productData:IProduct)=>{
        mutation.mutate(productData)
    }
    if(query.isLoading){
        return<>Đang Tải...</>
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
                Sửa Thông Tin Sản Phẩm
            </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="text" placeholder='Tên Sản Phẩm' {...register('name')}
             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
></input>
<input type="text" placeholder='Ảnh Sản Phẩm' {...register('image')}
             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
></input>
<input type="number" placeholder='Giá Sản Phẩm' {...register('price')}
             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
></input>
<input type="Nhà Xuất Bản" placeholder='Nhà Xuất Bản' {...register('nxb')}
             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
></input>
<input type="Mô tả" placeholder='Mô Tả' {...register('description')}
             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
></input>
<button type="submit"                         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"

>
    Sửa
</button>
        </form>
    </div>
  )
}

export default ProductEdit