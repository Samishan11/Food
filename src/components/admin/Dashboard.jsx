
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Addfood from './Addfood';
import './dash.css'
import Dashboardcontent from './Dashboardcontent';
import Orders from './Orders';
import Product from './Product';
const Dashboard = () => {
  const [navcollapse, setNavcollapse] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [addfood, setAddfood] = useState(false);
  const [order, setOrder] = useState(false);
  const [product, setProduct] = useState(false);
  function onclick() {
    setNavcollapse(!navcollapse)
    console.log(navcollapse);
  }
  console.log(order);

  return (
    <div className={navcollapse ? "d-flex toggled" : "d-flex"} id="wrapper">
      {/* Sidebar */}
      <div className="bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i className="fas fa-user-secret me-2" />Codersbite</div>
        <div className="list-group list-group-flush my-3">
          <Link onClick={() => {
            setDashboard(true)
            setAddfood(false)
            setOrder(false)
          }} to="#" className="list-group-item list-group-item-action bg-transparent second-text active"><i className="fas fa-tachometer-alt me-2" />Dashboard</Link>
          <Link onClick={() => {
            setAddfood(true)
            setDashboard(false)
          }} to="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i className="fas fa-project-diagram me-2" />Add Food</Link>
          <Link onClick={() => {
            setDashboard(false)
            setAddfood(false)
            setOrder(true)
          }} to="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i className="fas fa-paperclip me-2" />Orders</Link>
          <Link onClick={() => {
            setDashboard(false)
            setAddfood(false)
            setOrder(false)
            setProduct(true)
          }} to="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i className="fas fa-gift me-2" />Products</Link>
          <Link to="#" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"><i className="fas fa-power-off me-2" />Logout</Link>
        </div>
      </div>
      {/* /#sidebar-wrapper */}
      {/* Page Content */}
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
          <div className="d-flex align-items-center">
            <i onClick={onclick} className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle" />
            <h2 className="fs-2 m-0">Dashboard</h2>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle second-text fw-bold" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-user me-2" />John Doe
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="#">Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        {
          addfood ? <Addfood></Addfood> : dashboard ? <Dashboardcontent></Dashboardcontent> : order ? <Orders></Orders> : product ? <Product></Product> : <Dashboardcontent></Dashboardcontent>
        }
      </div>
    </div>
  )
}

export default Dashboard;