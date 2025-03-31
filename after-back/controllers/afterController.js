import db from "../data/server.js"

function index (req,res){
    const sql = "SELECT * FROM products";

    db.query(sql, (err, results)=>{
        if(err)
            return res.status(500).json({
        error: "Errore lato server INDEX funtions"});
        res.json(results)
    })
}

function show(req, res){
    const {id} = req.params

    const productsSql = "SELECT * FROM products WHERE id=?"

    db.query(productsSql, [id], (err, results)=>{
        if (err)
            return res.status(500).json({
                error: "Errore lato server SHOW function"
            });

        if (results.length === 0)
            return res.status(404).json({
                error: 'Products not found',
            });
        res.json(results);
    })
}

export {index, show}