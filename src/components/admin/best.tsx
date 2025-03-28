import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ListData } from '../../services/data'
import { IProduct } from '../../interface/product'
import { Button, Popconfirm, Table, message } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const ListBest = () => {
    const nav= useNavigate();
    const {data,isLoading} = useQuery<IProduct[]>({ 
        queryKey: ['products'], 
        queryFn: async ()=>{
            try {
                const {data} = await ListData("products")
                return data
            } catch (error) {
                console.log(error);
                
            }
        } 
    })
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async(id:number)=>{
            try {
                await axios.delete(`http://localhost:3000/products/${id}`)
            } catch (error) {
                console.log(error);                
            }
        },
        onSuccess:()=>{
            message.success('Xoá Thành Công');
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    })
    const DeleteProduct = (id:number)=>{
            mutation.mutate(id)
        }
    
    const columns = [
        {
          title: 'STT',
          key: 'stt',
          render:(_:any,item:IProduct,index:any)=>index+1
        },
        {
          title: 'Ảnh Sản Phẩm',
          dataIndex: 'image',
          key: 'image',
          render:(image:string)=><img src={image} width={150}/>
          
        },
        {
          title: 'Tên sản phẩm',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Giá Tiền',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: 'Hành Động',
            key: 'action',
            dataIndex : 'id',
            render: (id:any)=><>
            {/* <Link to={`/dashboard/product-edit/${id}`}>Sửa</Link> */}
            <Button type="primary" onClick={()=>nav(`/dashboard/product-edit/${id}`)}><EditOutlined /> Sửa</Button>
            <Popconfirm
             title="Thông báo"
             description="Bạn chắc chứ?"
             icon={<DeleteOutlined />}
             onConfirm={()=>DeleteProduct(id)}
             okText="Yes"
            cancelText="No"
            >
                    <Button danger><DeleteOutlined /> Xóa</Button>
            </Popconfirm>
        </>
          }
      ];
  return (
    <div className='bg-white px-4 py-2'>
        <h1 className='text-[24px] text-center'>Danh sách sản phẩm BestSelling</h1>
        {(isLoading)?<div>Đang tải</div>:
        <>
        {
            (data)&&<Table dataSource={data} columns={columns} />
        }
        </>
        }
    </div>
  )
}

export default ListBest