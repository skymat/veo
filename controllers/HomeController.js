// Import
import {Controller} from 'microscope-web';

class HomeController extends Controller {
	
	get routes(){
		return {
			'get /': 'index'
		}
	}

	// index action
	// GET /
	index(request, response){
		response.render('home/index');
	}
}

export default HomeController;