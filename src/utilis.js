export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const carosel = [
  {
    title: "Pine Forest 500g",
    subtitle: "Some representative placeholder content for the first",
    image:
      "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Iphone S13",
    subtitle: "Some representative placeholder content for the second",
    image:
      "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Camon Camera",
    subtitle: "Some representative placeholder content for the second",
    image:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
