import {DataTypes, Dialect, Sequelize} from "sequelize";

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
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                args:true,
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
                args:/^\+?[1-9][0-9]{7,14}$/,
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
        defaultValue: Date.now(),
        validate: {
            isDate: {
                args:true,
                msg: "createdAt: поле не корректно!",
            }

        }
    }
})

export default ClientModel
