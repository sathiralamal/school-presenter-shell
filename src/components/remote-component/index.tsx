import React, { FC, lazy, Suspense } from "react";
import ErrorBoundry from "./error-boundaries";
//old code

// const components: {
//   [key: string]: React.LazyExoticComponent<React.ComponentType<any>>;
// } = {
//   Groups: lazy(() => import("GroupRemotMFE/Groups")),
//   Contacts: lazy(() => import("ContactRemotMFE/Contacts")),
//   Messages: lazy(() => import("MessageRemotMFE/Messages")),
// };
// const Loading = () => <div>Loading...</div>;

// const RemoteComponent = (props: { name: string }) => {
//   const Component = components[props.name] || null;

//   return (
//     <ErrorBoundry>
//       <Suspense fallback={<Loading />}>{Component && <Component />}</Suspense>
//     </ErrorBoundry>
//   );
// };

import { useRemotes } from "../../context/remotes";
import { loadComponent } from "../../utils/remote-loading";
import { findRemoteUrl } from "../../utils/remote-loading/remote";

type Props = {
  fallback?: string | React.ReactNode;
  remote: "GroupRemotMFE" | "ContactRemotMFE" | "MessageRemotMFE";
  component: string;
  scope?: string;
  [key: string]: any;
};

const RemoteComponent: FC<Props> = ({
  remote,
  component,
  scope = "default",
  fallback = null,
  ...props
}) => {
  const [remotes] = useRemotes();
  const remoteUrl = findRemoteUrl(remote, remotes);
  const Component = React.lazy(
    loadComponent(remote, remoteUrl, `./${component}`, scope)
  );
  const Fallback = () => <div>Something went wrong</div>;

  return (
    <ErrorBoundry>
      <React.Suspense fallback={fallback}>
        <Component {...props} />
      </React.Suspense>
    </ErrorBoundry>
  );
};

export default RemoteComponent;
