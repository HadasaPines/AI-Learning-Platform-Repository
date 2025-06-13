const handleApiError = (error) => {
  if (!error.response) {
  throw new Error("No connection to server");
  }
  
  const status = error.response.status;
  const detail = error.response.data?.detail || "Unknown error";
  
  switch (status) {
  case 400:
  throw new Error("Invalid input");
  case 404:
  throw new Error("Not found");
  case 409:
  throw new Error("Already exists: ");
  case 422:
  throw new Error("Invalid input");
  case 500:
  throw new Error("Internal server error");
  default:
  throw new Error(detail);
  }
  };
  export default handleApiError;