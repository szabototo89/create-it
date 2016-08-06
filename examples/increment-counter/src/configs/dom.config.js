import app from '../factories/app';
import status from '../factories/status';
import increment from '../factories/increment';

import Button from '../components/dom/button';
import Container from '../components/dom/container';
import Text from '../components/dom/text';

const Increment = increment({ Button });
const Status = status({ Text });
const App = app({ Container, Status, Increment });

export default App;
