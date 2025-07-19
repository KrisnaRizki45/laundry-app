import React from 'react';

const withBgLogin = (WrappedComponent) => {
  const WithBackground = (props) => {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl">
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };

  return WithBackground;
};

export default withBgLogin;
