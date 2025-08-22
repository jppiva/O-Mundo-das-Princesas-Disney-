import express from "express";
import princesas from "./src/data/princesas.js";


const serverPort = 3000;
const app = express();
app.use(express.json());
app.get("/",(req , res) => {
    res.json({
    "mensagem":"Bem-vindos(as) ao reino mágico das Princesas Disney! ✨👑"
    });    
});
app.get("/princesas", (req , res) => {
    res.json(princesas);
})
app.get("/princesas/:id",(req , res) => {
  let id = parseInt(req.params.id);
 const idEncontrada = princesas.find(p => p.id === id);
  if(idEncontrada){
    res.status(200).json(idEncontrada);
  }else{
    res.status(404).json({
      mansagem:"princesa não encontrado"
    })
  }
})
app.get("/pricesas/nome/:nome",(req,res) => {
  let nome = req.params.toLowerCase();
  const princesaEncontrados = princesas.filter(b => b.nome.toLowerCase().includes(nome));
  if(princesaEncontrados.length > 0 ){
    res.status(200).json(princesaEncontrados);
  }else{
    res.status(404).json({
      mensage: "princesa não encontrados"
    })
  }
});
app.listen(serverPort, () => {
  console.log(` Servidor princesas iniciado em: http://localhost:${serverPort}`);
  console.log(` Pronto para receber novas princesas!`);
});