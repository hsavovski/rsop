import CompetitionsModel from '../../../models/CompetitionsModel';
import CompetitorGroup from '../../../models/entities/CompetitorGroup.js';
import BaseRequest from '../BaseRequest.js';

class Universites extends BaseRequest
{
    get address()
    {
        return "/competitorGroups/" + this.id;
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
            "competitorGroups",
            CompetitorGroup);
    }
}
export default new Universites().execute
