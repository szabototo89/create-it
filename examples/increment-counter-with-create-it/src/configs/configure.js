import app from '../factories/app';
import status from '../factories/status';
import increment from '../factories/increment';
import createIt, { merge } from '../createIt';

const configure = ({ Button, Container, Text }) => {
  const create = merge({ Button, Container, Text })(createIt());

  const Increment = create()(increment);
  const Status = create()(status);
  const App = create({ Status, Increment })(app);

  return App;
}; 

export default configure;
 