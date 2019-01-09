import CompetitionsModel from '../../../models/CompetitionsModel';
import Team from '../../../models/entities/Team.js';
import BaseRequest from '../BaseRequest.js';

class Universites extends BaseRequest
{
    get address()
    {
        return "/teams/" + this.id;
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
            "teams",
            Team);
    }
}
export default new Universites().execute
