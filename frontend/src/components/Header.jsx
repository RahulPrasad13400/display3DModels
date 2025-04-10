import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='py-14 flex justify-center space-x-12 font-bold'>  
        <Link to={'/'}>Home</Link>
        <Link to={'/dashboard'}>Dashboard</Link>
        <Link to={'/form'}>Form</Link>
    </div>
  )
}
