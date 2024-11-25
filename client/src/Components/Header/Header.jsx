import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.webp';
import './Header.css';
import toast from 'react-hot-toast';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();
  const userDataString = sessionStorage.getItem('user');
  // console.log('datatype',userDataString)
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const role = userData?.Role || null;
  const token = sessionStorage.getItem('token')
  const [allMarquee, serAllMarquee] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const handleLogOut = () => {
  //   sessionStorage.clear();
  //   navigate('/sign-in');
  // };

  const [allService,setService] = useState([])
  const fetchService = async() => {
    try {
      const res = await axios.get('https://www.api.blueaceindia.com/api/v1/get-all-service-category')
      const data = res.data.data
      const reverseData = data.reverse();
      setService(reverseData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchService();
  },[])

  const handleLogOut = async () => {
    try {
      const res = await axios.get('https://www.api.blueaceindia.com/api/v1/Logout', {
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

  const handleFetchMarquee = async () => {
    try {
      const res = await axios.get('https://www.api.blueaceindia.com/api/v1/get-all-marquee')
      serAllMarquee(res.data.data)
    } catch (error) {
      console.log("Internal server error in fetching marquee", error)
      toast.error('Internal server error in fetching marquee')
    }
  }

  const handleVendorLogOut = async () => {
    try {
      const res = await axios.get('https://www.api.blueaceindia.com/api/v1/vendor-logout', {
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

  useEffect(() => {
    handleFetchMarquee();
  }, [])

  return (
    <>
      <section className="top-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="header-contact">
                <ul className="nav nav-pills nav-top">
                  <li className="d-none d-sm-block">
                    <a href="tel:+919311550874" target="_blank" className="text-white">
                      <i className="fas fa-mobile"></i> +91 9311550874
                    </a>
                  </li>
                  <li className="d-none d-sm-block mx-3">
                    <a href="mailto:info@blueaceindia.com" target="_blank" className="text-white">
                      <i className="fas fa-envelope"></i> info@blueaceindia.com
                    </a>
                  </li>
                  <li className="d-none d-sm-block mx-1">
                    <a href="mailto:support@blueaceindia.com" target="_blank" className="text-white">
                      <i className="fas fa-envelope"></i> support@blueaceindia.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="topheader-marquee">
                {
                  allMarquee && allMarquee.slice(0, 1).map((item, index) => (
                    <marquee
                      key={index}
                      onMouseEnter={(e) => e.target.stop()} // Pause the marquee on hover
                      onMouseLeave={(e) => e.target.start()} // Resume the marquee when not hovered
                    >
                      {item.text}
                    </marquee>
                  ))
                }
              </div>

            </div>
          </div>
        </div>
      </section>
      <div className="header header-light dark-text">
        <div className="container">
          <nav id="navigation" className="navigation navigation-landscape">
            <div className="nav-header">
              <Link className="nav-brand" to={'/'}>
                <img src={logo} className="logo header-logo" alt="" />
              </Link>
              <div className="nav-toggle"></div>
              <div className="mobile_nav">
                <ul>

                  <>
                    {/* Check if the role is Customer */}
                    {role === 'Customer' && (
                      <>
                        <li className='activeInDes'>
                          <Link to={'/user-dashboard'} className="crs_yuo12 w-auto text-white theme-bg">
                            <span className="embos_45">
                              <i className="fas fa-plus me-2"></i>
                              Dashboard
                            </span>
                          </Link>
                        </li>
                        <li className='activeInDes'>
                          <Link onClick={handleLogOut} className="crs_yuo12 w-auto text-dark gray">
                            <span className="embos_45">
                              <i className="lni lni-power-switch mr-1"></i>Logout
                            </span>
                          </Link>
                        </li>
                      </>
                    )}

                    {/* Check if the role is Vendor */}
                    {role === 'vendor' && role === 'employ' && (
                      <>
                        <li className='activeInDes'>
                          <Link to={'/vendor-dashboard'} className="crs_yuo12 w-auto text-white theme-bg">
                            <span className="embos_45">
                              <i className="fas fa-plus me-2"></i>
                              Vendor Dashboard
                            </span>
                          </Link>
                        </li>
                        <li className='activeInDes'>
                          <Link onClick={handleVendorLogOut} className="crs_yuo12 w-auto text-dark gray">
                            <span className="embos_45">
                              <i className="lni lni-power-switch mr-1"></i>Logout
                            </span>
                          </Link>
                        </li>
                      </>
                    )}

                    {/* Check if the role is Vendor */}
                    {role === 'employ' && (
                      <>
                        <li className='activeInDes'>
                          <Link to={'/vendor-dashboard'} className="crs_yuo12 w-auto text-white theme-bg">
                            <span className="embos_45">
                              <i className="fas fa-plus me-2"></i>
                              Vendor Dashboard
                            </span>
                          </Link>
                        </li>
                        <li className='activeInDes'>
                          <Link onClick={handleVendorLogOut} className="crs_yuo12 w-auto text-dark gray">
                            <span className="embos_45">
                              <i className="lni lni-power-switch mr-1"></i>Logout
                            </span>
                          </Link>
                        </li>
                      </>
                    )}

                    {/* For non-authenticated users or other roles */}
                    {role !== 'Customer' && role !== 'vendor' && role !== 'employ' && (
                      <>
                        <li className="activeInDes custom-nav-item custom-dropdown">
                          <Link
                            to="#"
                            className="custom-nav-link dropdown-toggle"
                            id="customSignInDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fas fa-sign-in-alt me-1 custom-theme-cl"></i>
                            Sign in
                          </Link>
                          <ul className="custom-dropdown-menu" aria-labelledby="customSignInDropdown">
                            <li style={{ width: "100%" }}>
                              <Link to="/sign-in" style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: "600" }} className="custom-dropdown-item">For User</Link>
                            </li>
                            <li style={{ width: "100%" }}>
                              <Link to="/corporate-sign-in" style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: "600" }} className="custom-dropdown-item">For Corporate User</Link>
                            </li>
                            <li style={{ width: "100%" }}>
                              <Link to="/employ-sign-in" style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: "600" }} className="custom-dropdown-item">For Employ</Link>
                            </li>
                            <li>
                              <Link to="/vendor-sign-in" style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: "600" }} className="custom-dropdown-item">For Vendor</Link>
                            </li>
                          </ul>
                        </li>
                        <li className="add-listing theme-bg activeInDes">
                          <Link style={{ color: 'white' }} to={'/vendor-registration'}>
                            <i className="fas fa-plus me-2"></i>Vendor Registration
                          </Link>
                        </li>
                      </>
                    )}
                  </>

                </ul>
              </div>
            </div>
            <div className="nav-menus-wrapper" style={{ transitionProperty: 'none' }}>
              <ul className="nav-menu">
                <li className="active">
                  <Link to={'/'}>Home</Link>
                </li>
                <li>
                  <Link to={'/about-us'}>About Us</Link>
                </li>
                <li>
                  <a href="javascript:void(0);">Services</a>
                  <ul class="nav-dropdown nav-submenu">
                    {
                      allService && allService.map((item,index) => (

                        <li key={index}><Link to={`/service/${item.name.replace(/\s+/g, '-').toLowerCase()}`}>{item.name}</Link></li>
                      ))
                    }
                  </ul>
                </li>
                <li>
                  <Link to={'/products'}>Products</Link>
                </li>
                <li>
                  <Link to={'/blog'}>Blog</Link>
                </li>
                <li>
                  <Link to={'/contact'}>Contact Us</Link>
                </li>
                {/* Check if the role is Customer */}
                {role === 'Customer' && (
                  <>
                    <li className='activeInMob'>
                      <Link to={'/user-dashboard'} className="crs_yuo12 w-auto text-white theme-bg">
                        <span className="embos_45">
                          <i className="fas fa-plus me-2"></i>
                          User Dashboard
                        </span>
                      </Link>
                    </li>
                    <li className='activeInMob'>
                      <Link onClick={handleLogOut} className="crs_yuo12 w-auto text-dark gray">
                        <span className="embos_45">
                          <i className="lni lni-power-switch mr-1"></i>Logout
                        </span>
                      </Link>
                    </li>
                  </>
                )}

                {/* Check if the role is Vendor */}
                {role === 'vendor' && (
                  <>
                    <li className='activeInMob'>
                      <Link to={'/vendor-dashboard'} className="crs_yuo12 w-auto text-white theme-bg">
                        <span className="embos_45">
                          <i className="fas fa-plus me-2"></i>
                          Vendor Dashboard
                        </span>
                      </Link>
                    </li>
                    <li className='activeInMob'>
                      <Link onClick={handleVendorLogOut} className="crs_yuo12 w-auto text-dark gray">
                        <span className="embos_45">
                          <i className="lni lni-power-switch mr-1"></i>Logout
                        </span>
                      </Link>
                    </li>
                  </>
                )}

                {/* Check if the role is Vendor */}
                {role === 'employ' && (
                  <>
                    <li className='activeInMob'>
                      <Link to={'/vendor-dashboard'} className="crs_yuo12 w-auto text-white theme-bg">
                        <span className="embos_45">
                          <i className="fas fa-plus me-2"></i>
                          Employee Dashboard
                        </span>
                      </Link>
                    </li>
                    <li className='activeInMob'>
                      <Link onClick={handleVendorLogOut} className="crs_yuo12 w-auto text-dark gray">
                        <span className="embos_45">
                          <i className="lni lni-power-switch mr-1"></i>Logout
                        </span>
                      </Link>
                    </li>
                  </>
                )}

                {/* For non-authenticated users or other roles */}
                {role !== 'Customer' && role !== 'vendor' && role !== 'employ' && (
                  <>
                    {/* <li className='custom-mobile-item '> */}
                    <li className="custom-mobile-item activeInMob">
                      <Link
                        to="#"
                        className="custom-mobile-link ft-bold"
                        onClick={toggleDropdown}
                      >
                        <i className="fas fa-sign-in-alt me-1 custom-theme-cl"></i>Sign in
                      </Link>
                      <ul className={`custom-mobile-dropdown ${isDropdownOpen ? 'open' : ''}`}>
                        <li style={{ borderBottom: '1px solid #dddddd' }}>
                          <Link to="/sign-in" className="custom-mobile-dropdown-item">For User</Link>
                        </li>
                        <li style={{ borderBottom: '1px solid #dddddd' }}>
                          <Link to="/corporate-sign-in" className="custom-mobile-dropdown-item">For Corporate User</Link>
                        </li>
                        <li>
                          <Link to="/employ-sign-in" className="custom-mobile-dropdown-item">For Employee</Link>
                        </li>
                        <li>
                          <Link to="/vendor-sign-in" className="custom-mobile-dropdown-item">For Vendor</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="add-listing theme-bg activeInMob">
                      <Link style={{ color: 'white' }} to={'/vendor-registration'}>
                        <i className="fas fa-plus me-2"></i>Vendor Registration
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              <ul className="nav-menu activeInDes fordisplayflex nav-menu-social align-to-right">
                <>
                  {/* Check if the role is Customer */}
                  {role === 'Customer' && (
                    <>
                      <li>
                        <Link to={'/user-dashboard'} className="crs_yuo12 w-auto text-white theme-bg">
                          <span className="embos_45">
                            <i className="fas fa-plus me-2"></i>
                            User Dashboard
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link onClick={handleLogOut} className="crs_yuo12 w-auto text-dark gray">
                          <span className="embos_45">
                            <i className="lni lni-power-switch mr-1"></i>Logout
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                  {/* Check if the role is Vendor */}
                  {role === 'vendor' && (
                    <>
                      <li>
                        <Link to={'/vendor-dashboard'} className="crs_yuo12 w-auto text-white theme-bg">
                          <span className="embos_45">
                            <i className="fas fa-plus me-2"></i>
                            Vendor Dashboard
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link onClick={handleVendorLogOut} className="crs_yuo12 w-auto text-dark gray">
                          <span className="embos_45">
                            <i className="lni lni-power-switch mr-1"></i>Logout
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                  {/* Check if the role is Vendor */}
                  {role === 'employ' && (
                    <>
                      <li>
                        <Link to={'/vendor-dashboard'} className="crs_yuo12 w-auto text-white theme-bg">
                          <span className="embos_45">
                            <i className="fas fa-plus me-2"></i>
                            Employee Dashboard
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link onClick={handleVendorLogOut} className="crs_yuo12 w-auto text-dark gray">
                          <span className="embos_45">
                            <i className="lni lni-power-switch mr-1"></i>Logout
                          </span>
                        </Link>
                      </li>
                    </>
                  )}

                  {/* For non-authenticated users or other roles */}
                  {role !== 'Customer' && role !== 'vendor' && role !== 'employ' && (
                    <>

                      <li className="nav-item dropdown activeInDes custom-nav-item custom-dropdown">
                        <Link
                          to="#"
                          className="custom-nav-link dropdown-toggle"
                          id="customSignInDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-sign-in-alt me-1 custom-theme-cl"></i>
                          Sign in
                        </Link>
                        <ul className="custom-dropdown-menu" aria-labelledby="customSignInDropdown">
                          <li>
                            <Link to="/sign-in" style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: "600" }} className="custom-dropdown-item">For User</Link>
                          </li>
                          <li>
                            <Link to="/corporate-sign-in" style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: "600" }} className="custom-dropdown-item">For Corporate User</Link>
                          </li>
                          <li>
                            <Link to="/employ-sign-in" style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: "600" }} className="custom-dropdown-item">For Employee</Link>
                          </li>
                          <li>
                            <Link to="/vendor-sign-in" style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: "600" }} className="custom-dropdown-item">For Vendor</Link>
                          </li>
                        </ul>
                      </li>


                      <li className="add-listing theme-bg activeInDes">
                        <Link style={{ color: 'white' }} to={'/vendor-registration'}>
                          <i className="fas fa-plus me-2"></i>Vendor Registration
                        </Link>
                      </li>
                    </>
                  )}
                </>

              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
