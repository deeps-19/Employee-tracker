import Task from "../models/Task.js";

/* ----------------- Create Task ----------------- */
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assigneeId } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      reporterId: req.user.userId,
      assigneeId
    });

    res.json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* ----------------- Admin Assign Task ----------------- */
export const assignTask = async (req, res) => {
  try {
    const { assigneeId } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assigneeId },
      { new: true }
    );

    res.json({ message: "Task assigned", task });
  } catch (err) {
    res.status(500).json(err);
  }
};

/* ----------------- User Update Task Status ----------------- */
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status,
        updatedBy: req.user.userId
      },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* ----------------- View tasks of logged-in user ----------------- */
export const myTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assigneeId: req.user.userId })
      .populate("reporterId", "name email")
      .populate("assigneeId", "name email");

    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* ----------------- Admin View All Tasks ----------------- */
export const allTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("reporterId", "name email")
      .populate("assigneeId", "name email")
      .populate("updatedBy", "name email");

    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
};
