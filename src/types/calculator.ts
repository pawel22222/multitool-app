export type Signs = '+' | '-' | '*' | '/';
export type DecimalPoint = '.';
export type Digits = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0';
export type Chars = Digits | DecimalPoint;
export type CalcState = { n1: string; n2: string; sign: Signs | null; result: string };
export type CalcActionNames =
  | 'enterChar'
  | 'useSign'
  | 'inverse'
  | 'opposite'
  | 'power'
  | 'root'
  | 'calculate'
  | 'clear'
  | 'clearEntry'
  | 'backspace';

type ReducerAction<T extends CalcActionNames, P = null> = { type: T; payload: P };

type EnterCharAction = ReducerAction<'enterChar', { char: Chars }>;
type UseSignAction = ReducerAction<'useSign', { sign: Signs }>;
type CalculateAction = ReducerAction<'calculate', null>;
type InverseAction = ReducerAction<'inverse', null>;
type OppositeAction = ReducerAction<'opposite', null>;
type PowerAction = ReducerAction<'power', null>;
type RootAction = ReducerAction<'root', null>;
type ClearAction = ReducerAction<'clear', null>;
type ClearEntryAction = ReducerAction<'clearEntry', null>;
type BackspaceAction = ReducerAction<'backspace', null>;
export type AllActions =
  | EnterCharAction
  | UseSignAction
  | CalculateAction
  | InverseAction
  | OppositeAction
  | PowerAction
  | RootAction
  | ClearAction
  | ClearEntryAction
  | BackspaceAction;

export type CalculatorActions = Record<CalcActionNames, Function>;
