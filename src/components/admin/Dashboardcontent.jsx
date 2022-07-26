import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import useFoodstore from '../../zustand/foodStore'
import useOrderstore from '../../zustand/orderStore'

const Dashboardcontent = () => {
    let food = useFoodstore()
    let orders = useOrderstore()
    const [income, setIncome] = useState('')
    const [order, setOrder] = useState([])
    useEffect(()=>{
        food.getfood()
        orders.getorder()
    },[])
    useEffect(() => {
        axios.get('/income').then(res => {
            setIncome(res.data)
        }).catch(e => {
            console.log(e);
        })
    }, [])
    useEffect(() => {
        axios.get('/showallorder').then(res => {
            setOrder(res.data)
        })
    }, [])
    return (
        <div className="container-fluid px-4">
            <div className="row g-3 my-2">
                <div className="col-md-3">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">{food.food?.length}</h3>
                            <p className="fs-5">Products</p>
                        </div>
                        <i className="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">{income[0]?.totalprice}</h3>
                            <p className="fs-5">Sales</p>
                        </div>
                        <i className="fas fa-hand-holding-usd fs-1 primary-text border rounded-full secondary-bg p-3" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">{orders.order.length}</h3>
                            <p className="fs-5">Orders</p>
                        </div>
                        <i className="fas fa-truck fs-1 primary-text border rounded-full secondary-bg p-3" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">%25</h3>
                            <p className="fs-5">Increase</p>
                        </div>
                        <i className="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3" />
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <h3 className="fs-4 mb-3">Recent Orders</h3>
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
                                orders.order.slice(0,10).map((data, ind) => {
                                    return (
                                        <tr key={ind+1}>
                                            <th scope="row">{ind+1}</th>
                                            <td>{data.user?.username}</td>
                                            <td>{data.user?.email}</td>
                                            <td>{data._id}</td>
                                            <td>{data.order_at}</td>
                                            <td>{data.payment ? "True" : "False"}</td>
                                            <td>{data.status}</td>
                                            <td><i className='fas fa-pen text-success'></i></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboardcontent