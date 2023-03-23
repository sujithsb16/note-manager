const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const noteRoutes = require("./routes/notesRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require('cors')

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors({
origin:"https://note-maker-for-all.onrender.com"
}))

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
