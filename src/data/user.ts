interface UserData {
  [key: string]: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  };
}

export const userData: UserData = {
  "hardiksuthar74@gmail.com": {
    email: "hardiksuthar74@gmail.com",
    password: "123456",
    first_name: "Hardik",
    last_name: "Suthar",
  },
};
