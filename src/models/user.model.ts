import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config";


interface UserAttributes {
    id: number;
    email: string;
    password: string;
    userName: string
    firstName: string;
    lastName: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: number;
    declare email: string;
    declare userName: string;
    declare password: string;
    declare firstName: string;
    declare lastName: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false

    }
}, {
    tableName: 'users',
    sequelize: sequelize,
    timestamps: true
})