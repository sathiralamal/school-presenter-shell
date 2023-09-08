// Import React and any other dependencies
import React from "react";
import RemoteComponent from "..";

// Define the props interface or type

// Declare the function component with the props parameter
const RemoteGroup: React.FC<{}> = (props) => {
  // Destructure the props object

  // Return JSX elements that use the props values
  return (
    // <div>
    //   <RemoteComponent name="Groups"></RemoteComponent>
    // </div>
    <div>
      <RemoteComponent
        remote="GroupRemotMFE"
        component="Groups"
      ></RemoteComponent>
    </div>
  );
};

// Export the function component as default or named
export default RemoteGroup;
