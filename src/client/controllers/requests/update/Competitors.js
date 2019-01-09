import CompetitionsModel from '../../../models/CompetitionsModel';
import Competitor from '../../../models/entities/Competitor.js';
import BaseRequest from '../BaseRequest.js';

class Universites extends BaseRequest
{
    get address()
    {
        return "/competitors/" + this.id;
    }

    get method()
    {
        return "PATCH";
    }

    execute(data)
    {
        this.id = data.id;
        super.execute(data);
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
