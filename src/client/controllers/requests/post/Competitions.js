import CompetitionsModel from '../../../models/CompetitionsModel.js';
import Competition from '../../../models/entities/Competition.js';
import BaseRequest from '../BaseRequest.js';

class Universites extends BaseRequest
{
    get address()
    {
        return "/competitions" ;
    }

    get method()
    {
        return "POST";
    }

    setModel(data)
    {
        this.updateModel(
            data,
            CompetitionsModel,
            "competitions",
            Competition);
    }
}
export default new Universites().execute
