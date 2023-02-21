export default function getRangeText( range ) {
	return Array.from( range.getItems() ).reduce( ( rangeText, node ) => {
		if( !( node.is( 'text' ) || node.is( 'textProxy' ) ) ) {
			return rangeText;
		}

		return rangeText + node.data;
	}, '' )
}
