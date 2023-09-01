const mysql = require('mysql2')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ramais',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.post('/addRamal', (req, res) => {
    const { ramal, usuario, cargo, departamento, andar, empresa, funcionario, nm_predio } = req.body
    pool.query('INSERT INTO departamento (nm_funcionario, nm_departamento, cd_cargos, cd_ramal, nm_andar, cd_empresa, nm_updateuser, nm_predio) VALUES (?,?,?,?,?,?,?,?)',
        [funcionario, departamento, cargo, ramal, andar, empresa, usuario, nm_predio], (err, result) => {
            if (err) {
                res.status(400).json({ message: err.message })
            } else {
                res.status(200).json({ message: "Ramal adicionado com sucesso!" })
                console.log('Novo ramal adicionado!')
            }
        })

})

app.delete('/deleteRamal', (req, res) => {

    const { cd_departamento, cd_cargos, cd_empresa } = req.body

    console.log(cd_departamento, cd_cargos, cd_empresa);

    pool.query("DELETE FROM departamento WHERE `cd_departamento` = ? AND `cd_cargos` = ? AND `cd_empresa` = ?;",
        [cd_departamento, cd_cargos, cd_empresa], (err, result) => {
            if (err) {
                res.status(400).json({ message: err.message })
            } else {
                res.status(200).json({ message: "Ramal excluido com sucesso!" })
                console.log('Ramal excluido!')
            }
        })
})




app.put('/changeRamal', (req, res) => {
    const { nm_departamento, nm_funcionario, cd_cargos, cd_ramal, nm_andar, cd_empresa, nm_updateuser, nm_predio, cd_departamento } = req.body
console.log( nm_departamento, nm_funcionario, cd_cargos, cd_ramal, nm_andar, cd_empresa, nm_updateuser, nm_predio, cd_departamento);
    pool.query("update departamento set `nm_departamento` = ?, `nm_funcionario` = ?, `cd_cargos` = ?, `cd_ramal` = ?, `nm_andar` = ?, `cd_empresa` = ?, `nm_updateuser` = ?, `nm_predio` = ? where `cd_departamento` = ?;",
        [nm_departamento, nm_funcionario, cd_cargos, cd_ramal, nm_andar, cd_empresa, nm_updateuser, nm_predio, cd_departamento], (err, result) => {
            if (err) {
                res.send(err)
                console.log(err);
            } else {
                res.send('Sucesso')
                console.log("Ramal atualizado com sucesso!");
            }
        })
})

//Resgata todas as empresas
app.get('/getAllEmpresas', (req, res) => {
    pool.query('SELECT * FROM empresa;', (err, data) => {
        if (err) {
            console.log(err)
            return;
        }
        const cargos = data;
        res.json(cargos)
    })

})
//Resgata todos os cargos
app.get('/getAllCargos', (req, res) => {
    pool.query('SELECT * FROM cargos;', (err, data) => {
        if (err) {
            console.log(err)
            return;
        }
        const cargos = data;
        res.json(cargos)
    })

})



//Resgata todos os ramais todos os ramais
app.get('/getAllRamais', (req, res) => {
    pool.query(`SELECT d.cd_departamento, d.nm_departamento, d.nm_funcionario, d.cd_cargos, d.cd_ramal, 
    d.nm_andar, d.cd_empresa, d.nm_updateuser, d.nm_predio, c.nm_cargos, e.nm_empresa
    FROM departamento d
    INNER JOIN cargos c ON d.cd_cargos = c.cd_cargos
    INNER JOIN empresa e ON d.cd_empresa = e.cd_empresa;
    `, (err, data) => {
        if (err) {
            res.send(err)
            console.log(err);
        } else {
            res.json(data)
            console.log('Registros resgatados com sucesso')
        }
    })
})
app.listen(5000, () => {
    console.log('Servidor rodando na porta 3002.');
});

