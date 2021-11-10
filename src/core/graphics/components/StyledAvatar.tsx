// React import
import React, {ReactElement} from 'react';

// Avatar component
import Avatar from 'boring-avatars';

/**
 * Generate an avatar from a name
 * @param {string} _name name used to generate the avatar
 * @param {number} _size dimensions of the avatar
 * @return {ReactElement}
 */
export function getStyledAvatar(_name: string, _size=120): ReactElement {
  return (
    <Avatar
      size={_size}
      name={_name}
      variant='beam'
      colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
    />
  );
}
