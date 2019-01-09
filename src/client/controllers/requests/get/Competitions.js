import CompetitionsModel from '../../../models/CompetitionsModel.js';
import Competition from '../../../models/entities/Competition.js';
import BaseRequest from '../BaseRequest.js';

class Universities extends BaseRequest
{
    get address()
    {
        return "/competitions" ;
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
            "competitions",
            Competition);
    }
}
export default new Universities().execute
