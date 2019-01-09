import CompetitionsModel from '../../../models/CompetitionsModel';
import TeamLeader from '../../../models/entities/TeamLeader.js';
import BaseRequest from '../BaseRequest.js';

class Universites extends BaseRequest
{
    get address()
    {
        return "/teamLeaders/" + this.id;
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
            "teamLeaders",
            TeamLeader);
    }
}
export default new Universites().execute
