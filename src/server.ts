import { http } from "./http";

const PORT = 5000;

http.listen(PORT, () => {
    console.log("🚀 App is running in ", PORT);
});