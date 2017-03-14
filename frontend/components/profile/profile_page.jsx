import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSingleUser } from '../../actions/user_actions';

class ProfilePage extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchSingleUser(this.props.profileId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.id !== newProps.params.id) {
      this.props.fetchSingleUser(newProps.params.id)
    }
  }

  render() {
    if (this.props.userDetail.groups) {
      const userDetail = this.props.userDetail
      const userDetailGroups = Object.values(this.props.userDetail.groups)

      return (
        <div className='profile-page-container'>
          <div className='profile-page-box'>

            <div className='profile-left-section'>
              <div className='profile-name'>{userDetail.first_name}</div>
              <div className='profile-location'>Location:</div>
              <div className='profile-city'>{userDetail.city}</div>
              <div className='profile-bio'>{userDetail.bio}</div>
              <div className='profile-group-member-count'>Member of {userDetailGroups.length} Groups</div>
              <div className='profile-groups'>{userDetailGroups.map(group => {
                  return <div key={group.id}><ProfileGroupsInfo group={group}/></div>
                })}</div>
            </div>

            <div className='profile-right-section'>
              <img src={userDetail.image_url} alt='profile_pic'/>
            </div>

          </div>
        </div>
      );
    } else {
      return <div className='group-index-box'><img className='loading-spinner' src='https://s3.amazonaws.com/meetnow-DEV/meetNow/rolling.gif' alt='loading'/></div>
    }

  }
}

const ProfileGroupsInfo = ({ group }) => {
  return (
    <div className='profile-groups-box' key={group.id}>
      <Link to={`/groups/${group.id}`}><img width='70px' height='70px' className='profile-group-thumb' src={group.photo_url} alt='group-photo'/></Link>
      <div className='group-name-member-count'>
        <Link to={`/groups/${group.id}`}><label>{group.name}</label></Link>
        <div className='profile-group-members-count'>Members: {group.member_count}</div>
      </div>
    </div>

  );
}

const mapStatetoProps = (state, ownProps) => {
  return ({
    profileId: ownProps.params.id,
    userDetail: state.userDetail
  })
};

const mapDispatchToProps = dispatch => ({
  fetchSingleUser: id => dispatch(fetchSingleUser(id))
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(ProfilePage);