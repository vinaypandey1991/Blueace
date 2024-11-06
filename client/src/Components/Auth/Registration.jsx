import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FullName: '',
    companyName: '',
    Email: '',
    ContactNumber: '',
    Password: '',
    City: '',
    PinCode: '',
    HouseNo: '',
    Street: '',
    NearByLandMark: '',
    RangeWhereYouWantService: [{
      location: {
        type: 'Point',
        coordinates: []
      }
    }]
  });

  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(''); // State for password error message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Password length validation
    if (name === 'Password') {
      if (value.length < 7) {
        setPasswordError('Password must be at least 7 characters long');
      } else {
        setPasswordError('');
      }
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          toast.error('Unable to retrieve your location');
        }
      );
    } else {
      toast.error('Geolocation is not supported by this system');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.FullName || !formData.Email || !formData.ContactNumber || !formData.Password) {
      toast.error('Please fill all required fields');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.Password.length < 7) {
      setPasswordError('Password must be at least 7 characters long');
      setLoading(false);
      return;
    } else {
      setPasswordError('');
    }

    const updatedFormData = {
      ...formData,
      RangeWhereYouWantService: [{
        location: {
          type: 'Point',
          coordinates: [location.longitude, location.latitude]
        }
      }]
    };

    try {
      const res = await axios.post('https://api.blueace.co.in/api/v1/Create-User', updatedFormData);

      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('user', JSON.stringify(res.data.user));

      if (res.data.success) {
        toast.success('User registered successfully');
        setFormData({
          FullName: '',
          companyName: '',
          Email: '',
          ContactNumber: '',
          Password: '',
          City: '',
          PinCode: '',
          HouseNo: '',
          Street: '',
          NearByLandMark: '',
          RangeWhereYouWantService: [{
            location: {
              type: 'Point',
              coordinates: []
            }
          }]
        });
        setLocation({
          latitude: '',
          longitude: ''
        });
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.msg || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      {/* ======================= Registration Detail ======================== */}
      <section className="gray">
        <div className="container">
          <div className="row align-items-start justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-12">
              <div className="signup-screen-wrap">
                <div className="signup-screen-single light">
                  <div className="text-center mb-4">
                    <h4 className="m-0 ft-medium">Create An Account</h4>
                  </div>

                  <form className="submit-form" onSubmit={handleSubmit}>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="companyName" className='mb-1 fw-medium'>Company Name (Optional)</label>
                          <input
                            type="text"
                            className="form-control rounded"
                            placeholder="Enter Your Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="FullName" className='mb-1 fw-medium'>Full Name</label>
                          <input
                            type="text"
                            className="form-control rounded"
                            placeholder="Enter Your Name"
                            name="FullName"
                            value={formData.FullName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="Email" className='mb-1 fw-medium'>Email</label>
                          <input
                            type="email"
                            className="form-control rounded"
                            placeholder="Enter Your Email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>


                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="ContactNumber" className='mb-1 fw-medium'>Phone No.</label>
                          <input
                            type="text"
                            className="form-control rounded"
                            placeholder="Enter Your Phone Number"
                            name="ContactNumber"
                            value={formData.ContactNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="HouseNo" className='mb-1 fw-medium'>House No.</label>
                          <input
                            type="text"
                            className="form-control rounded"
                            placeholder="House No."
                            name="HouseNo"
                            value={formData.HouseNo}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>


                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="Street" className='mb-1 fw-medium'>Street</label>
                          <input
                            type="text"
                            className="form-control rounded"
                            placeholder="Street"
                            name="Street"
                            value={formData.Street}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="NearByLandMark" className='mb-1 fw-medium'>Near By LandMark</label>
                          <input
                            type="text"
                            className="form-control rounded"
                            placeholder="Near By LandMark"
                            name="NearByLandMark"
                            value={formData.NearByLandMark}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>


                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="City" className='mb-1 fw-medium'>City</label>
                          <input
                            type="text"
                            className="form-control rounded"
                            placeholder="City"
                            name="City"
                            value={formData.City}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="PinCode" className='mb-1 fw-medium'>Pin Code</label>
                          <input
                            type="Number"
                            className="form-control rounded"
                            placeholder="PinCode"
                            name="PinCode"
                            value={formData.PinCode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>


                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="Password" className="mb-1 fw-medium">Password</label>
                          {passwordError && (
                            <p style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>
                              {passwordError}
                            </p>
                          )}
                          <input
                            type="password"
                            className="form-control rounded"
                            placeholder="Password (min 6 characters)"
                            name="Password"
                            value={formData.Password}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-md full-width theme-bg text-light rounded ft-medium">{`${loading ? "Loading..." : "Sign Up"}`}</button>
                    </div>

                    <div className="form-group text-center mt-4 mb-0">
                      <p className="mb-0">Already have an account? <Link to={'/sign-in'} style={{ color: '#00225F' }} className="ft-medium">Sign In</Link></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======================= Registration End ======================== */}
    </>
  );
}

export default Registration;
