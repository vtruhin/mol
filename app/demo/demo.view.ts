module $.$mol {
	export class $mol_app_demo extends $.$mol_app_demo {
		
		main() {
			var selected = this.selected()
			if( selected ) {
				return [ this.widget( selected[0] ) ]
			} else {
				return [ this.lister() ]
			}
		}
		
		@ $mol_prop()
		namesDemo() {
			var next = []
			for( var name in $ ) {
				if( !/^\$.*_demo($|_)/i.test( name ) ) continue
				if( /^\$mol_demo/.test( name ) ) continue
				if( /^\$mol_app_demo/.test( name ) ) continue
				if( typeof $[ name ] !== 'function' ) continue
				next.push( name.substring( 1 ) )
			}
			return next
		}
		
		@ $mol_prop()
		namesApp() {
			var next = []
			for( var name in $ ) {
				if( !/^\$.*_app_[a-z0-9]+$/i.test( name ) ) continue
				if( /^\$mol_demo/.test( name ) ) continue
				if( /^\$mol_app_demo/.test( name ) ) continue
				if( typeof $[ name ] !== 'function' ) continue
				next.push( name.substring( 1 ) )
			}
			return next
		}
		
		@ $mol_prop()
		options() {
			return [ null ].concat( this.namesDemo() ).concat( this.namesApp() ).map( name => this.option( name ) )
		}

		@ $mol_prop()
		items() : $mol_viewer[] {
			return this.namesDemo().map( name => this.screen( name ) )
		}
		
		selected() {
			return this.argument().value( 'demo' )
		}

		@ $mol_prop()
		option( name : string ) {
			return new $mol_linker().setup( obj => {
				obj.childs = () => [ name ? ( '$' + name ) : 'All' ]
				obj.patch = () => ({ demo : name })
			} )
		}
		
		@ $mol_prop()
		screen( name : string ) {
			return new $mol_demo_medium().setup( obj => {
				obj.name = () => '$' + name
				obj.argument = () => this.argument().sub( name )
			} )
		}
		
		@ $mol_prop()
		screens( name : string ) {
			return new $mol_demo_all().setup( obj => {
				obj.name = () => '$' + name
				obj.argument = () => this.argument().sub( name )
			} )
		}
		
		@ $mol_prop()
		widget( name : string ) {
			var Class = $[ '$' + name ]
			return new Class().setup( obj => {
				obj.argument = () => this.argument().sub( name )
			} )
		}
		
	}
}