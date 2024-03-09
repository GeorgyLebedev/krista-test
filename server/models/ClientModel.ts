import {connection} from "../connection.js";
import {DataTypes} from "sequelize";
export const ClientModel = connection.define("client", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
        validate: {
            isNumeric: {
                msg: "id: поле не корректно!|Ожидается уникальное натуральное число"
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "name: поле не корректно!|Ожидается строка"
            }
        }
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "surname: поле не корректно!|Ожидается строка"
            }
        }
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: {
                args: true,
                msg: "birthDate: поле не корректно!|Ожидается строка, подобная: \"ГГГГ-ММ-ДД\"",
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
                msg: "phoneNumber: поле не корректно!|Ожидается строка, подобная:\"+70001112233\"",
            },

        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: {
                msg: "email: поле не корректно!|Ожидается уникальная строка, подобная:\"Example@email.com\""
            }
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isValidDate(value:string) {
                if (!value) return
                if (isNaN(Date.parse(value))) {
                    throw new Error("createdAt: поле не корректно!|Ожидается строка, подобная: \"ДД-ММ-ГГГГ\"");
                }
            }
        }
    }
}, {
    updatedAt: false,
    timestamps: true
})
