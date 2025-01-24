import { conflictError } from "../utils/errorUtils";

export function categoryConflictError(){
  return conflictError("Category already registered")
}

export function gameConflictError(){
  return conflictError("Game already registered")
}

export function customerConflictError(){
  return conflictError("Customer already reigstered")
}