import React, { useState } from 'react';
import axios from 'axios';
import TextField from './TextField';

const AddBeneficiaryForm = (): React.ReactElement => {
    const [beneficiaryData, setBeneficiaryData] = useState({
        name: '',
        accountNumber: ''
    });

    const [beneficiarySuccess, setBeneficiarySuccess] = useState('');

    const handleAddBeneficiary = async (e: React.FormEvent) => {
        e.preventDefault();
        setBeneficiarySuccess('');
        try {
            const res = await axios.post("http://localhost:3000/api/account/beneficiary", beneficiaryData);
            setBeneficiarySuccess(res.data.message || 'Beneficiary added!');
            setBeneficiaryData({ name: '', accountNumber: '' });
        } catch (err) {
            console.error('Add beneficiary failed', err);
        }
    };

    return (
        <div className="card shadow-sm h-100">
            <div className="card-body">
                <h5 className="card-title text-secondary mb-4">Add Beneficiary</h5>
                {beneficiarySuccess && <div className="alert alert-success py-2">{beneficiarySuccess}</div>}
                <form onSubmit={handleAddBeneficiary}>
                    <div className="mb-3">
                        <TextField 
                            name="beneficiaryName"
                            label="Beneficiary Name"
                            type="text"
                            value={beneficiaryData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBeneficiaryData({ ...beneficiaryData, name: e.target.value })}
                            placeholder="E.g., John Doe"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <TextField 
                            name="beneficiaryAccountNumber"
                            label="Account Number"
                            type="text"
                            value={beneficiaryData.accountNumber}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBeneficiaryData({ ...beneficiaryData, accountNumber: e.target.value })}
                            placeholder="E.g., 123456789"
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-secondary w-100 fw-bold">Add Beneficiary</button>
                </form>
            </div>
        </div>
    );
};

export default AddBeneficiaryForm;
