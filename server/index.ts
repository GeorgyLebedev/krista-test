import express from 'express';
import cors from 'cors';
const app = express()
app.set('port', 1111)
import {connection} from "./connection.js";
import {ClientModel} from "./models/ClientModel.js";
import {FindAttributeOptions} from "sequelize"; //Импорт файла с моделью данных
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
})); //установка политики CORS
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(app.get('port'), () => { // вывод информации о запуске сервера
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});
const clientAttributes:FindAttributeOptions=[
    "id",
    "name",
    "surname",
    "birthDate",
    "phoneNumber",
    "email",
    [connection.fn('to_char', connection.col('createdAt'), 'YYYY-MM-DD HH:MI:SS'), "createdAt"]
]
app.get('/clients', async (req, res) => {
    try { // выборка всех данных из таблицы
        const result = await ClientModel.findAll({
            order: [['id', 'asc']],
            attributes:clientAttributes
        })
        res.json(result)
    } catch
        (e:any) {
        res.json(e)
    }
})
app.post('/clients', async (req, res) => {
    try { // добавление новой записи в таблицу
        await ClientModel.create(req.body)
        res.json(await ClientModel.findOne({
            attributes:clientAttributes,
            where:{
                id: req.body.id,
            },

        }))
    } catch (e:any) {
        res.json(e)
    }
})
app.put('/clients/:id', async (req, res) => {
    try { // изменение записи в таблице
        const result = await ClientModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.json(result)
    } catch (e:any) {
        res.json(e)
    }
})
app.delete('/clients/:id', async (req, res) => {
    try { // удаление записи из таблицы
        const result = await ClientModel.destroy({where: {id: req.params.id}})
        res.json(result)
    } catch (e:any) {
        res.json(e)
    }
})
try {
    await connection.authenticate();
    await ClientModel.sync();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
