const express = require("express");
const router = express.Router();
const { fordFulkerson } = require("../utils/maxFlow");
const cors = require("cors");

let corsOptions = {
    origin : ['http://localhost:5173'],
 }

router.use(express.json());



router.post('/calculateMaxFlow', cors(corsOptions) , (req,res)=> {
    const maxFlowReq = req.body;

    const graph = buildGraph(maxFlowReq.nodes, maxFlowReq.edges);
    const maxFlow = fordFulkerson(graph, maxFlowReq.s - 1, maxFlowReq.t - 1, maxFlowReq.nodes);
    console.log(maxFlow);
    res.json({  });
});

function buildGraph(nodes, edges){
    const graph = Array.from({ length: nodes }, () => Array(nodes).fill(0));

    edges.forEach(edge => {
        const { s, t, c } = edge;
        graph[s - 1][t - 1] = c; 
    });

    return graph;
}

module.exports = router;