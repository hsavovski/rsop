import { EventEmitter } from "events";

export default class BaseModel extends EventEmitter {

    constructor()
    {
        super();

        this.data = {};
        this.getDataHelpers = {};
    }

    /*
     * these are the 2 core functions of the model
     */
    setProperty(name, value)
    {
        this.data[name] = value;

        this.emit(name)
    }

    getProperty(name)
    {
        if(this.data[name] == null
                && this.getDataHelpers[name] != null
          )
        {
            var helper = this.getDataHelpers[name];

            if(helper.initial != null)
            {
                this.data[name] = helper.initial;
            }

            if(helper.action != null)
            {
                helper.action();
            }
        }

        return(this.data[name]);
    }
}
