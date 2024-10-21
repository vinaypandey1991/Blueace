import React, { act, useEffect, useState } from 'react';
import DashboardContent from './DashboardContent';
import MyListing from './MyListing';
import AddListing from './AddListing';
import SaveListing from './SaveListing';
import MyBooking from './MyBooking';
import Wallet from './Wallet';
// import Profile from './Profile';
import ChangePassword from './ChangePassword';
import VendorDashboard from './VendorData/VendorDashboard';
import axios from 'axios'
import AllVendorOrder from './VendorData/AllVendorOrder';
import ActiveVendorOrder from './VendorData/ActiveVendorOrder';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import VendorProfile from './VendorData/VendorProfile';
import VendorChangePassword from './VendorData/VendorChangePassword';
import VendorMember from './VendorData/VendorMember';
import AddVendorMember from './VendorData/AddVendorMember';

function  Dashboard() {
	const navigate = useNavigate();
	const [activeOrder, setActiveOrder] = useState([])
    const [allOrder, setAllOrder] = useState([])
	const [activeTab, setActiveTab] = useState('Dashboard')
	// console.log(activeTab)
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}, [])

	// console.log('datatype',userDataString)
	const userDataString = sessionStorage.getItem('user');
	const userData = userDataString ? JSON.parse(userDataString) : null;
	console.log('userdata',userData)
	const token = sessionStorage.getItem('token');
    const userId = userData?._id;

	// console.log('active order',activeOrder)
	// console.log('all order',allOrder)

	const fetchOrderData = async () => {
        try {
            const res = await axios.get('https://api.blueace.co.in/api/v1/get-all-order')
            const orderData = res.data.data
            const filterData = orderData.filter((item) => item?.vendorAlloted?._id === userData?._id)
            setAllOrder(filterData)
            const filterStatusData = filterData.filter((item) => item.OrderStatus !== 'Service Done' && item.OrderStatus !== 'Cancelled');
            // console.log('Filtered data by OrderStatus:', filterStatusData);
            setActiveOrder(filterStatusData)

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data.message || 'Internal server error in fetching orderData')
        }
    }

    useEffect(() => {
        fetchOrderData();
    }, [])

	const handleLogout = async () => {
        try {
            const res = await axios.get('https://api.blueace.co.in/api/v1/vendor-logout', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            sessionStorage.clear();
            toast.success('Logout successfully');
            navigate('/sign-in');
        } catch (error) {
            console.log('Internal server in logout account', error);
            toast.error(error?.response?.data?.msg || 'Internal server error during logout');
        }
    };

    const handleDelete = async (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://api.blueace.co.in/api/v1/delete-vendor/${userId}`);
                    sessionStorage.clear()
                    toast.success("User Deleted Successfully");
                    window.location.href = '/'
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your id deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error(error);
                    toast.error(error.response.data.error);
                }
            }
        });
    };

	return (
		<>
			{/* =============================== Dashboard Header ========================== */}
			<section
				className="bg-cover position-relative"
				style={{ background: 'red url(assets/img/cover.jpg) no-repeat' }}
				data-overlay="3"
			>
				{/* <div className="abs-list-sec">
					<a href="dashboard-All-Order.html" className="add-list-btn">
						<i className="fas fa-plus me-2"></i>Add Listing
					</a>
				</div> */}
				<div className="container">
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
							<div className="dashboard-head-author-clicl">
								<div className="dashboard-head-author-thumb">
									<img src={userData.vendorImage?.url} className="img-fluid" alt="" />
								</div>
								<div className="dashboard-head-author-caption">
									<div className="dashploio">
										<h4>{userData.companyName}</h4>
									</div>
									<div className="dashploio">
										<span className="agd-location">
											<i className="lni lni-map-marker me-1"></i>{`${userData.registerAddress}`}
										</span>
									</div>
									<div className="listing-rating high">
										<i className="fas fa-star active"></i>
										<i className="fas fa-star active"></i>
										<i className="fas fa-star active"></i>
										<i className="fas fa-star active"></i>
										<i className="fas fa-star active"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* =============================== Dashboard Header ========================== */}

			{/* ======================= dashboard Detail ======================== */}
			<div className="goodup-dashboard-wrap gray px-4 py-5">
				<a
					className="mobNavigation"
					data-bs-toggle="collapse"
					href="#MobNav"
					role="button"
					aria-expanded="false"
					aria-controls="MobNav"
				>
					<i className="fas fa-bars me-2"></i>Dashboard Navigation
				</a>
				<div className="collapse" id="MobNav">
					<div className="goodup-dashboard-nav sticky-top">
						<div className="goodup-dashboard-inner">
							<ul data-submenu-title="Main Navigation">
								<li onClick={() => setActiveTab('Dashboard')} className={`${activeTab === 'Dashboard' ? 'active' : ''}`}>
									<a>
										<i className="lni lni-dashboard me-2"></i>Dashboard
									</a>
								</li>
								<li onClick={() => setActiveTab('Active-Order')} className={`${activeTab === 'Active-Order' ? 'active' : ''}`}>
									<a>
										<i className="lni lni-files me-2"></i>Active Order
									</a>
								</li>
								<li onClick={() => setActiveTab('All-Order')} className={`${activeTab === 'All-Order' ? 'active' : ''}`}>
									<a>
										<i className="lni lni-add-files me-2"></i>All Orders
									</a>
								</li>
								<li onClick={() => setActiveTab('members')} className={`${activeTab === 'members' ? 'active' : ''}`}>
									<a>
										<i className="lni lni-bookmark me-2"></i>Member
									</a>
								</li>
								<li onClick={() => setActiveTab('add-members')} className={`${activeTab === 'add-members' ? 'active' : ''}`}>
									<a>
										<i className="lni lni-bookmark me-2"></i>Add Member
									</a>
								</li>
							</ul>
							<ul data-submenu-title="My Accounts">
								<li onClick={() => setActiveTab('profile')} className={`${activeTab === 'profile' ? 'active' : ''}`}>
									<a>
										<i className="lni lni-user me-2"></i>My Profile
									</a>
								</li>
								<li onClick={() => setActiveTab('changePassword')} className={`${activeTab === 'changePassword' ? 'active' : ''}`}>
									<a>
										<i className="lni lni-lock-alt me-2"></i>Change Password
									</a>
								</li>
								<li>
									<a onClick={()=>handleDelete(userId)}>
										<i className="lni lni-trash-can me-2"></i>Delete Account
									</a>
								</li>
								<li>
									<a onClick={handleLogout}>
										<i className="lni lni-power-switch me-2"></i>Log Out
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{
					activeTab === 'Dashboard' && (
						<>
							<VendorDashboard userData={userData} />
						</>
					)
				}
				{
					activeTab === 'Active-Order' && (
						<>
							<ActiveVendorOrder userData={userData} activeOrder={activeOrder} />
						</>
					)
				}
				{
					activeTab === 'All-Order' && (
						<>
							<AllVendorOrder userData={userData} allOrder={allOrder} />
						</>
					)
				}
				{
					activeTab === 'members' && (
						<>
							<VendorMember userData={userData} />
						</>
					)
				}
				{
					activeTab === 'add-members' && (
						<>
							<AddVendorMember userData={userData} />
						</>
					)
				}
				{
					activeTab === 'my-booking' && (
						<>
							<MyBooking />
						</>
					)
				}
				{
					activeTab === 'wallet' && (
						<>
							<Wallet />
						</>
					)
				}
				{
					activeTab === 'profile' && (
						<>
							<VendorProfile userData={userData} />
						</>
					)
				}
				{
					activeTab === 'changePassword' && (
						<>
							<VendorChangePassword userData={userData} />
						</>
					)
				}

			</div>
			{/* ======================= dashboard Detail ======================== */}
		</>
	);
}

export default Dashboard;
