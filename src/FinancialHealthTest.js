import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { AlertCircle, HelpCircle, PlusCircle, XCircle, DollarSign, Percent, Clock, ShoppingBag } from 'lucide-react';
import './index.css';

// UI Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl leading-6 font-bold ${className}`}>{children}</h3>
);

const CardDescription = ({ children }) => (
  <p className="mt-1 text-sm text-gray-600">{children}</p>
);

const CardContent = ({ children }) => <div className="px-6 py-4">{children}</div>;
const CardFooter = ({ children }) => <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">{children}</div>;

const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input
    {...props}
    ref={ref}
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
  />
));

const Select = React.forwardRef(({ className = "", ...props }, ref) => (
  <select
    {...props}
    ref={ref}
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
  />
));

const Label = ({ children, htmlFor, className = "" }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);

const Button = ({ children, onClick, variant = "default", className = "" }) => (
  <button
    onClick={onClick}
    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white transition-colors duration-200 ${
      variant === "outline"
        ? "bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50"
        : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    } ${className}`}
  >
    {children}
  </button>
);

const Progress = ({ value }) => (
  <div className="w-full bg-indigo-200 rounded-full h-2.5 overflow-hidden">
    <div 
      className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out" 
      style={{ width: `${value}%` }}
    />
  </div>
);

const Alert = ({ children, variant = "default" }) => (
  <div className={`p-4 rounded-md ${variant === "destructive" ? "bg-red-100 text-red-900" : "bg-indigo-100 text-indigo-900"}`}>
    {children}
  </div>
);

const AlertTitle = ({ children }) => <h5 className="font-bold mb-1">{children}</h5>;
const AlertDescription = ({ children }) => <p>{children}</p>;

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 px-4 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-full ml-2">
          {content}
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, value, onChange, type = "number", explanation }) => (
  <div className="mb-4">
    <div className="flex items-center">
      <Label htmlFor={label}>{label}</Label>
      {explanation && (
        <Tooltip content={explanation}>
          <HelpCircle className="h-4 w-4 ml-2 text-gray-400 cursor-help" />
        </Tooltip>
      )}
    </div>
    <Input
      type={type}
      id={label}
      value={value}
      onChange={(e) => onChange(type === "number" ? parseFloat(e.target.value) || 0 : e.target.value)}
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, explanation }) => (
  <div className="mb-4">
    <div className="flex items-center">
      <Label htmlFor={label}>{label}</Label>
      {explanation && (
        <Tooltip content={explanation}>
          <HelpCircle className="h-4 w-4 ml-2 text-gray-400 cursor-help" />
        </Tooltip>
      )}
    </div>
    <Select
      id={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  </div>
);

const ResultCard = ({ title, value, description, icon: Icon }) => (
  <Card className="bg-gradient-to-br from-white to-indigo-50 hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="flex items-center space-x-2">
      <Icon className="text-indigo-500" size={24} />
      <CardTitle className="text-lg text-indigo-700">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold text-indigo-600">{value}</p>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        {children}
        <Button onClick={onClose} className="mt-4">Close</Button>
      </div>
    </div>
  );
};

const CreditCardInput = ({ card, onChange, onRemove }) => (
  <div className="border p-4 rounded-md mb-4 bg-white shadow-sm">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-bold text-indigo-700">Credit Card</h4>
      <button onClick={onRemove} className="text-red-500 hover:text-red-700 transition-colors duration-200">
        <XCircle size={20} />
      </button>
    </div>
    <InputField
      label="Balance"
      value={card.balance}
      onChange={(value) => onChange({ ...card, balance: value })}
      explanation="The current balance on this credit card."
    />
    <InputField
      label="Interest Rate"
      value={card.interestRate}
      onChange={(value) => onChange({ ...card, interestRate: value })}
      explanation="The annual interest rate for this credit card."
    />
    <InputField
      label="Minimum Payment"
      value={card.minPayment}
      onChange={(value) => onChange({ ...card, minPayment: value })}
      explanation="The minimum monthly payment required for this credit card."
    />
  </div>
);

// Main Component
const FinancialHealthTest = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    monthlyIncome: 0,
    livingExpenses: 0,
    mortgagePayment: 0,
    carLoanAmount: 0,
    carLoanPayment: 0,
    creditCards: [],
    debtPaymentOption: 'minimum',
    customDebtPayment: 0,
  });

  const [results, setResults] = useState(null);
  const [wantsMoney, setWantsMoney] = useState(0);
  const [allocatedWants, setAllocatedWants] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseCategories, setExpenseCategories] = useState([
    { name: 'Living Expenses', value: 0 },
    { name: 'Mortgage', value: 0 },
    { name: 'Car Loan', value: 0 },
    { name: 'Credit Cards', value: 0 },
    { name: 'Wants', value: 0 },
  ]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCreditCardChange = (index, updatedCard) => {
    const updatedCards = [...formData.creditCards];
    updatedCards[index] = updatedCard;
    setFormData({ ...formData, creditCards: updatedCards });
  };

  const addCreditCard = () => {
    setFormData({
      ...formData,
      creditCards: [...formData.creditCards, { balance: 0, interestRate: 0, minPayment: 0 }],
    });
  };

  const removeCreditCard = (index) => {
    const updatedCards = formData.creditCards.filter((_, i) => i !== index);
    setFormData({ ...formData, creditCards: updatedCards });
  };

  const calculateResults = () => {
    const {
      monthlyIncome,
      mortgagePayment,
      carLoanPayment,
      livingExpenses,
      creditCards,
      debtPaymentOption,
      customDebtPayment,
    } = formData;

    const totalCreditCardDebt = creditCards.reduce((sum, card) => sum + card.balance, 0);
    const totalMinPayment = creditCards.reduce((sum, card) => sum + card.minPayment, 0);

    const totalMonthlyDebt = mortgagePayment + carLoanPayment + 
      (debtPaymentOption === 'full' ? totalCreditCardDebt : 
       debtPaymentOption === 'minimum' ? totalMinPayment : 
       customDebtPayment);

    const dtiRatio = (totalMonthlyDebt / monthlyIncome) * 100;
    const savingsRate = ((monthlyIncome - totalMonthlyDebt - livingExpenses) / monthlyIncome) * 100;

    let score = 0;
    if (dtiRatio <= 36) score += 4;
    else if (dtiRatio <= 42) score += 2;
    
    if (savingsRate >= 20) score += 4;
    else if (savingsRate >= 10) score += 2;

    const monthsToPayOff = Math.max(...creditCards.map(card => 
      calculateMonthsToPayOff(card.balance, card.interestRate, 
        debtPaymentOption === 'full' ? card.balance : 
        debtPaymentOption === 'minimum' ? card.minPayment : 
        (customDebtPayment * (card.balance / totalCreditCardDebt))
      )
    ));

    const totalExpenses = livingExpenses + totalMonthlyDebt;
    const remainingMoney = monthlyIncome - totalExpenses;
    const wantsMoney = remainingMoney * 0.3; // Assuming 30% of remaining money is for wants

    setWantsMoney(wantsMoney);
    setResults({
      dtiRatio: dtiRatio.toFixed(2),
      savingsRate: savingsRate.toFixed(2),
      score,
      monthsToPayOff,
      wantsMoney: wantsMoney.toFixed(2),
    });
    
    const totalCreditCardPayment = debtPaymentOption === 'full'
      ? totalCreditCardDebt
      : debtPaymentOption === 'minimum'
      ? totalMinPayment
      : customDebtPayment;

    setExpenseCategories([
      { name: 'Living Expenses', value: livingExpenses },
      { name: 'Mortgage', value: mortgagePayment },
      { name: 'Car Loan', value: carLoanPayment },
      { name: 'Credit Cards', value: totalCreditCardPayment },
      { name: 'Wants', value: wantsMoney },
    ]);
  };

  const calculateMonthsToPayOff = (balance, annualInterestRate, monthlyPayment) => {
    const monthlyRate = annualInterestRate / 100 / 12;
    let months = 0;
    let remainingBalance = balance;

    while (remainingBalance > 0 && months < 1000) {
      remainingBalance += remainingBalance * monthlyRate;
      remainingBalance -= monthlyPayment;
      months++;
    }

    return months < 1000 ? months : Infinity;
  };

  const calculateNewPayoffTime = () => {
    const totalCreditCardDebt = formData.creditCards.reduce((sum, card) => sum + card.balance, 0);
    const totalMinPayment = formData.creditCards.reduce((sum, card) => sum + card.minPayment, 0);
    
    const basePayment = formData.debtPaymentOption === 'full' ? totalCreditCardDebt : 
                        formData.debtPaymentOption === 'minimum' ? totalMinPayment : 
                        formData.customDebtPayment;

    const newMonthsToPayOff = Math.max(...formData.creditCards.map(card => {
      const cardShare = card.balance / totalCreditCardDebt;
      const cardBasePayment = basePayment * cardShare;
      const cardExtraPayment = allocatedWants * cardShare;
      return calculateMonthsToPayOff(card.balance, card.interestRate, cardBasePayment + cardExtraPayment);
    }));

    setResults(prevResults => ({
      ...prevResults,
      newMonthsToPayOff,
      monthsSaved: prevResults.monthsToPayOff - newMonthsToPayOff,
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-800">Step 1: Income and Living Expenses</CardTitle>
              <CardDescription>Let's start with your monthly income and basic living expenses.</CardDescription>
            </CardHeader>
            <CardContent>
              <InputField
                label="Monthly Income"
                value={formData.monthlyIncome}
                onChange={(value) => handleInputChange('monthlyIncome', value)}
                explanation="Your total monthly income before taxes and other deductions."
              />
              <InputField
                label="Living Expenses"
                value={formData.livingExpenses}
                onChange={(value) => handleInputChange('livingExpenses', value)}
                explanation="Your monthly expenses for utilities, groceries, etc. (excluding debt payments)"
              />
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep(2)}>Next</Button>
            </CardFooter>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-800">Step 2: Credit Cards</CardTitle>
              <CardDescription>Enter details for each of your credit cards.</CardDescription>
            </CardHeader>
            <CardContent>
              {formData.creditCards.map((card, index) => (
                <CreditCardInput
                  key={index}
                  card={card}
                  onChange={(updatedCard) => handleCreditCardChange(index, updatedCard)}
                  onRemove={() => removeCreditCard(index)}
                />
              ))}
              <Button onClick={addCreditCard} variant="outline" className="w-full">
                <PlusCircle className="mr-2" size={20} />
                Add Another Credit Card
              </Button>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep(1)} variant="outline" className="mr-2">Back</Button>
              <Button onClick={() => setStep(3)}>Next</Button>
            </CardFooter>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-800">Step 3: Other Debts</CardTitle>
              <CardDescription>Now, let's look at your other debts.</CardDescription>
            </CardHeader>
            <CardContent>
              <InputField
                label="Mortgage Monthly Payment"
                value={formData.mortgagePayment}
                onChange={(value) => handleInputChange('mortgagePayment', value)}
                explanation="Your monthly mortgage payment, if applicable."
              />
              <InputField
                label="Car Loan Amount"
                value={formData.carLoanAmount}
                onChange={(value) => handleInputChange('carLoanAmount', value)}
                explanation="The total amount of your car loan, if applicable."
              />
              <InputField
                label="Car Loan Monthly Payment"
                value={formData.carLoanPayment}
                onChange={(value) => handleInputChange('carLoanPayment', value)}
                explanation="Your monthly car loan payment, if applicable."
              />
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep(2)} variant="outline" className="mr-2">Back</Button>
              <Button onClick={() => setStep(4)}>Next</Button>
            </CardFooter>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-800">Step 4: Debt Repayment Strategy</CardTitle>
              <CardDescription>How do you typically handle your credit card debt?</CardDescription>
            </CardHeader>
            <CardContent>
              <SelectField
                label="Debt Payment Option"
                value={formData.debtPaymentOption}
                onChange={(value) => handleInputChange('debtPaymentOption', value)}
                options={[
                  { value: 'full', label: 'Pay in full' },
                  { value: 'minimum', label: 'Pay minimum' },
                  { value: 'custom', label: 'Custom amount' },
                ]}
                explanation="Select how you typically pay your credit card debt."
              />
              {formData.debtPaymentOption === 'custom' && (
                <InputField
                  label="Custom Debt Payment"
                  value={formData.customDebtPayment}
                  onChange={(value) => handleInputChange('customDebtPayment', value)}
                  explanation="Enter the custom amount you pay towards your credit card debt each month."
                />
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep(3)} variant="outline" className="mr-2">Back</Button>
              <Button onClick={() => { calculateResults(); setStep(5); }}>Calculate Results</Button>
            </CardFooter>
          </Card>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-indigo-800 mb-6">Your Financial Health Results</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              <ResultCard
                title="Debt-to-Income Ratio"
                value={`${results.dtiRatio}%`}
                description="Percentage of monthly income for debt payments"
                icon={Percent}
              />
              <ResultCard
                title="Savings Rate"
                value={`${results.savingsRate}%`}
                description="Percentage of income saved monthly"
                icon={DollarSign}
              />
              <ResultCard
                title="Months to Pay Off Debt"
                value={results.monthsToPayOff === Infinity ? "Never" : `${results.monthsToPayOff} months`}
                description="Time to pay off credit card debt at current rate"
                icon={Clock}
              />
              <ResultCard
                title="'Wants' Money"
                value={`$${results.wantsMoney}`}
                description="Estimated amount for non-essential spending"
                icon={ShoppingBag}
              />
            </div>
            
            <Card className="mt-6 bg-gradient-to-br from-indigo-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl text-indigo-800">Overall Financial Health</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={(results.score / 8) * 100} />
                <p className="mt-4 text-3xl font-bold text-indigo-700">Score: <span>{results.score}</span> / 8</p>
                <Alert variant={results.score >= 5 ? "default" : "destructive"} className="mt-4">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <AlertTitle className="font-semibold">Interpretation</AlertTitle>
                  <AlertDescription>
                    {results.score >= 7 ? "Excellent financial health" :
                     results.score >= 5 ? "Good financial health" :
                     results.score >= 3 ? "Fair financial health" :
                     "Needs improvement"}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-2xl text-indigo-800">Expense Breakdown</CardTitle>
                <CardDescription>A visual representation of your monthly expenses by category.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-2xl text-indigo-800">Allocate 'Wants' Money to Debt</CardTitle>
                <CardDescription>See how using some of your 'wants' money for debt repayment could impact your timeline.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setIsModalOpen(true)}>Allocate 'Wants' Money</Button>
                
                {results.newMonthsToPayOff && (
                  <div className="mt-4">
                    <p className="font-bold">New Payoff Time: {results.newMonthsToPayOff === Infinity ? "Never" : `${results.newMonthsToPayOff} months`}</p>
                    <p className="text-green-600">
                      {results.monthsSaved > 0 
                        ? `You could save ${results.monthsSaved} months!` 
                        : "No change in payoff time."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <h3 className="text-xl font-bold mb-4">Allocate 'Wants' Money to Debt</h3>
              <p className="mb-4">You have ${results.wantsMoney} available for 'wants'. How much would you like to allocate to debt repayment?</p>
              <InputField
                label="Amount to Allocate"
                value={allocatedWants}
                onChange={(value) => setAllocatedWants(value)}
                explanation="Enter an amount from your 'wants' money to put towards debt repayment."
              />
              <Button onClick={() => {
                calculateNewPayoffTime();
                setIsModalOpen(false);
              }}>
                Calculate New Payoff Time
              </Button>
            </Modal>

            <CardFooter>
              <Button onClick={() => setStep(1)} variant="outline">Start Over</Button>
            </CardFooter>
          </div>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <h1 className="text-4xl font-bold mb-2">Financial Health Assessment</h1>
          <p className="text-purple-200">Understand and improve your financial wellbeing</p>
        </div>
        
        {step < 5 && (
          <div className="p-6 bg-purple-50">
            <Progress value={(step / 4) * 100} />
            <p className="mt-2 text-sm text-purple-600 font-medium">Step {step} of 4</p>
          </div>
        )}
        
        <div className="p-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );

};

export default FinancialHealthTest;
