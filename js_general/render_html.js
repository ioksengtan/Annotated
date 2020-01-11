class Render_html {
	constructor(){
		
	}
	render_list_html_from_array(div_selector, array_titles, array_id){
		let output_html = "";
		output_html += "<ul>"
		for(let i=0;i<array_titles.length;i++){
			if(array_titles[i]!= "@index"){
				output_html+= "<li><a href='./index.html?id="+ array_id[i] +"'>"
				output_html+= array_titles[i]
				output_html+= "</a></li>"
			}
		}
		output_html+= "</ul>"
		div_selector.html(output_html)
	}
	render_iframe_html_from_link(iframe_selector, str_link){
		iframe_selector.attr('src', str_link);
	}

}