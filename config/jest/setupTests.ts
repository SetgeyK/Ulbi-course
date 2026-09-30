// Такой файл вы могли наблюдать при create-react-app
import 'whatwg-fetch'
import '@testing-library/jest-dom';
// import 'regenerator-runtime/runtime';
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder