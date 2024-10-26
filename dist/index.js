"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const bot_1 = __importDefault(require("./bot"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// app.use(cors({ origin: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
const allowedOrigins = [
    "http://localhost:3002",
    "https://jungle-ticket-fe.vercel.app",
    // Add more allowed origins as needed
];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin || "") || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS", // Allow preflight requests (OPTIONS)
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials like cookies or Authorization headers
};
// Enable CORS with the specified options
app.use((0, cors_1.default)(corsOptions));
// Ensure OPTIONS requests are handled
app.options("*", (0, cors_1.default)(corsOptions));
app.listen(port, () => {
    bot_1.default.launch();
    console.log(`===SERVER READY ON PORT ${port}===`);
});
//# sourceMappingURL=index.js.map