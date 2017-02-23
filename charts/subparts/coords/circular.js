export default function enableCoords(){
	this.padding = {
		top:
			// releated to font size of title and subtitle.
			(this.props.title ? 50 : 0) + 
			( this.props.subtitle ? 50 : 0) + 20,
		right:20,
		bottom:50,
		left:20
	}
}
