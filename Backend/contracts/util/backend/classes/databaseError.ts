import { dbError } from "../interfaces/Utilities";

export function handleDatabaseError(error: any): dbError {
  let message = "An unexpected error occurred.";
  if (error.code && error.sqlMessage ) {
    switch (error.code) {
      case "ER_DUP_ENTRY":
        message = "The data you're trying to insert already exists.";
        break;
      case "ER_BAD_FIELD_ERROR":
        message =
          "There seems to be an issue with one of the fields in your data.";
        break;
      case "ER_ROW_IS_REFERENCED_2":
        message =
          "The data you're trying to update or delete is currently in use elsewhere.";
        break;
      case "ER_NO_REFERENCED_ROW_2":
        message =
          "The data you're trying to update does not match with existing records.";
        break;
      case "ER_DATA_TOO_LONG":
        message = "The data you're trying to insert is too long.";
        break;
      case "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD":
        message =
          "The data you're trying to insert doesn't match with the field type.";
        break;
      default:
        return { message, code: "UNKNOWN", stack: error.sqlMessage };
    }
    return { message, code: error.code, stack: error.sqlMessage };
  } else {
    return { message, code: "UNKNOWN", stack: error.sqlMessage };
  }
}
