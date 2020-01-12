class Render_html {
	constructor(){

	}
	render_list_html_from_table(div_selector, table){
		let output_html = "";
		output_html += "<ul>"
		for(let i=0;i<table.table_json.data.length;i++){
				output_html+= "<li><a href='./index.html?id="+ table.get_col_by_header('id')[i] +"'>"
				output_html+= table.get_col_by_header('title')[i]
				output_html+= "</a> "
				let tags = table.get_col_by_header('tag')[i].split(',');
				if (tags.length == 1 && tags[0] == ""){
				}else{
					for(let j=0;j<tags.length;j++){
						output_html+= "#";
						output_html+= tags[j].trim();
						output_html+= " ";
					}
				}

				output_html+= " </li>"

		}
		output_html+= "</ul>"
		div_selector.html(output_html)
	}
	render_iframe_html_from_link(iframe_selector, str_link){
		iframe_selector.attr('src', str_link);
	}

}
