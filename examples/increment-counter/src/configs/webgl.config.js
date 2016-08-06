import app from '../factories/app';
import status from '../factories/status';
import increment from '../factories/increment';

import Container from '../components/webgl/container';
import Button from '../components/webgl/button';
import Text from '../components/webgl/text';

const NullComponent = () => null;

const Increment = increment({ Button });
const Status = status({ Text });
const App = app({ Container, Status, Increment });

export default App;
