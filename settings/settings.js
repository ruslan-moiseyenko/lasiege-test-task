import dotenv from "dotenv";
dotenv.config();

export const dbUri = `mongodb+srv://ruscom5:${process.env.DB_PASS}}@cluster-test-lasiege.xp8rx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-test-lasiege`;
