// components/IE6Icon.jsx
import React from 'react';
import Image from 'next/image';
const IE6Icon = () => (
  <div
    style={{
      width: '48px',
      height: '48px',

      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '5px',
      fontWeight: 'bold',
      fontSize: '1.2rem',
    }}
  >
    <Image
      src="/assets/images/IE6-icon.png"
      alt="IE6"
      width={48}
      height={48}
      className="n"
    />
  </div>
);

export default IE6Icon;
