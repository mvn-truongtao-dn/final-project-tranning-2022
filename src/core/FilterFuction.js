export const SearchParams = (search) => (user) => {
  if (search.Firstname && search.Lastname && search.Phone) {
    return (
      user.Firstname.toLowerCase().includes(
        (search.Firstname || "").toLowerCase()
      ) &&
      user.Lastname.toLowerCase().includes(
        (search.Lastname || "").toLowerCase()
      ) &&
      user.Phone.toLowerCase().includes((search.Phone || "").toLowerCase())
    );
  }
  if (
    search.Firstname === "" &&
    search.Lastname === "" &&
    search.Phone === ""
  ) {
    return user.Firstname.toLowerCase().includes("".toLowerCase());
  }
  if (search.Firstname && search.Lastname === "" && search.Phone === "") {
    return user.Firstname.toLowerCase().includes(
      (search.Firstname || "").toLowerCase()
    );
  }
  if (search.Firstname && search.Lastname) {
    return (
      user.Firstname.toLowerCase().includes(
        (search.Firstname || "").toLowerCase()
      ) &&
      user.Lastname.toLowerCase().includes(
        (search.Lastname || "").toLowerCase()
      )
    );
  }
  if (search.Phone) {
    return user.Phone.toLowerCase().includes(
      (search.Phone || "").toLowerCase()
    );
  }
};
