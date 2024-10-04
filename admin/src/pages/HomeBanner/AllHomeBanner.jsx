import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Table from '../../components/Table/Table';
import Toggle from '../../components/Forms/toggle';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function AllHomeBanner() {
  const [banner, setBanner] = useState([])
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:7000/api/v1/get-all-banner');
      if (response.data.success) {
        console.log('data', response.data.data)
        const datasave = response.data.data;
        // Correct the method name from reverce to reverse
        const r = datasave.reverse();
        setBanner(r);
        console.log(response.data.data);
      } else {
        toast.error('Failed to fetch banner');
      }
    } catch (error) {
      toast.error('An error occurred while fetching banner.');
      console.error('Fetch error:', error); // Logging error for debugging
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  }

  useEffect(() => {
    handleFetchData();
  }, [])

  // Handle deleting a category
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:7000/api/v1/delete-banner/${id}`);
      if (response.data.success) {
        toast.success('Category deleted successfully!');
        await fetchVouchers(); // Fetch categories again after deletion
      } else {
        toast.error('Failed to delete Category');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the Category.');
    }
  };

  const handleToggle = async (id, currentActiveStatus) => {
    try {
      console.log('currentActiveStatus', currentActiveStatus)
      const newActiveStatus = !currentActiveStatus; // Toggle the status
      console.log('newActiveStatus', newActiveStatus)
      const response = await axios.put(`http://localhost:7000/api/v1/update-banner-active-status/${id}`, {
        active: newActiveStatus
      });

      if (response.data.success) {
        toast.success('Service active status updated successfully!');
        await fetchVouchers();
      } else {
        toast.error('Failed to update service active status.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the active status.');
      console.error('Toggle error:', error);
    }
  };


  // Calculate the indices of the vouchers to display
  const indexOfLastVoucher = currentPage * productsPerPage;
  const indexOfFirstVoucher = indexOfLastVoucher - productsPerPage;
  const currentServices = banner.slice(indexOfFirstVoucher, indexOfLastVoucher);

  // Define headers for the Table component
  const headers = ['S.No', 'Banner Image', 'Active', 'Created At', 'Action'];

  return (
    <div className='page-body'>
            <Breadcrumb heading={'Services'} subHeading={'Services'} LastHeading={'All Services'} backLink={'/service/all-service'} />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Table
                    headers={headers}
                    elements={currentServices.map((category, index) => (
                        <tr key={category._id}>
                            <td>{index + 1}</td>
                            <td className='text-danger fw-bolder'><img src={category?.bannerImage?.url} width={50} alt="" /></td>
                            <td>
                                <Toggle
                                    isActive={category.active}
                                    onToggle={() => handleToggle(category._id, category.active)} // Pass service id and current active status
                                />
                            </td>

                            <td>{new Date(category.createdAt).toLocaleString() || "Not-Availdable"}</td>

                            <td className='fw-bolder'>
                                <div className="product-action">
                                    <Link to={`/service/edit-service/${category._id}`}>
                                        <svg><use href="../assets/svg/icon-sprite.svg#edit-content"></use></svg>
                                    </Link>
                                    <svg onClick={() => handleDelete(category._id)} style={{ cursor: 'pointer' }}>
                                        <use href="../assets/svg/icon-sprite.svg#trash1"></use>
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    ))}
                    productLength={banner.length}
                    productsPerPage={productsPerPage}
                    currentPage={currentPage}
                    paginate={setCurrentPage}
                    href="/service/add-service"
                    text="Add Service"
                    errorMsg=""
                    handleOpen={() => { }}
                />
            )}
        </div>
  )
}

export default AllHomeBanner
