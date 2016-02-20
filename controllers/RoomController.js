// Import
import {Controller} from 'microscope-web';
import {authorize} from '../filters/authorize';

class RoomController extends Controller {
    
    get filters(){
        return [authorize];
    }

    get baseUrl() {
        return '/room';
    }

    get routes() {
        return {
            'get /': 'index'
        }
    }

    // index action
    // GET /
    index(request, response) {
        response.render('room/index');
    }
}

export default RoomController;