import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { ListData } from '../../services/data'
import { IProduct } from '../../interface/product'
import { Button, message, Popconfirm, Table } from 'antd'
import { CheckCircleFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

const Category = () => {
    const {data,isLoading} = useQuery<IProduct[]>({ 
        queryKey: ['book'], 
        queryFn: async ()=>{
            try {
                const {data} = await ListData("book")
                return data
            } catch (error) {
                console.log(error);
            }
        } 
    })
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async(id:number)=>{
            try {
                await axios.delete(`http://localhost:3000/book/${id}`)
            } catch (error) {
                console.log(error);                
            }
        },
        onSuccess:()=>{
            // alert("Xóa thành công")
            message.success('Xóa thành công');
            queryClient.invalidateQueries({ queryKey: ['book'] })
        }
    })
    const DeleteProduct = (id:number)=>{
        // if (confirm("Bạn chắc chứ")){
            mutation.mutate(id)
        // }
    }
    const columns = [
        {
          title: 'STT',
          key: 'stt',
          render: (_:any,item:IProduct,index:any)=>index+1
        },
        {
          title: 'Ảnh sản phẩm',
          dataIndex: 'image',
          key: 'image',
          render: (image:string)=><img src={image} width={90}/>
        },
        {
          title: 'Tên sản phẩm',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Thao tác',
            key: 'action',
            dataIndex:'id',
            render: (id:any)=><>
                {/* <Link to={`/dashboard/product-edit/${id}`}>Sửa</Link> */}
                <Button className='mr-2' type="primary" onClick={()=>navigate(`/dashboard/product-edit/${id}`)}><EditOutlined /> Sửa</Button>
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
        <h1 className='text-[24px] text-center'>Danh sách sản phẩm</h1>
        {(isLoading)?<div>Đang tải</div>:
        <>  {
            (data)&&<Table dataSource={data} columns={columns} />
            }
        </>
        }
    </div>
  )
}

export default Category