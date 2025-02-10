import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState(null);  
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch('/api/customer');
            const json = await response.json();
            console.log("json", json);

            if (response.ok){
                setCustomers(json);
                setFilteredCustomers(json);
            }
        };

        fetchCustomers();
    }, []);


    useEffect(() => {
        if (customers) {
            setFilteredCustomers(
                customers.filter(customer => 
                    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    customer.icNumber.includes(searchQuery)
                )
            );
        }
    }, [searchQuery, customers]);

    return (
        <div className="home">
            <h2>Customer List</h2>
            <input 
                type="text" 
                placeholder="Search by Name or IC Number" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="search-input"
            />
            <div className="add-button-container">
                <button 
                    className="add-button"
                    onClick={() => navigate('/add-customer')} 
                >
                    Add Customer
                </button>
            </div>
            <div className="customers">
                {filteredCustomers && filteredCustomers.map(customer => (
                    <div key={customer._id}>
                        <div className="customer-details">
                            <h4>{customer.name}</h4>
                            <p><strong>IC Number:</strong> <span className="customer-value">{customer.icNumber}</span></p>
                            <p><strong>Date of Birth:</strong> <span className="customer-value">{new Date(customer.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                            <p><strong>Address:</strong> <span className="customer-value">{customer.address}</span></p>
                            <p><strong>Country:</strong> <span className="customer-value">{customer.addressCountry}</span></p>
                            <p><strong>Postcode:</strong> <span className="customer-value">{customer.addressPostcode}</span></p>
                            <button 
                                className="edit-button"
                                onClick={() => navigate(`/edit-customer/${customer._id}`)} 
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );   
}

export default CustomerList;