
/* jshint ignore:start*/
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Class', {
        name          : DataTypes.STRING,
        category      : {type: DataTypes.STRING, unique: true},
        day           : DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        hour          : DataTypes.STRING,
    });

    Model.associate = function(models){
        this.Students = this.belongsToMany(models.Student, {through: 'StudentClass'});
        this.Staffs   = this.belongsToMany(models.Staff, {through: 'StaffClass'});
    };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
/*jshint ignore:end*/