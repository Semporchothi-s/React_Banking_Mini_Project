import React from 'react';
import TransferMoneyForm from '../components/TransferMoneyForm';
import AddBeneficiaryForm from '../components/AddBeneficiaryForm';

const TransferMoneyScreen = (): React.ReactElement => {
    return (
        <div>
            <h2 className="mb-4">Transfer & Beneficiaries</h2>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <TransferMoneyForm />
                </div>
                <div className="col-md-6 mb-4">
                    <AddBeneficiaryForm />
                </div>
            </div>
        </div>
    );
};

export default TransferMoneyScreen;
