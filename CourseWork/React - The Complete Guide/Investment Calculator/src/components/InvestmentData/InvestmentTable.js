import classes from './InvestmentTable.module.css';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const InvestmentTable = (props) => {
    return <table className={classes.result}>
        <thead>
            <tr>
                <th>Year</th>
                <th>Total Savings</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
            </tr>
        </thead>
        <tbody>
            {props.data.map((investment) => (
                <tr key={investment.year}>
                    <td>{investment.year}</td>
                    <td>{formatter.format(investment.savingsEndOfYear)}</td>  
                    <td>{formatter.format(investment.yearlyInterest)}</td>
                    <td>{formatter.format(investment.savingsEndOfYear - props.initialInvestment - investment.yearlyContribution * investment.year)}</td>
                    <td>{formatter.format(props.initialInvestment + investment.yearlyContribution * investment.year)}</td>
                </tr>
            ))}
        </tbody>
  </table>
};

export default InvestmentTable;