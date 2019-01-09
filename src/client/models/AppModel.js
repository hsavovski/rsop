import BaseModel from './BaseModel';

class AppModel extends BaseModel
{
	constructor()
	{
		super();

        this.getDataHelpers["me"] = {
            action:{},
            initial:{}
        };
        this.server = "";
        this.lang = 'bg';
	}

	get me()
	{
		return this.getProperty("me");
	}

	set me(value)
	{
		this.setProperty("me", value);
	}

    get server()
    {
        return this.getProperty("server");
    }

    set server(value)
    {
        this.setProperty("server", value);
    }

    get lang()
    {
        return this.getProperty("lang");
    }

    set lang(value)
    {
        this.setProperty("lang", value);
    }

}

export default new AppModel();
