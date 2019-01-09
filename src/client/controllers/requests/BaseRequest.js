/**
 * Created by ico on 16.03.17.
 */
import "whatwg-fetch"
import AppModel from '../../models/AppModel';

export default class BaseRequest {
    constructor()
    {
        this.execute = this.execute.bind(this);
    }

    get address()
    {
        throw new Error("this has to be overriden");
    }

    get method()
    {
        throw new Error("this has to be overriden");
    }

    execute(data){
        var async = "/async";
        if(AppModel.server == "admin")
        {
            async = "/admin/async";
        }
        fetch(async + this.address, {
            credentials: 'same-origin',
            method: this.method,
            headers: {
                "Content-Type": "application/json"
            },
            body:(data == null ? null : JSON.stringify(data))
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error
                }
            })
            .then((data) => {
                this.setModel(data);
            })
            .catch((ex) => {
                console.log('parsing failed', ex);
            })
    }

    setModel(data)
    {
        throw new Error("this has to be overriden");
    }

    updateModel(data, model, entityname, entityClass)
    {
        var holder = model[entityname];
        if(!Array.isArray(data))
        {
            data = [data];
        }

        for(var i = 0, len = data.length; i < len; i++)
        {
            var d = data[i];
            let entity;
            if(holder[d.id] == null)
            {
                entity = new entityClass();

                holder[d.id] = entity;
            }
            else
            {
                entity = holder[d.id];
            }

            for(var name in entity)
            {
                if(d[name] != null)
                {
                    entity[name] = d[name];
                }
            }

            holder[d.id] = entity;
        }
        
        model.emit(entityname)
    }
}