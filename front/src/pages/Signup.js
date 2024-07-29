import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import "../styles/Signup.css"

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    setPasswordError('')
    await signup(name, email, password)
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        
        <label>Name:</label>
        <input 
          type="text" 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          required
        />
        
        <label>Email address:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          required
        />
        
        <label>Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          required
        />
        
        <label>Confirm Password:</label>
        <input 
          type="password" 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          value={confirmPassword} 
          required
        />

        <button className="signup-button" disabled={isLoading}>Sign up</button>
        {passwordError && <div className="error">{passwordError}</div>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Signup
