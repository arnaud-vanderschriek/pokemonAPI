const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => { 
  return sequelize.define('Pokemon', { 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le nom est déjà pris."
      },
      validate: {
        notEmpty: {msg: "Le nom ne peut pas être vide."},
        notNull: {msg: "Le nom est une propriété requise."}
      }
    },
    hp: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {msg: "Utilisez uniquement des nombres entiers pour les points de vie."},
        min: {
          args: [0],
          msgs: "les points de vie doivent être supérieurs ou égales à 0."
        },
        max: {
          args: [999],
          msgs: "les points de vie doivent être inférieurs ou égales à 999."
        },
        notNull: {msg: "Les points de vie sont une propriété requise."}
      }
    },
    cp: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {msg: "Utilisez uniquement des nombres entiers pour les points de dégats."},
        min: {
          args: [0],
          msgs: "les points de vie doivent être supérieurs ou égales à 0."
        },
        max: {
          args: [999],
          msgs: "les points de vie doivent être inférieurs ou égales à 999."
        },
        notNull: {msg: "Les points de dégats sont une propriété requise."}
      }
    },
    pictures: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {msg: "Utilisez uniquement une url valide pour l'image"},
        notNull: {msg: "L'image est une propriété requise"}
      }
    },
    types: { 
      type: DataTypes.STRING,
      allowNull: false, 
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypesValid(value) {
          if(!value) {
            throw new Error("Un pokemon doit au moins avoir un type.")
          }
          if(value.split(',').length > 3) {
            throw new Error("Un pokemon ne peux pas avoir plus de trois types.")
          }
          value.split(',').forEach(type => {
            if(!validTypes.includes(type)) {
              throw new Error(`Le type d'un pokemon doit appartenir à la liste suivante: ${validTypes}`)
            }
          })
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
