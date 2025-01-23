import { conflictError } from "@/utils/errorUtils";

export function categoryConflictError(){
  return conflictError("Category already registred")
}

export function gameConflictError(){
  return conflictError("Game already registred")
}