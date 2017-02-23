import { default as circular } from './circular'
import { default as cartesian } from './cartesian';

export default function enableCoords(type){
	return type == 'circular' ? circular : cartesian
}