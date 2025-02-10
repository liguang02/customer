import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const CustomerAdd = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [icNum, setIcNum] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('Malaysia');
    const [postcode, setPostcode] = useState('');
    const [errors, setErrors] = useState({});

    const minAllowedDate = new Date();
    minAllowedDate.setFullYear(minAllowedDate.getFullYear() - 18);

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

    const handleSubmit = async(e) => {
        // Prevent the default form submission behaviour, which refreshes the page
        e.preventDefault();
        if (!validateForm()) return;
        const customer = {
            name, 
            icNumber: icNum, 
            dateOfBirth: dob, 
            address, 
            addressCountry: country, 
            addressPostcode: postcode
        };

        const response = await fetch('/api/customer', {
            method: 'POST',
            body: JSON.stringify(customer),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setErrors({ server: json.error });        
        }
        if (response.ok){
            setName('')
            setIcNum('')
            setDob('')
            setAddress('')
            setCountry('Malaysia')
            setPostcode('')
            setErrors({ success: "Customer added successfully!" });
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Customer</h3>
            <label>Full Name:</label>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            {errors.name && <div className="validation-error">{errors.name}</div>}

            <label>IC Number:</label>
            <input 
                type="number" 
                value={icNum} 
                onChange={(e) => setIcNum(e.target.value)} 
            />
            {errors.icNum && <div className="validation-error">{errors.icNum}</div>}

            <label>Date of Birth:</label>
            <DatePicker 
                selected={dob}
                onChange={
                    (date) => setDob(date)
                }
                maxDate={new Date()} // Restrict future dates
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100} // Allow scrolling back 100 years
                dateFormat="dd/MM/yyyy"
            />
            {errors.dob && <div className="validation-error">{errors.dob}</div>}

            <label>Address:</label>
            <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
            />
            {errors.address && <div className="validation-error">{errors.address}</div>}

            <label>Address Country:</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="Malaysia">Malaysia</option>
                <option value="Singapore">Singapore</option>
            </select>

            <label>Address Postcode:</label>
            <input 
                type="number" 
                value={postcode} 
                onChange={(e) => setPostcode(e.target.value)} 
            />
            {errors.postcode && <div className="validation-error">{errors.postcode}</div>}

            {errors.server && <div className="error">{errors.server}</div>}
            {errors.success && <div className="success">{errors.success}</div>}

            <div className="button-container">
                <button 
                    type="button" 
                    className="back-button" 
                    onClick={() => navigate("/")}
                >
                    Back
                </button>
                <button 
                    type="submit"
                >
                    Submit
                </button>
            </div>       
        </form>
    )
}

export default CustomerAdd;