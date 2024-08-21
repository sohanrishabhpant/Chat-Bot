import app from './app.js';
import { connecttodb } from './db/connection.js';
// connectors and listeners
const port = process.env.PORT || 5000;
connecttodb()
    .then(() => {
    app.listen(port, () => {
        console.log("Server Open & Connected to Database");
    });
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map