import React from 'react';
import '/src/Css/Header.css';
import SearchField from './SearchFIeld';
import ProfileMenu from './ProfileMenu';

function Header({ currentUser, handleLogout }){

	return(
		<div className="header">
			<div>
				<SearchField />
				<ProfileMenu currentUser={currentUser} handleLogout={handleLogout} />
			</div>
		</div>

	);
}

export default Header