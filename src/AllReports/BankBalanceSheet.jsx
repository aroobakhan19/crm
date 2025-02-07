import React,{useState,useEffect} from 'react'

const BankBalanceSheet = () => {
    
const [selectedBank, setSelectedBank] = useState("");
const [bankBalanceReport, setBankBalanceReport] = useState(null);
const fetchBankBalanceReport = async () => {
    try {
      const response = await fetch(`https://crm-backend-plum.vercel.app/submitVoucher/bankBalanceReport?selectedBank=${selectedBank}`);
      const data = await response.json();
      setBankBalanceReport(data);
    } catch (error) {
      console.error("Error fetching bank balance report:", error);
    }
  };
  
  return (
    <div>
      <label>
        Select Bank:
        <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
          <option value="">Select Bank</option>
          <option value="HBL">HBL</option>
      <option value="UBL">UBL</option>
      <option value="Meezan">Meezan</option>
      <option value="Alfalah">Alfalah</option>
        </select>
      </label>
      <button onClick={fetchBankBalanceReport}>Fetch Bank Balance Report</button>
  
      {bankBalanceReport && (
        <div>
          <h2>Bank Balance Report for {bankBalanceReport.selectedBank}</h2>
          <p>Total Balance: {bankBalanceReport.totalBankBalance}</p>
  
          <h3>In Payments</h3>
          <ul>
            {bankBalanceReport.inPayments.map((payment, index) => (
              <li key={index}>
                Amount: {payment.amount}, Description: {payment.description}, Date: {payment.date}
              </li>
            ))}
          </ul>
  
          <h3>Out Payments</h3>
          <ul>
            {bankBalanceReport.outPayments.map((payment, index) => (
              <li key={index}>
                Amount: {payment.amount}, Description: {payment.description}, Date: {payment.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BankBalanceSheet
