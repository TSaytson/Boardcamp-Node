import { Request, Response } from "express";
import { categoriesService } from "../services/categories.service";

export async function getCategories(req: Request, res: Response) {
  const categories = await categoriesService.getCategories();
  res.send(categories).status(200);
}

export async function postCategorie(req: Request, res: Response) {
  const { name } = req.body;
  await categoriesService.postCategorie(name);
  res.send({ message: `Categoria ${name} criada` }).status(201);
}