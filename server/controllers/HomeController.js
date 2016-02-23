// Import
import {Controller} from 'microscope-web';

class HomeController extends Controller {
	
	get routes(){
		return {
			'get /': 'index',
            'get /demo': 'demo'
		}
	}

	// index action
	// GET /
	index(request, response){
		response.render('home/index');
	}
    
    	// index action
	// GET /
	demo(request, response){
        response.locals.user = {username: 'anonymous'};
		response.render('home/demo');
	}
}

export default HomeController;