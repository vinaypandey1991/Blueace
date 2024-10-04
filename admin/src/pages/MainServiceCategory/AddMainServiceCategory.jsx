import React, { useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import FormGroups from '../../components/Forms/FormGroups';
import Input from '../../components/Forms/Input';

function AddMainServiceCategory() {
    const [formData, setFormData] = useState({ name: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const payload = new FormData();
        payload.append('name', formData.name);
    
        console.log('Payload before sending:', payload.get('name')); // Check payload content
    
        try {
            console.log('i m hit')
            const res = await axios.post('http://localhost:7000/api/v1/create-service-main-category', payload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('object',res)
            setFormData({ name: '' });
            setError('');
        } catch (error) {
            console.error('Error creating main service Category', error);
            setError('Failed to create service');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <Breadcrumb heading={'Service'} subHeading={'Category'} LastHeading={'Create Category'} backLink={'/service/main-category'} />
            {error && <div className="alert alert-danger">{error}</div>}
            <FormGroups onSubmit={handleSubmit} Elements={
                <div className='row'>
                    <div className="col-md-6">
                        <label htmlFor="name">Category</label>
                        <Input
                            type='text'
                            placeholder='Enter Category Name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div className='col-md-10 mx-auto mt-4'>
                        <button className={`btn w-100 py-3 btn-primary ${loading ? 'disabled' : ''}`} disabled={loading} type='submit'>
                            {loading ? 'Please Wait...' : 'Submit'}
                        </button>
                    </div>
                </div>
            } />
        </div>
    );
}

export default AddMainServiceCategory;
