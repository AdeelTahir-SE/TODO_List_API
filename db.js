import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function userId(email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user.id;
}

export async function createTodo(user, title, description, status) {
    const id = await userId(user);

    try {
        await prisma.todo.create({
            data: {
                title: title,
                description: description,
                status: status || "NotStarted",
                userId: id
            }
        });
        console.log("Todo created successfully!");
    } catch (error) {
        console.log("Could not create due to error:", error);
    }
}

export async function deleteTodo(user, Id) {
    try {
        const userIdValue = await userId(user); // Call the userId function

        await prisma.todo.delete({
            where: {
                id: parseInt(Id),
                userId: userIdValue // Use the retrieved userId value
            }
        });

        console.log("Todo deleted successfully!");
    } catch (error) {
        console.log("Could not delete due to error:", error);
    }
}

export async function register(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword // Store hashed password
        }
    });
    return user;
}

export async function login(email, password) {
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            console.log("User logged in successfully!");
            return user;
        } else {
            console.log("Invalid password!");
            return null; // Password is incorrect
        }
    } else {
        console.log("User not found!");
        return null; // User does not exist
    }
}

export async function updateTodo(user, id, title, description,status) {
    const userIdValue = await userId(user);

    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: userIdValue // Use the retrieved userId value
        },
        data: {
            title: title,
            description: description,
            status: status
        }
    });
    return updatedTodo;
}

export async function getTodos(user, page, limit) {
    const userIdValue = await userId(user);

    const todos = await prisma.todo.findMany({
        where: {
            userId: userIdValue
        },
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit)
    });

    const total = todos.length;
    return {
        todos,
        page,
        limit,
        total
    };
}
