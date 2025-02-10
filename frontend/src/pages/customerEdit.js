import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomerEdit = () => {
    const { id } = useParams(); // Get customer ID from URL
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [icNum, setIcNum] = useState('');
    const [dob, setDob] = useState(null);
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('Malaysia');
    const [postcode, setPostcode] = useState('');
    const [errors, setErrors] = useState({});


    const minAllowedDate = new Date();
    minAllowedDate.setFullYear(minAllowedDate.getFullYear() - 18);

    useEffect(() => {
        // Fetch customer details by ID
        const fetchCustomer = async () => {
            const response = await fetch(`/api/customer/${id}`);
            const data = await response.json();

            if (response.ok) {
                setName(data.name);
                setIcNum(data.icNumber);
                setDob(new Date(data.dateOfBirth));
                setAddress(data.address);
                setCountry(data.addressCountry || 'Malaysia');
                setPostcode(data.addressPostcode);
                setErrors({});
            } else {
                setErrors({server: "Failed to load customer details."});
            }
        };

        fetchCustomer();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Full name is required.";
        } else if (name.length > 100) {
            newErrors.name = "Full name cannot exceed 100 characters.";
        }

        if (!icNum.trim()) {
            newErrors.icNum = "IC Number is required.";
        } else if (!/^\d{1,14}$/.test(icNum)) {
            newErrors.icNum = "IC Number must be up to 14 digits.";
        }

        if (!dob) {
            newErrors.dob = "Date of birth is required.";
        } else if (dob > minAllowedDate) {
            newErrors.dob = "You must be at least 18 years old.";
        }

        if (!address.trim()) {
            newErrors.address = "Address is required.";
        }

        if ((country === "Malaysia" || country === "Singapore") && !postcode.trim()) {
            newErrors.postcode = "Postcode is required.";
        } else if (postcode.length > 20) {
            newErrors.postcode = "Postcode cannot exceed 20 characters.";
        } else if (!/^\d*$/.test(postcode)) {
            newErrors.postcode = "Postcode must contain only digits.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const updatedCustomer = { 
            name, 
            icNumber: icNum, 
            dateOfBirth: dob, 
            address, 
            addressCountry: country, 
            addressPostcode: postcode 
        };

        const response = await fetch(`/api/customer/${id}`, {
            method: 'PUT', 
            body: JSON.stringify(updatedCustomer),
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();

        if (!response.ok) {
            setErrors({ server: json.error });
        } else {
            navigate("/"); // Redirect back to home page after update
        }
    };

    console.log('errors', errors)

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Edit Customer</h3>
            {errors.server && <div className="error">{errors.server}</div>}
            <label>Full Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <div className="error">{errors.name}</div>}

            <label>IC Number:</label>
            <input type="number" value={icNum} onChange={(e) => setIcNum(e.target.value.replace(/[^0-9]/g, ''))} />
            {errors.icNum && <div className="error">{errors.icNum}</div>}

            <label>Date of Birth:</label>
            <DatePicker 
                selected={dob}
                onChange={(date) => setDob(date)}
                maxDate={new Date()} 
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                dateFormat="dd/MM/yyyy"
            />
            {errors.dob && <div className="error">{errors.dob}</div>}

            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            {errors.address && <div className="error">{errors.address}</div>}

            <label>Address Country:</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="Malaysia">Malaysia</option>
                <option value="Singapore">Singapore</option>
            </select>

            <label>Address Postcode:</label>
            <input type="number" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
            {errors.postcode && <div className="error">{errors.postcode}</div>}

            
            <div className="button-container">
                <button 
                    type="button" 
                    className="back-button" 
                    onClick={() => navigate("/")}
                >
                    Back
                </button>
                <button type="submit">Update Customer</button>
            </div>
        </form>
    );
};

export default CustomerEdit;
