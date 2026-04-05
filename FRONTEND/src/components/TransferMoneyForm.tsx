import React, { useState } from 'react';
import axios from 'axios';
import TextField from './TextField';

const TransferMoneyForm = (): React.ReactElement => {
    const [transferData, setTransferData] = useState({
        toAccount: '',
        amount: 0,
        description: ''
    });

    const [transferSuccess, setTransferSuccess] = useState('');

    const handleTransfer = async (e: React.FormEvent) => {
        e.preventDefault();
        setTransferSuccess('');
        try {
            // const payload = {
            //     toAccount: transferData.toAccount,
            //     amount: Number(transferData.amount),
            //     description: transferData.description
            // };
            const res = await axios.post("http://localhost:3000/api/account/transfer", transferData);
            setTransferSuccess(res.data.message || 'Transfer successful!');
            setTransferData({ toAccount: '', amount: 0, description: '' });
        } catch (err) {
            console.error('Transfer failed', err);
        }
    };

    return (
        <div className="card shadow-sm h-100">
            <div className="card-body">
                <h5 className="card-title text-primary mb-4">Transfer Money</h5>
                {transferSuccess && <div className="alert alert-success py-2">{transferSuccess}</div>}
                <form onSubmit={handleTransfer}>
                    <div className="mb-3">
                        <TextField 
                            name="toAccount"
                            label="To Account Number"
                            type="text"
                            value={transferData.toAccount}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransferData({ ...transferData, toAccount: e.target.value })}
                            placeholder="E.g., 123456789"
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <TextField 
                            name="amount"
                            label="Amount (₹)"
                            type="number"
                            value={transferData.amount}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransferData({ ...transferData, amount: parseInt( e.target.value) })}
                            min="1"
                            placeholder="1000"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <TextField 
                            name="description"
                            label="Description (Optional)"
                            type="text"
                            value={transferData.description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransferData({ ...transferData, description: e.target.value })}
                            placeholder="Rent, Groceries, etc."
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 fw-bold">Send Money</button>
                </form>
            </div>
        </div>
    );
};

export default TransferMoneyForm;
