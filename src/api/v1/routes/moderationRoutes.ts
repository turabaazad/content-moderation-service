import { Router } from "express";
import {
	moderatePost,
	flagUser,
	getPostById,
	getUserProfile,
	getFlaggedContentStats,
} from "../controllers/moderationController";

const router: Router = Router();
/**
 * @openapi
 * /api/v1/moderation/post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     description: Retrieve a specific post using its unique identifier.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the post data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the post
 *                   example: "12345"
 *                 title:
 *                   type: string
 *                   description: The title of the post
 *                   example: "My First Blog Post"
 *                 content:
 *                   type: string
 *                   description: The body content of the post
 *                   example: "This is an example blog post content."
 *                 authorId:
 *                   type: string
 *                   description: The ID of the post's author
 *                   example: "user_001"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the post was created
 *                   example: "2024-03-18T10:00:00Z"
 *       404:
 *         description: Post not found
 *       400:
 *         description: Invalid post ID format
 */
router.get("/post/:id", getPostById);

/**
 * @route POST /
 * @description Create a new branch.
 * @openapi
 * /api/v1/moderation/{id}:
 *   get:
 *     summary: Get a post by ID
 *     description: Retrieve a specific post using its unique identifier.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the post data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       404:
 *         description: Post not found
 */
router.post("/post/:id/moderate", moderatePost);

/**
 * @route GET /
 * @description  Get profile.
 * @openapi
 * /api/v1/moderation/{id}/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile details of a user by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with user profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the user
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email address of the user
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid user ID format
 */

router.get("/user/:id/profile", getUserProfile);

/**
 * @route POST /
 * @description flag user using their id.
 * @openapi
 * /api/v1/moderation/user/{id}/flag:
 *   post:
 *     summary: Flag a user
 *     description: Flag a user for inappropriate behavior.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to flag
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 description: The reason for flagging the user
 *               reporterId:
 *                 type: string
 *                 description: The ID of the user reporting the issue
 *     responses:
 *       200:
 *         description: User flagged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User flagged successfully"
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: User not found
 */

router.post("/user/:id/flag", flagUser);

/**
 * @route GET /
 * @description flag user using their id.
 * @openapi
 * /api/v1/moderation/content/flags/stats:
 *   get:
 *     summary: Get flagged content statistics
 *     description: Retrieve statistics on flagged content, including total flags, flagged posts, and flagged users.
 *     responses:
 *       200:
 *         description: Successful response with flagged content statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_flags:
 *                   type: integer
 *                   description: The total number of flagged items
 *                   example: 150
 *                 flagged_posts:
 *                   type: integer
 *                   description: The number of flagged posts
 *                   example: 90
 *                 flagged_users:
 *                   type: integer
 *                   description: The number of flagged users
 *                   example: 60
 *       500:
 *         description: Internal server error
 */
router.get("/content/flags/stats", getFlaggedContentStats);

export default router;