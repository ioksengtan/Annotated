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
};

$(document).ready(function(e) {
	//console.log(document.getElementById('website_list').attributes['data-api'].value);
	//$('.repeat')[0].attributes['data-api'].value
	let num_repeat_div = $('.loop').length;
	let list_api_cmd = []
	list_table = [];
	for(var i_repeat_div=0; i_repeat_div < num_repeat_div; i_repeat_div++){
		let tmp_api_cmd = {};
		tmp_api_cmd.api = $('.loop')[i_repeat_div].attributes['data-api'].value;
		tmp_api_cmd.cmd = $('.loop')[i_repeat_div].attributes['data-cmd'].value;
		list_api_cmd.push(tmp_api_cmd);
		$.get(
			tmp_api_cmd.api,
			{
				"command": tmp_api_cmd.cmd
			},
			( data )=>{
				console.log(data);
				//let table[i_repeat_div] = new Table(data);
				let table = new Table(data);
				list_table.push(table);
				//render_html(table, dom_template);
			}
		)


	}

	//$($('.loop')[0].children[0]).append('<ul>hello</div>');
	//$($('.loop')[1].children[0]).append('<div>hello1</div>');

	//console.log(list_api_cmd);
	//$('.repeat')[0].attributes['data-api'].value

})
