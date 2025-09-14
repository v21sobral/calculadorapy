import { useState, useEffect } from 'react'
import { evaluate } from 'mathjs'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (input || result) {
      setAnimate(true)
      // A duração aqui (300ms) deve corresponder à do CSS
      const timer = setTimeout(() => setAnimate(false), 300)
      return () => clearTimeout(timer)
    }
  }, [input, result])

  const handleClick = (value) => {
    if (result) {
      setInput(result + value)
      setResult('')
    } else {
      setInput(input + value)
    }
  }

  const handleClear = () => {
    setInput('')
    setResult('')
  }

  const handleEqual = () => {
    try {
      // Evita calcular uma expressão vazia
      if (!input) return;
      const calc = evaluate(input)
      setResult(calc.toString())
    } catch {
      setResult('Erro')
    }
  }

  const handleSqrt = () => {
    try {
      const val = result ? result : input
      if (val) {
        const calc = evaluate(`sqrt(${val})`)
        setResult(calc.toString())
        setInput('')
      }
    } catch {
      setResult('Erro')
    }
  }

  const handlePercent = () => {
    try {
      const val = result ? result : input
      if (val) {
        const calc = evaluate(`${val} / 100`)
        setResult(calc.toString())
        setInput('')
      }
    } catch {
      setResult('Erro')
    }
  }

  return (
    <div className="calculator">
      <h2>Calculadora</h2>
      <input
        type="text"
        value={result ? result : input}
        readOnly
        // A única mudança é aqui: usamos a nova classe 'fade-in-animation'
        className={`calc-input ${animate ? 'fade-in-animation' : ''}`}
      />
      <div className="calc-buttons">
        <button onClick={handleClear}>C</button>
        <button onClick={handleSqrt}>√</button>
        <button onClick={handlePercent}>%</button>
        <button onClick={() => handleClick('/')}>/</button>
        {['7','8','9','*','4','5','6','-','1','2','3','+','0','.'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        <button className="equal-btn" onClick={handleEqual}>=</button>
      </div>
    </div>
  )
}

export default App