const routes = (handler) => [
  {
    method: "POST",
    path: "/books",
    handler: (request, h) => handler.postBookHandler(request, h),
    options: {
      auth: "bookrevu_api_jwt",
    },
  },
  {
    method: "GET",
    path: "/books",
    handler: () => handler.getBooksHandler(),
  },
];

export default routes;
