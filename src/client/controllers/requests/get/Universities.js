import CompetitionsModel from '../../../models/CompetitionsModel';
import University from '../../../models/entities/University.js';
import BaseRequest from '../BaseRequest.js';

class Universites extends BaseRequest
{
    get address()
    {
        return "/universities" ;
    }

    get method()
    {
        return "GET";
    }

    setModel(data)
    {
        this.updateModel(
            data,
            CompetitionsModel,
            "universities",
            University);
    }
}
export default new Universites().execute
