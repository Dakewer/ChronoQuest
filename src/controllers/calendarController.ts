import { Response } from "express";

import Task from "../models/task";
import Habit from "../models/habit";

export async function renderCalendar(
    req: any,
    res: Response
) {
    try {
        console.log("User in renderCalendar:", req.Usuario);
        const tasks = await Task.find({
            asignadaA: req.Usuario?.id
        });
        const habits = await Habit.find({
            asignadaA: req.Usuario?.id
        });
        const events: any[] = [];

        tasks.forEach(task => {
            console.log(task);
            const rawTaskEnd = Array.isArray(task.end_date)
                ? task.end_date[0]
                : task.end_date;
            const date = new Date(rawTaskEnd);
            events.push({
                type: "task",
                title: task.name,
                description: task.description,
                difficulty: task.difficulty,
                attribute: task.attribute,
                rawDate: date,
                formattedDate: date.toLocaleDateString(
                    "es-MX",
                    {
                        timeZone: "UTC",
                        weekday: "long",
                        day: "numeric",
                        month: "long"
                    }
                )
            });
        });

        habits.forEach(habit => {
            console.log(habit);
            const rawHabitRelease = Array.isArray(habit.release_date)
                ? habit.release_date[0]
                : habit.release_date;
            const date = new Date(rawHabitRelease);

            events.push({
                type: "habit",
                title: habit.name,
                description: habit.description,
                difficulty: habit.difficulty,
                streak: habit.streak,
                rawDate: date,
                formattedDate: date.toLocaleDateString(
                    "es-MX",
                    {
                        timeZone: "UTC",
                        weekday: "long",
                        day: "numeric",
                        month: "long"
                    }
                ),
                hour: habit.hour
            });
        });


        events.sort((a, b) => {
            return (
                a.rawDate.getTime()
                -
                b.rawDate.getTime()
            );
        });

        res.render(
            "calendar",
            {
                audio: "DQ.mp3",
                currentPage: "calendar",
                events
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).send("Calendar error");
    }
}