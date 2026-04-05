import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TransactionHistoryScreen = (): React.ReactElement => {

    const [history, setHistory] = useState([{
        date: "",
        fromAccount: "",
        toAccount: "",
        amount: 0
    }])
    const [currentAccount, setCurrentAccount] = useState("");

    async function historyInit() {
        try {
            var response = await axios.get("http://localhost:3000/api/account/transactions")
            setHistory(response.data.transactions || [])
            setCurrentAccount(response.data.currentAccount || "")
            console.log(response.data.transactions)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        historyInit()
    }, [])

    var tableItem = history.map((item, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.date}</td>
            <td>{item.fromAccount}</td>
            <td>{item.toAccount}</td>
            <td style={{ fontWeight: 'bold', color: item.toAccount === currentAccount ? 'green' : 'red' }}>{item.amount}</td>
        </tr>
    ))

    return (
        <div>
            <h2>Transaction History</h2>
            {
                !history ? <p>No data found</p>
                    :
                    <table className="table m20">
                        <thead>
                            <tr>
                                <th scope='col'>S.No.</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>From account</th>
                                <th scope='col'>To account</th>
                                <th scope='col'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableItem}
                        </tbody>
                    </table>
            }
        </div>
    );
};

export default TransactionHistoryScreen;
