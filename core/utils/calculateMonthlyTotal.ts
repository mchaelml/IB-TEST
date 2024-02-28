const calculateMonthlyTotal = ({
  loan_amount,
  loan_period,
  minPeriod,
  maxPeriod,
  minAmount,
  maxAmount
}: {
  loan_amount: number;
  loan_period: number;
  minPeriod?: number;
  maxPeriod?: number;
  minAmount?: number;
  maxAmount?: number;
}) => {
  if (loan_period <= 0) return '?';
  let amount = loan_amount;
  let period = loan_period;

  if (maxPeriod && period > maxPeriod) period = maxPeriod;
  if (minPeriod && period < minPeriod) period = minPeriod;

  if (maxAmount && amount > maxAmount) amount = maxAmount;
  if (minAmount && amount < minAmount) amount = minAmount;

  return Number(amount / period).toFixed(2) + ' €';
};

export default calculateMonthlyTotal;
