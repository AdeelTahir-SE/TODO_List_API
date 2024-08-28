import { Router } from "express";
const router = new Router();
const userRouter = new Router();
import {
  getTodos,
  register,
  login,
  deleteTodo,
  updateTodo,
  createTodo,
} from "./db.js";
import { hashPassword, createToken } from "./authentication.js";

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const registeredUser = await register(name, email, hashedPassword);
    if (registeredUser) {
      const token = createToken(email);
      res.json({ token, message: "User registered successfully!" });
    } else {
      res.status(400).json({ message: "Failed to register user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);
    if (user) {
      const token = createToken(email);
      res.json({ token, message: "User logged in successfully!" });
    } else {
      res.status(401).json({ message: "Failed to login user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/todos", async (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user // Corrected to match headers

  try {
    if (status) {
      await createTodo(userId, title, description, status);
    } else {
      await createTodo(userId, title, description);
    }
    res.json({ message: "Todo created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo", error: error.message });
  }
});

router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description ,status} = req.body;
  const userId = req.user // Corrected to match headers

  try {
    const updatedTodo = await updateTodo(userId, id, title, description,status);
    if (updatedTodo) {
      res.json({ message: "Updated todo successfully!" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo", error: error.message });
  }
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user // Corrected to match headers

  try {
    await deleteTodo(userId, id);
    res.json({ message: "Todo deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error: error.message });
  }
});

router.get("/todos", async (req, res) => {
  const { page, limit } = req.query;
  const userId = req.user // Corrected to match headers

  try {
    const todos = await getTodos(userId, page, limit);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to get todos", error: error.message });
  }
});

const routers = { router, userRouter };
export default routers;
