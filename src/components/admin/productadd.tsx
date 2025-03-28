import React from 'react'
import { IProduct } from '../../interface/product'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Mutation, useMutation, useMutationState, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { createData } from '../../services/data'

const ProductAdd = () => {
    const{register,handleSubmit,reset}=useForm<IProduct>()
    const navigate = useNavigate();
    const mutation=useMutation({
        mutationFn:async(data:IProduct)=>{
            try{
                const{data:product}= await createData<IProduct>({route:"books",data:data})
                return product
            }catch(error){
                console.log(error)
            }
        }
    })
    const onSubmit=(productData:IProduct)=>
       {mutation.mutate(productData,{
        onSuccess:()=>{
            alert("thêm thành công");
            navigate("/dashboard/product-list")
        }
       }
        )}
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
                Thêm Sản Phẩm
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
    Thêm
</button>
        </form>
    </div>
  )
}

export default ProductAdd