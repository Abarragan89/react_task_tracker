// props is just an object of whatever we pass in. 
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {/* the button as parameter in button.js and you set them here */}
            {location.pathname === '/' &&
            <Button color={showAdd ? 'red' : 'green'}
                text={showAdd ? 'Close' : 'Add'} 
                onClick= {onAdd} />}
        </header>
    )
}
Header.defaultProps = {
    title: 'Testing tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
} 

// CSS in JS
// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'blue'
// }

export default Header

