  function mode_edit(){
	  $('#div_edit').show();
	  $('#div_view').hide();
  }

function update(){
	$.post(apiAnnotates,
		{
			"command": "commandPostAnnotateById",
			"id":5,//dict_queries['id'],
			"source":annotate_tag,
			"title":"title",
			"link":"link",
			"date":"date",
			"annotate":"annotate",
			"annotate_date":"annotate_date",
			"is_delete":"is_delete"
        },function(data){
			console.log(data);
			//let table_json = data;
			//table = new Table(table_json);
			//render_html.render_list_html_from_array($('#website_list'),table.get_col_by_header('title'), table.get_col_by_header('id'))
			//replaceText(editor, table.get_col_by_header('annotate')[table.get_col_by_header('title').indexOf('@index')]);
		})

}


$(document).ready(function(e) {
	console.log('test');
	console.log(document.getElementById('website_list').attributes['data-api'].value);
	
		$.get(apiAnnotates,
		{
			"command": "commandGetAllAnnotates",
        },function(data){
			//console.log(data);
			let table_json = data;
			table = new Table(table_json);
			render_html.render_list_html_from_table($('#website_list'),table)
			replaceText(editor, table.get_col_by_header('annotate')[table.get_col_by_header('title').indexOf('@index')]);
		})

	}else{ // load annotates for specific id
		$('#welcome').hide();
    $('#edit_annotate').show();
		url_queries = url_query.split('?')[1].split('&');
		num_url_query = url_queries.length;
		dict_queries = {};
		if(num_url_query > 0){
			for(i = 0;i<num_url_query;i++){
				dict_queries[url_queries[i].split('=')[0]] = url_queries[i].split('=')[1];
			}
		}
		if (Object.keys(dict_queries).length > 0){
			console.log('have queries');
		}
		if( 'id' in dict_queries){
			$.get(apiAnnotates,
			{
				//"command": "commandGetAnnotates",
				"command": "commandGetAnnotateById",
				"id": parseInt(dict_queries['id'])
			},function(data){
				console.log(data);
				table_json = data;
				table = new Table(table_json);
				//table.get_col_by_header('link')
				render_html.render_iframe_html_from_link($('#iframe'),table.get_col_by_header('link')[0])
				replaceText(editor, table.get_col_by_header('annotate')[0])
			})
		}else{
			console.log('there is no id in queries');
		}
	}

	curr_dir = {}
	curr_dir.type = "website"
	curr_dir.source = "Stratechery"
	curr_dir.id = 0

	var display_dir = function(curr_dir){
		console.log(curr_dir)
	}

	editor = CodeMirror.fromTextArea(document.getElementById("text-input"), {
	        lineNumbers: true,
			lineWrapping: true,
			//readOnly: true
	    }
	);
	editor.setSize("100%","100%");

		editor.on("paste", async e => {
		//e.preventDefault();
		getClipboardContents(0);
  });



  function createStorageKey(file) {
    var date = new Date()
    var day = date.toISOString().slice(0,10)
    var name = date.getTime() + "-" + file.name
    return [ "tmp", day, name ].join("/")
  }

  function createFormData(key, file) {
    var data = new FormData()
    data.append("key", key)
    data.append("Content-Type", file.type)
    data.append("file", file)
    return data
  }



}
)
