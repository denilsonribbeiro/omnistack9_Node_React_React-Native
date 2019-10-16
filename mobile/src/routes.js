import { createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './pages/Login';
import ListSpots from './pages/ListSpots';
import Book from './pages/Book';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        ListSpots,
        Book
    })
);

export default Routes;