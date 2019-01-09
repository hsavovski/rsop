import CompetitionsModel from '../../../models/CompetitionsModel';
import University from '../../../models/entities/University.js';
import BaseRequest from '../BaseRequest.js';

class Universities extends BaseRequest
{
    get address()
    {
        return "/universities/" + this.id;
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
            "universities",
            University);
    }
}
export default new Universities().execute
