function $mol_test( code : string | { ( test : $mol_test_case ) : void } ) {
	$mol_test_all.push( new $mol_test_case( code ) )
}

var $mol_test_all = []

var $mol_test_run = () => {
	for( var test of $mol_test_all ) {
		test.run()
	}
} 

class $mol_test_case {
	
	code : { ( test : $mol_test_case ) : void }
	
	constructor( code : string | { ( test : $mol_test_case ) : void } ) {
		if( typeof code === 'string' ) {
			this.code = <any> new Function( 'test' , code )
		} else {
			this.code = code
		}
	}
	
	run() {
		this.code.call( null , this )
	}
	
	done() {
	}
	
	ok( value ) {
		if( value ) return
		throw new Error( `Not true (${value})` )
	}
	
	not( value ) {
		if( !value ) return
		throw new Error( `Not false (${value})` )
	}
	
	fail( message ) {
		throw new Error( message )
	}
	
	equal( a , b ) {
		if( a === b ) return 
		throw new Error( `Not equal (${a},${b})` )
	}
	
	unique( a , b ) {
		if( a !== b ) return
		throw new Error( `Not unique (${a},${b})` )
	}
	
}