import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LogInButton from '../buttons/log_in_button';


const NavButtons = ({ loggedIn }) => (
    <div className='nav-buttons'>
      { !loggedIn &&
        <div>
          <LogInButton />
          <span>or</span>
          <LogInButton />
        </div>
      }
    </div>
)

const NavDropDown = ({ loggedIn }) => {
  const toggleDropDown = () => {
    $('.nav-dropdown').toggleClass('display');
  }

  return (
    <ul onClick={ toggleDropDown } className='nav-dropdown'>
      <li >
        <i className="fa fa-ellipsis-h drop-down-icon"
          aria-hidden="true"></i>
      </li>
      <ul>
        { loggedIn && <LogInButton />}
      </ul>
    </ul>
  )
}

class NavBar extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { currentUser } = this.props;

    return (
      <div className='header-bar'>
        <div className='nav-bar'>
          <div className='nav-logo'>

          </div>


          <NavButtons loggedIn={ !!currentUser } />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
})

export default connect(
  mapStateToProps
)(NavBar);