// Import React and any other dependencies
import React from "react";
import RemoteComponent from "..";

// Define the props interface or type

// Declare the function component with the props parameter
const RemoteContacts: React.FC<{}> = (props) => {
  // Destructure the props object

  // Return JSX elements that use the props values
  return (
    <div>
      {/* <RemoteComponent name="Contacts"></RemoteComponent> */}
      <RemoteComponent
        remote="ContactRemotMFE"
        component="Contacts"
      ></RemoteComponent>
    </div>
  );
};

// Export the function component as default or named
export default RemoteContacts;
