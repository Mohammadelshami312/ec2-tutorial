import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).json({
        error: "Name and email are required",
      });
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      error: "Internal error server",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id || typeof id !== "string")
      return res.status(400).json({
        message: "Invalid inputs",
      });

    const user = await prisma.user.delete({
      where: { id },
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
