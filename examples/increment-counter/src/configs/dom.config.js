import configure from './configure';

import Button from '../components/dom/button';
import Container from '../components/dom/container';
import Text from '../components/dom/text';

// import app from '../factories/app';
// import status from '../factories/status';
// import increment from '../factories/increment';

// const Increment = increment({ Button });
// const Status = status({ Text });
// const App = app({ Container, Status, Increment });

// export default App;

export default configure({ Button, Container, Text });
