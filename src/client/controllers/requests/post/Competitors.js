import CompetitionsModel from '../../../models/CompetitionsModel';
import Competitor from '../../../models/entities/Competitor.js';
import BaseRequest from '../BaseRequest.js';

class Universites extends BaseRequest
{
    get address()
    {
        return "/competitors" ;
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
            "competitors",
            Competitor);
    }
}
export default new Universites().execute
