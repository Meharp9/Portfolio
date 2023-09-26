import { useState } from 'react';
import Form from './components/InvestmentData/Form';
import InvestmentTable from './components/InvestmentData/InvestmentTable';
import Header from './components/UI/Header';

function App() {
  const [investmentData, setInvestmentData] = useState(null);

  const calculateHandler = (userInput) => {  
    setInvestmentData(userInput);
  };

  const yearlyData = [];

  if (investmentData) {
    let currentSavings = +investmentData['current-savings'];
    const yearlyContribution = +investmentData['yearly-contribution'];
    const expectedReturn = +investmentData['expected-return'] / 100;
    const duration = +investmentData['duration'];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <Form onSubmit={calculateHandler}/>
      {!investmentData && <p style={{textAlign: "center"}}>No investment calculated yet.</p>}
      {investmentData && <InvestmentTable data={yearlyData} initialInvestment={investmentData['current-savings']}/>}
    </div>
  );
}

export default App;
