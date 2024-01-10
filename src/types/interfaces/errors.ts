import AysAgroError from 'entries/errors';
import { Action } from 'redux';

interface IErrorAction extends Action {
  error?: AysAgroError;
}

export default IErrorAction;
