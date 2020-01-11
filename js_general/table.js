class Table {
	constructor( table_json ) {
		this.table_json = table_json;
	}
	//input: i, return: [ric1, ric2, ric3]
	get_col_by_id(col_id){
		let list_data = [];
		for(let i=0;i<this.table_json.data.length;i++){
			list_data.push(this.table_json.data[i][col_id]);			
		}		
		return list_data;
	}
	get_row_by_id(row_id){
		let list_data = [];
		list_data = this.table_json.data[row_id];
		return list_data;
		
	}	
	get_col_by_header(str_header){
		let list_data = [];
		let list_headers = this.table_json.headers;		
		let col_id = list_headers.indexOf(str_header);
		for(let i=0;i<this.table_json.data.length;i++){
			list_data.push(this.table_json.data[i][col_id]);			
		}		
		return list_data;
	}	
}