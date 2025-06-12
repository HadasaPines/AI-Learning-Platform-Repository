const handleApiError = (error) => {
    if (!error.response) {
      throw new Error("אין חיבור לשרת");
    }
  
    const status = error.response.status;
    const detail = error.response.data?.detail || "שגיאה לא ידועה";
  
    switch (status) {
      case 400:
        throw new Error("Invalid input");
      case 404:
        throw new Error("לא נמצא: " + detail);
      case 409:
        throw new Error("קיים כבר: " + detail);
      case 422:
        throw new Error("Invalid input");
      case 500:
        throw new Error("שגיאה פנימית בשרת");
      default:
        throw new Error(detail);
    }
  };
  export default handleApiError;