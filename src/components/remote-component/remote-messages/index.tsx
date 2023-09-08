// Import React and any other dependencies
import React from "react";
import RemoteComponent from "..";

// Define the props interface or type

// Declare the function component with the props parameter
const RemoteMessage: React.FC<{}> = (props) => {
  // Destructure the props object

  // Return JSX elements that use the props values
  return (
    <div>
      {/* <RemoteComponent name="Messages"></RemoteComponent> */}
      <RemoteComponent
        remote="MessageRemotMFE"
        component="Messages"
      ></RemoteComponent>
    </div>
  );
};

// Export the function component as default or named
export default RemoteMessage;
