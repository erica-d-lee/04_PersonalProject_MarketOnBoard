import React from 'react';
import { Image, Text } from '.';

const User = (props) => {
  const { username, userimg } = props;

  return (
    <React.Fragment>
      <div
        style={{ display: 'flex', flexDirection: 'left', alignItems: 'center' }}
      >
        <Image src={userimg} />
        <Text fontWeight='bold' color='#fc8829'>
          {username}
        </Text>
      </div>
    </React.Fragment>
  );
};

User.defaultProps = {
  username: '익명',
  userimg:
    'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
};

export default User;
