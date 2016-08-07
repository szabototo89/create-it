import app from '../factories/app';
import status from '../factories/status';
import increment from '../factories/increment';

const configure = ({ Button, Container, Text }) => {
  const Increment = increment({ Button });
  const Status = status({ Text });
  const App = app({ Container, Status, Increment });

  return App;
}

export default configure;
