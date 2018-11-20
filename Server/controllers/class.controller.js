const { Class, Staff }          = require('../models');
const authService       = require('../../services/auth.service');
const { to, ReE, ReS }  = require('../../services/util.service');

/*jshint ignore:start*/
const create = async function(req, res){
    const body = req.body;

    if(!body.unique_key && !body.name ){
        return ReE(res, 'Please enter a name to register.');
    } else if(!body.category){
        return ReE(res, 'Please enter a category to register.');
    } else if(!body.day){
        return ReE(res, 'Please enter a day to register.');
    } else if(!body.hour){
        return ReE(res, 'Please enter a hour to register.');
    }else{
        let err, user;

        [err, user] = await to(Class.create(body)); //authService.createUser(body)

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new class.', user:user.toWeb()}, 201);//, token:user.getJWT()
    }
}
module.exports.create = create;

const get = async function(req, res){
    let user = req.user;

    return ReS(res, {user:user.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if(err){
        if(err.message=='Validation error') err = 'The name is already in use';
        return ReE(res, err);
    }
    return ReS(res, {message :'Updated Class: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE(res, 'error occured trying to delete Class');

    return ReS(res, {message:'Deleted Class'}, 204);
}
module.exports.remove = remove;

const getAll = async function(req, res){
    let err, classes;

        [err, classes] = await to(Class.findAll({attributes: ['id', 'name', 'category', 'day', 'hour']})); //authService.createUser(body)

        if(err) return ReE(res, err, 422);

        return ReS(res, {classes : classes});
}
module.exports.getAll = getAll;

/*jshint ignore:end*/
