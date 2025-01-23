import { Request, Response } from "express";
import { categoriesService } from "../services/categories.service";
import { Category } from "../schemas/categories.schema";

export async function getCategories(req: Request, res: Response) {
  const categories = await categoriesService.getCategories();
  res.send(categories);
}

export async function postCategorie(req: Request, res: Response) {
  const { name }:Category = req.body;
  await categoriesService.postCategorie({name});
  res.status(201).send({ message: `Category ${name} created` });
}