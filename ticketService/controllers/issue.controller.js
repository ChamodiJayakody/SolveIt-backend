import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Issue from "../models/issues/Issue.model.js";

export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

export const createIssue = async (req, res, next) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      type,
      department,
      reportedby,
      assignedto,
      attachments,
      tags,
      comments,
    } = req.body;

    const newIssue = new Issue({
      title,
      description,
      status,
      priority,
      type,
      department,
      reportedby,
      assignedto,
      attachments,
      tags,
      comments,
    });
    await newIssue.save();
    res
      .status(201)
      .json({ message: "Issue created successfully", issue: newIssue });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create issue", error: error.message });
  }
};
