import express from "express";
import princesas from "./src/data/princesas.js";


const serverPort = 3000;
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    "mensagem": "Bem-vindos(as) ao reino mágico das Princesas Disney! ✨👑"
  });
});
app.get("/princesas", (req, res) => {
  res.json(princesas);
});

app.get("/princesas/ativas/sim", (req, res) => {
  const princesasAtivas = princesas.filter(b => b.ativa === true);
  if (princesasAtivas.length > 0) {
    res.status(200).json(princesasAtivas);
  } else {
    res.status(404).json({
      "mensagem": "Nenhuma princesa ativa encontrada"
    });
  }
});
app.get("/princesas/inativas", (req, res) => {
  const princesasInativas = princesas.filter(b => b.ativa === false);
  if (princesasInativas.length > 0) {
    res.status(200).json(princesasInativas);
  } else {
    res.status(404).json({
      "mensagem": "Nenhuma princesa ativa encontrada"
    });
  }
});

app.get("/princesas/nome/:nome", (req, res) => {
  let nome = req.params.nome.toLowerCase();
  const princesaEncontrados = princesas.filter(b => b.nome.toLowerCase().includes(nome));
  if (princesaEncontrados.length > 0) {
    res.status(200).json(princesaEncontrados);
  } else {
    res.status(404).json({
     "mensagem": "princesa não encontrados"
    });
  }
});
app.get("/princesas/reino/:reino", (req, res) => {
  let reino = req.params.reino.toLowerCase();
  const reinoEncontrados = princesas.filter(b => b.reino.toLowerCase().includes(reino));
  if (reinoEncontrados.length > 0) {
    res.status(200).json(reinoEncontrados);
  } else {
    res.status(404).json({
      "mensagem": "reino não encontrados"
    });
  }
});
app.get("/princesas/:id", (req, res) => {
    let id = parseInt(req.params.id);
    const idEncontrada = princesas.find(p => p.id === id);
    if (idEncontrada) {
      res.status(200).json(idEncontrada);
    } else {
      res.status(404).json({
        "mensagem": "princesa não encontrado"
      })
    }
  });

app.listen(serverPort, () => {
  console.log(` Servidor princesas iniciado em: http://localhost:${serverPort}`);
  console.log(` Pronto para receber novas princesas!`);
});