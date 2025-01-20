import { Request, Response } from "express";
import { categoriesService } from "../services/categories.service";

export async function getCategories(req: Request, res: Response) {
  try {
      const categories = await categoriesService.getCategories();
      res.send(categories).status(200);
  } catch (error) {
      console.log(error);
      res.send(error.message).status(500);
  }
}

export async function postCategorie(req: Request, res: Response) {
  const { name } = req.body;
  try {
      await categoriesService.postCategorie(name);
      res.send({message: `Categoria ${name} criada`}).status(201);
  } catch (error) {
      console.log(error);
      error.status ? res.status(error.status).send(error) :
      res.status(500).send(error.message);
  }
}