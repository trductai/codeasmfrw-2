import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IProduct } from '../../interface/product';
import { useMutation } from '@tanstack/react-query';
import { createData } from '../../services/data';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const ListAdd = () => {
  const nav = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<IProduct>();
  
  const mutation = useMutation({
    mutationFn: async (data: IProduct) => {
      try {
        const { data: product } = await createData<IProduct>({ route: 'book', data });
        return product;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      console.log(data);      
      message.success("Thêm mới thành công");
      nav("/admin/product-list");
    },
    onError: (error) => {
      console.error(error);
      message.error("Có lỗi xảy ra khi thêm sản phẩm");
    }
  });

  const onSubmit = (productData: IProduct) => {
    mutation.mutate(productData);
  };

  return (
    <div className='w-full max-w-xl mx-auto p-4'>
      <h1 className="text-2xl font-semibold text-center mb-6">Thêm Mới sản phẩm</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

        {/* Tên sản phẩm */}
        <div>
          <input 
            type='text' 
            placeholder="Nhập tên sản phẩm"
            className="border-2 border-gray-300 rounded-lg p-2"
            {...register("name", { required: "Không được bỏ trống tên sản phẩm" })}
          />
          <div className="text-danger">{errors.name?.message}</div>
        </div>

        {/* Đường dẫn ảnh sản phẩm */}
        <div>
          <input 
            type='text' 
            placeholder="Nhập đường dẫn ảnh sản phẩm"
            className="border-2 border-gray-300 rounded-lg p-2"
            {...register("image", { required: "Không được bỏ trống ảnh sản phẩm" })}
          />
          <div className="text-danger">{errors.image?.message}</div>
        </div>

        {/* Giá sản phẩm */}
        <div>
          <input 
            type='number'
            placeholder="Nhập giá sản phẩm"
            className="border-2 border-gray-300 rounded-lg p-2"
            {...register("price", { 
              required: "Không được bỏ trống giá sản phẩm", 
              min: { value: 1000, message: "Giá Sản Phẩm Tối Thiểu 1000" }
            })}
          />
          <div className="text-danger">{errors.price?.message}</div>
        </div>

        {/* Số sao sản phẩm */}
        <div>
          <input 
            type='number'
            placeholder="Số sao sản phẩm"
            className="border-2 border-gray-300 rounded-lg p-2"
            {...register("rating", {
              required: "Không được bỏ trống",
              min: { value: 0, message: "Số Sao tối thiểu là 0" },
              max: { value: 5, message: "Số Sao tối đa là 5" }
            })}
          />
          <div className="text-danger">{errors.rating?.message}</div>
        </div>

        {/* Ảnh sản phẩm (có thể thêm nhiều ảnh) */}
        <div>
          <input 
            type="text" 
            placeholder="Ảnh sản phẩm 1"
            className="border-2 border-gray-300 rounded-lg p-2"
            {...register("images.0", { required: "Không được bỏ trống ảnh sản phẩm" })}
          />
          <div className="text-danger">{errors.images?.[0]?.message}</div>
        </div>

        <div>
          <input 
            type="text" 
            placeholder="Ảnh sản phẩm 2"
            className="border-2 border-gray-300 rounded-lg p-2"
            {...register("images.1")}
          />
        </div>

        <div>
          <input 
            type="text" 
            placeholder="Ảnh sản phẩm 3"
            className="border-2 border-gray-300 rounded-lg p-2"
            {...register("images.2")}
          />
        </div>

        {/* Checkbox Best Selling */}
        <div className="flex items-center">
          <input 
            type="checkbox"
            id="bestSelling"
            {...register("bestSelling")}
            className="mr-2"
          />
          <label htmlFor="bestSelling" className="text-lg">Đánh dấu là sản phẩm bán chạy</label>
        </div>

        {/* Nút submit */}
        <div>
          <button type="submit" className="w-full py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">Thêm Mới</button>
        </div>
      </form>
    </div>
  );
};

export default ListAdd;
