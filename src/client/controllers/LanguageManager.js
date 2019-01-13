/**
 * Created by ico on 03.08.17.
 */
import bg from '../localizations/bg.json';
import AppModel from '../models/AppModel';

class LanguageManager
{
    constructor()
    {
        var lang = AppModel.lang;
        if(lang == "bg")
        {
            this.keys = bg;
        }
        this.getValue = this.getValue.bind(this);
    }

    getValue(key)
    {
        if(this.keys[key] != null)
        {
            return this.keys[key];
        }
        else
        {

            return key;
        }
    }

}

export default new LanguageManager();