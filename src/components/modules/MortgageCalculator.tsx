import React, { useState, useEffect } from 'react'
import { Calculator, Home } from 'lucide-react'

export function MortgageCalculator() {
  const [isCollapsed, setIsCollapsed] = useState(true) // Start collapsed as it's complex
  const [downPayment, setDownPayment] = useState(20)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(30)

  const propertyPrice = 1250000 // From selected listing
  const downPaymentAmount = (propertyPrice * downPayment) / 100
  const loanAmount = propertyPrice - downPaymentAmount

  // Simple mortgage calculation
  const monthlyInterestRate = interestRate / 100 / 12
  const numberOfPayments = loanTerm * 12

  const monthlyPayment = loanAmount * (
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
  )

  const principalAndInterest = monthlyPayment
  const propertyTax = (propertyPrice * 0.0075) / 12 // 0.75% annual property tax
  const hoaInsurance = 450 // Monthly HOA
  const totalMonthly = principalAndInterest + propertyTax + hoaInsurance

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="bg-cyber-bg border border-current pixel-corners">

      {/* Header */}
      <div
        className="p-3 border-b border-current cursor-pointer flex items-center justify-between hover:bg-current hover:text-cyber-bg transition-all"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-2">
          <Calculator className="w-4 h-4" />
          <span className="text-xs font-bold">MORTGAGE_CALC</span>
        </div>
        <div className={`text-xs transition-transform ${isCollapsed ? 'rotate-90' : ''}`}>
          ▶
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-3 space-y-4">

          {/* Inputs */}
          <div className="space-y-3">

            {/* Down Payment */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>DOWN_PAYMENT</span>
                <span>{downPayment}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-cyber-panel border border-current appearance-none slider"
                aria-label="Down payment percentage"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>INTEREST_RATE</span>
                <span>{interestRate}%</span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-cyber-panel border border-current appearance-none slider"
                aria-label="Interest rate percentage"
              />
            </div>

            {/* Loan Term */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>LOAN_TERM</span>
                <span>{loanTerm} YR</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setLoanTerm(15)}
                  className={`flex-1 py-1 text-xs border transition-all ${
                    loanTerm === 15 ? 'bg-current text-cyber-bg' : 'border-current hover:bg-current hover:text-cyber-bg'
                  }`}
                >
                  15 YR
                </button>
                <button
                  onClick={() => setLoanTerm(30)}
                  className={`flex-1 py-1 text-xs border transition-all ${
                    loanTerm === 30 ? 'bg-current text-cyber-bg' : 'border-current hover:bg-current hover:text-cyber-bg'
                  }`}
                >
                  30 YR
                </button>
              </div>
            </div>

          </div>

          {/* Results */}
          <div className="border-t border-current pt-3 space-y-2">

            <div className="text-center">
              <div className="text-xs opacity-80 mb-1">MONTHLY_PAYMENT</div>
              <div className="text-lg font-bold glow-text">{formatCurrency(totalMonthly)}</div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>PRINCIPAL_INTEREST</span>
                <span>{formatCurrency(principalAndInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span>PROPERTY_TAX</span>
                <span>{formatCurrency(propertyTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>HOA_INSURANCE</span>
                <span>{formatCurrency(hoaInsurance)}</span>
              </div>
              <div className="border-t border-current pt-1 flex justify-between font-bold">
                <span>TOTAL</span>
                <span className="glow-text">{formatCurrency(totalMonthly)}</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}
