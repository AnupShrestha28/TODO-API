const express = require("express");
const router = express.Router();


router.get("/", (req, res)=>{
    req.conn.query("SELECT * FROM todo", (error, result)=>{
        if(error){
            res.status(500).send("Error Occurred");
        }
        res.json(result.rows);
    });
});

router.get("/:id", (req, res)=>{
    const todoId = req.params.id;
    req.conn.query("SELECT * FROM todo WHERE id = $1", [todoId], (error, result)=>{
        if(error){
            res.status(500).send("Error Occurred");
        }
        res.json(result.rows);
    });
});

router.post("/", (req, res) => {
    const todo = req.body.title;
    req.conn.query("INSERT INTO todo (title) VALUES ($1)", [todo], (error, result) => {
      if (error) {
        res.status(500).send("Error Occurred");
      }
        res.json({ message: "Data added successfully" });
    });
  });
  

router.patch("/:id",(req,res)=>{
    const todoId = req.params.id;
    const updateTitle = req.body.title;

    req.conn.query("update todo set title=$1 where id=$2",[updateTitle,todoId],(error,result)=>{
        if(error){
            res.status(500).send("Error Occurred");
        } 
         res.json({message: "Data has been updated"})
    })
});

router.delete("/:id", (req, res)=>{
    const todoId = req.params.id;
    req.conn.query("DELETE FROM todo WHERE id = $1", [todoId],(error, result)=>{
        if(error){
            res.status(200).send("Error Occurred");
        }
        res.json({message: "Data has been deleted"});
    })
});
  

module.exports = router;