import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';
import { UserAttributes } from '../common/types';
import { sequelize } from '../config';
import { AuthService } from '../services';

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: CreationOptional<string>;
  declare email: string;
  declare userName: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        const encryptedPassword = await AuthService.encryptPassword(
          user.password,
        );
        user.password = encryptedPassword;
      },
    },
  },
);
