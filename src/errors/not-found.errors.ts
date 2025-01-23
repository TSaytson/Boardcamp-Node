import { notFoundError } from "../utils/errorUtils";

export function categoryNotFoundError(){
  return notFoundError("Category does not exists")
}