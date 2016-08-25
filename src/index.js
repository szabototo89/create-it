import _createIt from './createIt';
import _autoAppend from './middlewares/autoAppend';
import _createMiddleware from './middlewares/createMiddleware';
import _filter from './middlewares/filter';
import _concat from './concat';
import _merge from './merge';
import _compose from './compose';
import _map from './map';

export const createIt = _createIt;
export const autoAppend = _autoAppend;
export const createMiddleware = _createMiddleware;
export const filter = _filter;
export const concat = _concat;
export const merge = _merge;
export const compose = _compose;
export const map = _map;

export default createIt;
