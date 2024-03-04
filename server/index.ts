import express from 'express';
import cors from 'cors';
import {DataTypes, Dialect, Sequelize} from 'sequelize'

const app = express()
import 'dotenv/config'

app.set('port', 1111)
const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        port: process.env.DB_PORT as unknown as number,
        dialect: process.env.DB_DIALECT as Dialect
    }
)
const ClientModel = sequelize.define("client", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
        validate: {
            isNumeric: {
                msg: "id: поле не корректно!"
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "name: поле не корректно!"
            }
        }
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "surname: поле не корректно!"
            }
        }
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: {
                args: true,
                msg: "birthDate: поле не корректно!",
            }

        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: {
                args: /^\+?[1-9][0-9]{7,14}$/,
                msg: "phoneNumber: поле не корректно!",
            },

        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: {
                msg: "email: поле не корректно!"
            }
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
},{
    updatedAt:false,
    timestamps:true
})
await ClientModel.sync();
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
})); //установка политики CORS
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(app.get('port'), () => { // вывод информации о запуске сервера
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});

app.get('/clients', async (req, res) => {
    try {
        const result=await ClientModel.findAll()
        res.json(result)
    } catch
        (e: any) {
        res.json(e)
    }
})
app.post('/clients', async (req, res) => {
    try {
        const result=await ClientModel.create(req.body)
        res.json(result)
    } catch (e: any) {
        res.json(e)
    }
})
/*app.patch('/clients', async (req, res) => {
    try {
        const result=await ClientModel.update({where:{id:req.body.id}})
        res.json(result)
    } catch (e: any) {
        res.json(e)
    }
})*/
app.delete('/clients', async (req, res) => {
    try {
        const result=await ClientModel.destroy({where:{id:req.body.id}})
        res.json(result)
    } catch (e: any) {
        res.json(e)
    }
})
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}