const db = require("../../data/dbConfig");

async function insert(task) {
  const [id] = await db("tasks").insert(task);
  const newTask = {
    task_id: id,
    task_description: task.task_description,
    task_notes: task.task_notes,
    task_completed: task.task_completed,
    project_id: task.project_id,
  };
  return newTask;
}

async function getTasks() {
  const results = await db("tasks as t")
    .leftJoin("projects as p", "p.project_id", "t.project_id")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "p.project_name",
      "p.project_description"
    );

  const tasks = [];
  results.forEach((e) => {
    tasks.push({
      task_id: e.task_id,
      task_description: e.task_description,
      task_notes: e.task_notes,
      task_completed: Boolean(e.task_completed),
      project_name: e.project_name,
      project_description: e.project_description,
    });
  });

  return tasks;
}

module.exports = {
  getTasks,
  insert,
};