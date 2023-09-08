// export const remoteModuleMap = [
//   {
//     name: "GroupRemotMFE",
//     url: process.env.GROUPS_HOST || "http://localhost:3001",
//   },
//   {
//     name: "ContactRemotMFE",
//     url: process.env.CONTACT_HOST || "http://localhost:3002",
//   },
//   {
//     name: "MessageRemotMFE",
//     url: process.env.MESSAGE_HOST || "http://localhost:3003",
//   },
// ];

// export const remoteModuleMap = [
//   {
//     name: "GroupRemotMFE",
//     url: "http://localhost:3001",
//   },
//   {
//     name: "ContactRemotMFE",
//     url: "https://contact-dev.scholarpresent.com",
//   },
//   {
//     name: "MessageRemotMFE",
//     url: "http://localhost:3003",
//   },
// ];

export const remoteModuleMapDev = [
  {
    name: "GroupRemotMFE",
    url: "http://localhost:3001",
  },
  {
    name: "ContactRemotMFE",
    url: "http://localhost:3002",
  },
  {
    name: "MessageRemotMFE",
    url: "http://localhost:3003",
  },
];

export const remoteModuleProduction = [
  {
    name: "GroupRemotMFE",
    url: "https://group-dev.scholarpresent.com/",
  },
  {
    name: "ContactRemotMFE",
    url: "https://contact-dev.scholarpresent.com",
  },
  {
    name: "MessageRemotMFE",
    url: "https://message-dev.scholarpresent.com/",
  },
];

export const remoteModuleQA = [
  {
    name: "GroupRemotMFE",
    url: "https://group-qa.scholarpresent.com/",
  },
  {
    name: "ContactRemotMFE",
    url: "https://contact-qa.scholarpresent.com",
  },
  {
    name: "MessageRemotMFE",
    url: "https://message-qa.scholarpresent.com/",
  },
];
