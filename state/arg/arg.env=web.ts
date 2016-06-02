class $mol_state_arg< Value > extends $mol_object {
	
	@ $mol_prop()
	static href( ...diff : string[] ) {
		if( diff[0] !== void 0 ) document.location.href = diff[0]
		return window.location.search + window.location.hash
	}
	
	@ $mol_prop()
	static dict( ...diff : any[] ) {
		if( diff[0] !== void 0 ) this.href( this.make( diff[0] ) )
		
		var href = this.href()
		var chunks = href.split( /[\/\?#!&;]/g )
		
		var params = {}
		chunks.forEach( chunk => {
			if( !chunk ) return
			var vals = chunk.split( /[:=]/ ).map( decodeURIComponent )
			params[ vals.shift() ] = vals
		})
		
		return params
	}
	
	@ $mol_prop()
	static value< Value >( key : string , ...diff : Value[] ) {
		if( diff[0] === void 0 ) return this.dict()[ key ] || null
		this.href( this.link({ [ key ] : diff[0] }) )
		return diff[0]
	}
	
	static link( next : any ) {
		var params = {}
		
		var prev = this.dict()
		for( var key in prev ) {
			if( key in next ) continue
			params[ key ] = prev[ key ]
		}
		
		for( var key in next ) {
			params[ key ] = next[ key ]
		}
		
		return this.make( params )
	}
	
	static make( next : any ) {
		var chunks = []
		for( var key in next ) {
			if( null == next[key] ) continue
			chunks.push( [ key ].concat( next[key] ).map( encodeURIComponent ).join( '=' ) )
		}
		
		return '#' + chunks.join( '#' )
	}
	
	prefix() { return '' }
	
	value( key : string , ...diff : Value[] ) {
		return $mol_state_local.value( this.prefix() + '.' + key , ...diff )
	}
	
}

window.addEventListener( 'hashchange' , event => $mol_state_arg.href( void 0 ) )