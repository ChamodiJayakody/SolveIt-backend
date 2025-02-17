import express from 'express';
import { createIssue } from '../controllers/issue.controller.js';

const router = express.Router();

router.post('/create-issue',createIssue);

export default router;