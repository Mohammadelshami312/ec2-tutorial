import { Router } from "express";
import { createUser, deleteUser, getAllUsers } from "../controllers/user.controller";

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);

export default router;