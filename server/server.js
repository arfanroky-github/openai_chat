import http from "http";
import { config } from "dotenv";
config();
import { OpenAIApi, Configuration } from "openai";
const port = process.env.PORT || 4000;

// openai configuration
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
  })
);

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  console.log(req.url)
  if (req.url.split('=')[0] === "/api/chat/?search" && req.method.toLowerCase() === "get") {

    const text = req.url.split("=")[1];
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
    });
    console.log(response.status, response.data.choices[0].message);
    if(response.status === 200){
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: response.data.choices[0].message }));
    }
    else{
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({error: 'Something went wrong! Please try again letter.'}))
    }


  } else {
    res.writeHead(404, { "Content-Tpe": "applicaiton/josn" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
