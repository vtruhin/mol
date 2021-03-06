namespace $.$mol {
	
	export class $mol_bench_demo extends $.$mol_bench_demo {
		
		@ $mol_mem()
		col_sort( next? : string ) {
			return next || 'mid'
		}
		
		result() {
			return {
				'bubble' : {
					'algorithm' : 'bubble' ,
					'min' : '1 ms' ,
					'mid' : '11 ms' ,
					'max' : '99 ms' ,
				} ,
				'qsort' : {
					'algorithm' : 'qsort' ,
					'min' : '2 ms' ,
					'mid' : '5 ms' ,
					'max' : '10 ms' ,
				} ,
			}
		}
		
	}
	
}
