import configure from './configure';

import button from '../factories/webgl/button';
import container from '../factories/webgl/container';
import text from '../factories/webgl/text';
import createIt, * as lib from '../createIt';

import { createContainer } from '../utils/pixiHelpers';

const renderer = PIXI.autoDetectRenderer(800, 600);
const stage = createContainer();

const create = lib.merge({ stage, renderer })(createIt());

const Button = create()(button);
const Text = create()(text);
const Container = create()(container);

export default configure({ Button, Container, Text });