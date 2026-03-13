const http = require("http");
const https = require("https");

const API_KEY = "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";
const PORT = 3000;

const server = http.createServer((req, res) => {
    // Allow all origins (CORS headers)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method !== "POST") {
        res.writeHead(405);
        res.end("Method not allowed");
        return;
    }

    // Extract model from URL: POST /generate?model=black-forest-labs/FLUX.1-schnell
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const model = url.searchParams.get("model");

    if (!model) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Missing ?model= param" }));
        return;
    }

    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
        const hfReq = https.request(
            `https://api-inference.huggingface.co/models/${model}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "X-Wait-For-Model": "true",
                },
            },
            (hfRes) => {
                res.writeHead(hfRes.statusCode, {
                    "Content-Type": hfRes.headers["content-type"] || "application/octet-stream",
                    "Access-Control-Allow-Origin": "*",
                });
                hfRes.pipe(res);
            }
        );
        hfReq.on("error", (e) => {
            res.writeHead(500);
            res.end(JSON.stringify({ error: e.message }));
        });
        hfReq.write(body);
        hfReq.end();
    });
});

server.listen(PORT, () => {
    console.log(`Proxy running at http://localhost:${PORT}`);
    console.log(`Open index.html in your browser (or serve it separately)`);
});