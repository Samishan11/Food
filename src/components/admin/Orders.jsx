import axios from 'axios'
import React from 'react'
import useOrderstore from '../../zustand/orderStore'

const Orders = () => {
    let orders = useOrderstore()
    const [status, setStatus] = React.useState('')
    const [orderdata, setData] = React.useState()
    const [payment, setPayment] = React.useState(Boolean)

    const updateOrder = (val,status , payment) =>{
        orders.updateorder(val, status, payment)
        // 
        axios.put(`/updateorder/${val._id}`,{status, payment}).then(res=>console.log(res)).catch(e=>console.log(e))
    }

    return (
        <div className="container-fluid px-4">
            <div className="row my-5">
                <h3 className="fs-4 mb-3">All Orders</h3>
                <div className="col">
                    <table className="table bg-white rounded shadow-sm  table-hover">
                        <thead>
                            <tr>
                                <th scope="col" width={50}>#</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Email</th>
                                <th scope="col">OrderId</th>
                                <th scope="col">Date</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Status</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.order.map((data, ind) => {
                                    return (
                                        <tr key={ind + 1}>
                                            <th scope="row">{ind + 1}</th>
                                            <td>{data.user?.username}</td>
                                            <td>{data.user?.email}</td>
                                            <td>{data._id}</td>
                                            <td>{data.order_at}</td>
                                            <td>{data.payment ? "True" : "False"}</td>
                                            <td>{data.status}</td>
                                            <td><button onClick={setData.bind(this,data)} type='button' data-bs-toggle="modal" data-bs-target="#exampleModal" className='fas fa-pen text-success'></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {/* modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title" id="exampleModalLabel">Update Order</h1>
                                <button type="button" className="btn-close text-danger fas fa-times" data-bs-dismiss="modal" aria-label="Close" ></button>
                            </div>
                            <form  id='contact-form' style={{ fontSize: '1rem' }} className="container validate-form">
                                <div className="modal-body">
                                    <div  className='container  pb-3'>
                                        <div className="container py-3 bg-white d-block mx-auto">
                                            <div className="form-group my-3">
                                                <label htmlFor="exampleInputEmail1">catagory*</label>
                                                <select onChange={e => setStatus(e.target.value)} class="form-select form-control input100" aria-label="Default select example">
                                                    <option selected>{orderdata  ? orderdata?.status : 'Select below'}</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="approved">Approved</option>
                                                    <option value="onway">Onway</option>
                                                    <option value="delivered">Delivered</option>
                                                </select>
                                            </div>
                                            <div className="form-group my-3">
                                                <label htmlFor="exampleInputEmail1">catagory*</label>
                                                <select onChange={e => setPayment(e.target.value)} class="form-select form-control input100" aria-label="Default select example">
                                                    <option selected>{orderdata?.payment ? "True" : "False"}</option>
                                                    <option value={false}>False</option>
                                                    <option value={true}>True</option>
                                                </select>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={updateOrder.bind(this ,orderdata , status , payment)} type="button" className="btn btn-outline-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders